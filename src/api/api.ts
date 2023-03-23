import { NETWORK_ID } from './../views/wallet/helpers/constant';
import useWallet from '../views/hooks/useWallet';
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

function backNetwork(networkId: number | undefined) {
  if (networkId === NETWORK_ID.arbitrum) {
    return 'arbitrum';
  } else {
    return 'polygon';
  }
}

export function queryTokenInfo() {
  // return httpClient.get<ITokenInfoRes[]>('/api/queryTokenInfo');
  return httpClient.get<ICommonRes<ITokenInfoRes[]>>('/api/v1/ezioGroup24HChange');
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
export function queryTokenGroup(QueryType: string, networkId: number | undefined) {
  // return httpClient.get<ITokenGroup[]>('/api/queryTokenGroup');
  return httpClient.get<ICommonRes<ITokenGroup[]>>(`/api/${backNetwork(networkId)}/ezioGroupSupply`, {
    params: { QueryType },
  });
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

export function queryTreasuryValue(QueryType: string, networkId: number | undefined) {
  return httpClient.get<ITreasuryValue>(`/api/${backNetwork(networkId)}/lineGraph/treasuryValue`, {
    params: { QueryType },
  });
}

// ab总净值

interface IAbTotalnetworth {
  code: number;
  message: string;
  data: { groupTime: string; ezUsdTotalnetworth: number; ezMaticTotalnetworth: number }[];
}

export function queryAbTotalnetworth(QueryType: string, networkId: number | undefined) {
  return httpClient.get<IAbTotalnetworth>(`api/${backNetwork(networkId)}/lineGraph/abTotalnetworth`, {
    params: { QueryType },
  });
}

interface IMaticPrice {
  code: number;
  message: string;
  data: { groupTime: string; ezMaticPrice: number; stMaticPrice: number; ezUsdRate: number }[];
}

export function queryMaticPrice(QueryType: string, networkId: number | undefined) {
  return httpClient.get<IMaticPrice>(`api/${backNetwork(networkId)}/lineGraph/maticPrice`, { params: { QueryType } });
}

// AccumulatedFees24H 过去24h手续费收入

interface IAccumulatedFees24H {
  code: number;
  message: string;
  data: { fees24H: string };
}

export function queryAccumulatedFees24H(networkId: number | undefined) {
  return httpClient.get<IAccumulatedFees24H>(`api/${backNetwork(networkId)}/group/accumulatedFees24H`);
}

// DailyAccumulatedFees 按日分组手续费

interface IDailyAccumulatedFees {
  code: number;
  message: string;
  data: { groupTime: string; dailyAccumulatedFees: number }[];
}

export function queryDailyAccumulatedFees(networkId: number | undefined) {
  return httpClient.get<IDailyAccumulatedFees>(`api/${backNetwork(networkId)}/barChart/dailyAccumulatedFees`);
}

// AccumulatedFees 累计EZIO手续费

interface IAccumulatedFees {
  code: number;
  message: string;
  data: { groupTime: string; accumulatedFees: number }[];
}

export function queryAccumulatedFees(networkId: number | undefined) {
  return httpClient.get<IAccumulatedFees>(`api/${backNetwork(networkId)}/lineGraph/accumulatedFees`);
}

// 统计ezWETH的价格和下折价格

interface IConvertDownPrice {
  code: number;
  message: string;
  data: { ezMaticPrice: number; convertDownPrice: number; groupTime: string }[];
}

export function convertDownPrice(networkId: number | undefined) {
  return httpClient.get<IConvertDownPrice>(`/api/${backNetwork(networkId)}/lineGraph/convertDownPrice`);
}
