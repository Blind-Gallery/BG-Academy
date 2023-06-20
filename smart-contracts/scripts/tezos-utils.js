#!/usr/bin/env node

const { contracts } = require('./config')

const program = require('commander')
const { compile_contract, test_contract, pause, deploy_contract, estimate_contract, deploy_contract_github, estimate_contract_github, update_operators, update_operators_github } = require('./commands')

const batchCallFunc = async (contract, moreContracts, func) => {

  if (contract != 'all') {
    await func(contract)

    if (moreContracts.length) {
      for (var i = 0; i < moreContracts.length; i++) {
        await func(moreContracts[i])
      }
    }

  } else {
    // compile all contracts
    for (var i = 0; i < contracts.length; i++) {
      await func(contracts[i])
    }


  }

}


program
  .command('compile <contract> [moreContracts...]')
  .description('Compile custom contract')
  .action(async function (contract, moreContracts) {
    await batchCallFunc(contract, moreContracts, compile_contract)
  })
  .on('--help', () => {
    console.log('');
    console.log('Examples:');
    console.log('');
    console.log('  $ ./scripts/program.js compile calculator');
  });

program
  .command('deploy <contract> [moreContracts...]')
  .description('Deploy a given contract')
  .action(async function (contract, moreContracts) {
    await batchCallFunc(contract, moreContracts, deploy_contract)
  })
  .on('--help', () => {
    console.log('');
    console.log('Examples:');
    console.log('');
    console.log('  $ ./scripts/program.js deploy calculator');
  });

program
  .command('test <contract> [moreContracts...]')
  .description('Test a given contract')
  .action(async function (contract, moreContracts) {
    await batchCallFunc(contract, moreContracts, test_contract)
  })
  .on('--help', () => {
    console.log('');
    console.log('Examples:');
    console.log('');
    console.log('  $ ./scripts/program.js test calculator');
  });


program
  .command('estimate <contract> [moreContracts...]')
  .description('Estimate the cost of deployment of a given contract')
  .action(async function (contract, moreContracts) {
    await batchCallFunc(contract, moreContracts, estimate_contract)
  })
  .on('--help', () => {
    console.log('');
    console.log('Examples:');
    console.log('');
    console.log('  $ ./scripts/program.js estimate calculator');
  });

program
  .command('estimate_github <contract> [moreContracts...]')
  .description('Estimate the cost of deployment of a given contract without user prompt')
  .action(async function (contract, moreContracts) {
    await batchCallFunc(contract, moreContracts, estimate_contract_github)
  })
  .on('--help', () => {
    console.log('');
    console.log('Examples:');
    console.log('');
    console.log('  $ ./scripts/program.js estimate calculator');
  });

program
  .command('deploy_github <contract> [moreContracts...]')
  .description('Deploy a given contract without user prompt')
  .action(async function (contract, moreContracts) {
    await batchCallFunc(contract, moreContracts, deploy_contract_github)
  })
  .on('--help', () => {
    console.log('');
    console.log('Examples:');
    console.log('');
    console.log('  $ ./scripts/program.js deploy calculator');
  });

program
  .command('update_operators')
  .description('Update operators for the collection contract without user prompt')
  .action(async function () {
    await update_operators()
  })
  .on('--help', () => {
    console.log('');
    console.log('Examples:');
    console.log('');
    console.log('  $ ./scripts/program.js estimate calculator');
  });

program
  .command('update_operators_github')
  .description('Update operators for the collection contract without user prompt')
  .action(async function () {
    await update_operators_github()
  })
  .on('--help', () => {
    console.log('');
    console.log('Examples:');
    console.log('');
    console.log('  $ ./scripts/program.js deploy calculator');
  });


program
  .command('pause')
  .description('Set pause on the smart contract')
  .action(async function (params) {
    await pause(params)
  })
  .on('--help', () => {
    console.log('');
    console.log('Examples:');
    console.log('');
    console.log('  $ ./scripts/program.js deploy calculator');
  });


program.parse(process.argv)

var NO_COMMAND_SPECIFIED = program.args.length === 0;
if (NO_COMMAND_SPECIFIED) {
  program.help();
}