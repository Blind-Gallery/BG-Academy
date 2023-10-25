"""
Blind Gallery smart contract
"""
import smartpy as sp

#########
# Types #
#########

token_id_type = sp.TNat
moderator_type = sp.TAddress
moderator_name_type = sp.TString
burn = sp.address('tz1burnburnburnburnburnburnburjAYjjX')
blind_gallery_address = sp.address('tz1UdddbVe3icmr5LRP1monxfR13ChsidcoX')
fxhash_treasury = sp.address('tz1dtzgLYUHMhP6sWeFtFsHkHqyPezBBPLsZ')

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


class Error_message:
    """ Error message class """

    def __init__(self, prefix):
        self.prefix = prefix

    # HELPER
    def make(self, s): return (self.prefix + s)

    # BALANCE ERRORS
    def insufficient_balance(self): return self.make("INSUFFICIENT_BALANCE")
    def incorrect_purchase_value(self): return self.make(
        "INCORRECT_PURCHASE_VALUE")

    def token_undefined(self): return self.make("TOKEN_UNDEFINED")

    # AUTHORITY ERRORS
    def not_admin(self): return self.make("NOT_ADMIN")
    def not_admin_or_mod(self): return self.make("NOT_ADMIN_OR_MOD")
    def not_admin_or_operator(self): return self.make("NOT_ADMIN_OR_OPERATOR")
    def not_operator(self): return self.make("NOT_OPERATOR")
    def not_owner(self): return self.make("NOT_OWNER")

    def action_not_allowed(self): return self.make("ACTION_NOT_ALLOWED")

    # CONTRACT BREAKPOINTS
    def paused(self): return self.make("PAUSED")
    def not_in_presale(self): return self.make("NOT_IN_PRESALE")
    def presale_old_out(self): return self.make("PRESALE_OLD_OUT")
    def not_on_sale(self): return self.make("NOT_ON_SALE")
    def insufficient_supply(self): return self.make("INSUFFICIENT_SUPPLY")
    def not_in_collection(self): return self.make("NOT_IN_COLLECTION")
    def sold_out(self): return self.make("SOLD_OUT")
    def token_already_registered(self): return self.make(
        "TOKEN_ALREADY_REGISTERED")
    def not_on_allow_list(self): return self.make("NOT_ON_ALLOW_LIST")
    def insufficient_allow_list(self): return self.make("INSUFFICIENT_ALLOW_LIST")

    def collection_not_found(self): return self.make("COLLECTION_NOT_FOUND")
    def collection_overflow(self): return self.make("COLLECTION_OVERFLOW")
    def token_not_found(self): return self.make("TOKEN_NOT_FOUND")


class Batch_transfer:
    def get_transfer_type(self):
        tx_type = sp.TRecord(to_=sp.TAddress,
                             token_id=token_id_type,
                             amount=sp.TNat)

        transfer_type = sp.TRecord(from_=sp.TAddress,
                                   txs=sp.TList(tx_type)).layout(
                                       ("from_", "txs"))
        return transfer_type

    def get_type(self):
        return sp.TList(self.get_transfer_type())

    def item(self, from_, txs):
        v = sp.record(from_=from_, txs=txs)
        return sp.set_type_expr(v, self.get_transfer_type())


class Base(sp.Contract):
    """ Base class for Blind Gallery smart contract """

    def __init__(self, name, metadata):
        self.init(
            metadata=sp.set_type_expr(
                metadata, sp.TBigMap(sp.TString, sp.TBytes)),
        )
        self.error_message = Error_message(name)
        self.batch_transfer = Batch_transfer()
        offchain_views = []
        for f in dir(self):
            attr = getattr(self, f)
            if isinstance(attr, sp.OnOffchainView):
                if attr.kind == "offchain":
                    offchain_views.append(attr)
        # metadata["views"] = offchain_views
        self.generate_contract_metadata("metadata_base", metadata)

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
        self.init_metadata(filename, metadata_base)

    def fa2_transfer(self, fa2, from_, to_, token_id, amount):
        c = sp.contract(sp.TList(sp.TRecord(from_=sp.TAddress, txs=sp.TList(sp.TRecord(amount=sp.TNat, to_=sp.TAddress,
                        token_id=sp.TNat).layout(("to_", ("token_id", "amount")))))), fa2, entry_point='transfer').open_some()
        sp.transfer(sp.list([sp.record(from_=from_, txs=sp.list(
            [sp.record(amount=amount, to_=to_, token_id=token_id)]))]), sp.mutez(0), c)


class Admin:
    """ Provide the basics for having an administrator in the contract.

    Adds an `administrator` attribute in the storage record. Provides a
    `set_administrator` entrypoint. Provides a `is_administrator` meta-
    programming function.
    """

    def __init__(self, administrator):
        self.update_initial_storage(
            administrator=administrator,
            moderators=sp.map(tkey=moderator_type, tvalue=moderator_name_type)
        )

    def is_administrator(self, sender):
        return sender == self.data.administrator

    @sp.entry_point
    def set_administrator(self, params):
        """(Admin only) Set the contract administrator."""
        sp.verify(self.is_administrator(sp.sender), message="FA2_NOT_ADMIN")
        self.data.administrator = params

    def is_admin_or_mod(self, address):
        auth = sp.local('auth', sp.bool(False))
        with sp.if_(self.is_administrator(address)):
            auth.value = True
        with sp.if_(self.data.moderators.contains(address)):
            auth.value = True
        return auth.value

    @sp.entry_point
    def add_moderator(self, params):
        sp.verify(self.is_administrator(sp.sender),
                  message="NOT_ADMIN")
        sp.set_type(params.moderator, moderator_type)
        sp.set_type(params.name, moderator_name_type)

        self.data.moderators[params.moderator] = params.name

    @sp.entry_point
    def remove_moderator(self, params):
        sp.verify(self.is_administrator(sp.sender),
                  message="NOT_ADMIN")
        sp.set_type(params.moderator, moderator_type)

        del self.data.moderators[params.moderator]


class ChangeMetadata:
    """Provide an entrypoint to change contract metadata.

    Requires the `Admin` mixin.
    """

    @sp.entry_point
    def set_metadata(self, metadata):
        """(Admin only) Set the contract metadata."""
        sp.verify(self.is_admin_or_mod(sp.sender),
                  message=self.error_message.not_admin_or_mod())
        self.data.metadata = metadata

class Courses:
    """ Provide the basics for Courses
    """

    def __init__(self):
        self.update_initial_storage(
            TezosPrice=sp.tez(1.41)
        )

    
    @sp.entry_point
    def update_tezos_price(self, params):
        sp.verify(self.is_admin_or_mod(sp.sender),
                  self.error_message.not_admin_or_mod())
        1

    @sp.entry_point
    def add_course(self, params):
        sp.verify(self.is_admin_or_mod(sp.sender),
                  self.error_message.not_admin_or_mod())
        1

    @sp.entry_point
    def remove_course(self, params):
        sp.verify(self.is_admin_or_mod(sp.sender),
                  self.error_message.not_admin_or_mod())
        1

    @sp.entry_point
    def update_course(self, params):
        sp.verify(self.is_admin_or_mod(sp.sender),
                  self.error_message.not_admin_or_mod())
        1

    @sp.entry_point
    def buy_course(self, params):
        1

    
class ExchangeObjkt:
    """ Provide the basics for having an exchange in the contract.

    Requires the `Admin` mixin.
    """
    def __init__(self):
        """ # Initialize the storage with the fxhash data.

        The objkt data is stored in a map of maps. The first map is the list of mint passes,
        the second map is the collection. The value is the maximum amount of tokens in the collection.

        Objkt states related to the time of sale, as if its on sale, presale or not for sale.
        It links to a number as: 0 = not for sale, 1 = on sale, 2 = presale
        """
        self.update_initial_storage(
            ObjktMintPass=sp.map(tkey=sp.TNat, tvalue=sp.TAddress),
            ObjktSupply=sp.map(tkey=sp.TString, tvalue=sp.TNat),
            ObjktAllowList=sp.map(tkey=sp.TAddress, tvalue=sp.TNat),
            ObjktCollections=sp.map(tkey=sp.TString, tvalue=sp.TNat),
            ObjktExchanges=sp.map(tkey=sp.TNat, tvalue=sp.TAddress),
            ObjktLastExchange=sp.nat(0),
            ObjktPrice=sp.tez(0),
            ObjktPresalePrice=sp.tez(0),
            ObjktState=sp.nat(0),
            ObjktPriceSplit=sp.map(tkey=sp.TAddress, tvalue=sp.TNat)
        )
        

    @sp.entry_point
    def configureObjkt(self, batch):
        """ only moderators can configure the objkt storage """
        sp.set_type(
            batch,
            sp.TList(
                sp.TRecord(
                    edition=sp.TString,
                    config=sp.TVariant(
                        add_collection=sp.TRecord(
                            collection=sp.TString, cap=sp.TNat).layout(("collection", "cap")),
                        set_cap=sp.TRecord(collection=sp.TString, cap=sp.TNat).layout(
                            ("collection", "cap")),
                        remove_collection=sp.TString,
                        add_mint_passes=sp.TMap(sp.TNat, sp.TAddress),
                        remove_mint_passes=sp.TMap(sp.TNat, sp.TAddress),
                        add_allow_list=sp.TRecord(address=sp.TAddress, amount=sp.TNat).layout(("address", "amount")),
                        remove_allow_list=sp.TAddress,
                        set_price=sp.TMutez,
                        set_presale_price=sp.TMutez,
                        set_state=sp.TNat,
                        add_price_split=sp.TRecord(address=sp.TAddress, amount=sp.TNat).layout(("address", "amount")),
                        remove_price_split=sp.TAddress
                    )
                )
            )
        )
        sp.verify(self.is_admin_or_mod(sp.sender),
                  self.error_message.not_admin_or_mod())
        with sp.for_("action", batch) as action:
            with action.config.match_cases() as arg:
                with arg.match("add_collection") as new_collection:
                    self.data.ObjktSupply[new_collection.collection] = new_collection.cap
                    self.data.ObjktCollections[new_collection.collection] = sp.nat(
                        0)

                with arg.match("remove_collection") as collection:
                    del self.data.ObjktSupply[collection]
                    del self.data.ObjktCollections[collection]

                with arg.match("add_mint_passes") as mint_passes:
                    with sp.for_("token_id", mint_passes.keys()) as token_id:
                        self.data.ObjktMintPass[token_id] = mint_passes[token_id]

                with arg.match("remove_mint_passes") as mint_passes:
                    with sp.for_("token_id", mint_passes.keys()) as token_id:
                        del self.data.ObjktMintPass[token_id]

                with arg.match("add_allow_list") as allow_list:
                    self.data.ObjktAllowList[allow_list.address] = allow_list.amount

                with arg.match("remove_allow_list") as address:
                    del self.data.ObjktAllowList[address]

                with arg.match("set_cap") as info:
                    self.data.ObjktSupply[info.collection] = info.cap

                with arg.match("set_price") as price:
                    self.data.ObjktPrice = price

                with arg.match("set_state") as state:
                    self.data.ObjktState = state
                
                with arg.match("set_presale_price") as price:
                    self.data.ObjktPresalePrice = price

                with arg.match("add_price_split") as split:
                    self.data.ObjktPriceSplit[split.address] = split.amount

                with arg.match("remove_price_split") as address:
                    del self.data.ObjktPriceSplit[address]

    @sp.entry_point()
    def exchangeObjkt(self, params):
        sp.set_type(params, sp.TVariant(
            without_mint_pass=sp.TRecord(amount=sp.TNat, 
                                         collection=sp.TString),
        ))

        with params.match_cases() as arg:
            with arg.match("without_mint_pass") as without_mint_pass:
                sp.verify(self.data.ObjktState > sp.nat(0),
                          self.error_message.not_on_sale())
                
                sp.verify(self.data.ObjktSupply[without_mint_pass.collection] >= without_mint_pass.amount,
                          self.error_message.sold_out())
                # sp.verify(self.data.FXcollections.contains(sp.snd(without_mint_pass.collection)),
                #   self.error_message.collection_not_found())
                
                with sp.if_(self.data.ObjktState == sp.nat(1)):
                    # sale
                    total_cost = sp.utils.mutez_to_nat(self.data.ObjktPrice) * without_mint_pass.amount
                    sp.verify(sp.utils.mutez_to_nat(sp.amount) == total_cost, self.error_message.insufficient_balance())

                with sp.if_(self.data.ObjktState == sp.nat(2)):
                    # presale
                    # check whitelist
                    sp.verify(self.data.ObjktAllowList.contains(sp.sender), self.error_message.not_on_allow_list())
                    sp.verify(self.data.ObjktAllowList[sp.sender] >= without_mint_pass.amount, self.error_message.insufficient_allow_list())

                    self.data.ObjktAllowList[sp.sender] = sp.as_nat(self.data.ObjktAllowList[sp.sender] - without_mint_pass.amount) 

                    # calculate cost
                    total_cost = sp.utils.mutez_to_nat(self.data.ObjktPresalePrice) * without_mint_pass.amount
                    sp.verify(sp.utils.mutez_to_nat(sp.amount) == total_cost, self.error_message.insufficient_balance())
                    

                sp.for x in sp.range(0, without_mint_pass.amount):
                    self.data.ObjktExchanges[self.data.ObjktCollections[without_mint_pass.collection]] = sp.sender
                    self.data.ObjktCollections[without_mint_pass.collection] = self.data.ObjktCollections[without_mint_pass.collection] + sp.nat(1)
                    # self.data.ObjktExchanges[self.data.ObjktLastExchange] = sp.sender
                    self.data.ObjktLastExchange = self.data.ObjktLastExchange + sp.nat(1)
                    
                    self.data.ObjktSupply[without_mint_pass.collection] = abs(self.data.ObjktSupply.get(
                        without_mint_pass.collection, sp.nat(0)) - sp.nat(1))

        sp.for item in self.data.ObjktPriceSplit.items():
            sp.send(item.key, sp.split_tokens(sp.amount, item.value, 100))

    @sp.entry_point()
    def reset(self, params):
        sp.set_type(params.collection, sp.TString)
        sp.verify(sp.sender == self.data.administrator,
                  self.error_message.not_admin())

        sp.for item in self.data.ObjktExchanges.items():
            del self.data.ObjktExchanges[item.key]

        self.data.ObjktLastExchange = sp.nat(0)


    @sp.entry_point()
    def airdropObjkt(self, params):
        sp.set_type(params.address, sp.TAddress)
        sp.set_type(params.amount, sp.TNat)
        sp.set_type(params.collection, sp.TString)

        sp.verify(self.is_admin_or_mod(sp.sender),
                  self.error_message.not_admin_or_mod())
        
        sp.for x in sp.range(0, params.amount):
            self.data.ObjktExchanges[self.data.ObjktCollections[params.collection]] = params.address
            self.data.ObjktCollections[params.collection] = self.data.ObjktCollections[params.collection] + sp.nat(1)
            # self.data.ObjktExchanges[self.data.ObjktLastExchange] = sp.sender
            self.data.ObjktLastExchange = self.data.ObjktLastExchange + sp.nat(1)
                    
            self.data.ObjktSupply[params.collection] = abs(self.data.ObjktSupply.get(
                        params.collection, sp.nat(0)) - sp.nat(1))


class BlindGallery(Admin, ChangeMetadata, ExchangeObjkt, Base):
    def __init__(self, admin, metadata, **kwards):
        Base.__init__(self, "BLIND_GALLERY_", metadata)
        Admin.__init__(self, admin)
        ExchangeObjkt.__init__(self)
        ChangeMetadata.__init__(self)


if "templates" not in __name__:
    @sp.add_test(name="Blind gallery")
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

        METADATA = sp.utils.metadata_of_url("ipfs://example")

        c1 = BlindGallery(admin=admin.address, metadata=METADATA)
        scenario += c1

    sp.add_compilation_target("compilation", BlindGallery(
        admin=sp.address('tz1ZLedXnXnPbk43LD1sHHG3NMXG7ZveZ1jr'),
        metadata=sp.big_map({
            "": sp.utils.bytes_of_string("tezos-storage:content"),
            "content": sp.utils.bytes_of_string("""{"name": "Blind Gallery",
                "version": "3.0.0",
                "description": "Putting art first. Mint an NFT from a mysterious artist. https://www.blindgallery.xyz",
                "interfaces": [ "TZIP-012", "TZIP-016", "TZIP-020", "TZIP-021" ],
                "authors": [ "tz1UdddbVe3icmr5LRP1monxfR13ChsidcoX" ],
                "homepage": "https://www.blindgallery.xyz",
                "source": { "tools": [ "SmartPy" ], 
                    "location": "https://github.com/Blind-Gallery" },
                "date": "2022-3-10",
                "tags": [ "NFT", "cleanNFTs", "Renewable Energies", "Blind Gallery" ],
                "language": "en",
                "imageUri": "ipfs://QmawzWk2y9Q6KYTYBQvRNuRH5KtojgeGPUxUqycaNbvb9z",
                "pictures": [ { "link": "ipfs://QmawzWk2y9Q6KYTYBQvRNuRH5KtojgeGPUxUqycaNbvb9z", "type": "logo" } ]}""")})

    )
    )