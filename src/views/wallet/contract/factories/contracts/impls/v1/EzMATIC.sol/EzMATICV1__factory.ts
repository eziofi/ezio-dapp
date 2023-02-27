/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../../../common";
import type {
  EzMATICV1,
  EzMATICV1Interface,
} from "../../../../../contracts/impls/v1/EzMATIC.sol/EzMATICV1";

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
        internalType: "uint8",
        name: "version",
        type: "uint8",
      },
    ],
    name: "Initialized",
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
    name: "GOVERNOR_ROLE",
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
    inputs: [
      {
        internalType: "contract IEzio",
        name: "ezio_",
        type: "address",
      },
    ],
    name: "contact",
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
    inputs: [],
    name: "ezio",
    outputs: [
      {
        internalType: "contract IEzio",
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
        internalType: "string",
        name: "name_",
        type: "string",
      },
      {
        internalType: "string",
        name: "symbol_",
        type: "string",
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
    name: "netWorth",
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
    name: "totalNetWorth",
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
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b5061001961001e565b6100de565b600054610100900460ff161561008a5760405162461bcd60e51b815260206004820152602760248201527f496e697469616c697a61626c653a20636f6e747261637420697320696e697469604482015266616c697a696e6760c81b606482015260840160405180910390fd5b60005460ff90811610156100dc576000805460ff191660ff9081179091556040519081527f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb38474024989060200160405180910390a15b565b611f8f806100ed6000396000f3fe608060405234801561001057600080fd5b50600436106101fb5760003560e01c806370a082311161011a578063a457c2d7116100ad578063ca15c8731161007c578063ca15c87314610436578063ccc5749014610449578063d53913931461045e578063d547741f14610485578063dd62ed3e1461049857600080fd5b8063a457c2d7146103ef578063a9059cbb14610402578063b4ab0bbd14610415578063c1a164fe1461041d57600080fd5b806395d89b41116100e957806395d89b41146103b95780639dc29fac146103c15780639ec200d1146103d4578063a217fddf146103e757600080fd5b806370a082311461034a5780638456cb59146103735780639010d07c1461037b57806391d14854146103a657600080fd5b8063313ce5671161019257806340c10f191161016157806340c10f19146103115780634233799c146103245780634cd88b761461032c5780635c975abb1461033f57600080fd5b8063313ce567146102d457806336568abe146102e357806339509351146102f65780633f4ba83a1461030957600080fd5b806323b872dd116101ce57806323b872dd14610262578063248a9ca314610275578063282c51f3146102985780632f2ff15d146102bf57600080fd5b806301ffc9a71461020057806306fdde0314610228578063095ea7b31461023d57806318160ddd14610250575b600080fd5b61021361020e366004611a72565b6104ab565b60405190151581526020015b60405180910390f35b6102306104d6565b60405161021f9190611ac8565b61021361024b366004611b10565b610568565b6035545b60405190815260200161021f565b610213610270366004611b3c565b610580565b610254610283366004611b7d565b600090815260fb602052604090206001015490565b6102547f3c11d16cbaffd01df69ce1c404f6340ee057498f5f00246190ea54220576a84881565b6102d26102cd366004611b96565b6105a4565b005b6040516012815260200161021f565b6102d26102f1366004611b96565b6105ce565b610213610304366004611b10565b610651565b6102d2610673565b6102d261031f366004611b10565b610696565b6102546106ca565b6102d261033a366004611c69565b61087a565b60655460ff16610213565b610254610358366004611ccd565b6001600160a01b031660009081526033602052604090205490565b6102d261098e565b61038e610389366004611cea565b6109ae565b6040516001600160a01b03909116815260200161021f565b6102136103b4366004611b96565b6109ce565b6102306109f9565b6102d26103cf366004611b10565b610a08565b6102d26103e2366004611ccd565b610a3c565b610254600081565b6102136103fd366004611b10565b610b3c565b610213610410366004611b10565b610bb7565b610254610bc5565b61015f5461038e9061010090046001600160a01b031681565b610254610444366004611b7d565b610c04565b610254600080516020611f1883398151915281565b6102547f9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a681565b6102d2610493366004611b96565b610c1c565b6102546104a6366004611d0c565b610c41565b60006001600160e01b03198216635a05180f60e01b14806104d057506104d082610c6c565b92915050565b6060603680546104e590611d3a565b80601f016020809104026020016040519081016040528092919081815260200182805461051190611d3a565b801561055e5780601f106105335761010080835404028352916020019161055e565b820191906000526020600020905b81548152906001019060200180831161054157829003601f168201915b5050505050905090565b600033610576818585610ca1565b5060019392505050565b60003361058e858285610dc5565b610599858585610e3f565b506001949350505050565b600082815260fb60205260409020600101546105bf81610ff5565b6105c98383610fff565b505050565b6001600160a01b03811633146106435760405162461bcd60e51b815260206004820152602f60248201527f416363657373436f6e74726f6c3a2063616e206f6e6c792072656e6f756e636560448201526e103937b632b9903337b91039b2b63360891b60648201526084015b60405180910390fd5b61064d8282611022565b5050565b6000336105768185856106648383610c41565b61066e9190611d8b565b610ca1565b600080516020611f1883398151915261068b81610ff5565b610693611045565b50565b7f9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a66106c081610ff5565b6105c98383611097565b600061015f60019054906101000a90046001600160a01b03166001600160a01b0316635591ce5a6040518163ffffffff1660e01b815260040160206040518083038186803b15801561071b57600080fd5b505afa15801561072f573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906107539190611da3565b61015f60019054906101000a90046001600160a01b03166001600160a01b031663351fe3006040518163ffffffff1660e01b815260040160206040518083038186803b1580156107a257600080fd5b505afa1580156107b6573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906107da9190611da3565b61015f60019054906101000a90046001600160a01b03166001600160a01b0316634233799c6040518163ffffffff1660e01b815260040160206040518083038186803b15801561082957600080fd5b505afa15801561083d573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906108619190611da3565b61086b9190611dbc565b6108759190611dbc565b905090565b600054610100900460ff161580801561089a5750600054600160ff909116105b806108b45750303b1580156108b4575060005460ff166001145b6109175760405162461bcd60e51b815260206004820152602e60248201527f496e697469616c697a61626c653a20636f6e747261637420697320616c72656160448201526d191e481a5b9a5d1a585b1a5e995960921b606482015260840161063a565b6000805460ff19166001179055801561093a576000805461ff0019166101001790555b6109448383611164565b80156105c9576000805461ff0019169055604051600181527f7f26b83ff96e1f2b6a682f133852f6798a09c465da95921460cefb38474024989060200160405180910390a1505050565b600080516020611f188339815191526109a681610ff5565b6106936111a5565b600082815261012d602052604081206109c790836111e2565b9392505050565b600091825260fb602090815260408084206001600160a01b0393909316845291905290205460ff1690565b6060603780546104e590611d3a565b7f3c11d16cbaffd01df69ce1c404f6340ee057498f5f00246190ea54220576a848610a3281610ff5565b6105c983836111ee565b600080516020611f18833981519152610a5481610ff5565b61015f546040805160608101909152602280825260ff9092161591611f38602083013990610a955760405162461bcd60e51b815260040161063a9190611ac8565b5061015f8054610100600160a81b0319166101006001600160a01b0385811682029290921792839055610aed927f9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a69291900416610fff565b61015f54610b2a907f3c11d16cbaffd01df69ce1c404f6340ee057498f5f00246190ea54220576a8489061010090046001600160a01b0316610fff565b505061015f805460ff19166001179055565b60003381610b4a8286610c41565b905083811015610baa5760405162461bcd60e51b815260206004820152602560248201527f45524332303a2064656372656173656420616c6c6f77616e63652062656c6f77604482015264207a65726f60d81b606482015260840161063a565b6105998286868403610ca1565b600033610576818585610e3f565b6000610bd060355490565b15610bfc57603554610be06106ca565b610bf290670de0b6b3a7640000611dd3565b6108759190611df2565b50620f424090565b600081815261012d602052604081206104d09061132e565b600082815260fb6020526040902060010154610c3781610ff5565b6105c98383611022565b6001600160a01b03918216600090815260346020908152604080832093909416825291909152205490565b60006001600160e01b03198216637965db0b60e01b14806104d057506301ffc9a760e01b6001600160e01b03198316146104d0565b6001600160a01b038316610d035760405162461bcd60e51b8152602060048201526024808201527f45524332303a20617070726f76652066726f6d20746865207a65726f206164646044820152637265737360e01b606482015260840161063a565b6001600160a01b038216610d645760405162461bcd60e51b815260206004820152602260248201527f45524332303a20617070726f766520746f20746865207a65726f206164647265604482015261737360f01b606482015260840161063a565b6001600160a01b0383811660008181526034602090815260408083209487168084529482529182902085905590518481527f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925910160405180910390a3505050565b6000610dd18484610c41565b90506000198114610e395781811015610e2c5760405162461bcd60e51b815260206004820152601d60248201527f45524332303a20696e73756666696369656e7420616c6c6f77616e6365000000604482015260640161063a565b610e398484848403610ca1565b50505050565b6001600160a01b038316610ea35760405162461bcd60e51b815260206004820152602560248201527f45524332303a207472616e736665722066726f6d20746865207a65726f206164604482015264647265737360d81b606482015260840161063a565b6001600160a01b038216610f055760405162461bcd60e51b815260206004820152602360248201527f45524332303a207472616e7366657220746f20746865207a65726f206164647260448201526265737360e81b606482015260840161063a565b610f10838383611338565b6001600160a01b03831660009081526033602052604090205481811015610f885760405162461bcd60e51b815260206004820152602660248201527f45524332303a207472616e7366657220616d6f756e7420657863656564732062604482015265616c616e636560d01b606482015260840161063a565b6001600160a01b0380851660008181526033602052604080822086860390559286168082529083902080548601905591517fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef90610fe89086815260200190565b60405180910390a3610e39565b610693813361139e565b61100982826113f7565b600082815261012d602052604090206105c9908261147d565b61102c8282611492565b600082815261012d602052604090206105c990826114f9565b61104d61150e565b6065805460ff191690557f5db9ee0a495bf2e6ff9c91a7834c1ba4fdd244a5e8aa4e537bd38aeae4b073aa335b6040516001600160a01b03909116815260200160405180910390a1565b6001600160a01b0382166110ed5760405162461bcd60e51b815260206004820152601f60248201527f45524332303a206d696e7420746f20746865207a65726f206164647265737300604482015260640161063a565b6110f960008383611338565b806035600082825461110b9190611d8b565b90915550506001600160a01b0382166000818152603360209081526040808320805486019055518481527fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef910160405180910390a35050565b600054610100900460ff1661118b5760405162461bcd60e51b815260040161063a90611e14565b6111958282611559565b61119d61158a565b61064d6115b9565b6111ad6115f8565b6065805460ff191660011790557f62e78cea01bee320cd4e420270b5ea74000d11b0c9f74754ebdbfc544b05a25861107a3390565b60006109c7838361163e565b6001600160a01b03821661124e5760405162461bcd60e51b815260206004820152602160248201527f45524332303a206275726e2066726f6d20746865207a65726f206164647265736044820152607360f81b606482015260840161063a565b61125a82600083611338565b6001600160a01b038216600090815260336020526040902054818110156112ce5760405162461bcd60e51b815260206004820152602260248201527f45524332303a206275726e20616d6f756e7420657863656564732062616c616e604482015261636560f01b606482015260840161063a565b6001600160a01b03831660008181526033602090815260408083208686039055603580548790039055518581529192917fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef910160405180910390a3505050565b60006104d0825490565b60655460ff16156105c95760405162461bcd60e51b815260206004820152602a60248201527f45524332305061757361626c653a20746f6b656e207472616e736665722077686044820152691a5b19481c185d5cd95960b21b606482015260840161063a565b6113a882826109ce565b61064d576113b581611668565b6113c083602061167a565b6040516020016113d1929190611e5f565b60408051601f198184030181529082905262461bcd60e51b825261063a91600401611ac8565b61140182826109ce565b61064d57600082815260fb602090815260408083206001600160a01b03851684529091529020805460ff191660011790556114393390565b6001600160a01b0316816001600160a01b0316837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45050565b60006109c7836001600160a01b038416611816565b61149c82826109ce565b1561064d57600082815260fb602090815260408083206001600160a01b0385168085529252808320805460ff1916905551339285917ff6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b9190a45050565b60006109c7836001600160a01b038416611865565b60655460ff166115575760405162461bcd60e51b815260206004820152601460248201527314185d5cd8589b194e881b9bdd081c185d5cd95960621b604482015260640161063a565b565b600054610100900460ff166115805760405162461bcd60e51b815260040161063a90611e14565b61064d8282611958565b600054610100900460ff166115b15760405162461bcd60e51b815260040161063a90611e14565b6115576119a6565b600054610100900460ff166115e05760405162461bcd60e51b815260040161063a90611e14565b611557600080516020611f1883398151915233610fff565b60655460ff16156115575760405162461bcd60e51b815260206004820152601060248201526f14185d5cd8589b194e881c185d5cd95960821b604482015260640161063a565b600082600001828154811061165557611655611ed4565b9060005260206000200154905092915050565b60606104d06001600160a01b03831660145b60606000611689836002611dd3565b611694906002611d8b565b67ffffffffffffffff8111156116ac576116ac611bc6565b6040519080825280601f01601f1916602001820160405280156116d6576020820181803683370190505b509050600360fc1b816000815181106116f1576116f1611ed4565b60200101906001600160f81b031916908160001a905350600f60fb1b8160018151811061172057611720611ed4565b60200101906001600160f81b031916908160001a9053506000611744846002611dd3565b61174f906001611d8b565b90505b60018111156117c7576f181899199a1a9b1b9c1cb0b131b232b360811b85600f166010811061178357611783611ed4565b1a60f81b82828151811061179957611799611ed4565b60200101906001600160f81b031916908160001a90535060049490941c936117c081611eea565b9050611752565b5083156109c75760405162461bcd60e51b815260206004820181905260248201527f537472696e67733a20686578206c656e67746820696e73756666696369656e74604482015260640161063a565b600081815260018301602052604081205461185d575081546001818101845560008481526020808220909301849055845484825282860190935260409020919091556104d0565b5060006104d0565b6000818152600183016020526040812054801561194e576000611889600183611dbc565b855490915060009061189d90600190611dbc565b90508181146119025760008660000182815481106118bd576118bd611ed4565b90600052602060002001549050808760000184815481106118e0576118e0611ed4565b6000918252602080832090910192909255918252600188019052604090208390555b855486908061191357611913611f01565b6001900381819060005260206000200160009055905585600101600086815260200190815260200160002060009055600193505050506104d0565b60009150506104d0565b600054610100900460ff1661197f5760405162461bcd60e51b815260040161063a90611e14565b81516119929060369060208501906119d9565b5080516105c99060379060208401906119d9565b600054610100900460ff166119cd5760405162461bcd60e51b815260040161063a90611e14565b6065805460ff19169055565b8280546119e590611d3a565b90600052602060002090601f016020900481019282611a075760008555611a4d565b82601f10611a2057805160ff1916838001178555611a4d565b82800160010185558215611a4d579182015b82811115611a4d578251825591602001919060010190611a32565b50611a59929150611a5d565b5090565b5b80821115611a595760008155600101611a5e565b600060208284031215611a8457600080fd5b81356001600160e01b0319811681146109c757600080fd5b60005b83811015611ab7578181015183820152602001611a9f565b83811115610e395750506000910152565b6020815260008251806020840152611ae7816040850160208701611a9c565b601f01601f19169190910160400192915050565b6001600160a01b038116811461069357600080fd5b60008060408385031215611b2357600080fd5b8235611b2e81611afb565b946020939093013593505050565b600080600060608486031215611b5157600080fd5b8335611b5c81611afb565b92506020840135611b6c81611afb565b929592945050506040919091013590565b600060208284031215611b8f57600080fd5b5035919050565b60008060408385031215611ba957600080fd5b823591506020830135611bbb81611afb565b809150509250929050565b634e487b7160e01b600052604160045260246000fd5b600082601f830112611bed57600080fd5b813567ffffffffffffffff80821115611c0857611c08611bc6565b604051601f8301601f19908116603f01168101908282118183101715611c3057611c30611bc6565b81604052838152866020858801011115611c4957600080fd5b836020870160208301376000602085830101528094505050505092915050565b60008060408385031215611c7c57600080fd5b823567ffffffffffffffff80821115611c9457600080fd5b611ca086838701611bdc565b93506020850135915080821115611cb657600080fd5b50611cc385828601611bdc565b9150509250929050565b600060208284031215611cdf57600080fd5b81356109c781611afb565b60008060408385031215611cfd57600080fd5b50508035926020909101359150565b60008060408385031215611d1f57600080fd5b8235611d2a81611afb565b91506020830135611bbb81611afb565b600181811c90821680611d4e57607f821691505b60208210811415611d6f57634e487b7160e01b600052602260045260246000fd5b50919050565b634e487b7160e01b600052601160045260246000fd5b60008219821115611d9e57611d9e611d75565b500190565b600060208284031215611db557600080fd5b5051919050565b600082821015611dce57611dce611d75565b500390565b6000816000190483118215151615611ded57611ded611d75565b500290565b600082611e0f57634e487b7160e01b600052601260045260246000fd5b500490565b6020808252602b908201527f496e697469616c697a61626c653a20636f6e7472616374206973206e6f74206960408201526a6e697469616c697a696e6760a81b606082015260800190565b7f416363657373436f6e74726f6c3a206163636f756e7420000000000000000000815260008351611e97816017850160208801611a9c565b7001034b99036b4b9b9b4b733903937b6329607d1b6017918401918201528351611ec8816028840160208801611a9c565b01602801949350505050565b634e487b7160e01b600052603260045260246000fd5b600081611ef957611ef9611d75565b506000190190565b634e487b7160e01b600052603160045260246000fdfe7935bd0ae54bc31f548c14dba4d37c5c64b3f8ca900cb468fb8abd54d5894f55457a546f6b656e3a436f6e747261637420416c726561647920436f6e746163746564a26469706673582212208b2e9f1263f7b93d72b03767e001319da9b97b97c09c70bd5b7a49f33c37aeeb64736f6c63430008080033";

type EzMATICV1ConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: EzMATICV1ConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class EzMATICV1__factory extends ContractFactory {
  constructor(...args: EzMATICV1ConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<EzMATICV1> {
    return super.deploy(overrides || {}) as Promise<EzMATICV1>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): EzMATICV1 {
    return super.attach(address) as EzMATICV1;
  }
  override connect(signer: Signer): EzMATICV1__factory {
    return super.connect(signer) as EzMATICV1__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): EzMATICV1Interface {
    return new utils.Interface(_abi) as EzMATICV1Interface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): EzMATICV1 {
    return new Contract(address, _abi, signerOrProvider) as EzMATICV1;
  }
}
