const FIFSRegistrarAbi = [
	{
		"inputs": [
			{
				"internalType": "contract ENS",
				"name": "ensAddr",
				"type": "address"
			},
			{
				"internalType": "contract Resolver",
				"name": "resolverAddr",
				"type": "address"
			},
			{
				"internalType": "bytes32",
				"name": "node",
				"type": "bytes32"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "address",
				"name": "addr",
				"type": "address"
			}
		],
		"name": "ownedDomains",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "label",
				"type": "bytes32"
			},
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "target",
				"type": "address"
			}
		],
		"name": "register",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "string",
				"name": "domain",
				"type": "string"
			},
			{
				"internalType": "contract Ownable",
				"name": "target",
				"type": "address"
			}
		],
		"name": "registerAndStore",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"internalType": "address",
				"name": "addr",
				"type": "address"
			},
			{
				"internalType": "uint8",
				"name": "index",
				"type": "uint8"
			}
		],
		"name": "resolve",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	}
];

export default {
    addresses: {
        dev: "",
		ropsten: "0xF006F0F2ecd911195E2F9F2c563d28F2B77551D3",
		main: "0xD97BF0EAc78245312dF8524B608c8e298C268E89"
    },
    abi: FIFSRegistrarAbi,
    getContract: function(address) {
        return new web3.eth.Contract(this.abi, this.addresses[address]) 
    }
}

// NODES ARE CREATED USING namehash.hash(domain)
// LABELS ARE CREATED USING web3.sha3(label)
// console.log('label hash', web3.utils.sha3(label));
// console.log('namehash', namehash.hash(domain));

// ROPSTEN ENS = 0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e
// ROPSTEN RESOLVER = 0x42D63ae25990889E35F215bC95884039Ba354115
// ROPSTEN REVERSE REGISTRAR = 0x6F628b68b30Dc3c17f345c9dbBb1E483c2b7aE5c
// ROPSTEN REVERSE RESOLVER = 0x084b1c3c81545d370f3634392de611caabff8148

// MAIN ENS = 0x00000000000c2e074ec69a0dfb2997ba6c7d2e1e
// MAIN RESOLVER = 0x0904Dac3347eA47d208F3Fd67402D039a3b99859
// MAIN REVERSE REGISTRAR = 0x6F628b68b30Dc3c17f345c9dbBb1E483c2b7aE5c
// MAIN REVERSE RESOLVER = 0x084b1c3c81545d370f3634392de611caabff8148
