import { NETWORK_TYPE } from '../views/wallet/helpers/constant';
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
  return httpClient.get<ICommonRes<ITokenInfoRes[]>>('/api/v1/ezioGroup24HChange');
}

interface ITotalNetWorth {
  groupTime: string;
  totalNetWorth: number;
  ethPrice: number;
}

// stEth的价格变化和金库总值
export function queryTotalNetWorth() {
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
export function queryTokenGroup(QueryType: string, networkName: NETWORK_TYPE | undefined) {
  return httpClient.get<ICommonRes<ITokenGroup[]>>(`/api/${networkName}/ezioGroupSupply`, {
    params: { QueryType },
  });
}

interface ITotalPurchase {
  purchaseType: string;
  purchaseQty: number;
  purchaseAmt: number;
}
export function queryTotalPurchaseBy24h() {
  return httpClient.get<ICommonRes<ITotalPurchase[]>>('/api/v1/ezioGroupPurchase');
}

// 金库市值
interface IVaultValue {
  code: number;
  message: string;
  data: { groupTime: string; treasuryValue: string }[];
}

export function queryVaultValue(QueryType: string, networkName: NETWORK_TYPE | undefined) {
  return httpClient.get<IVaultValue>(`/api/${networkName}/lineGraph/treasuryValue`, {
    params: { QueryType },
  });
}

// ab总净值
interface IAbTotalNetworth {
  code: number;
  message: string;
  data: {
    groupTime: string;
    ezUsdTotalnetworth: number;
    ezMaticTotalnetworth: number;
    usdcValue: number;
    wstethValue: number;
  }[];
}

export function queryAbTotalNetworth(QueryType: string, networkName: NETWORK_TYPE | undefined) {
  return httpClient.get<IAbTotalNetworth>(`api/${networkName}/lineGraph/abTotalnetworth`, {
    params: { QueryType },
  });
}

interface IMaticPrice {
  code: number;
  message: string;
  data: {
    groupTime: string;
    ezMaticPrice: number;
    stMaticPrice: number;
    ezUsdRate: number;
    ezE2LpRate: number;
    e2lpSum: number;
    wstethSum: number;
  }[];
}

export function queryMaticPrice(QueryType: string, networkName: NETWORK_TYPE | undefined) {
  return httpClient.get<IMaticPrice>(`api/${networkName}/lineGraph/maticPrice`, { params: { QueryType } });
}

// AccumulatedFees24H 过去24h手续费收入
interface IAccumulatedFees24H {
  code: number;
  message: string;
  data: { fees24H: number };
}

export function queryAccumulatedFees24H(networkName: NETWORK_TYPE | undefined) {
  return httpClient.get<IAccumulatedFees24H>(`api/${networkName}/group/accumulatedFees24H`);
}

// DailyAccumulatedFees 按日分组手续费
interface IDailyAccumulatedFees {
  code: number;
  message: string;
  data: { groupTime: string; dailyAccumulatedFees: number }[];
}

export function queryDailyAccumulatedFees(networkName: NETWORK_TYPE | undefined) {
  return httpClient.get<IDailyAccumulatedFees>(`api/${networkName}/barChart/dailyAccumulatedFees`);
}

// AccumulatedFees 累计EZIO手续费
interface IAccumulatedFees {
  code: number;
  message: string;
  data: { groupTime: string; accumulatedFees: number }[];
}

export function queryAccumulatedFees(networkName: NETWORK_TYPE | undefined) {
  return httpClient.get<IAccumulatedFees>(`api/${networkName}/lineGraph/accumulatedFees`);
}

// 统计E2LP的价格和下折价格
interface IConvertDownPrice {
  code: number;
  message: string;
  data: { ezMaticPrice: number; convertDownPrice: number; groupTime: string }[];
}

export function convertDownPrice(networkName: NETWORK_TYPE | undefined) {
  return httpClient.get<IConvertDownPrice>(`/api/${networkName}/lineGraph/convertDownPrice`);
}
