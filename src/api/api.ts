import httpClient from './request';

interface ICommonRes<T> {
  code: number;
  data: T;
}
interface ITokenInfoRes {
  ezatNetWorth: number;
  ezatSupply: number;
  ezbtNetWorth: number;
  ezbtSupply: number;
  ezioSupply: number;
  id: number;
  recordTime: string;
}

export function queryTokenInfo() {
  // return httpClient.get<ITokenInfoRes[]>('/api/queryTokenInfo');
  return httpClient.get<ICommonRes<ITokenInfoRes[]>>('/api/ezioGroup24HChange');
}

interface ITotalNetWorth {
  groupTime: string;
  totalNetWorth: number;
  ethPrice: number;
}

// stEth的价格变化和金库总值
export function queryTotalNetWorth() {
  // return httpClient.get<ICommonRes<ITotalNetWorth[]>>('/api/queryTotalNetWorth');
  return httpClient.get<ICommonRes<ITotalNetWorth[]>>('/api/ezioGroupTotalWorth');
}

interface ITokenGroup {
  ezatNetWorth: number;
  ezatRate: number;
  ezatSupply: number;
  ezbtNetWorth: number;
  ezbtSupply: number;
  groupTime: string;
}
// 市值曲线
export function queryTokenGroup() {
  // return httpClient.get<ITokenGroup[]>('/api/queryTokenGroup');
  return httpClient.get<ICommonRes<ITokenGroup[]>>('/api/v1/ezioGroupSupply');
}

interface ITotalPurchase {
  purchaseType: string;
  purchaseQty: number;
  purchaseAmt: number;
}
export function queryTotalPurchaseBy24h() {
  // return httpClient.get<ITotalPurchase[]>('/api/queryTotalPurchaseBy24h');
  return httpClient.get<ICommonRes<ITotalPurchase[]>>('/api/v1/ezioGroupPurchase');
}

// 金库市值

interface ITreasuryValue {
  code: number;
  message: string;
  data: { groupTime: string; treasuryValue: string }[];
}

export function queryTreasuryValue() {
  return httpClient.get<ITreasuryValue>('/api/v1/lineGraph/treasuryValue');
}

// ab总净值

interface IAbTotalnetworth {
  code: number;
  message: string;
  data: { groupTime: string; ezUsdTotalnetworth: number; ezMaticTotalnetworth: number }[];
}

export function queryAbTotalnetworth() {
  return httpClient.get<IAbTotalnetworth>('api/v1/lineGraph/abTotalnetworth');
}

// ezMATIC PRICE vs stMATIC PRICE ezMATIC 价格 vs stMATIC 价格

interface IMaticPrice {
  code: number;
  message: string;
  data: { groupTime: string; ezMaticPrice: number; stMaticPrice: number; ezUsdRate: number }[];
}

export function queryMaticPrice() {
  return httpClient.get<IMaticPrice>('api/v1/lineGraph/maticPrice');
}

// AccumulatedFees24H 过去24h手续费收入

interface IAccumulatedFees24H {
  code: number;
  message: string;
  data: { fees24H: string };
}

export function queryAccumulatedFees24H() {
  return httpClient.get<IAccumulatedFees24H>('api/v1/group/accumulatedFees24H');
}

// DailyAccumulatedFees 按日分组手续费

interface IDailyAccumulatedFees {
  code: number;
  message: string;
  data: { groupTime: string; dailyAccumulatedFees: number };
}

export function queryDailyAccumulatedFees() {
  return httpClient.get<IDailyAccumulatedFees>('api/v1/barChart/dailyAccumulatedFees');
}

// AccumulatedFees 累计EZIO手续费

interface IAccumulatedFees {
  code: number;
  message: string;
  data: { groupTime: string; accumulatedFees: number };
}

export function queryAccumulatedFees() {
  return httpClient.get<IAccumulatedFees>('api/v1/lineGraph/accumulatedFees');
}
