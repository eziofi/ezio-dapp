/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../../common";
import type {
  Uniswap,
  UniswapInterface,
} from "../../../../contracts/test/UniSwap.sol/Uniswap";

const _abi = [
  {
    inputs: [
      {
        internalType: "contract ISwapRouter",
        name: "_swapRouter",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "feeTier",
    outputs: [
      {
        internalType: "uint24",
        name: "",
        type: "uint24",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "tokenIn_",
        type: "address",
      },
      {
        internalType: "address",
        name: "tokenOut_",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amountIn_",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "amountOutMinimum_",
        type: "uint256",
      },
    ],
    name: "swap",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "swapRouter",
    outputs: [
      {
        internalType: "contract ISwapRouter",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

const _bytecode =
  "0x60a060405234801561001057600080fd5b5060405161057a38038061057a83398101604081905261002f91610044565b60601b6001600160601b031916608052610074565b60006020828403121561005657600080fd5b81516001600160a01b038116811461006d57600080fd5b9392505050565b60805160601c6104db61009f60003960008181606d0152818161013101526101fc01526104db6000f3fe608060405234801561001057600080fd5b50600436106100415760003560e01c806372f5d98a14610046578063c31c9c0714610068578063fe029156146100a7575b600080fd5b61004f610bb881565b60405162ffffff90911681526020015b60405180910390f35b61008f7f000000000000000000000000000000000000000000000000000000000000000081565b6040516001600160a01b03909116815260200161005f565b6100ba6100b53660046103a2565b6100c8565b60405190815260200161005f565b60008083116040518060400160405280601b81526020017f457a50757263686173653a2057726f6e6720506172616d6574657200000000008152509061012a5760405162461bcd60e51b81526004016101219190610414565b60405180910390fd5b50610156857f000000000000000000000000000000000000000000000000000000000000000085610286565b60408051610100810182526001600160a01b03878116825286811660208301908152610bb88385019081523060608501908152426080860190815260a086018a815260c087018a8152600060e08901818152995163414bf38960e01b8152895189166004820152965188166024880152945162ffffff166044870152925186166064860152905160848501525160a48401525160c48301529351821660e48201529192917f00000000000000000000000000000000000000000000000000000000000000009091169063414bf3899061010401602060405180830381600087803b15801561024357600080fd5b505af1158015610257573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061027b9190610447565b979650505050505050565b604080516001600160a01b038481166024830152604480830185905283518084039091018152606490920183526020820180516001600160e01b031663095ea7b360e01b17905291516000928392908716916102e29190610460565b6000604051808303816000865af19150503d806000811461031f576040519150601f19603f3d011682016040523d82523d6000602084013e610324565b606091505b509150915081801561034e57508051158061034e57508080602001905181019061034e919061047c565b61037f5760405162461bcd60e51b8152602060048201526002602482015261534160f01b6044820152606401610121565b5050505050565b80356001600160a01b038116811461039d57600080fd5b919050565b600080600080608085870312156103b857600080fd5b6103c185610386565b93506103cf60208601610386565b93969395505050506040820135916060013590565b60005b838110156103ff5781810151838201526020016103e7565b8381111561040e576000848401525b50505050565b60208152600082518060208401526104338160408501602087016103e4565b601f01601f19169190910160400192915050565b60006020828403121561045957600080fd5b5051919050565b600082516104728184602087016103e4565b9190910192915050565b60006020828403121561048e57600080fd5b8151801515811461049e57600080fd5b939250505056fea26469706673582212207c0a623e0d511d7a7d136f1dc1527349ac0ec4f885354e7efbc1e697f8fce69664736f6c63430008080033";

type UniswapConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: UniswapConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class Uniswap__factory extends ContractFactory {
  constructor(...args: UniswapConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    _swapRouter: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<Uniswap> {
    return super.deploy(_swapRouter, overrides || {}) as Promise<Uniswap>;
  }
  override getDeployTransaction(
    _swapRouter: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_swapRouter, overrides || {});
  }
  override attach(address: string): Uniswap {
    return super.attach(address) as Uniswap;
  }
  override connect(signer: Signer): Uniswap__factory {
    return super.connect(signer) as Uniswap__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): UniswapInterface {
    return new utils.Interface(_abi) as UniswapInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): Uniswap {
    return new Contract(address, _abi, signerOrProvider) as Uniswap;
  }
}
