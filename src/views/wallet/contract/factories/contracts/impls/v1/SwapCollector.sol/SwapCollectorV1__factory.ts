/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../../../common";
import type {
  SwapCollectorV1,
  SwapCollectorV1Interface,
} from "../../../../../contracts/impls/v1/SwapCollector.sol/SwapCollectorV1";

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
] as const;

const _bytecode =
  "0x6080604052348015600f57600080fd5b50603f80601d6000396000f3fe6080604052600080fdfea264697066735822122085db98a121da839b6889ed111864f379c2d52731121d96b7f6ac916a1a2ff2fd64736f6c63430008080033";

type SwapCollectorV1ConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: SwapCollectorV1ConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class SwapCollectorV1__factory extends ContractFactory {
  constructor(...args: SwapCollectorV1ConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<SwapCollectorV1> {
    return super.deploy(overrides || {}) as Promise<SwapCollectorV1>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): SwapCollectorV1 {
    return super.attach(address) as SwapCollectorV1;
  }
  override connect(signer: Signer): SwapCollectorV1__factory {
    return super.connect(signer) as SwapCollectorV1__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): SwapCollectorV1Interface {
    return new utils.Interface(_abi) as SwapCollectorV1Interface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): SwapCollectorV1 {
    return new Contract(address, _abi, signerOrProvider) as SwapCollectorV1;
  }
}
