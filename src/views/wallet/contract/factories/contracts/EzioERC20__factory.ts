/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { EzioERC20, EzioERC20Interface } from "../../contracts/EzioERC20";

const _abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "Paused",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "previousAdminRole",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "bytes32",
        name: "newAdminRole",
        type: "bytes32",
      },
    ],
    name: "RoleAdminChanged",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "RoleGranted",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        indexed: true,
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "RoleRevoked",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "Unpaused",
    type: "event",
  },
  {
    inputs: [],
    name: "BURNER_ROLE",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "DEFAULT_ADMIN_ROLE",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "MINTER_ROLE",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "TREASURY_ROLE",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
    ],
    name: "allowance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "burn",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "subtractedValue",
        type: "uint256",
      },
    ],
    name: "decreaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
    ],
    name: "getRoleAdmin",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
    ],
    name: "getRoleMember",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
    ],
    name: "getRoleMemberCount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "grantRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "hasRole",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "addedValue",
        type: "uint256",
      },
    ],
    name: "increaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "purchase_",
        type: "address",
      },
      {
        internalType: "address",
        name: "treasury_",
        type: "address",
      },
    ],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "mint",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "pause",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "paused",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "renounceRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "role",
        type: "bytes32",
      },
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "revokeRole",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4",
      },
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "unpause",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x60806040523480156200001157600080fd5b506040518060400160405280600c81526020016b2932bbb0b932102a37b5b2b760a11b81525060405180604001604052806004815260200163455a494f60e01b8152506000828281600390805190602001906200007092919062000399565b5080516200008690600490602084019062000399565b50506005805460ff1916905550620000b233620000ac83670de0b6b3a764000062000455565b620000c8565b620000bf600033620001c0565b505050620004cf565b6001600160a01b038216620001245760405162461bcd60e51b815260206004820152601f60248201527f45524332303a206d696e7420746f20746865207a65726f20616464726573730060448201526064015b60405180910390fd5b620001326000838362000203565b806002600082825462000146919062000477565b90915550506001600160a01b038216600090815260208190526040812080548392906200017590849062000477565b90915550506040518181526001600160a01b038316906000907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9060200160405180910390a35b5050565b620001d782826200028360201b6200089e1760201c565b6000828152600760209081526040909120620001fe9183906200092462000327821b17901c565b505050565b6200021b838383620001fe60201b6200054f1760201c565b60055460ff1615620001fe5760405162461bcd60e51b815260206004820152602a60248201527f45524332305061757361626c653a20746f6b656e207472616e736665722077686044820152691a5b19481c185d5cd95960b21b60648201526084016200011b565b60008281526006602090815260408083206001600160a01b038516845290915290205460ff16620001bc5760008281526006602090815260408083206001600160a01b03851684529091529020805460ff19166001179055620002e33390565b6001600160a01b0316816001600160a01b0316837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45050565b60006200033e836001600160a01b03841662000347565b90505b92915050565b6000818152600183016020526040812054620003905750815460018181018455600084815260208082209093018490558454848252828601909352604090209190915562000341565b50600062000341565b828054620003a79062000492565b90600052602060002090601f016020900481019282620003cb576000855562000416565b82601f10620003e657805160ff191683800117855562000416565b8280016001018555821562000416579182015b8281111562000416578251825591602001919060010190620003f9565b506200042492915062000428565b5090565b5b8082111562000424576000815560010162000429565b634e487b7160e01b600052601160045260246000fd5b60008160001904831182151516156200047257620004726200043f565b500290565b600082198211156200048d576200048d6200043f565b500190565b600181811c90821680620004a757607f821691505b60208210811415620004c957634e487b7160e01b600052602260045260246000fd5b50919050565b61188480620004df6000396000f3fe608060405234801561001057600080fd5b50600436106101cf5760003560e01c80635c975abb11610104578063a217fddf116100a2578063d11a57ec11610071578063d11a57ec146103cf578063d5391393146103f6578063d547741f1461040b578063dd62ed3e1461041e57600080fd5b8063a217fddf1461038e578063a457c2d714610396578063a9059cbb146103a9578063ca15c873146103bc57600080fd5b80639010d07c116100de5780639010d07c1461033557806391d148541461036057806395d89b41146103735780639dc29fac1461037b57600080fd5b80635c975abb146102f957806370a08231146103045780638456cb591461032d57600080fd5b80632f2ff15d11610171578063395093511161014b57806339509351146102b85780633f4ba83a146102cb57806340c10f19146102d3578063485cc955146102e657600080fd5b80632f2ff15d14610281578063313ce5671461029657806336568abe146102a557600080fd5b806318160ddd116101ad57806318160ddd1461022457806323b872dd14610236578063248a9ca314610249578063282c51f31461026c57600080fd5b806301ffc9a7146101d457806306fdde03146101fc578063095ea7b314610211575b600080fd5b6101e76101e23660046114ea565b610431565b60405190151581526020015b60405180910390f35b61020461045c565b6040516101f39190611540565b6101e761021f36600461158f565b6104ee565b6002545b6040519081526020016101f3565b6101e76102443660046115b9565b610506565b6102286102573660046115f5565b60009081526006602052604090206001015490565b61022860008051602061180f83398151915281565b61029461028f36600461160e565b61052a565b005b604051601281526020016101f3565b6102946102b336600461160e565b610554565b6101e76102c636600461158f565b6105d7565b6102946105f9565b6102946102e136600461158f565b61060f565b6102946102f436600461163a565b610631565b60055460ff166101e7565b610228610312366004611664565b6001600160a01b031660009081526020819052604090205490565b610294610720565b61034861034336600461167f565b610733565b6040516001600160a01b0390911681526020016101f3565b6101e761036e36600461160e565b610752565b61020461077d565b61029461038936600461158f565b61078c565b610228600081565b6101e76103a436600461158f565b6107ae565b6101e76103b736600461158f565b610829565b6102286103ca3660046115f5565b610837565b6102287fe1dcbdb91df27212a29bc27177c840cf2f819ecf2187432e1fac86c2dd5dfca981565b61022860008051602061182f83398151915281565b61029461041936600461160e565b61084e565b61022861042c36600461163a565b610873565b60006001600160e01b03198216635a05180f60e01b1480610456575061045682610939565b92915050565b60606003805461046b906116a1565b80601f0160208091040260200160405190810160405280929190818152602001828054610497906116a1565b80156104e45780601f106104b9576101008083540402835291602001916104e4565b820191906000526020600020905b8154815290600101906020018083116104c757829003601f168201915b5050505050905090565b6000336104fc81858561096e565b5060019392505050565b600033610514858285610a92565b61051f858585610b0c565b506001949350505050565b60008281526006602052604090206001015461054581610ce5565b61054f8383610cef565b505050565b6001600160a01b03811633146105c95760405162461bcd60e51b815260206004820152602f60248201527f416363657373436f6e74726f6c3a2063616e206f6e6c792072656e6f756e636560448201526e103937b632b9903337b91039b2b63360891b60648201526084015b60405180910390fd5b6105d38282610d11565b5050565b6000336104fc8185856105ea8383610873565b6105f491906116f2565b61096e565b600061060481610ce5565b61060c610d33565b50565b60008051602061182f83398151915261062781610ce5565b61054f8383610dc6565b600061063c81610ce5565b60085460408051808201909152601c81527f436f6e747261637420416c726561647920496e697469616c697a656400000000602082015290600160a01b900460ff161561069c5760405162461bcd60e51b81526004016105c09190611540565b50600880546001600160a01b0385166001600160a81b031990911617600160a01b1790556106d860008051602061182f83398151915284610cef565b6106f060008051602061180f83398151915284610cef565b61070860008051602061182f83398151915283610cef565b61054f60008051602061180f83398151915283610cef565b600061072b81610ce5565b61060c610eb1565b600082815260076020526040812061074b9083610f2c565b9392505050565b60009182526006602090815260408084206001600160a01b0393909316845291905290205460ff1690565b60606004805461046b906116a1565b60008051602061180f8339815191526107a481610ce5565b61054f8383610f38565b600033816107bc8286610873565b90508381101561081c5760405162461bcd60e51b815260206004820152602560248201527f45524332303a2064656372656173656420616c6c6f77616e63652062656c6f77604482015264207a65726f60d81b60648201526084016105c0565b61051f828686840361096e565b6000336104fc818585610b0c565b600081815260076020526040812061045690611092565b60008281526006602052604090206001015461086981610ce5565b61054f8383610d11565b6001600160a01b03918216600090815260016020908152604080832093909416825291909152205490565b6108a88282610752565b6105d35760008281526006602090815260408083206001600160a01b03851684529091529020805460ff191660011790556108e03390565b6001600160a01b0316816001600160a01b0316837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45050565b600061074b836001600160a01b03841661109c565b60006001600160e01b03198216637965db0b60e01b148061045657506301ffc9a760e01b6001600160e01b0319831614610456565b6001600160a01b0383166109d05760405162461bcd60e51b8152602060048201526024808201527f45524332303a20617070726f76652066726f6d20746865207a65726f206164646044820152637265737360e01b60648201526084016105c0565b6001600160a01b038216610a315760405162461bcd60e51b815260206004820152602260248201527f45524332303a20617070726f766520746f20746865207a65726f206164647265604482015261737360f01b60648201526084016105c0565b6001600160a01b0383811660008181526001602090815260408083209487168084529482529182902085905590518481527f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925910160405180910390a3505050565b6000610a9e8484610873565b90506000198114610b065781811015610af95760405162461bcd60e51b815260206004820152601d60248201527f45524332303a20696e73756666696369656e7420616c6c6f77616e636500000060448201526064016105c0565b610b06848484840361096e565b50505050565b6001600160a01b038316610b705760405162461bcd60e51b815260206004820152602560248201527f45524332303a207472616e736665722066726f6d20746865207a65726f206164604482015264647265737360d81b60648201526084016105c0565b6001600160a01b038216610bd25760405162461bcd60e51b815260206004820152602360248201527f45524332303a207472616e7366657220746f20746865207a65726f206164647260448201526265737360e81b60648201526084016105c0565b610bdd8383836110eb565b6001600160a01b03831660009081526020819052604090205481811015610c555760405162461bcd60e51b815260206004820152602660248201527f45524332303a207472616e7366657220616d6f756e7420657863656564732062604482015265616c616e636560d01b60648201526084016105c0565b6001600160a01b03808516600090815260208190526040808220858503905591851681529081208054849290610c8c9084906116f2565b92505081905550826001600160a01b0316846001600160a01b03167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef84604051610cd891815260200190565b60405180910390a3610b06565b61060c8133611151565b610cf9828261089e565b600082815260076020526040902061054f9082610924565b610d1b82826111b5565b600082815260076020526040902061054f908261121c565b60055460ff16610d7c5760405162461bcd60e51b815260206004820152601460248201527314185d5cd8589b194e881b9bdd081c185d5cd95960621b60448201526064016105c0565b6005805460ff191690557f5db9ee0a495bf2e6ff9c91a7834c1ba4fdd244a5e8aa4e537bd38aeae4b073aa335b6040516001600160a01b03909116815260200160405180910390a1565b6001600160a01b038216610e1c5760405162461bcd60e51b815260206004820152601f60248201527f45524332303a206d696e7420746f20746865207a65726f20616464726573730060448201526064016105c0565b610e28600083836110eb565b8060026000828254610e3a91906116f2565b90915550506001600160a01b03821660009081526020819052604081208054839290610e679084906116f2565b90915550506040518181526001600160a01b038316906000907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9060200160405180910390a35050565b60055460ff1615610ef75760405162461bcd60e51b815260206004820152601060248201526f14185d5cd8589b194e881c185d5cd95960821b60448201526064016105c0565b6005805460ff191660011790557f62e78cea01bee320cd4e420270b5ea74000d11b0c9f74754ebdbfc544b05a258610da93390565b600061074b8383611231565b6001600160a01b038216610f985760405162461bcd60e51b815260206004820152602160248201527f45524332303a206275726e2066726f6d20746865207a65726f206164647265736044820152607360f81b60648201526084016105c0565b610fa4826000836110eb565b6001600160a01b038216600090815260208190526040902054818110156110185760405162461bcd60e51b815260206004820152602260248201527f45524332303a206275726e20616d6f756e7420657863656564732062616c616e604482015261636560f01b60648201526084016105c0565b6001600160a01b038316600090815260208190526040812083830390556002805484929061104790849061170a565b90915550506040518281526000906001600160a01b038516907fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef9060200160405180910390a3505050565b6000610456825490565b60008181526001830160205260408120546110e357508154600181810184556000848152602080822090930184905584548482528286019093526040902091909155610456565b506000610456565b60055460ff161561054f5760405162461bcd60e51b815260206004820152602a60248201527f45524332305061757361626c653a20746f6b656e207472616e736665722077686044820152691a5b19481c185d5cd95960b21b60648201526084016105c0565b61115b8282610752565b6105d357611173816001600160a01b0316601461125b565b61117e83602061125b565b60405160200161118f929190611721565b60408051601f198184030181529082905262461bcd60e51b82526105c091600401611540565b6111bf8282610752565b156105d35760008281526006602090815260408083206001600160a01b0385168085529252808320805460ff1916905551339285917ff6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b9190a45050565b600061074b836001600160a01b0384166113f7565b600082600001828154811061124857611248611796565b9060005260206000200154905092915050565b6060600061126a8360026117ac565b6112759060026116f2565b67ffffffffffffffff81111561128d5761128d6117cb565b6040519080825280601f01601f1916602001820160405280156112b7576020820181803683370190505b509050600360fc1b816000815181106112d2576112d2611796565b60200101906001600160f81b031916908160001a905350600f60fb1b8160018151811061130157611301611796565b60200101906001600160f81b031916908160001a90535060006113258460026117ac565b6113309060016116f2565b90505b60018111156113a8576f181899199a1a9b1b9c1cb0b131b232b360811b85600f166010811061136457611364611796565b1a60f81b82828151811061137a5761137a611796565b60200101906001600160f81b031916908160001a90535060049490941c936113a1816117e1565b9050611333565b50831561074b5760405162461bcd60e51b815260206004820181905260248201527f537472696e67733a20686578206c656e67746820696e73756666696369656e7460448201526064016105c0565b600081815260018301602052604081205480156114e057600061141b60018361170a565b855490915060009061142f9060019061170a565b905081811461149457600086600001828154811061144f5761144f611796565b906000526020600020015490508087600001848154811061147257611472611796565b6000918252602080832090910192909255918252600188019052604090208390555b85548690806114a5576114a56117f8565b600190038181906000526020600020016000905590558560010160008681526020019081526020016000206000905560019350505050610456565b6000915050610456565b6000602082840312156114fc57600080fd5b81356001600160e01b03198116811461074b57600080fd5b60005b8381101561152f578181015183820152602001611517565b83811115610b065750506000910152565b602081526000825180602084015261155f816040850160208701611514565b601f01601f19169190910160400192915050565b80356001600160a01b038116811461158a57600080fd5b919050565b600080604083850312156115a257600080fd5b6115ab83611573565b946020939093013593505050565b6000806000606084860312156115ce57600080fd5b6115d784611573565b92506115e560208501611573565b9150604084013590509250925092565b60006020828403121561160757600080fd5b5035919050565b6000806040838503121561162157600080fd5b8235915061163160208401611573565b90509250929050565b6000806040838503121561164d57600080fd5b61165683611573565b915061163160208401611573565b60006020828403121561167657600080fd5b61074b82611573565b6000806040838503121561169257600080fd5b50508035926020909101359150565b600181811c908216806116b557607f821691505b602082108114156116d657634e487b7160e01b600052602260045260246000fd5b50919050565b634e487b7160e01b600052601160045260246000fd5b60008219821115611705576117056116dc565b500190565b60008282101561171c5761171c6116dc565b500390565b7f416363657373436f6e74726f6c3a206163636f756e7420000000000000000000815260008351611759816017850160208801611514565b7001034b99036b4b9b9b4b733903937b6329607d1b601791840191820152835161178a816028840160208801611514565b01602801949350505050565b634e487b7160e01b600052603260045260246000fd5b60008160001904831182151516156117c6576117c66116dc565b500290565b634e487b7160e01b600052604160045260246000fd5b6000816117f0576117f06116dc565b506000190190565b634e487b7160e01b600052603160045260246000fdfe3c11d16cbaffd01df69ce1c404f6340ee057498f5f00246190ea54220576a8489f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a6a2646970667358221220b016435a310d312e6d33c61badf10928901b8ba6f962fc590926015ac362d8ed64736f6c63430008080033";

type EzioERC20ConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: EzioERC20ConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class EzioERC20__factory extends ContractFactory {
  constructor(...args: EzioERC20ConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<EzioERC20> {
    return super.deploy(overrides || {}) as Promise<EzioERC20>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): EzioERC20 {
    return super.attach(address) as EzioERC20;
  }
  override connect(signer: Signer): EzioERC20__factory {
    return super.connect(signer) as EzioERC20__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): EzioERC20Interface {
    return new utils.Interface(_abi) as EzioERC20Interface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): EzioERC20 {
    return new Contract(address, _abi, signerOrProvider) as EzioERC20;
  }
}
