require('dotenv').config()

const { TezosToolkit } = require('@taquito/taquito');
const { InMemorySigner } = require('@taquito/signer');

const { endpoint, ownerKeys, chain } = require('./config');


async function update_operators_call() {
    const Tezos = new TezosToolkit('https://api.tez.ie/rpc/delphinet');

    const signer = new InMemorySigner(ownerKeys.secretKey);

    Tezos.setSignerProvider(signer);
    Tezos.setProvider({ rpc: endpoint });


    let operator_params = []

    for (let token_id = 0; token_id < 6; token_id++) {

        operator_params.push(
            {
                add_operator: {
                    owner: ownerKeys.pkh,
                    operator: process.env.GALLERY_CONTRACT,
                    token_id: token_id
                }
            }
        )

    }


    console.log('***** Start updating operators process *****', '\n');
    console.log(`Action called to contract at: ${chain}`, '\n');


    console.table(operator_params)


    Tezos.contract.at(process.env.TOKEN_CONTRACT)
        .then(contract => {
            return contract.methods.update_operators(operator_params).send()
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

module.exports = { update_operators_call }