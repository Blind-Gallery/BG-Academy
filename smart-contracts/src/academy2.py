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

token_id_type = sp.nat
moderator_type = sp.address
moderator_name_type = sp.string
burn = sp.address('tz1burnburnburnburnburnburnburjAYjjX')
blind_gallery_address = sp.address('tz1UdddbVe3icmr5LRP1monxfR13ChsidcoX')
fxhash_treasury = sp.address('tz1dtzgLYUHMhP6sWeFtFsHkHqyPezBBPLsZ')

# A SmartPy module
@sp.module
def main():
    # A class of contracts
    class MyContract(sp.Contract):
        """ Provide the basics for having an administrator in the contract.

        Adds an `administrator` attribute in the storage record. Provides a
        `set_administrator` entrypoint. Provides a `is_administrator` meta-
        programming function.
        """

        def __init__(self, administrator, a):
            self.data.administrator=administrator
            self.data.moderators={}

        @sp.private(with_storage="read-only")
        def is_administrator(self, sender):
            sp.cast(sp.sender, sp.address)
            """Not standard, may be re-defined through inheritance."""
            return True

        @sp.entry_point
        def set_administrator(self, params):
            """(Admin only) Set the contract administrator."""
            assert self.is_administrator(sp.sender), "FA2_NOT_ADMIN"
            self.data.administrator = params

        @sp.private(with_storage="read-only")
        def is_admin_or_mod(self, address):
            auth = False
            if self.is_administrator(address):
                auth = True
            if self.data.moderators.contains(address):
                auth = True
            return auth

        @sp.entry_point
        def add_moderator(self, params):
            sp.cast(params, sp.record(moderator=sp.address, name=sp.string),)
            assert self.is_administrator(sp.sender), "FA2_NOT_ADMIN"
            self.data.moderators[params.moderator] = params.name0

        @sp.entry_point
        def remove_moderator(self, params):
            sp.cast(params.moderator, sp.address)
            assert self.is_administrator(sp.sender), "FA2_NOT_ADMIN"

            del self.data.moderators[params.moderator]

# Tests
@sp.add_test()
def test():
    # We define a test scenario, together with some outputs and checks
    # The scenario takes the module as a parameter
    scenario = sp.test_scenario("Welcome", main)
    scenario.h1("Welcome")

    # We first define a contract and add it to the scenario
    c1 = main.MyContract(12, 123)
    scenario += c1

    # And call some of its entrypoints
    c1.myEntryPoint(12)
    c1.myEntryPoint(13)
    c1.myEntryPoint(14)
    c1.myEntryPoint(50)
    c1.myEntryPoint(50)
    c1.myEntryPoint(50, _valid=False)  # this is expected to fail
    # Finally, we check its final storage
    scenario.verify(c1.data.myParameter1 == 151)

    # We can define another contract using the current state of c1
    c2 = main.MyContract(1, c1.data.myParameter1)
    scenario += c2
    scenario.verify(c2.data.myParameter2 == 151)
