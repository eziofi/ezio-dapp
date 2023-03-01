/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../../../common";
import type {
  ConversionV1,
  ConversionV1Interface,
} from "../../../../../contracts/impls/v1/Conversion.sol/ConversionV1";

const _abi = [
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
    inputs: [
      {
        internalType: "address",
        name: "tokenAddress",
        type: "address",
      },
    ],
    name: "aggregatorAction",
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
        name: "sourceAddress",
        type: "address",
      },
      {
        internalType: "address",
        name: "targetAddress",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "sourceAmount",
        type: "uint256",
      },
    ],
    name: "convertAmt",
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
        name: "tokenAddress",
        type: "address",
      },
    ],
    name: "getPrice",
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
        internalType: "address",
        name: "tokenAddress",
        type: "address",
      },
      {
        internalType: "address",
        name: "aggregatorAddress",
        type: "address",
      },
    ],
    name: "setAggregators",
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
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "tokenAggregators",
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
] as const;

const _bytecode =
  "0x608060405234801561001057600080fd5b50611085806100206000396000f3fe608060405234801561001057600080fd5b50600436106100f55760003560e01c80639010d07c11610097578063ca15c87311610066578063ca15c87314610223578063ccc5749014610236578063d1b37b6d1461025d578063d547741f1461027057600080fd5b80639010d07c146101e257806391d14854146101f557806392be8bfd14610208578063a217fddf1461021b57600080fd5b80632f2ff15d116100d35780632f2ff15d1461016657806336568abe1461017b57806341976e091461018e5780638e6334db146101a157600080fd5b806301ffc9a7146100fa578063247aa8d914610122578063248a9ca314610143575b600080fd5b61010d610108366004610bea565b610283565b60405190151581526020015b60405180910390f35b610135610130366004610c30565b6102ae565b604051908152602001610119565b610135610151366004610c4b565b60009081526065602052604090206001015490565b610179610174366004610c64565b6103ad565b005b610179610189366004610c64565b6103d7565b61013561019c366004610c30565b610455565b6101ca6101af366004610c30565b60c9602052600090815260409020546001600160a01b031681565b6040516001600160a01b039091168152602001610119565b6101ca6101f0366004610c90565b61049e565b61010d610203366004610c64565b6104bd565b610179610216366004610cb2565b6104e8565b610135600081565b610135610231366004610c4b565b610541565b6101357f7935bd0ae54bc31f548c14dba4d37c5c64b3f8ca900cb468fb8abd54d5894f5581565b61013561026b366004610cdc565b610558565b61017961027e366004610c64565b61069f565b60006001600160e01b03198216635a05180f60e01b14806102a857506102a8826106c4565b92915050565b6001600160a01b03808216600090815260c96020526040808220548151633fabe5a360e21b81529151929316918391839163feaf968c9160048082019260a092909190829003018186803b15801561030557600080fd5b505afa158015610319573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061033d9190610d32565b50505091505060008112156040518060400160405280601b81526020017f436f6e76657273696f6e3a20476574205072696365204572726f720000000000815250906103a55760405162461bcd60e51b815260040161039c9190610db2565b60405180910390fd5b509392505050565b6000828152606560205260409020600101546103c8816106f9565b6103d28383610706565b505050565b6001600160a01b03811633146104475760405162461bcd60e51b815260206004820152602f60248201527f416363657373436f6e74726f6c3a2063616e206f6e6c792072656e6f756e636560448201526e103937b632b9903337b91039b2b63360891b606482015260840161039c565b6104518282610728565b5050565b60ca54600090819061046f906001600160a01b03166102ae565b9050600061047c846102ae565b90508161048c82620f4240610dfb565b6104969190610e1a565b949350505050565b60008281526097602052604081206104b6908361074a565b9392505050565b60009182526065602090815260408084206001600160a01b0393909316845291905290205460ff1690565b7f7935bd0ae54bc31f548c14dba4d37c5c64b3f8ca900cb468fb8abd54d5894f55610512816106f9565b506001600160a01b03918216600090815260c96020526040902080546001600160a01b03191691909216179055565b60008181526097602052604081206102a890610756565b6000808490506000849050816001600160a01b031663313ce5676040518163ffffffff1660e01b815260040160206040518083038186803b15801561059c57600080fd5b505afa1580156105b0573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906105d49190610e3c565b6105df90600a610f43565b6105e886610455565b6105f29190610dfb565b816001600160a01b031663313ce5676040518163ffffffff1660e01b815260040160206040518083038186803b15801561062b57600080fd5b505afa15801561063f573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906106639190610e3c565b61066e90600a610f43565b61067788610455565b6106819087610dfb565b61068b9190610dfb565b6106959190610e1a565b9695505050505050565b6000828152606560205260409020600101546106ba816106f9565b6103d28383610728565b60006001600160e01b03198216637965db0b60e01b14806102a857506301ffc9a760e01b6001600160e01b03198316146102a8565b6107038133610760565b50565b61071082826107b9565b60008281526097602052604090206103d2908261083f565b6107328282610854565b60008281526097602052604090206103d290826108bb565b60006104b683836108d0565b60006102a8825490565b61076a82826104bd565b61045157610777816108fa565b61078283602061090c565b604051602001610793929190610f52565b60408051601f198184030181529082905262461bcd60e51b825261039c91600401610db2565b6107c382826104bd565b6104515760008281526065602090815260408083206001600160a01b03851684529091529020805460ff191660011790556107fb3390565b6001600160a01b0316816001600160a01b0316837f2f8788117e7eff1d82e926ec794901d17c78024a50270940304540a733656f0d60405160405180910390a45050565b60006104b6836001600160a01b038416610aa8565b61085e82826104bd565b156104515760008281526065602090815260408083206001600160a01b0385168085529252808320805460ff1916905551339285917ff6391f5c32d9c69d2a47ea670b442974b53935d1edc7fd64eb21e047a839171b9190a45050565b60006104b6836001600160a01b038416610af7565b60008260000182815481106108e7576108e7610fc7565b9060005260206000200154905092915050565b60606102a86001600160a01b03831660145b6060600061091b836002610dfb565b610926906002610fdd565b67ffffffffffffffff81111561093e5761093e610ff5565b6040519080825280601f01601f191660200182016040528015610968576020820181803683370190505b509050600360fc1b8160008151811061098357610983610fc7565b60200101906001600160f81b031916908160001a905350600f60fb1b816001815181106109b2576109b2610fc7565b60200101906001600160f81b031916908160001a90535060006109d6846002610dfb565b6109e1906001610fdd565b90505b6001811115610a59576f181899199a1a9b1b9c1cb0b131b232b360811b85600f1660108110610a1557610a15610fc7565b1a60f81b828281518110610a2b57610a2b610fc7565b60200101906001600160f81b031916908160001a90535060049490941c93610a528161100b565b90506109e4565b5083156104b65760405162461bcd60e51b815260206004820181905260248201527f537472696e67733a20686578206c656e67746820696e73756666696369656e74604482015260640161039c565b6000818152600183016020526040812054610aef575081546001818101845560008481526020808220909301849055845484825282860190935260409020919091556102a8565b5060006102a8565b60008181526001830160205260408120548015610be0576000610b1b600183611022565b8554909150600090610b2f90600190611022565b9050818114610b94576000866000018281548110610b4f57610b4f610fc7565b9060005260206000200154905080876000018481548110610b7257610b72610fc7565b6000918252602080832090910192909255918252600188019052604090208390555b8554869080610ba557610ba5611039565b6001900381819060005260206000200160009055905585600101600086815260200190815260200160002060009055600193505050506102a8565b60009150506102a8565b600060208284031215610bfc57600080fd5b81356001600160e01b0319811681146104b657600080fd5b80356001600160a01b0381168114610c2b57600080fd5b919050565b600060208284031215610c4257600080fd5b6104b682610c14565b600060208284031215610c5d57600080fd5b5035919050565b60008060408385031215610c7757600080fd5b82359150610c8760208401610c14565b90509250929050565b60008060408385031215610ca357600080fd5b50508035926020909101359150565b60008060408385031215610cc557600080fd5b610cce83610c14565b9150610c8760208401610c14565b600080600060608486031215610cf157600080fd5b610cfa84610c14565b9250610d0860208501610c14565b9150604084013590509250925092565b805169ffffffffffffffffffff81168114610c2b57600080fd5b600080600080600060a08688031215610d4a57600080fd5b610d5386610d18565b9450602086015193506040860151925060608601519150610d7660808701610d18565b90509295509295909350565b60005b83811015610d9d578181015183820152602001610d85565b83811115610dac576000848401525b50505050565b6020815260008251806020840152610dd1816040850160208701610d82565b601f01601f19169190910160400192915050565b634e487b7160e01b600052601160045260246000fd5b6000816000190483118215151615610e1557610e15610de5565b500290565b600082610e3757634e487b7160e01b600052601260045260246000fd5b500490565b600060208284031215610e4e57600080fd5b815160ff811681146104b657600080fd5b600181815b80851115610e9a578160001904821115610e8057610e80610de5565b80851615610e8d57918102915b93841c9390800290610e64565b509250929050565b600082610eb1575060016102a8565b81610ebe575060006102a8565b8160018114610ed45760028114610ede57610efa565b60019150506102a8565b60ff841115610eef57610eef610de5565b50506001821b6102a8565b5060208310610133831016604e8410600b8410161715610f1d575081810a6102a8565b610f278383610e5f565b8060001904821115610f3b57610f3b610de5565b029392505050565b60006104b660ff841683610ea2565b7f416363657373436f6e74726f6c3a206163636f756e7420000000000000000000815260008351610f8a816017850160208801610d82565b7001034b99036b4b9b9b4b733903937b6329607d1b6017918401918201528351610fbb816028840160208801610d82565b01602801949350505050565b634e487b7160e01b600052603260045260246000fd5b60008219821115610ff057610ff0610de5565b500190565b634e487b7160e01b600052604160045260246000fd5b60008161101a5761101a610de5565b506000190190565b60008282101561103457611034610de5565b500390565b634e487b7160e01b600052603160045260246000fdfea2646970667358221220bb75054df4d182d97d57cbbb22364d3b21578b1a5ce04ac24a79bd3cb6f6461864736f6c63430008080033";

type ConversionV1ConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: ConversionV1ConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class ConversionV1__factory extends ContractFactory {
  constructor(...args: ConversionV1ConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ConversionV1> {
    return super.deploy(overrides || {}) as Promise<ConversionV1>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): ConversionV1 {
    return super.attach(address) as ConversionV1;
  }
  override connect(signer: Signer): ConversionV1__factory {
    return super.connect(signer) as ConversionV1__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ConversionV1Interface {
    return new utils.Interface(_abi) as ConversionV1Interface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ConversionV1 {
    return new Contract(address, _abi, signerOrProvider) as ConversionV1;
  }
}
