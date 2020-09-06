const FIFSRegistrarAbi = [
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
	}
];

export default {
    addresses: {
        dev: "",
		ropsten: "0x3b4065eC3DFF85217a1A4D1A77483330304f096f",
		main: "0xfc952ECF2EE199fa8C63A86424e3978F2dEB86eF"
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
