# Blind gallery

## Description
Smart contracts for the Blind Gallery
## TOC
- [Blind gallery](#blind-gallery)
  - [Description](#description)
  - [TOC](#toc)
  - [How to Install](#how-to-install)
  - [How to run the project](#how-to-run-the-project)
  - [Usage](#usage)
  - [Run the Tests](#run-the-tests)
  - [Motivation](#motivation)
  - [Code Contributors](#code-contributors)

## How to Install

Before you start, you will need the following dependencies:
- [NodeJs](https://nodejs.org/en/) 14 or higher
- [SmartPy CLI](https://smartpy.io/docs/cli/)
  
## How to run the project

Create your environment with the following command

``` bash
cp .env.example .env
```

You need to configure the environment with the respective data as its needed to run the project

The smart contracts are listed on the src directory, and you can interact with them using the scripts/tezos-util package, here are some examples of how to

To compile all contracts in `contractsConfig` stored in src/ just run:

``` bash
./scripts/tezos-utils.js compile all
```

To compile a specific contract in `contractsConfig` stored in src/ just run:

``` bash
./scripts/tezos-utils.js compile $CONTRACT_NAME
```

The output of both commands would be stored at build/$CONTRACT_NAME/

## Usage
The project is for testing, and development of smart contracts, also gives some tools to estimate cost of contracts or deployments on a given RCP, make sure you have a .env file where you store the information needed to run the CLI

Also consider using the proper [Blind Gallery CLI](https://github.com/Blind-Gallery/cli) if you want to interact with the existing smart contracts on the blockchain instead.

## Run the Tests
To test all contracts in `contractsConfig` stored in src/ just run:

``` bash
./scripts/tezos-utils.js test all
```

To test a specific contract in `contractsConfig` stored in src/ just run:

``` bash
./scripts/tezos-utils.js test $CONTRACT_NAME.
```

The output of both commands would be stored at tests_results/$CONTRACT_NAME/
## Motivation
Further documentation can be found on docs/
## Code Contributors
Made with ❤️ by:
<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center"><a href="https://github.com/tlacloc"><img src="https://avatars.githubusercontent.com/u/17482176?s=100&v=4" width="100px;" alt="Tlalocman"/><br /><sub><b>Tlalocman</b></sub></a><br /></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->