/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BytesLike,
  CallOverrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type {
  FunctionFragment,
  Result,
  EventFragment,
} from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "../../../../../common";

export interface ITemporarilyPausableInterface extends utils.Interface {
  functions: {
    "getPausedState()": FunctionFragment;
  };

  getFunction(nameOrSignatureOrTopic: "getPausedState"): FunctionFragment;

  encodeFunctionData(
    functionFragment: "getPausedState",
    values?: undefined
  ): string;

  decodeFunctionResult(
    functionFragment: "getPausedState",
    data: BytesLike
  ): Result;

  events: {
    "PausedStateChanged(bool)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "PausedStateChanged"): EventFragment;
}

export interface PausedStateChangedEventObject {
  paused: boolean;
}
export type PausedStateChangedEvent = TypedEvent<
  [boolean],
  PausedStateChangedEventObject
>;

export type PausedStateChangedEventFilter =
  TypedEventFilter<PausedStateChangedEvent>;

export interface ITemporarilyPausable extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: ITemporarilyPausableInterface;

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
    getPausedState(
      overrides?: CallOverrides
    ): Promise<
      [boolean, BigNumber, BigNumber] & {
        paused: boolean;
        pauseWindowEndTime: BigNumber;
        bufferPeriodEndTime: BigNumber;
      }
    >;
  };

  getPausedState(
    overrides?: CallOverrides
  ): Promise<
    [boolean, BigNumber, BigNumber] & {
      paused: boolean;
      pauseWindowEndTime: BigNumber;
      bufferPeriodEndTime: BigNumber;
    }
  >;

  callStatic: {
    getPausedState(
      overrides?: CallOverrides
    ): Promise<
      [boolean, BigNumber, BigNumber] & {
        paused: boolean;
        pauseWindowEndTime: BigNumber;
        bufferPeriodEndTime: BigNumber;
      }
    >;
  };

  filters: {
    "PausedStateChanged(bool)"(paused?: null): PausedStateChangedEventFilter;
    PausedStateChanged(paused?: null): PausedStateChangedEventFilter;
  };

  estimateGas: {
    getPausedState(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    getPausedState(overrides?: CallOverrides): Promise<PopulatedTransaction>;
  };
}
