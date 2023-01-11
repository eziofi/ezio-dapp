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
  return httpClient.get<ICommonRes<ITokenGroup[]>>('/api/ezioGroupSupply');
}

interface ITotalPurchase {
  purchaseType: string;
  purchaseQty: number;
  purchaseAmt: number;
}
export function queryTotalPurchaseBy24h() {
  // return httpClient.get<ITotalPurchase[]>('/api/queryTotalPurchaseBy24h');
  return httpClient.get<ICommonRes<ITotalPurchase[]>>('/api/ezioGroupPurchase');
}
