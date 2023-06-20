require('dotenv').config()

const { TezosToolkit } = require('@taquito/taquito');
const { InMemorySigner } = require('@taquito/signer');

const { endpoint, ownerKeys, chain } = require('./config');


async function set_pause_call(params) {
    const Tezos = new TezosToolkit('https://api.tez.ie/rpc/delphinet');

    const signer = new InMemorySigner(ownerKeys.secretKey);

    Tezos.setSignerProvider(signer);
    Tezos.setProvider({ rpc: endpoint });

    console.log('***** Start updating operators process *****', '\n');
    console.log(`Action called to contract at: ${chain}`, '\n');


    console.table(params)


    Tezos.contract.at(process.env.GALLERY_CONTRACT)
        .then(contract => {
            return contract.methods.set_pause(Boolean(params)).send()
        })
        .then(operation => {
            console.log('Waiting for confirmation')
            return operation.confirmation(3).then(() => operation.hash);
        })
        .then(hash => {
            console.log(`Operation injected: ${hash}`)
        })
        .catch(error => console.log(error.message));


}

module.exports = { set_pause_call }