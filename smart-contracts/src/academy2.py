import smartpy as sp

# This is the SmartPy editor.
# You can experiment with SmartPy by loading a template.
# (in the Commands menu above this editor)
#
# A typical SmartPy program has the following form:
TZIP16_Metadata_Base = {
    "name": "Blind Gallery Academy",
    "description": "Putting art first. Mint an NFT from a mysterious artist. https://www.blindgallery.xyz",
    "authors": ["tz1UdddbVe3icmr5LRP1monxfR13ChsidcoX"],
    "homepage": "https://academy.blindgallery.xyz/",
    "interfaces": ["TZIP-007-2021-04-17", "TZIP-016-2021-04-17"],
    "imageUri": "ipfs://QmawzWk2y9Q6KYTYBQvRNuRH5KtojgeGPUxUqycaNbvb9z",
    "pictures": [ { "link": "ipfs://QmawzWk2y9Q6KYTYBQvRNuRH5KtojgeGPUxUqycaNbvb9z", "type": "logo" } ]
}

METADATA_CID = 'ipfs://QmT9RrZtLX9qJH6kCQLkD8TwsQTbfXyd9wvubCCji6xSHT'

token_id_type = sp.nat
moderator_type = sp.address
moderator_name_type = sp.string
burn = sp.address('tz1burnburnburnburnburnburnburjAYjjX')
blind_gallery_address = sp.address('tz1UdddbVe3icmr5LRP1monxfR13ChsidcoX')
fxhash_treasury = sp.address('tz1dtzgLYUHMhP6sWeFtFsHkHqyPezBBPLsZ')


@sp.module
# types definition
def types():
    course_key: type = sp.nat
    course: type = sp.record(
        name=sp.string,
        price=sp.nat,
        is_active=sp.bool,
        teacher=sp.address,
        teacher_cut=sp.nat,
    )
    course_map: type = sp.map[course_key, course]
    user_course_key: type = sp.pair[sp.address, sp.nat]
    user_course: type = sp.record(
        is_active=sp.bool,
        is_paid=sp.bool,
        soul_bound_token_id=sp.nat,
    )
    user_courses_map: type = sp.map[user_course_key, user_course]
    blind_gallery_address = sp.address('tz1UdddbVe3icmr5LRP1monxfR13ChsidcoX')

    
# A SmartPy module
@sp.module
def main():

    class AdminInterface(sp.Contract):
        """ Provide the basics for having an administrator in the contract.

        Adds an `administrator` attribute in the storage record. Provides a
        `set_administrator` entrypoint. Provides a `is_administrator` meta-
        programming function.
        """

        def __init__(self, administrator):
            self.data.administrator=administrator
            self.data.moderators={
                sp.address('tz1XvjDEbTFgowT11uEyPM6rbbZ48zD3PsWm'): 'Backend Service'
            }

        @sp.private(with_storage="read-only")
        def is_administrator_(self, sender):
            return sender == self.data.administrator

        @sp.private(with_storage="read-only")
        def is_admin_or_mod(self, address):
            sp.cast(address, sp.address)
            auth = False
            if address == self.data.administrator:
                auth = True
            if self.data.moderators.contains(address):
                auth = True
            return auth
        
        @sp.entrypoint
        def set_administrator(self, params):
            """(Admin only) Set the contract administrator."""
            assert self.is_administrator_(sp.sender), "USER_NOT_AUTHORIZED"
            self.data.administrator = params

        @sp.onchain_view()
        def get_administrator(self):
            return self.data.administrator
        
        @sp.entrypoint
        def add_moderator(self, params):
            sp.cast(params, sp.record(moderator=sp.address, name=sp.string),)
            assert self.is_administrator_(sp.sender), "USER_NOT_AUTHORIZED"
            self.data.moderators = sp.update_map(params.moderator, sp.Some(params.name), self.data.moderators)

        @sp.entrypoint
        def remove_moderator(self, params):
            sp.cast(params.moderator, sp.address)
            assert self.is_administrator_(sp.sender), "USER_NOT_AUTHORIZED"

            del self.data.moderators[params.moderator]

    class Academy(AdminInterface):
        def __init__(self, administrator, metadata):
            AdminInterface.__init__(self, administrator)
            self.data.metadata = metadata
            self.data.courses = sp.cast({},types.course_map)
            self.data.course_count = sp.nat(0)
            self.data.user_courses = sp.cast({},types.user_courses_map)

        @sp.entrypoint
        def create_course(self, params):
            sp.cast(params, sp.record(
                name=sp.string,
                price=sp.nat,
                teacher=sp.address,
                teacher_cut=sp.nat
                ))
            assert self.is_admin_or_mod(sp.sender), "USER_NOT_AUTHORIZED"
            
            self.data.course_count += 1
            self.data.courses[self.data.course_count] = sp.record(
                name=params.name,
                price=params.price,
                is_active=True,
                teacher=params.teacher,
                teacher_cut=params.teacher_cut
            )
            
        
        @sp.entrypoint
        def update_course(self, params):
            sp.cast(params, sp.record(
                course_id=sp.nat,
                name=sp.string,
                price=sp.nat,
                teacher=sp.address,
                teacher_cut=sp.nat,
                is_active=sp.bool))
            
            assert self.is_admin_or_mod(sp.sender), "USER_NOT_AUTHORIZED"
            self.data.courses[params.course_id] = sp.record(
                name=params.name,
                price=params.price,
                is_active=True,
                teacher=params.teacher,
                teacher_cut=params.teacher_cut
            )

        @sp.entrypoint
        def delete_course(self, params):
            sp.cast(params, sp.record(course_id=sp.nat))
            assert self.is_admin_or_mod(sp.sender), "USER_NOT_AUTHORIZED"
            del self.data.courses[params.course_id]

        @sp.entrypoint
        def add_course_to_user(self, params):
            sp.cast(params, sp.record(
                course_id=sp.nat,
                user=sp.address,
                token_id=sp.nat
            ))
            assert self.is_admin_or_mod(sp.sender), "USER_NOT_AUTHORIZED"
            self.data.user_courses[(params.user, params.course_id)] = sp.record(
                is_active=False,
                is_paid=False,
                soul_bound_token_id=params.token_id
            )

        @sp.entrypoint
        def remove_course_from_user(self, params):
            sp.cast(params, sp.record(
                course_id=sp.nat,
                user=sp.address
            ))
            assert self.is_admin_or_mod(sp.sender), "USER_NOT_AUTHORIZED"
            del self.data.user_courses[(params.user, params.course_id)]

        @sp.entrypoint
        def update_soul_bound_token_id(self, params):
            sp.cast(params, sp.record(
                course_id=sp.nat,
                user=sp.address,
                token_id=sp.nat
            ))
            assert self.is_admin_or_mod(sp.sender), "USER_NOT_AUTHORIZED"
            self.data.user_courses[(params.user, params.course_id)].soul_bound_token_id = params.token_id

        @sp.entrypoint
        def buy_course(self, params):
            sp.cast(params, sp.record(
                course_id=sp.nat,
                user=sp.address
            ))
            assert self.data.user_courses[(params.user, params.course_id)].is_paid, "ALREADY_PAID"
            assert self.data.user_courses[(params.user, params.course_id)].is_active, "ALREADY_ACTIVE"
            # sp.send(types.blind_gallery_address, sp.amount)
            self.data.user_courses[(params.user, params.course_id)].is_paid = True
            self.data.user_courses[(params.user, params.course_id)].is_active = True

        @sp.entrypoint
        def activate_course(self, params):
            sp.cast(params, sp.record(
                course_id=sp.nat,
                user=sp.address
            ))
            assert self.is_admin_or_mod(sp.sender), "USER_NOT_AUTHORIZED"
            assert self.data.user_courses[(params.user, params.course_id)].is_active, "ALREADY_ACTIVE"
            self.data.user_courses[(params.user, params.course_id)].is_active = True

        @sp.entrypoint
        def deactivate_course(self, params):
            sp.cast(params, sp.record(
                course_id=sp.nat,
                user=sp.address
            ))
            assert self.is_admin_or_mod(sp.sender), "USER_NOT_AUTHORIZED"
            assert self.data.user_courses[(params.user, params.course_id)].is_active, "ALREADY_INACTIVE"
            self.data.user_courses[(params.user, params.course_id)].is_active = False
# Tests
@sp.add_test()
def test():
    # We define a test scenario, together with some outputs and checks
    scenario = sp.test_scenario("Academy", [types, main])
    scenario.h1("Academy")

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
    

    contract_metadata = sp.scenario_utils.metadata_of_url(
            "ipfs://QmaiAUj1FFNGYTu8rLBjc3eeN9cSKwaF8EGMBNDmhzPNFd"
        )
    c1 = main.Academy(admin.address, contract_metadata)
    scenario += c1

    scenario.h2("Add moderators")
    c1.add_moderator(moderator=mod1.address, name="mod1", _sender=admin)
    c1.add_moderator(moderator=mod2.address, name="mod2", _sender=admin)
    c1.add_moderator(moderator=mod1.address, name="mod1", _sender=tomas, _valid=False)

    scenario.h2("Create courses")
    c1.create_course(
            name="Course 1",
            price=100,
            teacher=teacher1.address,
            teacher_cut=10,
            _sender=admin
            )
