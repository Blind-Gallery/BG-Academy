"""
FA2 standard: https://gitlab.com/tezos/tzip/-/blob/master/proposals/tzip-12/tzip-12.md. <br/>
Documentation: [FA2 lib](/docs/guides/FA/FA2_lib).

Multiple mixins and several standard [policies](https://gitlab.com/tezos/tzip/-/blob/master/proposals/tzip-12/permissions-policy.md#operator-permission-behavior) are supported.
"""

import smartpy as sp

#########
# Types #
#########

token_id_type = sp.TNat
moderator_type = sp.TAddress
moderator_name_type = sp.TString

t_operator_permission = sp.TRecord(
    owner=sp.TAddress, operator=sp.TAddress, token_id=sp.TNat
).layout(("owner", ("operator", "token_id")))

t_update_operators_params = sp.TList(
    sp.TVariant(
        add_operator=t_operator_permission, remove_operator=t_operator_permission
    )
)

t_transfer_batch = sp.TRecord(
    from_=sp.TAddress,
    txs=sp.TList(
        sp.TRecord(
            to_=sp.TAddress,
            token_id=sp.TNat,
            amount=sp.TNat,
        ).layout(("to_", ("token_id", "amount")))
    ),
).layout(("from_", "txs"))

t_transfer_params = sp.TList(t_transfer_batch)

t_balance_of_request = sp.TRecord(owner=sp.TAddress, token_id=sp.TNat).layout(
    ("owner", "token_id")
)

t_balance_of_response = sp.TRecord(
    request=t_balance_of_request, balance=sp.TNat
).layout(("request", "balance"))

t_balance_of_params = sp.TRecord(
    callback=sp.TContract(sp.TList(t_balance_of_response)),
    requests=sp.TList(t_balance_of_request),
).layout(("requests", "callback"))


############
# Policies #
############


class NoTransfer:
    """(Transfer Policy) No transfer allowed."""

    def init_policy(self, contract):
        self.name = "no-transfer"
        self.supports_transfer = False
        self.supports_operator = False

    def check_tx_transfer_permissions(self, contract, from_, to_, token_id):
        pass

    def check_operator_update_permissions(self, contract, operator_permission):
        pass

    def is_operator(self, contract, operator_permission):
        return False


class OwnerTransfer:
    """(Transfer Policy) Only owner can transfer tokens, no operator
    allowed."""

    def init_policy(self, contract):
        self.name = "owner-transfer"
        self.supports_transfer = True
        self.supports_operator = False

    def check_tx_transfer_permissions(self, contract, from_, to_, token_id):
        sp.verify(sp.sender == from_, "FA2_NOT_OWNER")

    def check_operator_update_permissions(self, contract, operator_permission):
        pass

    def is_operator(self, contract, operator_permission):
        return False


class OwnerOrOperatorTransfer:
    """(Transfer Policy) Only owner and operators can transfer tokens.

    Operators allowed.
    """

    def init_policy(self, contract):
        self.name = "owner-or-operator-transfer"
        self.supports_transfer = True
        self.supports_operator = True
        contract.update_initial_storage(
            operators=sp.big_map(tkey=t_operator_permission, tvalue=sp.TUnit)
        )

    def check_tx_transfer_permissions(self, contract, from_, to_, token_id):
        sp.verify(
            (sp.sender == from_)
            | contract.data.operators.contains(
                sp.record(owner=from_, operator=sp.sender, token_id=token_id)
            ),
            message="FA2_NOT_OPERATOR",
        )

    def check_operator_update_permissions(self, contract, operator_permission):
        sp.verify(operator_permission.owner == sp.sender, "FA2_NOT_OWNER")

    def is_operator(self, contract, operator_permission):
        return contract.data.operators.contains(operator_permission)


class PauseTransfer:
    """(Transfer Policy) Decorate any policy to add a pause mechanism.

    Adds a `set_pause` entrypoint. Checks that contract.data.paused is
    `False` before accepting transfers and operator updates.

    Needs the `Admin` mixin in order to work.
    """

    def __init__(self, policy=None):
        if policy is None:
            self.policy = OwnerOrOperatorTransfer()
        else:
            self.policy = policy

    def init_policy(self, contract):
        self.policy.init_policy(contract)
        self.name = "pauseable-" + self.policy.name
        self.supports_transfer = self.policy.supports_transfer
        self.supports_operator = self.policy.supports_operator
        contract.update_initial_storage(paused=False)

        # Add a set_pause entrypoint
        def set_pause(self, params):
            sp.verify(self.is_admin_or_mod(sp.sender), "FA2_NOT_ADMIN")
            self.data.paused = params

        contract.set_pause = sp.entry_point(set_pause)

    def check_tx_transfer_permissions(self, contract, from_, to_, token_id):
        sp.verify(~contract.data.paused, message=sp.pair("FA2_TX_DENIED", "FA2_PAUSED"))
        self.policy.check_tx_transfer_permissions(contract, from_, to_, token_id)

    def check_operator_update_permissions(self, contract, operator_param):
        sp.verify(
            ~contract.data.paused,
            message=sp.pair("FA2_OPERATORS_UNSUPPORTED", "FA2_PAUSED"),
        )
        self.policy.check_operator_update_permissions(contract, operator_param)

    def is_operator(self, contract, operator_param):
        return self.policy.is_operator(contract, operator_param)


##########
# Common #
##########


class Common(sp.Contract):
    """Common logic between Fa2Nft, Fa2Fungible and Fa2SingleAsset."""

    def __init__(self, policy=NoTransfer(), metadata_base=None, token_metadata={}):
        if policy is None:
            self.policy = OwnerOrOperatorTransfer()
        else:
            self.policy = policy
        self.update_initial_storage(
            token_metadata=sp.big_map(
                token_metadata,
                tkey=sp.TNat,
                tvalue=sp.TRecord(
                    token_id=sp.TNat, token_info=sp.TMap(sp.TString, sp.TBytes)
                ).layout(("token_id", "token_info")),
            )
        )
        self.policy.init_policy(self)
        self.generate_contract_metadata("metadata_base", metadata_base)

    def is_defined(self, token_id):
        return self.data.token_metadata.contains(token_id)

    def generate_contract_metadata(self, filename, metadata_base=None):
        """Generate a metadata json file with all the contract's offchain views
        and standard TZIP-126 and TZIP-016 key/values."""
        if metadata_base is None:
            metadata_base = {
                "name": "FA2 contract",
                "version": "1.0.0",
                "description": "This implements FA2 (TZIP-012) using SmartPy.",
                "interfaces": ["TZIP-012", "TZIP-016"],
                "authors": ["SmartPy <https://smartpy.io/#contact>"],
                "homepage": "https://smartpy.io/ide?template=FA2.py",
                "source": {
                    "tools": ["SmartPy"],
                    "location": "https://gitlab.com/SmartPy/smartpy/-/raw/master/python/templates/FA2.py",
                },
                "permissions": {"receiver": "owner-no-hook", "sender": "owner-no-hook"},
            }
        offchain_views = []
        for f in dir(self):
            attr = getattr(self, f)
            if isinstance(attr, sp.OnOffchainView):
                if attr.kind == "offchain":
                    offchain_views.append(attr)
        metadata_base["views"] = offchain_views
        metadata_base["permissions"]["operator"] = self.policy.name
        self.init_metadata(filename, metadata_base)

    def balance_of_batch(self, requests):
        """Mapping of balances."""
        sp.set_type(requests, sp.TList(t_balance_of_request))

        def f_process_request(req):
            sp.result(
                sp.record(
                    request=req,
                    balance=self.balance_(req.owner, req.token_id),
                )
            )

        return requests.map(f_process_request)

    # Entry points

    @sp.entry_point
    def update_operators(self, batch):
        """Accept a list of variants to add or remove operators who can perform
        transfers on behalf of the owner."""
        sp.set_type(batch, t_update_operators_params)
        if self.policy.supports_operator:
            with sp.for_("action", batch) as action:
                with action.match_cases() as arg:
                    with arg.match("add_operator") as operator:
                        self.policy.check_operator_update_permissions(self, operator)
                        self.data.operators[operator] = sp.unit
                    with arg.match("remove_operator") as operator:
                        self.policy.check_operator_update_permissions(self, operator)
                        del self.data.operators[operator]
        else:
            sp.failwith("FA2_OPERATORS_UNSUPPORTED")

    @sp.entry_point
    def balance_of(self, params):
        """Send the balance of multiple account / token pairs to a callback
        address.

        `balance_of_batch` must be defined in the child class.
        """
        sp.set_type(params, t_balance_of_params)
        sp.transfer(
            self.balance_of_batch(params.requests), sp.mutez(0), params.callback
        )

    @sp.entry_point
    def transfer(self, batch):
        """Accept a list of transfer operations between a source and multiple
        destinations.

        `transfer_tx_` must be defined in the child class.
        """
        sp.set_type(batch, t_transfer_params)
        if self.policy.supports_transfer:
            with sp.for_("transfer", batch) as transfer:
                with sp.for_("tx", transfer.txs) as tx:
                    # The ordering of sp.verify is important: 1) token_undefined, 2) transfer permission 3) balance
                    sp.verify(self.is_defined(tx.token_id), "FA2_TOKEN_UNDEFINED")
                    self.policy.check_tx_transfer_permissions(
                        self, transfer.from_, tx.to_, tx.token_id
                    )
                    with sp.if_(tx.amount > 0):
                        self.transfer_tx_(transfer.from_, tx)
        else:
            sp.failwith("FA2_TX_DENIED")

    # Offchain views

    @sp.offchain_view(pure=True)
    def all_tokens(self):
        """OffchainView: Return the list of all the token IDs known to the contract."""
        sp.result(sp.range(0, self.data.last_token_id))

    @sp.offchain_view(pure=True)
    def is_operator(self, params):
        """Return whether `operator` is allowed to transfer `token_id` tokens
        owned by `owner`."""
        sp.set_type(params, t_operator_permission)
        sp.result(self.policy.is_operator(self, params))

    @sp.offchain_view(pure=True)
    def get_balance(self, params):
        """Return the balance of an address for the specified `token_id`."""
        sp.set_type(
            params,
            sp.TRecord(owner=sp.TAddress, token_id=sp.TNat).layout(
                ("owner", "token_id")
            ),
        )
        sp.result(self.balance_(params.owner, params.token_id))

    @sp.offchain_view(pure=True)
    def total_supply(self, params):
        """Return the total number of tokens for the given `token_id`."""
        sp.verify(self.is_defined(params.token_id), "FA2_TOKEN_UNDEFINED")
        sp.result(sp.set_type_expr(self.supply_(params.token_id), sp.TNat))


################
# Base classes #
################


class Fa2Nft(Common):
    """Base class for a FA2 NFT contract.

    Respects the FA2 standard.
    """

    ledger_type = "NFT"

    def __init__(
        self, metadata, token_metadata=[], ledger={}, policy=None, metadata_base=None
    ):
        ledger, token_metadata = self.initial_mint(token_metadata, ledger)
        self.init(
            ledger=sp.big_map(ledger, tkey=sp.TNat, tvalue=sp.TAddress),
            metadata=sp.set_type_expr(metadata, sp.TBigMap(sp.TString, sp.TBytes)),
            last_token_id=sp.nat(len(token_metadata)),
        )
        Common.__init__(
            self,
            policy=policy,
            metadata_base=metadata_base,
            token_metadata=token_metadata,
        )

    def initial_mint(self, token_metadata=[], ledger={}):
        """Perform a mint before the origination.

        Returns `ledger` and `token_metadata`.
        """
        token_metadata_dict = {}
        for token_id, metadata in enumerate(token_metadata):
            token_metadata_dict[token_id] = sp.record(
                token_id=token_id, token_info=metadata
            )
        for token_id, address in ledger.items():
            if token_id not in token_metadata_dict:
                raise Exception(
                    "Ledger contains token_id with no corresponding metadata"
                )
        return (ledger, token_metadata_dict)

    def balance_(self, owner, token_id):
        sp.verify(self.is_defined(token_id), "FA2_TOKEN_UNDEFINED")
        return sp.eif(self.data.ledger[token_id] == owner, 1, 0)

    def supply_(self, token_id):
        sp.verify(self.is_defined(token_id), "FA2_TOKEN_UNDEFINED")
        return sp.nat(1)

    def transfer_tx_(self, from_, tx):
        sp.verify(
            (tx.amount == 1) & (self.data.ledger[tx.token_id] == from_),
            message="FA2_INSUFFICIENT_BALANCE",
        )
        # Do the transfer
        self.data.ledger[tx.token_id] = tx.to_


class Fa2Fungible(Common):
    """Base class for a FA2 fungible contract.

    Respects the FA2 standard.
    """

    ledger_type = "Fungible"

    def __init__(
        self, metadata, token_metadata=[], ledger={}, policy=NoTransfer(), metadata_base=None
    ):
        ledger, supply, token_metadata = self.initial_mint(token_metadata, ledger)
        self.init(
            ledger=sp.big_map(
                ledger, tkey=sp.TPair(sp.TAddress, sp.TNat), tvalue=sp.TNat
            ),
            metadata=sp.set_type_expr(metadata, sp.TBigMap(sp.TString, sp.TBytes)),
            last_token_id=sp.nat(len(token_metadata)),
            supply=sp.big_map(supply, tkey=sp.TNat, tvalue=sp.TNat),
        )
        Common.__init__(
            self,
            policy=policy,
            metadata_base=metadata_base,
            token_metadata=token_metadata,
        )

    def initial_mint(self, token_metadata=[], ledger={}):
        """Perform a mint before the origination.

        Returns `ledger`, `supply` and `token_metadata`.
        """
        token_metadata_dict = {}
        supply = {}
        for token_id, metadata in enumerate(token_metadata):
            metadata = sp.record(token_id=token_id, token_info=metadata)
            token_metadata_dict[token_id] = metadata
            # Token that are in token_metadata and not in ledger exist with supply = 0
            supply[token_id] = 0
        for (address, token_id), amount in ledger.items():
            if token_id not in token_metadata_dict:
                raise Exception("Ledger contains a token_id with no metadata")
            supply[token_id] += amount
        return (ledger, supply, token_metadata_dict)

    def balance_(self, owner, token_id):
        sp.verify(self.is_defined(token_id), "FA2_TOKEN_UNDEFINED")
        return self.data.ledger.get((owner, token_id), 0)

    def supply_(self, token_id):
        sp.verify(self.is_defined(token_id), "FA2_TOKEN_UNDEFINED")
        return self.data.supply.get(token_id, sp.nat(0))

    def transfer_tx_(self, from_, tx):
        from_ = (from_, tx.token_id)
        self.data.ledger[from_] = sp.as_nat(
            self.data.ledger.get(from_, 0) - tx.amount,
            message="FA2_INSUFFICIENT_BALANCE",
        )
        # Do the transfer
        to_ = (tx.to_, tx.token_id)
        self.data.ledger[to_] = self.data.ledger.get(to_, 0) + tx.amount


class Fa2SingleAsset(Common):
    """Base class for a FA2 contract with single (fungible) asset.

    Respects the FA2 standard.
    """

    ledger_type = "SingleAsset"

    def __init__(
        self, metadata, token_metadata=None, ledger={}, policy=None, metadata_base=None
    ):
        if token_metadata is None:
            if len(ledger) > 0:
                raise Exception("Ledger not empty while metadata is None")
            token_metadata = {}
        else:
            token_metadata = {0: sp.record(token_id=0, token_info=token_metadata)}
        self.init(
            ledger=sp.big_map(ledger, tkey=sp.TAddress, tvalue=sp.TNat),
            metadata=sp.set_type_expr(metadata, sp.TBigMap(sp.TString, sp.TBytes)),
            last_token_id=sp.nat(len(token_metadata)),
            supply=sum(ledger.values()),
        )
        Common.__init__(
            self,
            policy=policy,
            metadata_base=metadata_base,
            token_metadata=token_metadata,
        )

    def balance_(self, owner, token_id):
        sp.verify(self.is_defined(token_id), "FA2_TOKEN_UNDEFINED")
        return self.data.ledger.get(owner, 0)

    def transfer_tx_(self, from_, tx):
        self.data.ledger[from_] = sp.as_nat(
            self.data.ledger.get(from_, 0) - tx.amount,
            message="FA2_INSUFFICIENT_BALANCE",
        )
        # Do the transfer
        self.data.ledger[tx.to_] = self.data.ledger.get(tx.to_, 0) + tx.amount

    def supply_(self, token_id):
        sp.verify(self.is_defined(token_id), "FA2_TOKEN_UNDEFINED")
        return self.data.supply


##########
# Mixins #
##########


class Admin:
    """(Mixin) Provide the basics for having an administrator in the contract.

    Adds an `administrator` attribute in the storage record. Provides a
    `set_administrator` entrypoint. Provides a `is_administrator` meta-
    programming function.
    """

    def __init__(self, administrator):
        self.update_initial_storage(administrator=administrator, moderators = sp.map(tkey = moderator_type, tvalue = moderator_name_type))

    def is_administrator(self, sender):
        return sender == self.data.administrator

    @sp.entry_point
    def set_administrator(self, params):
        """(Admin only) Set the contract administrator."""
        sp.verify(self.is_administrator(sp.sender), message="FA2_NOT_ADMIN")
        self.data.administrator = params

    def is_admin_or_mod(self, address):
        auth = sp.local('auth', sp.bool(False))
        with sp.if_ ( self.is_administrator(address) ):
            auth.value = True
        with sp.if_ ( self.data.moderators.contains(address) ):
            auth.value = True
        return auth.value

    @sp.entry_point
    def set_administrator(self, params):
        sp.verify(self.is_administrator(sp.sender), message = "FA2_NOT_ADMIN")
        sp.set_type(params.administrator, moderator_type)

        self.data.administrator = params.administrator
        

    @sp.entry_point
    def add_moderator(self, params):
        sp.verify(self.is_administrator(sp.sender), message = "FA2_NOT_ADMIN")
        sp.set_type(params.moderator, moderator_type)
        sp.set_type(params.name, moderator_name_type)

        self.data.moderators[params.moderator] = params.name

    @sp.entry_point
    def remove_moderator(self, params):
        sp.verify(self.is_administrator(sp.sender), message = "FA2_NOT_ADMIN")
        sp.set_type(params.moderator, moderator_type)

        del self.data.moderators[params.moderator]


class ChangeMetadata:
    """(Mixin) Provide an entrypoint to change contract metadata.

    Requires the `Admin` mixin.
    """

    @sp.entry_point
    def set_metadata(self, metadata):
        """(Admin only) Set the contract metadata."""
        sp.verify(self.is_admin_or_mod(sp.sender), message="FA2_NOT_ADMIN")
        self.data.metadata = metadata


class WithdrawMutez:
    """(Mixin) Provide an entrypoint to withdraw mutez that are in the
    contract's balance.

    Requires the `Admin` mixin.
    """

    @sp.entry_point
    def withdraw_mutez(self, destination, amount):
        """(Admin only) Transfer `amount` mutez to `destination`."""
        sp.verify(self.is_administrator(sp.sender), message="FA2_NOT_ADMIN")
        sp.send(destination, amount)


class OffchainviewTokenMetadata:
    """(Mixin) If present indexers use it to retrieve the token's metadata.

    Warning: If someone can change the contract's metadata he can change how
    indexers see every token metadata.
    """

    @sp.offchain_view()
    def token_metadata(self, token_id):
        """Returns the token-metadata URI for the given token."""
        sp.result(self.data.token_metadata[token_id])


class OnchainviewBalanceOf:
    """(Mixin) Non-standard onchain view equivalent to `balance_of`.

    Before onchain views were introduced in Michelson, the standard way
    of getting value from a contract was through a callback. Now that
    views are here we can create a view for the old style one.
    """

    @sp.onchain_view()
    def get_balance_of(self, requests):
        """Onchain view equivalent to the `balance_of` entrypoint."""
        sp.set_type(requests, sp.TList(t_balance_of_request))
        sp.result(
            sp.set_type_expr(
                self.balance_of_batch(requests), sp.TList(t_balance_of_response)
            )
        )


class MintNft:
    """(Mixin) Non-standard `mint` entrypoint for FA2Nft with incrementing id.

    Requires the `Admin` mixin.
    """

    @sp.entry_point
    def mint(self, batch):
        """Admin can mint new or existing tokens."""
        sp.set_type(
            batch,
            sp.TList(
                sp.TRecord(
                    to_=sp.TAddress,
                    metadata=sp.TMap(sp.TString, sp.TBytes),
                ).layout(("to_", "metadata"))
            ),
        )
        sp.verify(self.is_admin_or_mod(sp.sender), "FA2_NOT_ADMIN")
        with sp.for_("action", batch) as action:
            token_id = sp.compute(self.data.last_token_id)
            metadata = sp.record(token_id=token_id, token_info=action.metadata)
            self.data.token_metadata[token_id] = metadata
            self.data.ledger[token_id] = action.to_
            self.data.last_token_id += 1


class MintFungible:
    """(Mixin) Non-standard `mint` entrypoint for FA2Fungible with incrementing
    id.

    Requires the `Admin` mixin.
    """

    @sp.entry_point
    def mint(self, batch):
        """Admin can mint tokens."""
        sp.set_type(
            batch,
            sp.TList(
                sp.TRecord(
                    to_=sp.TAddress,
                    token=sp.TVariant(
                        new=sp.TMap(sp.TString, sp.TBytes), existing=sp.TNat
                    ),
                    amount=sp.TNat,
                ).layout(("to_", ("token", "amount")))
            ),
        )
        sp.verify(self.is_admin_or_mod(sp.sender), "FA2_NOT_ADMIN")
        with sp.for_("action", batch) as action:
            with action.token.match_cases() as arg:
                with arg.match("new") as metadata:
                    token_id = sp.compute(self.data.last_token_id)
                    self.data.token_metadata[token_id] = sp.record(
                        token_id=token_id, token_info=metadata
                    )
                    self.data.supply[token_id] = action.amount
                    self.data.ledger[(action.to_, token_id)] = action.amount
                    self.data.last_token_id += 1
                with arg.match("existing") as token_id:
                    sp.verify(self.is_defined(token_id), "FA2_TOKEN_UNDEFINED")
                    self.data.supply[token_id] += action.amount
                    from_ = (action.to_, token_id)
                    self.data.ledger[from_] = (
                        self.data.ledger.get(from_, 0) + action.amount
                    )


class MintSingleAsset:
    """(Mixin) Non-standard `mint` entrypoint for FA2SingleAsset.

    Requires the `Admin` mixin.
    """

    @sp.entry_point
    def mint(self, batch):
        """Admin can mint tokens."""
        sp.set_type(
            batch,
            sp.TList(
                sp.TRecord(to_=sp.TAddress, amount=sp.TNat).layout(("to_", "amount"))
            ),
        )
        sp.verify(self.is_admin_or_mod(sp.sender), "FA2_NOT_ADMIN")
        with sp.for_("action", batch) as action:
            sp.verify(self.is_defined(0), "FA2_TOKEN_UNDEFINED")
            self.data.supply += action.amount
            self.data.ledger[action.to_] = (
                self.data.ledger.get(action.to_, 0) + action.amount
            )


class BurnNft:
    """(Mixin) Non-standard `burn` entrypoint for FA2Nft that uses the transfer
    policy permission."""

    @sp.entry_point
    def burn(self, batch):
        """Users can burn tokens if they have the transfer policy permission.

        Burning an nft destroys its metadata.
        """
        sp.set_type(
            batch,
            sp.TList(
                sp.TRecord(
                    from_=sp.TAddress,
                    token_id=sp.TNat,
                    amount=sp.TNat,
                ).layout(("from_", ("token_id", "amount")))
            ),
        )
        sp.verify(self.policy.supports_transfer, "FA2_TX_DENIED")
        with sp.for_("action", batch) as action:
            sp.verify(self.is_defined(action.token_id), "FA2_TOKEN_UNDEFINED")
            self.policy.check_tx_transfer_permissions(
                self, action.from_, action.from_, action.token_id
            )
            with sp.if_(action.amount > 0):
                sp.verify(
                    (action.amount == sp.nat(1))
                    & (self.data.ledger[action.token_id] == action.from_),
                    message="FA2_INSUFFICIENT_BALANCE",
                )
                # Burn the token
                del self.data.ledger[action.token_id]
                del self.data.token_metadata[action.token_id]


class BurnFungible:
    """(Mixin) Non-standard `burn` entrypoint for FA2Fungible that uses the
    transfer policy permission."""

    @sp.entry_point
    def burn(self, batch):
        """Users can burn tokens if they have the transfer policy
        permission."""
        sp.set_type(
            batch,
            sp.TList(
                sp.TRecord(
                    from_=sp.TAddress,
                    token_id=sp.TNat,
                    amount=sp.TNat,
                ).layout(("from_", ("token_id", "amount")))
            ),
        )
        # sp.verify(self.policy.supports_transfer, "FA2_TX_DENIED")
        sp.verify(self.is_admin_or_mod(sp.sender), "FA2_NOT_ADMIN")
        with sp.for_("action", batch) as action:
            sp.verify(self.is_defined(action.token_id), "FA2_TOKEN_UNDEFINED")
            self.policy.check_tx_transfer_permissions(
                self, action.from_, action.from_, action.token_id
            )
            from_ = (action.from_, action.token_id)
            # Burn the tokens
            self.data.ledger[from_] = sp.as_nat(
                self.data.ledger.get(from_, 0) - action.amount,
                message="FA2_INSUFFICIENT_BALANCE",
            )

            supply = sp.compute(
                sp.is_nat(self.data.supply.get(action.token_id, 0) - action.amount)
            )
            with supply.match_cases() as arg:
                with arg.match("Some") as nat_supply:
                    self.data.supply[action.token_id] = nat_supply
                with arg.match("None"):
                    self.data.supply[action.token_id] = 0


class BurnSingleAsset:
    """(Mixin) Non-standard `burn` entrypoint for FA2SingleAsset that uses the
    transfer policy permission."""

    @sp.entry_point
    def burn(self, batch):
        """Users can burn tokens if they have the transfer policy
        permission."""
        sp.set_type(
            batch,
            sp.TList(
                sp.TRecord(
                    from_=sp.TAddress,
                    token_id=sp.TNat,
                    amount=sp.TNat,
                ).layout(("from_", ("token_id", "amount")))
            ),
        )
        sp.verify(self.policy.supports_transfer, "FA2_TX_DENIED")
        with sp.for_("action", batch) as action:
            sp.verify(self.is_defined(action.token_id), "FA2_TOKEN_UNDEFINED")
            self.policy.check_tx_transfer_permissions(
                self, action.from_, action.from_, action.token_id
            )
            # Burn the tokens
            self.data.ledger[action.from_] = sp.as_nat(
                self.data.ledger.get(action.from_, 0) - action.amount,
                message="FA2_INSUFFICIENT_BALANCE",
            )

            supply = sp.compute(sp.is_nat(self.data.supply - action.amount))
            with supply.match_cases() as arg:
                with arg.match("Some") as nat_supply:
                    self.data.supply = nat_supply
                with arg.match("None"):
                    self.data.supply = 0

class BlindGalleryBadge(Admin, ChangeMetadata, OffchainviewTokenMetadata, OnchainviewBalanceOf, MintFungible, BurnFungible, Fa2Fungible, Common):
    def __init__(self, admin, **kwards):
        Fa2Fungible.__init__(self, **kwards)
        Admin.__init__(self, admin)

    
###########
# Helpers #
###########


class TestReceiverBalanceOf(sp.Contract):
    """Helper used to test the `balance_of` entrypoint.

    Don't use it on-chain as it can be gas locked.
    """

    def __init__(self):
        self.init(last_known_balances=sp.big_map())

    @sp.entry_point
    def receive_balances(self, params):
        sp.set_type(params, sp.TList(t_balance_of_response))
        with sp.for_("resp", params) as resp:
            owner = (resp.request.owner, resp.request.token_id)
            with sp.if_(self.data.last_known_balances.contains(sp.sender)):
                self.data.last_known_balances[sp.sender][owner] = resp.balance
            with sp.else_():
                self.data.last_known_balances[sp.sender] = sp.map({owner: resp.balance})


def make_metadata(symbol, name, decimals):
    """Helper function to build metadata JSON bytes values."""
    return sp.map(
        l={
            "decimals": sp.utils.bytes_of_string("%d" % decimals),
            "name": sp.utils.bytes_of_string(name),
            "symbol": sp.utils.bytes_of_string(symbol),
        }
    )


if "templates" not in __name__:
    @sp.add_test(name = "Blind gallery")
    def test():
        scenario = sp.test_scenario()
        scenario.h1("Blind Gallery Batch")

        scenario.table_of_contents()
            
        scenario.h2("Accounts")
        admin = sp.test_account("admin")
        mod1 = sp.test_account("mod1")
        mod2 = sp.test_account("mod2")

        alice = sp.test_account("Alice")
        bob = sp.test_account("Bob")
        tomas = sp.test_account("Tomas")
        pedro = sp.test_account("Pedro")
        scenario.show([alice, bob, tomas, pedro])

        tok0_md = make_metadata(name="Token Zero", decimals=1, symbol="Tok0")
        tok1_md = make_metadata(name="Token One", decimals=1, symbol="Tok1")
        tok2_md = make_metadata(name="Token Two", decimals=1, symbol="Tok2")

        TOKEN_METADATA = [tok0_md, tok1_md, tok2_md]
        METADATA = sp.utils.metadata_of_url("ipfs://example")

        c1 = BlindGalleryBadge(admin=admin.address, metadata=METADATA, token_metadata=TOKEN_METADATA)
        scenario += c1

        scenario.h2("Set up contract administator and moderators")

        scenario.h3("Add moderators to the smart - contract")
        scenario += c1.add_moderator(moderator = mod1.address, name = 'mod1').run(sender = admin)
        scenario += c1.add_moderator(moderator = mod2.address, name = 'mad mod2').run(sender = admin)
        scenario += c1.add_moderator(moderator = tomas.address, name = 'el gato tomas').run(sender = alice, valid=False)
        scenario += c1.add_moderator(moderator = tomas.address, name = 'el gato tomas').run(sender = admin)
        

        scenario.h3("Remove moderators to the smart - contract")
        scenario += c1.remove_moderator(moderator = mod2.address).run(sender = admin)
        scenario += c1.remove_moderator(moderator = mod2.address).run(sender = alice, valid=False)

        scenario.h3("Minting process")



    sp.add_compilation_target("compilation", BlindGalleryBadge(
            admin = sp.address('tz1ZLedXnXnPbk43LD1sHHG3NMXG7ZveZ1jr'),
            metadata = sp.big_map({
                    "": sp.utils.bytes_of_string("tezos-storage:content"),
                    "content": sp.utils.bytes_of_string("""{"name": "Academy by Blind Gallery Certificates",
                "version": "3.0.0",
                "description": "Academy by Blind Gallery Certificates",
                "interfaces": [ "TZIP-012", "TZIP-016", "TZIP-020", "TZIP-021" ],
                "authors": [ "tz1UdddbVe3icmr5LRP1monxfR13ChsidcoX" ],
                "homepage": "https://academy.blindgallery.xyz/",
                "source": { "tools": [ "SmartPy" ], 
                    "location": "https://github.com/Blind-Gallery" },
                "date": "2022-3-10",
                "tags": [ "NFT" ],
                "language": "en",
                "imageUri": "ipfs://QmNo8oev7t4mgDzHGTZ7rxkiYzQj1jj44F6gPNvUpnJnz4",
                "pictures": [ { "link": "ipfs://QmNo8oev7t4mgDzHGTZ7rxkiYzQj1jj44F6gPNvUpnJnz4", "type": "logo" } ]}""")})
                                            
            )
        )