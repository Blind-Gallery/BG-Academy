"""
Blind Gallery smart contract
"""
import smartpy as sp

#########
# Types #
#########
TZIP16_Metadata_Base = {
    "name": "Blind Gallery Academy",
    "description": "Putting art first. Mint an NFT from a mysterious artist. https://www.blindgallery.xyz",
    "authors": ["tz1UdddbVe3icmr5LRP1monxfR13ChsidcoX"],
    "homepage": "https://academy.blindgallery.xyz/",
    "interfaces": ["TZIP-007-2021-04-17", "TZIP-016-2021-04-17"],
    "imageUri": "ipfs://QmawzWk2y9Q6KYTYBQvRNuRH5KtojgeGPUxUqycaNbvb9z",
    "pictures": [ { "link": "ipfs://QmawzWk2y9Q6KYTYBQvRNuRH5KtojgeGPUxUqycaNbvb9z", "type": "logo" } ]
}

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

        def course_already_exists(self): return self.make("COURSE_ALREADY_EXISTS")
        def course_not_found(self): return self.make("COURSE_NOT_FOUND")
        def course_not_active(self): return self.make("COURSE_NOT_ACTIVE")
        def course_already_active(self): return self.make("COURSE_ALREADY_ACTIVE")
        def course_already_paid(self): return self.make("COURSE_ALREADY_PAID")
        def course_not_paid(self): return self.make("COURSE_NOT_PAID")
        def course_not_owned(self): return self.make("COURSE_NOT_OWNED")
        def course_not_owned_by_user(self): return self.make("COURSE_NOT_OWNED_BY_USER")


@sp.module
def main():
    class Base(sp.Contract):
        """ Base class for Blind Gallery smart contract """

        def __init__(self, name, metadata):
            self.metadata=sp.set_type_expr(
                    metadata, sp.TBigMap(sp.TString, sp.TBytes)),
            self.error_message = Error_message(name)
            self.data.metadata = sp.cast(
                sp.big_map(),
                sp.big_map[sp.string, sp.bytes],
            )


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
        """ PRovide the Courses for Blind Academy 
        """

        def get_course_id_type(self):
            return sp.TNat

    class Academy:
        """ Provide the basics for Blind Academy
        """
        def __init__(self):
            self.update_initial_storage(
                tezosPrice=sp.nat(86), # in usd cents
                courses=sp.map(tkey=self.get_course_id_type(), tvalue=self.get_course_type()),
                user_courses=sp.map(tkey=self.get_user_course_id_type(), tvalue=self.get_user_course_type())
            )

        def get_course_id_type(self):
            return sp.TNat
        
        def get_course_type(self):
            return sp.TRecord(
                name=sp.TString,
                price=sp.TNat, # in usd cents
                is_active=sp.TBool,
                teacher=sp.TAddress,
                teacher_cut=sp.TNat,
            )
        
        def get_user_course_id_type(self):
            return sp.TPair(sp.TAddress, self.get_course_id_type())
        
        def get_user_course_type(self):
            return sp.TRecord(
                is_paid=sp.TBool,
                is_active=sp.TBool,
                soul_bound_token_id=token_id_type
            )
        
        @sp.entry_point
        def create_course(self, params):
            sp.verify(self.is_admin_or_mod(sp.sender),
                    self.error_message.not_admin_or_mod())
            sp.set_type(params.name, sp.TString)
            sp.set_type(params.price, sp.TNat)
            sp.set_type(params.is_active, sp.TBool)
            sp.set_type(params.teacher, sp.TAddress)
            sp.set_type(params.teacher_cut, sp.TNat)

            sp.verify(~self.data.courses.contains(params.id),
                        self.error_message.course_already_exists())
            
            self.data.courses[params.id] = sp.record(
                name=params.name,
                price=params.price,
                is_active=params.is_active,
                teacher=params.teacher,
                teacher_cut=params.teacher_cut
            )

        @sp.entry_point
        def update_course(self, params):
            sp.verify(self.is_admin_or_mod(sp.sender),
                    self.error_message.not_admin_or_mod())
            sp.set_type(params.id, self.get_course_id_type())
            sp.set_type(params.name, sp.TString)
            sp.set_type(params.price, sp.TNat)
            sp.set_type(params.is_active, sp.TBool)
            sp.set_type(params.teacher, sp.TAddress)
            sp.set_type(params.teacher_cut, sp.TNat)
            sp.verify(self.data.courses.contains(params.id),
                        self.error_message.course_not_found())
            
            self.data.courses[params.id].name = params.name
            self.data.courses[params.id].price = params.price
            self.data.courses[params.id].is_active = params.is_active
            self.data.courses[params.id].teacher = params.teacher
            self.data.courses[params.id].teacher_cut = params.teacher_cut

        @sp.entry_point
        def delete_course(self, params):
            sp.verify(self.is_admin_or_mod(sp.sender),
                    self.error_message.not_admin_or_mod())
            sp.set_type(params.id, self.get_course_id_type())
            sp.verify(self.data.courses.contains(params.id),
                        self.error_message.course_not_found())
            
            del self.data.courses[params.id]

        @sp.entry_point
        def update_tezos_price(self, params):
            sp.verify(self.is_admin_or_mod(sp.sender),
                    self.error_message.not_admin_or_mod())
            sp.set_type(params.tezosPrice, sp.TNat)
            self.data.tezosPrice = params.tezosPrice
            
        @sp.entry_point
        def add_course_to_user(self, params):
            sp.verify(self.is_admin_or_mod(sp.sender),
                    self.error_message.not_admin_or_mod())
            sp.set_type(params.course_id, self.get_course_id_type())
            sp.set_type(params.user, sp.TAddress)
            sp.set_type(params.soul_bound_token_id, token_id_type)
            sp.verify(self.data.courses.contains(params.course_id),
                        self.error_message.course_not_found())

            key = sp.local('key', sp.pair(params.user, params.course_id))
            sp.verify(~self.data.user_courses.contains(key.value),
                        self.error_message.course_already_active())
            
            self.data.user_courses[key.value] = sp.record(
                is_paid=False,
                is_active=False,
                soul_bound_token_id=params.soul_bound_token_id
            )

        @sp.entry_point
        def remove_course_from_user(self, params):
            sp.verify(self.is_admin_or_mod(sp.sender),
                    self.error_message.not_admin_or_mod())
            sp.set_type(params.course_id, self.get_course_id_type())
            sp.set_type(params.user, sp.TAddress)
            sp.verify(self.data.courses.contains(params.course_id),
                        self.error_message.course_not_found())

            key = sp.local('key', sp.pair(params.user, params.course_id))
            sp.verify(self.data.user_courses.contains(key.value),
                        self.error_message.course_not_active())
            
            del self.data.user_courses[key.value]

        @sp.entry_point
        def update_soul_bound_token_id(self, params):
            sp.verify(self.is_admin_or_mod(sp.sender),
                    self.error_message.not_admin_or_mod())
            sp.set_type(params.course_id, self.get_course_id_type())
            sp.set_type(params.user, sp.TAddress)
            sp.set_type(params.soul_bound_token_id, token_id_type)
            sp.verify(self.data.courses.contains(params.course_id),
                        self.error_message.course_not_found())

            key = sp.local('key', sp.pair(params.user, params.course_id))
            sp.verify(self.data.user_courses.contains(key.value),
                        self.error_message.course_not_active())
            
            self.data.user_courses[key.value].soul_bound_token_id = params.soul_bound_token_id

        @sp.entry_point
        def buy_course(self, params):
            sp.set_type(params.course_id, self.get_course_id_type())
            sp.verify(self.data.courses.contains(params.course_id),
                        self.error_message.course_not_found())

            key = sp.local('key', sp.pair(sp.sender, params.course_id))
            sp.verify(~self.data.user_courses.contains(key.value),
                        self.error_message.course_already_active())
            # sp.verify(~self.data.user_courses[key.value].is_paid,
            sp.send(blind_gallery_address, sp.amount)
            self.data.user_courses[key.value] = sp.record(
                is_paid=True,
                is_active=True,
                soul_bound_token_id=0
            )

        @sp.entry_point
        def activate_course(self, params):
            sp.verify(self.is_admin_or_mod(sp.sender),
                    self.error_message.not_admin_or_mod())
            sp.set_type(params.course_id, self.get_course_id_type())
            sp.set_type(params.user, sp.TAddress)
            sp.verify(self.data.courses.contains(params.course_id),
                        self.error_message.course_not_found())

            key = sp.local('key', sp.pair(params.user, params.course_id))
            sp.verify(self.data.user_courses.contains(key.value),
                        self.error_message.course_not_active())
            sp.verify(~self.data.user_courses[key.value].is_active,
                        self.error_message.course_already_active())
            
            self.data.user_courses[key.value].is_active = True

        @sp.entry_point
        def deactivate_course(self, params):
            sp.verify(self.is_admin_or_mod(sp.sender),
                    self.error_message.not_admin_or_mod())
            sp.set_type(params.course_id, self.get_course_id_type())
            sp.set_type(params.user, sp.TAddress)
            sp.verify(self.data.courses.contains(params.course_id),
                        self.error_message.course_not_found())

            key = sp.local('key', sp.pair(params.user, params.course_id))
            sp.verify(self.data.user_courses.contains(key.value),
                        self.error_message.course_not_active())
            sp.verify(self.data.user_courses[key.value].is_active,
                        self.error_message.course_already_active())
            
            self.data.user_courses[key.value].is_active = False

    class BlindGallery(Admin, ChangeMetadata, Academy, Base):
        def __init__(self, admin, metadata, **kwards):
            Base.__init__(self, "BLIND_GALLERY_", metadata)
            Admin.__init__(self, admin)
            Academy.__init__(self)
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
        teacher1 = sp.test_account("Teacher1")
        teacher2 = sp.test_account("Teacher2")
        teacher3 = sp.test_account("Teacher3")
        scenario.show([alice, bob, tomas, pedro])

        METADATA = sp.utils.metadata_of_url("ipfs://example")
        scenario = sp.test_scenario("FA12", main)
        c1 = main.BlindGallery(admin=admin.address, metadata=METADATA)
        scenario += c1

        scenario.h2("Add moderators")
        scenario += c1.add_moderator(moderator=mod1.address, name="mod1").run(sender=admin)
        scenario += c1.add_moderator(moderator=mod2.address, name="mod2").run(sender=admin)

        scenario.h2("Set metadata")
        scenario += c1.set_metadata(METADATA).run(sender=admin)

        scenario.h2("Create courses")
        scenario += c1.create_course(
            id=1,
            name="Course 1",
            price=100,
            is_active=True,
            teacher=teacher1.address,
            teacher_cut=10
        ).run(sender=admin)
        scenario += c1.create_course(
            id=2,
            name="Course 2",
            price=200,
            is_active=True,
            teacher=teacher2.address,
            teacher_cut=70
        ).run(sender=admin)
        scenario += c1.create_course(
            id=3,
            name="Course 3",
            price=300,
            is_active=True,
            teacher=teacher3.address,
            teacher_cut=50
        ).run(sender=admin)

        scenario.h2("Update courses")
        scenario += c1.update_course(
            id=1, 
            name="Course 1 updated", 
            price=100, 
            is_active=True,
            teacher=teacher1.address,
            teacher_cut=10
            ).run(sender=admin)
        scenario += c1.update_course(
            id=2, 
            name="Course 2 updated", 
            price=200,
            is_active=True,
            teacher=teacher2.address,
            teacher_cut=70
            ).run(sender=admin)

        scenario.h2("Update tezos price")
        scenario += c1.update_tezos_price(tezosPrice=89).run(sender=admin)

        scenario.h2("Add courses")
        scenario += c1.add_course_to_user(course_id=1, user=alice.address, soul_bound_token_id=1).run(sender=admin)
        scenario += c1.add_course_to_user(course_id=1, user=bob.address, soul_bound_token_id=2).run(sender=admin)

        scenario.h2("Buy courses")
        scenario += c1.buy_course(course_id=2).run(sender=tomas, amount=sp.tez(20))
        scenario += c1.buy_course(course_id=2).run(sender=pedro, amount=sp.tez(20))

        scenario.h2("Update soul bound token id")
        scenario += c1.update_soul_bound_token_id(course_id=1, user=alice.address, soul_bound_token_id=1).run(sender=admin)
        scenario += c1.update_soul_bound_token_id(course_id=1, user=bob.address, soul_bound_token_id=2).run(sender=admin)

        scenario.h2("Deactivate courses")
        scenario += c1.deactivate_course(course_id=1, user=alice.address).run(sender=admin)
        scenario += c1.deactivate_course(course_id=1, user=bob.address).run(sender=admin)

        scenario.h2("Activate courses")
        scenario += c1.activate_course(course_id=1, user=alice.address).run(sender=admin)
        scenario += c1.activate_course(course_id=1, user=bob.address).run(sender=admin)

        scenario.h2("Remove courses")
        scenario += c1.remove_course_from_user(course_id=1, user=alice.address).run(sender=admin)
        scenario += c1.remove_course_from_user(course_id=1, user=bob.address).run(sender=admin)

        scenario.h2("Delete courses")
        scenario += c1.delete_course(id=1).run(sender=admin)
        scenario += c1.delete_course(id=2).run(sender=bob, valid=False)
        scenario += c1.delete_course(id=2).run(sender=admin)
