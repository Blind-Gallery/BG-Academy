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
            assert self.is_administrator_(sp.sender), "FA2_NOT_ADMIN"
            self.data.administrator = params

        @sp.onchain_view()
        def get_administrator(self):
            return self.data.administrator
        
        @sp.entrypoint
        def add_moderator(self, params):
            sp.cast(params, sp.record(moderator=sp.address, name=sp.string),)
            assert self.is_administrator_(sp.sender), "FA2_NOT_ADMIN"
            self.data.moderators = sp.update_map(params.moderator, sp.Some(params.name), self.data.moderators)

        @sp.entrypoint
        def remove_moderator(self, params):
            sp.cast(params.moderator, sp.address)
            assert self.is_administrator_(sp.sender), "FA2_NOT_ADMIN"

            del self.data.moderators[params.moderator]

    class Academy(AdminInterface):
        def __init__(self, administrator, metadata):
            AdminInterface.__init__(self, administrator)
            self.data.metadata = metadata
            self.data.courses = sp.cast({},types.course_map)
            self.data.course_count = sp.nat(0)
            self.data.user_courses = sp.cast({},types.user_courses_map)

        @sp.entrypoint
        def crate_course(self, params):
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

            # Tests
@sp.add_test()
def test():
    # We define a test scenario, together with some outputs and checks
    scenario = sp.test_scenario("Academy", [types, main])
    scenario.h1("Academy")

    # We first define a contract and add it to the scenario
    admin = sp.test_account("Administrator")
    scenario.show(admin.address)
    contract_metadata = sp.scenario_utils.metadata_of_url(
            "ipfs://QmaiAUj1FFNGYTu8rLBjc3eeN9cSKwaF8EGMBNDmhzPNFd"
        )
    c1 = main.Academy(admin.address, contract_metadata)
    scenario += c1