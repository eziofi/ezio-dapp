/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type { FunctionFragment, Result } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "../../common";

export type SingleSwapStruct = {
  poolId: PromiseOrValue<BytesLike>;
  kind: PromiseOrValue<BigNumberish>;
  assetIn: PromiseOrValue<string>;
  assetOut: PromiseOrValue<string>;
  amount: PromiseOrValue<BigNumberish>;
  userData: PromiseOrValue<BytesLike>;
};

export type SingleSwapStructOutput = [
  string,
  number,
  string,
  string,
  BigNumber,
  string
] & {
  poolId: string;
  kind: number;
  assetIn: string;
  assetOut: string;
  amount: BigNumber;
  userData: string;
};

export type FundManagementStruct = {
  sender: PromiseOrValue<string>;
  fromInternalBalance: PromiseOrValue<boolean>;
  recipient: PromiseOrValue<string>;
  toInternalBalance: PromiseOrValue<boolean>;
};

export type FundManagementStructOutput = [string, boolean, string, boolean] & {
  sender: string;
  fromInternalBalance: boolean;
  recipient: string;
  toInternalBalance: boolean;
};

export interface BalancerSwapInterface extends utils.Interface {
  functions: {
    "POOL_ADDRESS()": FunctionFragment;
    "POOL_ID()": FunctionFragment;
    "swap((bytes32,uint8,address,address,uint256,bytes),(address,bool,address,bool),uint256,uint256)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic: "POOL_ADDRESS" | "POOL_ID" | "swap"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "POOL_ADDRESS",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "POOL_ID", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "swap",
    values: [
      SingleSwapStruct,
      FundManagementStruct,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>
    ]
  ): string;

  decodeFunctionResult(
    functionFragment: "POOL_ADDRESS",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "POOL_ID", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "swap", data: BytesLike): Result;

  events: {};
}

export interface BalancerSwap extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: BalancerSwapInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    POOL_ADDRESS(overrides?: CallOverrides): Promise<[string]>;

    POOL_ID(overrides?: CallOverrides): Promise<[BigNumber]>;

    swap(
      singleSwap: SingleSwapStruct,
      funds: FundManagementStruct,
      limit: PromiseOrValue<BigNumberish>,
      deadline: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  POOL_ADDRESS(overrides?: CallOverrides): Promise<string>;

  POOL_ID(overrides?: CallOverrides): Promise<BigNumber>;

  swap(
    singleSwap: SingleSwapStruct,
    funds: FundManagementStruct,
    limit: PromiseOrValue<BigNumberish>,
    deadline: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    POOL_ADDRESS(overrides?: CallOverrides): Promise<string>;

    POOL_ID(overrides?: CallOverrides): Promise<BigNumber>;

    swap(
      singleSwap: SingleSwapStruct,
      funds: FundManagementStruct,
      limit: PromiseOrValue<BigNumberish>,
      deadline: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  filters: {};

  estimateGas: {
    POOL_ADDRESS(overrides?: CallOverrides): Promise<BigNumber>;

    POOL_ID(overrides?: CallOverrides): Promise<BigNumber>;

    swap(
      singleSwap: SingleSwapStruct,
      funds: FundManagementStruct,
      limit: PromiseOrValue<BigNumberish>,
      deadline: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    POOL_ADDRESS(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    POOL_ID(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    swap(
      singleSwap: SingleSwapStruct,
      funds: FundManagementStruct,
      limit: PromiseOrValue<BigNumberish>,
      deadline: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}
