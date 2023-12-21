import smartpy as sp

# GLOBAL VARIABLE TYPE
token_id_type = sp.TNat
moderator_type = sp.TAddress
moderator_name_type = sp.TString
burn = sp.address('tz1burnburnburnburnburnburnburjAYjjX')


class Error_message:
    def __init__(self, prefix):
        self.prefix = prefix

    # HELPER
    def make(self, s)                 : return (self.prefix + s)

    # BALANCE ERRORS
    def insufficient_balance(self)    : return self.make("INSUFFICIENT_BALANCE")
    def incorrect_purchase_value(self): return self.make("INCORRECT_PURCHASE_VALUE")

    def token_undefined(self)         : return self.make("TOKEN_UNDEFINED")

    # AUTHORITY ERRORS
    def not_admin(self)               : return self.make("NOT_ADMIN")
    def not_admin_or_mod(self)        : return self.make("NOT_ADMIN_OR_MOD")
    def not_admin_or_operator(self)   : return self.make("NOT_ADMIN_OR_OPERATOR")
    def not_operator(self)            : return self.make("NOT_OPERATOR")
    def not_owner(self)               : return self.make("NOT_OWNER")

    def action_not_allowed(self)      : return self.make("ACTION_NOT_ALLOWED")

    # CONTRACT BREAKPOINTS
    def paused(self)                  : return self.make("PAUSED")
    def not_in_presale(self)          : return self.make("NOT_IN_PRESALE")
    def presale_old_out(self)         : return self.make("PRESALE_OLD_OUT")
    def not_in_collection(self)       : return self.make("NOT_IN_COLLECTION")

class Batch_metadata:
    def set_token_metadata_view(self):
        def token_metadata(self, tok):
            """
            Return the token-metadata URI for the given token.
            For a reference implementation, dynamic-views seem to be the
            most flexible choice.
            """
            sp.set_type(tok, sp.TNat)
            sp.result(self.data.token_metadata[tok])

        self.token_metadata = sp.offchain_view(pure = True, doc = "Get Token Metadata")(token_metadata)

    @sp.entry_point
    def update_token_metadata(self, params):
        # not check for pause cuz this is kinda just for bkground
        sp.verify(self.is_administrator(sp.sender), message = self.error_message.not_admin())

        sp.for token_id in params.token_metadata.keys():
            sp.if self.data.token_metadata.contains(token_id):
                self.data.token_metadata[token_id] = sp.record(token_id = token_id, 
                                                            token_info = params.token_metadata[token_id])

    def get_type(self):
        return sp.TRecord(
            token_id = sp.TNat,
            token_info = sp.TMap(sp.TString, sp.TBytes)
        ).layout(( "token_id", "token_info"))


class Balances:
    
    def get_key_type(self):
        return sp.TAddress

    def get_value_type(self):
        return sp.TMap(token_id_type, sp.TNat)

    def get_empty_value_type(self):
        return sp.map(l = {}, tkey = token_id_type, tvalue = sp.TNat)

    def make(self, token_id, amount):
        return sp.map(l = {token_id: amount}, tkey = token_id_type, tvalue = sp.TNat)


class SBT_core(sp.Contract):
    def __init__(self, admin, metadata, **extra_storage):
        self.error_message    = Error_message("BLIND_GALLERY_BATCH_")
        self.token_metadata  = Batch_metadata()
        self.balances        = Balances()

        self.init(
            administrator = admin,
            moderators = sp.map(tkey = moderator_type, tvalue = moderator_name_type),
            paused = False,
            metadata = metadata,
            token_metadata = sp.big_map(tkey = sp.TNat, tvalue = self.token_metadata.get_type()),
            token_index = sp.nat(0),
            balances = sp.big_map(tkey = self.balances.get_key_type(), tvalue = self.balances.get_value_type()),
            token_supply = sp.big_map(tkey = token_id_type, tvalue = sp.TNat),
            **extra_storage
            )

    def is_paused(self):
        return self.data.paused

    def is_presale(self):
        return self.data.presale

    def is_administrator(self, sender):
        return sender == self.data.administrator

    def is_admin_or_mod(self, address):

        auth = sp.local('auth', sp.bool(False))

        with sp.if_ ( self.is_administrator(address) ):
            auth.value = True

        with sp.if_ ( self.data.moderators.contains(address) ):
            auth.value = True

        return auth.value

    def fa2_transfer(self, fa2, from_, to_, token_id, amount):
        c = sp.contract(sp.TList(sp.TRecord(from_=sp.TAddress, txs=sp.TList(sp.TRecord(amount=sp.TNat, to_=sp.TAddress, token_id=sp.TNat).layout(("to_", ("token_id", "amount")))))), fa2, entry_point='transfer').open_some()
        sp.transfer( sp.list([sp.record(from_=from_, txs=sp.list([sp.record(amount=amount, to_=to_, token_id=token_id)]))]), sp.mutez(0), c)

    ################################################                   
    #                ADMINISTRATION
    ################################################

    @sp.entry_point
    def set_administrator(self, params):
        sp.verify(self.is_administrator(sp.sender), message = self.error_message.not_admin())
        sp.set_type(params.administrator, moderator_type)

        self.data.administrator = params.administrator
        

    @sp.entry_point
    def add_moderator(self, params):
        sp.verify(self.is_administrator(sp.sender), message = self.error_message.not_admin())
        sp.set_type(params.moderator, moderator_type)
        sp.set_type(params.name, moderator_name_type)

        self.data.moderators[params.moderator] = params.name
        
    @sp.entry_point
    def remove_moderator(self, params):
        sp.verify(self.is_administrator(sp.sender), message = self.error_message.not_admin())
        sp.set_type(params.moderator, moderator_type)

        del self.data.moderators[params.moderator]

    @sp.entry_point
    def set_pause(self, params):
        sp.verify(self.is_admin_or_mod(sp.sender), message = self.error_message.not_admin_or_mod())
        self.data.paused = params.is_paused

class SBT_g(SBT_core):
    @sp.entry_point
    def issue(self, params):
        sp.set_type(params.metadata, sp.TMap(sp.TString, sp.TBytes))
        sp.verify(self.is_admin_or_mod(sp.sender), self.error_message.not_admin_or_mod())
        self.data.token_metadata[self.data.token_index] = sp.record(
                token_id    = self.data.token_index,
                token_info  = params.metadata
        )
        self.data.token_index += sp.nat(1)

    @sp.entry_point
    def mint(self, params):
        sp.set_type(params, sp.TRecord(address = sp.TAddress, index = token_id_type, value = sp.TNat))
        sp.verify(self.is_admin_or_mod(sp.sender), self.error_message.not_admin_or_mod())

        with sp.if_( self.data.balances.contains(params.address)):
            with sp.if_( self.data.balances[params.address].contains(params.index)):
                self.data.balances[params.address][params.index] += params.value
            with sp.else_():
                self.data.balances[params.address][params.index] = params.value
        with sp.else_():
            self.data.balances[params.address] = self.balances.make(params.index, params.value) 


        with sp.if_( self.data.token_supply.contains(params.index)):
            self.data.token_supply[params.index] += params.value
        with sp.else_():
            self.data.token_supply[params.index] = params.value 

    @sp.entry_point
    def burn(self, params):
        sp.set_type(params, sp.TRecord(address = sp.TAddress, index = token_id_type, value = sp.TNat))
        sp.verify(self.is_admin_or_mod(sp.sender), self.error_message.not_admin_or_mod())

class SBT(SBT_g, SBT_core):
    @sp.offchain_view(pure = True)
    def does_token_exist(self, tok):
        "Ask whether a token ID is exists."
        sp.set_type(tok, sp.TNat)
        sp.result(self.data.token_metadata.contains(tok))

    @sp.offchain_view()
    def token_metadata(self, token_id):
        """Returns the token-metadata URI for the given token."""
        sp.result(self.data.token_metadata[token_id])

    @sp.offchain_view(pure = True)
    def token_supply(self, tok):
        """Returns the total supply of a token."""
        sp.result(self.data.token_supply[tok])

    @sp.offchain_view(pure = True)
    def user_tokens(self, address):
        """Returns the balances of a given user"""
        sp.result(self.data.balances[address])

    def __init__(self, admin, metadata):
        list_of_views = [
            self.does_token_exist
            , self.token_supply
            , self.user_tokens
            , self.token_metadata
        ]
        
        SBT_core.__init__(self, admin, metadata)

################################################                   
#        TESTS AND COMPILATION TARGET
################################################

if "templates" not in __name__:
    @sp.add_test(name = "Soul bound tokens")
    def test():
        scenario = sp.test_scenario()
        scenario.h1("Soul bound tokens test")

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
        
        scenario.h2("Soul Bound Tokens Smart Contract")
        
        c1 = SBT(
            admin = admin.address,
            metadata = sp.utils.metadata_of_url("ipfs://QmS7W3Npt8pFkMNn1pUHFQPtt5PoxAYi3CTgvsgWVc1i2Z"))
        
        scenario += c1

        scenario.h2("Set up contract administrator and moderators")

        scenario.h3("Add moderators to the smart - contract")

        scenario += c1.add_moderator(moderator = mod1.address, name = 'mod1').run(sender = admin)
        scenario += c1.add_moderator(moderator = mod2.address, name = 'mad mod2').run(sender = admin)
        scenario += c1.add_moderator(moderator = tomas.address, name = 'el gato tomas').run(sender = admin)
        

        scenario.h3("Remove moderators to the smart - contract")

        scenario += c1.remove_moderator(moderator = mod2.address).run(sender = admin)

        scenario.h3("Only admin can add or remove moderators to the smart - contract")

        scenario += c1.add_moderator(moderator = mod2.address, name = 'mad mod2').run(sender = mod1, valid = False)
        scenario += c1.remove_moderator(moderator = tomas.address).run(sender = mod1, valid = False)


        scenario.h2("Pause the contract")

        scenario.h3("Only mods or admin can pause")

        scenario += c1.set_pause(is_paused = True).run(sender = admin)
        scenario += c1.set_pause(is_paused = False).run(sender = mod1)
        scenario += c1.set_pause(is_paused = True).run(sender = tomas)

        scenario += c1.set_pause(is_paused = False).run(sender = alice, valid = False)

        scenario.h2("Issue tokens")

        scenario.h3("Only mods or admin can issue tokens")
        
        scenario += c1.issue(metadata = {'': sp.utils.bytes_of_string('Soul bound token 1')}).run(sender = admin)
        scenario += c1.issue(metadata = {'': sp.utils.bytes_of_string('Soul bound token 2')}).run(sender = mod1)
        scenario += c1.issue(metadata = {'': sp.utils.bytes_of_string('Soul bound token 3')}).run(sender = tomas)
        scenario += c1.issue(metadata = {'': sp.utils.bytes_of_string('Soul bound token 4')}).run(sender = alice, valid = False)

        scenario.h2("Mint tokens")

        scenario.h3("Only mods or admin can mint tokens")

        scenario += c1.mint(sp.record(address = alice.address, index = 0, value = 10)).run(sender = admin)
        scenario += c1.mint(sp.record(address = bob.address, index = 1, value = 20)).run(sender = mod1)

        scenario += c1.mint(sp.record(address = bob.address, index = 0, value = 10)).run(sender = admin)
        scenario += c1.mint(sp.record(address = alice.address, index = 1, value = 20)).run(sender = mod1)

        scenario += c1.mint(sp.record(address = alice.address, index = 2, value = 10)).run(sender = tomas)
        scenario += c1.mint(sp.record(address = bob.address, index = 2, value = 20)).run(sender = alice, valid = False)


        

    sp.add_compilation_target("compilation", SBT(
            admin = sp.address('tz1ZLedXnXnPbk43LD1sHHG3NMXG7ZveZ1jr'),
            metadata = sp.big_map({
                    "": sp.utils.bytes_of_string("tezos-storage:content"),
                    "content": sp.utils.bytes_of_string("""{"name": "Blind Gallery Soul Bound Certificates",
                "version": "3.0.0",
                "description": "Blind gallery soul bound certificates",
                "interfaces": [ "TZIP-012", "TZIP-016", "TZIP-020", "TZIP-021" ],
                "authors": [ "kaloh", "tlalocman", "crissthiandi", "datzel"],
                "homepage": "https://www.blindgallery.xyz",
                "source": { "tools": [ "SmartPy" ], 
                    "location": "https://github.com/Blind-Gallery" },
                "date": "2022-3-10",
                "tags": [ "NFT"],
                "language": "en",
                "pictures": [ { "link": "ipfs://QmawzWk2y9Q6KYTYBQvRNuRH5KtojgeGPUxUqycaNbvb9z", "type": "logo" } ]}""")})
                                            
            )
        )