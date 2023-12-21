#!/usr/bin/env node


require('dotenv').config()

// endpoints

const supportedChains = {
	local: 'local',
	mainnet: 'mainnet',
	ghostnet: 'ghostnet',
}

const better_call_dev_chain_names = {
	mainnet: 'mainnet',
	ghostnet: 'ghostnet',
}

const endpoints = {
	mainnet: 'https://rpc.tzkt.io/mainnet',
	ghostnet: 'https://rpc.tzkt.io/ghostnet',
}

// accounts

const ownerKeys = {
	pkh: process.env.PUBLIC_KEY,
	secretKey: process.env.PRIVATE_KEY
}

// contracts

const contractsConfig = {
	[supportedChains.ghostnet]: [
		'sbt',
		'academy'
	],
	[supportedChains.mainnet]: [
		'sbt',
		'academy'
	]
}


// utils

const chain = process.env.PROTOCOL_NAME

const chain_name = better_call_dev_chain_names[chain]

const endpoint = endpoints[chain]

const contracts = contractsConfig[chain]


function isLocalNode() {
	return chain == supportedChains.local
}


module.exports = {
	endpoint, ownerKeys, chain, isLocalNode, contracts, chain_name
}
