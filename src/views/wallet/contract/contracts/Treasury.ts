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
} from "../common";

export interface TreasuryInterface extends utils.Interface {
  functions: {
    "DEFAULT_ADMIN_ROLE()": FunctionFragment;
    "GOVERNOR_ROLE()": FunctionFragment;
    "LEVERAGE_DENOMINATOR()": FunctionFragment;
    "PURCHASE_ROLE()": FunctionFragment;
    "REWARD_RATE_DENOMINATOR()": FunctionFragment;
    "burn(uint8,address,uint256)": FunctionFragment;
    "check()": FunctionFragment;
    "ethPrice()": FunctionFragment;
    "getRoleAdmin(bytes32)": FunctionFragment;
    "getRoleMember(bytes32,uint256)": FunctionFragment;
    "getRoleMemberCount(bytes32)": FunctionFragment;
    "grantRole(bytes32,address)": FunctionFragment;
    "hasRole(bytes32,address)": FunctionFragment;
    "incPooledAmount(uint8,uint256)": FunctionFragment;
    "initialize(address)": FunctionFragment;
    "interestRate()": FunctionFragment;
    "invest()": FunctionFragment;
    "leverage()": FunctionFragment;
    "matchedA()": FunctionFragment;
    "matchedB()": FunctionFragment;
    "mint(uint8,address,uint256)": FunctionFragment;
    "pooledA()": FunctionFragment;
    "pooledB()": FunctionFragment;
    "rebase()": FunctionFragment;
    "redeem(uint8,uint256)": FunctionFragment;
    "renounceRole(bytes32,address)": FunctionFragment;
    "revokeRole(bytes32,address)": FunctionFragment;
    "rewardRate()": FunctionFragment;
    "supportsInterface(bytes4)": FunctionFragment;
    "totalNetWorth()": FunctionFragment;
    "totalReserve()": FunctionFragment;
    "transfer(address,uint256)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "DEFAULT_ADMIN_ROLE"
      | "GOVERNOR_ROLE"
      | "LEVERAGE_DENOMINATOR"
      | "PURCHASE_ROLE"
      | "REWARD_RATE_DENOMINATOR"
      | "burn"
      | "check"
      | "ethPrice"
      | "getRoleAdmin"
      | "getRoleMember"
      | "getRoleMemberCount"
      | "grantRole"
      | "hasRole"
      | "incPooledAmount"
      | "initialize"
      | "interestRate"
      | "invest"
      | "leverage"
      | "matchedA"
      | "matchedB"
      | "mint"
      | "pooledA"
      | "pooledB"
      | "rebase"
      | "redeem"
      | "renounceRole"
      | "revokeRole"
      | "rewardRate"
      | "supportsInterface"
      | "totalNetWorth"
      | "totalReserve"
      | "transfer"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "DEFAULT_ADMIN_ROLE",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "GOVERNOR_ROLE",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "LEVERAGE_DENOMINATOR",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "PURCHASE_ROLE",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "REWARD_RATE_DENOMINATOR",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "burn",
    values: [BigNumberish, string, BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "check", values?: undefined): string;
  encodeFunctionData(functionFragment: "ethPrice", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "getRoleAdmin",
    values: [BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "getRoleMember",
    values: [BytesLike, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getRoleMemberCount",
    values: [BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "grantRole",
    values: [BytesLike, string]
  ): string;
  encodeFunctionData(
    functionFragment: "hasRole",
    values: [BytesLike, string]
  ): string;
  encodeFunctionData(
    functionFragment: "incPooledAmount",
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "initialize", values: [string]): string;
  encodeFunctionData(
    functionFragment: "interestRate",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "invest", values?: undefined): string;
  encodeFunctionData(functionFragment: "leverage", values?: undefined): string;
  encodeFunctionData(functionFragment: "matchedA", values?: undefined): string;
  encodeFunctionData(functionFragment: "matchedB", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "mint",
    values: [BigNumberish, string, BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "pooledA", values?: undefined): string;
  encodeFunctionData(functionFragment: "pooledB", values?: undefined): string;
  encodeFunctionData(functionFragment: "rebase", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "redeem",
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "renounceRole",
    values: [BytesLike, string]
  ): string;
  encodeFunctionData(
    functionFragment: "revokeRole",
    values: [BytesLike, string]
  ): string;
  encodeFunctionData(
    functionFragment: "rewardRate",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "supportsInterface",
    values: [BytesLike]
  ): string;
  encodeFunctionData(
    functionFragment: "totalNetWorth",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "totalReserve",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "transfer",
    values: [string, BigNumberish]
  ): string;

  decodeFunctionResult(
    functionFragment: "DEFAULT_ADMIN_ROLE",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "GOVERNOR_ROLE",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "LEVERAGE_DENOMINATOR",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "PURCHASE_ROLE",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "REWARD_RATE_DENOMINATOR",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "burn", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "check", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "ethPrice", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getRoleAdmin",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getRoleMember",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getRoleMemberCount",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "grantRole", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "hasRole", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "incPooledAmount",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "initialize", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "interestRate",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "invest", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "leverage", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "matchedA", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "matchedB", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "mint", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "pooledA", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "pooledB", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "rebase", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "redeem", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "renounceRole",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "revokeRole", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "rewardRate", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "supportsInterface",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "totalNetWorth",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "totalReserve",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "transfer", data: BytesLike): Result;

  events: {
    "Buy(uint256,uint256,uint256)": EventFragment;
    "Invest(uint256,uint256)": EventFragment;
    "RoleAdminChanged(bytes32,bytes32,bytes32)": EventFragment;
    "RoleGranted(bytes32,address,address)": EventFragment;
    "RoleRevoked(bytes32,address,address)": EventFragment;
    "Sale(uint256,uint256,uint256)": EventFragment;
    "Transfer(address,uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "Buy"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Invest"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "RoleAdminChanged"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "RoleGranted"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "RoleRevoked"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Sale"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "Transfer"): EventFragment;
}

export interface BuyEventObject {
  amt: BigNumber;
  ethQty: BigNumber;
  totalReserve: BigNumber;
}
export type BuyEvent = TypedEvent<
  [BigNumber, BigNumber, BigNumber],
  BuyEventObject
>;

export type BuyEventFilter = TypedEventFilter<BuyEvent>;

export interface InvestEventObject {
  amountA: BigNumber;
  amountB: BigNumber;
}
export type InvestEvent = TypedEvent<[BigNumber, BigNumber], InvestEventObject>;

export type InvestEventFilter = TypedEventFilter<InvestEvent>;

export interface RoleAdminChangedEventObject {
  role: string;
  previousAdminRole: string;
  newAdminRole: string;
}
export type RoleAdminChangedEvent = TypedEvent<
  [string, string, string],
  RoleAdminChangedEventObject
>;

export type RoleAdminChangedEventFilter =
  TypedEventFilter<RoleAdminChangedEvent>;

export interface RoleGrantedEventObject {
  role: string;
  account: string;
  sender: string;
}
export type RoleGrantedEvent = TypedEvent<
  [string, string, string],
  RoleGrantedEventObject
>;

export type RoleGrantedEventFilter = TypedEventFilter<RoleGrantedEvent>;

export interface RoleRevokedEventObject {
  role: string;
  account: string;
  sender: string;
}
export type RoleRevokedEvent = TypedEvent<
  [string, string, string],
  RoleRevokedEventObject
>;

export type RoleRevokedEventFilter = TypedEventFilter<RoleRevokedEvent>;

export interface SaleEventObject {
  ethQty: BigNumber;
  amt: BigNumber;
  totalReserve: BigNumber;
}
export type SaleEvent = TypedEvent<
  [BigNumber, BigNumber, BigNumber],
  SaleEventObject
>;

export type SaleEventFilter = TypedEventFilter<SaleEvent>;

export interface TransferEventObject {
  to: string;
  qty: BigNumber;
}
export type TransferEvent = TypedEvent<
  [string, BigNumber],
  TransferEventObject
>;

export type TransferEventFilter = TypedEventFilter<TransferEvent>;

export interface Treasury extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: TreasuryInterface;

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
    DEFAULT_ADMIN_ROLE(overrides?: CallOverrides): Promise<[string]>;

    GOVERNOR_ROLE(overrides?: CallOverrides): Promise<[string]>;

    LEVERAGE_DENOMINATOR(overrides?: CallOverrides): Promise<[BigNumber]>;

    PURCHASE_ROLE(overrides?: CallOverrides): Promise<[string]>;

    REWARD_RATE_DENOMINATOR(overrides?: CallOverrides): Promise<[BigNumber]>;

    burn(
      type_: BigNumberish,
      from_: string,
      qty_: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    check(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    ethPrice(overrides?: CallOverrides): Promise<[BigNumber]>;

    getRoleAdmin(role: BytesLike, overrides?: CallOverrides): Promise<[string]>;

    getRoleMember(
      role: BytesLike,
      index: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[string]>;

    getRoleMemberCount(
      role: BytesLike,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    grantRole(
      role: BytesLike,
      account: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    hasRole(
      role: BytesLike,
      account: string,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    incPooledAmount(
      type_: BigNumberish,
      amt_: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    initialize(
      purchase_: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    interestRate(overrides?: CallOverrides): Promise<[BigNumber]>;

    invest(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    leverage(overrides?: CallOverrides): Promise<[BigNumber]>;

    matchedA(overrides?: CallOverrides): Promise<[BigNumber]>;

    matchedB(overrides?: CallOverrides): Promise<[BigNumber]>;

    mint(
      type_: BigNumberish,
      to_: string,
      qty_: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    pooledA(overrides?: CallOverrides): Promise<[BigNumber]>;

    pooledB(overrides?: CallOverrides): Promise<[BigNumber]>;

    rebase(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    redeem(
      type_: BigNumberish,
      amt_: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    renounceRole(
      role: BytesLike,
      account: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    revokeRole(
      role: BytesLike,
      account: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    rewardRate(overrides?: CallOverrides): Promise<[BigNumber]>;

    supportsInterface(
      interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    totalNetWorth(overrides?: CallOverrides): Promise<[BigNumber]>;

    totalReserve(overrides?: CallOverrides): Promise<[BigNumber]>;

    transfer(
      to_: string,
      qty_: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  DEFAULT_ADMIN_ROLE(overrides?: CallOverrides): Promise<string>;

  GOVERNOR_ROLE(overrides?: CallOverrides): Promise<string>;

  LEVERAGE_DENOMINATOR(overrides?: CallOverrides): Promise<BigNumber>;

  PURCHASE_ROLE(overrides?: CallOverrides): Promise<string>;

  REWARD_RATE_DENOMINATOR(overrides?: CallOverrides): Promise<BigNumber>;

  burn(
    type_: BigNumberish,
    from_: string,
    qty_: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  check(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  ethPrice(overrides?: CallOverrides): Promise<BigNumber>;

  getRoleAdmin(role: BytesLike, overrides?: CallOverrides): Promise<string>;

  getRoleMember(
    role: BytesLike,
    index: BigNumberish,
    overrides?: CallOverrides
  ): Promise<string>;

  getRoleMemberCount(
    role: BytesLike,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  grantRole(
    role: BytesLike,
    account: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  hasRole(
    role: BytesLike,
    account: string,
    overrides?: CallOverrides
  ): Promise<boolean>;

  incPooledAmount(
    type_: BigNumberish,
    amt_: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  initialize(
    purchase_: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  interestRate(overrides?: CallOverrides): Promise<BigNumber>;

  invest(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  leverage(overrides?: CallOverrides): Promise<BigNumber>;

  matchedA(overrides?: CallOverrides): Promise<BigNumber>;

  matchedB(overrides?: CallOverrides): Promise<BigNumber>;

  mint(
    type_: BigNumberish,
    to_: string,
    qty_: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  pooledA(overrides?: CallOverrides): Promise<BigNumber>;

  pooledB(overrides?: CallOverrides): Promise<BigNumber>;

  rebase(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  redeem(
    type_: BigNumberish,
    amt_: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  renounceRole(
    role: BytesLike,
    account: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  revokeRole(
    role: BytesLike,
    account: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  rewardRate(overrides?: CallOverrides): Promise<BigNumber>;

  supportsInterface(
    interfaceId: BytesLike,
    overrides?: CallOverrides
  ): Promise<boolean>;

  totalNetWorth(overrides?: CallOverrides): Promise<BigNumber>;

  totalReserve(overrides?: CallOverrides): Promise<BigNumber>;

  transfer(
    to_: string,
    qty_: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    DEFAULT_ADMIN_ROLE(overrides?: CallOverrides): Promise<string>;

    GOVERNOR_ROLE(overrides?: CallOverrides): Promise<string>;

    LEVERAGE_DENOMINATOR(overrides?: CallOverrides): Promise<BigNumber>;

    PURCHASE_ROLE(overrides?: CallOverrides): Promise<string>;

    REWARD_RATE_DENOMINATOR(overrides?: CallOverrides): Promise<BigNumber>;

    burn(
      type_: BigNumberish,
      from_: string,
      qty_: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    check(overrides?: CallOverrides): Promise<void>;

    ethPrice(overrides?: CallOverrides): Promise<BigNumber>;

    getRoleAdmin(role: BytesLike, overrides?: CallOverrides): Promise<string>;

    getRoleMember(
      role: BytesLike,
      index: BigNumberish,
      overrides?: CallOverrides
    ): Promise<string>;

    getRoleMemberCount(
      role: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    grantRole(
      role: BytesLike,
      account: string,
      overrides?: CallOverrides
    ): Promise<void>;

    hasRole(
      role: BytesLike,
      account: string,
      overrides?: CallOverrides
    ): Promise<boolean>;

    incPooledAmount(
      type_: BigNumberish,
      amt_: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    initialize(purchase_: string, overrides?: CallOverrides): Promise<void>;

    interestRate(overrides?: CallOverrides): Promise<BigNumber>;

    invest(overrides?: CallOverrides): Promise<void>;

    leverage(overrides?: CallOverrides): Promise<BigNumber>;

    matchedA(overrides?: CallOverrides): Promise<BigNumber>;

    matchedB(overrides?: CallOverrides): Promise<BigNumber>;

    mint(
      type_: BigNumberish,
      to_: string,
      qty_: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    pooledA(overrides?: CallOverrides): Promise<BigNumber>;

    pooledB(overrides?: CallOverrides): Promise<BigNumber>;

    rebase(overrides?: CallOverrides): Promise<void>;

    redeem(
      type_: BigNumberish,
      amt_: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    renounceRole(
      role: BytesLike,
      account: string,
      overrides?: CallOverrides
    ): Promise<void>;

    revokeRole(
      role: BytesLike,
      account: string,
      overrides?: CallOverrides
    ): Promise<void>;

    rewardRate(overrides?: CallOverrides): Promise<BigNumber>;

    supportsInterface(
      interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<boolean>;

    totalNetWorth(overrides?: CallOverrides): Promise<BigNumber>;

    totalReserve(overrides?: CallOverrides): Promise<BigNumber>;

    transfer(
      to_: string,
      qty_: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    "Buy(uint256,uint256,uint256)"(
      amt?: BigNumberish | null,
      ethQty?: BigNumberish | null,
      totalReserve?: BigNumberish | null
    ): BuyEventFilter;
    Buy(
      amt?: BigNumberish | null,
      ethQty?: BigNumberish | null,
      totalReserve?: BigNumberish | null
    ): BuyEventFilter;

    "Invest(uint256,uint256)"(
      amountA?: BigNumberish | null,
      amountB?: BigNumberish | null
    ): InvestEventFilter;
    Invest(
      amountA?: BigNumberish | null,
      amountB?: BigNumberish | null
    ): InvestEventFilter;

    "RoleAdminChanged(bytes32,bytes32,bytes32)"(
      role?: BytesLike | null,
      previousAdminRole?: BytesLike | null,
      newAdminRole?: BytesLike | null
    ): RoleAdminChangedEventFilter;
    RoleAdminChanged(
      role?: BytesLike | null,
      previousAdminRole?: BytesLike | null,
      newAdminRole?: BytesLike | null
    ): RoleAdminChangedEventFilter;

    "RoleGranted(bytes32,address,address)"(
      role?: BytesLike | null,
      account?: string | null,
      sender?: string | null
    ): RoleGrantedEventFilter;
    RoleGranted(
      role?: BytesLike | null,
      account?: string | null,
      sender?: string | null
    ): RoleGrantedEventFilter;

    "RoleRevoked(bytes32,address,address)"(
      role?: BytesLike | null,
      account?: string | null,
      sender?: string | null
    ): RoleRevokedEventFilter;
    RoleRevoked(
      role?: BytesLike | null,
      account?: string | null,
      sender?: string | null
    ): RoleRevokedEventFilter;

    "Sale(uint256,uint256,uint256)"(
      ethQty?: BigNumberish | null,
      amt?: BigNumberish | null,
      totalReserve?: BigNumberish | null
    ): SaleEventFilter;
    Sale(
      ethQty?: BigNumberish | null,
      amt?: BigNumberish | null,
      totalReserve?: BigNumberish | null
    ): SaleEventFilter;

    "Transfer(address,uint256)"(
      to?: string | null,
      qty?: BigNumberish | null
    ): TransferEventFilter;
    Transfer(
      to?: string | null,
      qty?: BigNumberish | null
    ): TransferEventFilter;
  };

  estimateGas: {
    DEFAULT_ADMIN_ROLE(overrides?: CallOverrides): Promise<BigNumber>;

    GOVERNOR_ROLE(overrides?: CallOverrides): Promise<BigNumber>;

    LEVERAGE_DENOMINATOR(overrides?: CallOverrides): Promise<BigNumber>;

    PURCHASE_ROLE(overrides?: CallOverrides): Promise<BigNumber>;

    REWARD_RATE_DENOMINATOR(overrides?: CallOverrides): Promise<BigNumber>;

    burn(
      type_: BigNumberish,
      from_: string,
      qty_: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    check(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    ethPrice(overrides?: CallOverrides): Promise<BigNumber>;

    getRoleAdmin(
      role: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getRoleMember(
      role: BytesLike,
      index: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getRoleMemberCount(
      role: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    grantRole(
      role: BytesLike,
      account: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    hasRole(
      role: BytesLike,
      account: string,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    incPooledAmount(
      type_: BigNumberish,
      amt_: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    initialize(
      purchase_: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    interestRate(overrides?: CallOverrides): Promise<BigNumber>;

    invest(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    leverage(overrides?: CallOverrides): Promise<BigNumber>;

    matchedA(overrides?: CallOverrides): Promise<BigNumber>;

    matchedB(overrides?: CallOverrides): Promise<BigNumber>;

    mint(
      type_: BigNumberish,
      to_: string,
      qty_: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    pooledA(overrides?: CallOverrides): Promise<BigNumber>;

    pooledB(overrides?: CallOverrides): Promise<BigNumber>;

    rebase(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    redeem(
      type_: BigNumberish,
      amt_: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    renounceRole(
      role: BytesLike,
      account: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    revokeRole(
      role: BytesLike,
      account: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    rewardRate(overrides?: CallOverrides): Promise<BigNumber>;

    supportsInterface(
      interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    totalNetWorth(overrides?: CallOverrides): Promise<BigNumber>;

    totalReserve(overrides?: CallOverrides): Promise<BigNumber>;

    transfer(
      to_: string,
      qty_: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    DEFAULT_ADMIN_ROLE(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    GOVERNOR_ROLE(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    LEVERAGE_DENOMINATOR(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    PURCHASE_ROLE(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    REWARD_RATE_DENOMINATOR(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    burn(
      type_: BigNumberish,
      from_: string,
      qty_: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    check(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    ethPrice(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getRoleAdmin(
      role: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getRoleMember(
      role: BytesLike,
      index: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getRoleMemberCount(
      role: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    grantRole(
      role: BytesLike,
      account: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    hasRole(
      role: BytesLike,
      account: string,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    incPooledAmount(
      type_: BigNumberish,
      amt_: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    initialize(
      purchase_: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    interestRate(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    invest(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    leverage(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    matchedA(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    matchedB(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    mint(
      type_: BigNumberish,
      to_: string,
      qty_: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    pooledA(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    pooledB(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    rebase(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    redeem(
      type_: BigNumberish,
      amt_: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    renounceRole(
      role: BytesLike,
      account: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    revokeRole(
      role: BytesLike,
      account: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    rewardRate(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    supportsInterface(
      interfaceId: BytesLike,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    totalNetWorth(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    totalReserve(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    transfer(
      to_: string,
      qty_: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}
