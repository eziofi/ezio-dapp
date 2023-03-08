import { EzioV1__factory, EzMATICV1, EzMATICV1__factory, EzUSDV1__factory } from '../contract';

import { ERC20_ABI, POLYGON_TOKENS, TOKEN_DECIMAL, TOKEN_TYPE, TRANSFER_TYPE } from './constant';
import { BigNumber, ethers, Signer } from 'ethers';
import type { Provider } from '@ethersproject/providers';
import { formatDecimal, formatString } from './utilities';

import { queryAccumulatedFees24H } from '../../../api/api';

const ezatJson = require('../contract/abi/EzUSDV1.json');
const ezbtJson = require('../contract/abi/EzMATICV1.json');
const ezioJson = require('../contract/abi/EzioV1.json');

const USDC_ADDRESS = POLYGON_TOKENS.USDC;
const USDT_ADDRESS = POLYGON_TOKENS.USDT;
const DAI_ADDRESS = POLYGON_TOKENS.DAI;
const WETH_ADDRESS = POLYGON_TOKENS.WETH;
const STMATIC_ADDRESS = POLYGON_TOKENS.stMATIC;
const USDC_TAKER_ADDRESS = process.env.POLYGON_USDC_TAKER_ADDRESS || '';
const USDT_TAKER_ADDRESS = process.env.POLYGON_USDT_TAKER_ADDRESS || '';
const DAI_TAKER_ADDRESS = process.env.POLYGON_DAI_TAKER_ADDRESS || '';

// export interface Overrides {
//   gasLimit?: BigNumberish | Promise<BigNumberish>;
//   gasPrice?: BigNumberish | Promise<BigNumberish>;
//   maxFeePerGas?: BigNumberish | Promise<BigNumberish>;
//   maxPriorityFeePerGas?: BigNumberish | Promise<BigNumberish>;
//   nonce?: BigNumberish | Promise<BigNumberish>;
//   type?: number;
//   accessList?: AccessListish;
//   customData?: Record<string, any>;
//   ccipReadEnabled?: boolean;
// };
const override = {
  gasLimit: 2000000,
};

export function EzatConnect(signerOrProvider: Signer | Provider) {
  return EzUSDV1__factory.connect(ezatJson.address, signerOrProvider);
}

export function EzbtConnect(signerOrProvider: Signer | Provider): EzMATICV1 {
  return EzMATICV1__factory.connect(ezbtJson.address, signerOrProvider);
}

export function USDTConnect(signerOrProvider: Signer | Provider) {
  return new ethers.Contract(USDT_ADDRESS, ERC20_ABI, signerOrProvider);
}

export function EzioConnect(signerOrProvider: Signer | Provider) {
  return EzioV1__factory.connect(ezioJson.address, signerOrProvider);
}

export function USDCConnect(signerOrProvider: Signer | Provider) {
  return new ethers.Contract(USDC_ADDRESS, ERC20_ABI, signerOrProvider);
}

export function stMaticConnect(signerOrProvider: Signer | Provider) {
  return new ethers.Contract(STMATIC_ADDRESS, ERC20_ABI, signerOrProvider);
}

/**
 * 获取 金库储量
 * @returns 金库储量
 */
export async function treasuryTotalNetWorth(signerOrProvider: Signer | Provider): Promise<BigNumber> {
  const res = await EzioConnect(signerOrProvider).totalNetWorth();
  console.log('treasury Total NetWorth = ' + res.toString());
  return res;
}

/**
 * 获取 金库储量
 * @returns ezUSD总净值
 */
export async function getPooledA(signerOrProvider: Signer | Provider) {
  const data = await EzioConnect(signerOrProvider).pooledA();
  const res = formatDecimal(data, TOKEN_TYPE.USDC).toString();
  console.log('pooledA = ' + res);
  return res;
}

/**
 * 获取 金库储量
 * @returns ezMATIC总净值
 */
export async function ezMATICReverse(signerOrProvider: Signer | Provider) {
  const totalReserve = await EzioConnect(signerOrProvider).totalReserve();
  const stMATICPrice = await EzioConnect(signerOrProvider).getPrice(STMATIC_ADDRESS);
  const res = formatDecimal(
    totalReserve.mul(stMATICPrice),
    TOKEN_TYPE.USDC, // 此参数无用
    2,
    TOKEN_DECIMAL[TOKEN_TYPE.USDC] + TOKEN_DECIMAL[TOKEN_TYPE.stMATIC],
  ).toString();
  console.log('ezMATIC Reverse = ' + res);
  return res;
}

/**
 * 获取 手续费收入
 * @returns 过去24小时手续费汇总 fees24H
 */
export async function commissionIncome() {
  const res = await (await queryAccumulatedFees24H()).data.data.fees24H;
  return res;
}

/**
 * 获取 日利息
 * @returns 日利息
 */
export async function treasuryInterestRate(signerOrProvider: Signer | Provider): Promise<BigNumber> {
  const res = await EzioConnect(signerOrProvider).interestRate();
  console.log('interestRate = ' + res.toString());
  return res;
}
/**
 * 获取 杠杆率
 * @returns 杠杆率
 */
export async function getLeverage(signerOrProvider: Signer | Provider) {
  const res = formatDecimal(await EzioConnect(signerOrProvider).leverage(), TOKEN_TYPE.USDC).toString();
  console.log('leverage = ' + res.toString());
  return res;
}

/**
 * 获取 ezat token 数量
 * @param signerOrProvider
 * @param address 账户地址
 * @returns ezat token 数量
 */
export async function ezatBalanceOf(signerOrProvider: Signer | Provider, address: string): Promise<BigNumber> {
  const res = await EzatConnect(signerOrProvider).balanceOf(address);
  // console.log('ezat Balance = ' + res.toString());
  return res;
}

/**
 * 获取 ezbt token 数量
 * @param signerOrProvider
 * @param address 账户地址
 * @returns ezbt token 数量
 */
export async function ezbtBalanceOf(signerOrProvider: Signer | Provider, address: string): Promise<BigNumber> {
  const res = await EzbtConnect(signerOrProvider).balanceOf(address);
  // console.log('ezbt Balance = ' + res.toString());
  return res;
}

/**
 * 获取 usdt token 数量
 * @param signerOrProvider
 * @param address 账户地址
 * @returns usdt token 数量
 */
export async function usdtBalanceOf(signerOrProvider: Signer | Provider, address: string): Promise<BigNumber> {
  return await USDTConnect(signerOrProvider).balanceOf(address);
}

/**
 * 获取 usdc token 数量
 * @param signerOrProvider
 * @param address 账户地址
 * @returns usdc token 数量
 */
export async function usdcBalanceOf(signerOrProvider: Signer | Provider, address: string): Promise<BigNumber> {
  return await USDCConnect(signerOrProvider).balanceOf(address);
}

/**
 * 获取 stMatic token 数量
 * @param signerOrProvider
 * @param address 账户地址
 * @returns stMatic token 数量
 */
export async function stMaticBalanceOf(signerOrProvider: Signer | Provider, address: string): Promise<BigNumber> {
  const res = await stMaticConnect(signerOrProvider).balanceOf(address);
  console.log('stMatic Balance = ' + res.toString());
  return res;
}

/**
 * 获取 ezMATIC 资产成本
 * @returns ezMATIC 资产成本
 */
export async function ezMATICFundCost(signerOrProvider: Signer | Provider) {
  const data = await EzioConnect(signerOrProvider).rewardRate();
  const yearRate = '' + (data / 1000000) * 365 * 100;
  console.log('ezMATIC Fund Cost = ' + yearRate);
  return formatString(yearRate) + '%';
}

/**
 * 获取 ezMATIC 下折价格
 * @returns ezMATIC 下折价格
 */
export async function convertDownPrice(signerOrProvider: Signer | Provider) {
  const data = await EzioConnect(signerOrProvider).convertDownPrice();
  const res = formatDecimal(data, TOKEN_TYPE.USDT, 3).toString();
  console.log('convertDown Price = ' + res);
  return res;
}

/**
 * 获取 ezat 净值
 * @returns ezat 净值
 */
export async function ezUSDPrice(signerOrProvider: Signer | Provider) {
  const data = await EzatConnect(signerOrProvider).netWorth();
  const res = formatDecimal(data, TOKEN_TYPE.USDC, 6).toString();
  console.log('ezUSD netWorth = ' + res);
  return res;
}

/**
 * 获取 ezbt 净值
 * @returns ezbt 净值
 */
export async function ezMaticPrice(signerOrProvider: Signer | Provider) {
  const data = await EzbtConnect(signerOrProvider).netWorth();
  const res = formatDecimal(data, TOKEN_TYPE.USDC, 6).toString();
  console.log('ezMatic netWorth = ' + res);
  return res;
}

/**
 * 获取 stMatic 净值
 * @returns ezbt 净值
 */
export async function stMaticPrice(signerOrProvider: Signer | Provider) {
  const data = await EzioConnect(signerOrProvider).getPrice(STMATIC_ADDRESS);
  const res = formatDecimal(data, TOKEN_TYPE.USDC, 6).toString();
  console.log('stMatic Price = ' + res);
  return res;
}
/**
 * 获取 USDT 净值
 * @returns ezbt 净值
 */
export async function usdtPrice(signerOrProvider: Signer | Provider) {
  const data = await EzioConnect(signerOrProvider).getPrice(USDT_ADDRESS);
  const res = formatDecimal(data, TOKEN_TYPE.USDC, 6).toString();
  console.log('usdt Price = ' + res);
  return res;
}
/**
 * 获取 USDC 净值
 * @returns ezbt 净值
 */
export async function usdcPrice(signerOrProvider: Signer | Provider) {
  const data = await EzioConnect(signerOrProvider).getPrice(USDC_ADDRESS);
  const res = formatDecimal(data, TOKEN_TYPE.USDC, 6).toString();
  console.log('usdc Price = ' + res);
  return res;
}

/**
 * 获取 ezat totalSupply
 * @returns ezat totalSupply
 */
export async function ezatTotalSupply(signerOrProvider: Signer | Provider): Promise<BigNumber> {
  const res = await EzatConnect(signerOrProvider).totalSupply();
  console.log('ezatTotalSupply = ' + res.toString());
  return res;
}

/**
 * 获取 ezbt totalSupply
 * @returns ezbt totalSupply
 */
export async function ezbtTotalSupply(signerOrProvider: Signer | Provider): Promise<BigNumber> {
  const res = await EzbtConnect(signerOrProvider).totalSupply();
  console.log('ezbtTotalSupply = ' + res.toString());
  return res;
}

export async function interestRateYear(signerOrProvider: Signer | Provider) {
  const rate = await treasuryInterestRate(signerOrProvider);
  const yearRate = '' + (rate.toNumber() / 1000000) * 365 * 100;
  // const yearRate2 = '' + ((1 + rate.toNumber() / 1000000) * (10 ^ 365)) / 100;
  return formatString(yearRate);
}

export async function interestRateDay(signerOrProvider: Signer | Provider) {
  const rate = await treasuryInterestRate(signerOrProvider);
  const dayRate = formatString('' + (rate.toNumber() / 1000000) * 10000, 3) + '‱';
  return dayRate;
}

export interface PurchaseRecord {
  transferType: TRANSFER_TYPE.PURCHASE;
  timestamp: number;
  tokenType: TOKEN_TYPE;
  amt: string;
  qty: string;
}

/**
 * 申购记录
 * @param signerOrProvider signerOrProvider
 * @param address
 * @param tokenType
 * @returns 申购记录
 */
export async function queryPurchaseRecord(
  signerOrProvider: Signer | Provider,
  address: string,
  tokenType: TOKEN_TYPE,
): Promise<PurchaseRecord[]> {
  const contract = EzioConnect(signerOrProvider);
  const purchaseEvents = await contract.queryFilter(contract.filters.Purchase(address, tokenType));
  const records: Array<PurchaseRecord> = [];
  for (const event of purchaseEvents) {
    const block = await event.getBlock();
    const [, , amt, qty] = event.args;
    records.push({
      transferType: TRANSFER_TYPE.PURCHASE,
      timestamp: block.timestamp * 1000,
      tokenType,
      amt: formatDecimal(amt, tokenType).toString(), // 需要修改
      qty: formatDecimal(qty, tokenType).toString(), // 需要修改
    });
  }
  // return records.sort((a, b) => b.timestamp - a.timestamp);
  return records;
}

export interface RedeemRecord {
  transferType: TRANSFER_TYPE.REDEEM;
  timestamp: number;
  tokenType: TOKEN_TYPE;
  qty: string;
  amt: string;
}

/**
 * 获取当前 eth 价格
 * @returns eth 价格
 */
// export async function ethPrice(signerOrProvider: Signer | Provider): Promise<BigNumber> {
//   return TreasuryConnect(signerOrProvider).ethPrice();
// }

/**
 * 查询账户的赎回记录
 * @param signerOrProvider ether signer or provider
 * @param address 账户地址
 * @returns 账户赎回记录
 */
export async function queryRedeemRecord(
  signerOrProvider: Signer | Provider,
  address: string,
): Promise<Array<RedeemRecord>> {
  const contract = EzioConnect(signerOrProvider);
  const redeemEvents = await contract.queryFilter(contract.filters.Redeem(address));
  const records: Array<RedeemRecord> = [];
  for (const event of redeemEvents) {
    const block = await event.getBlock();
    const [, type, qty, amt] = event.args;
    records.push({
      transferType: TRANSFER_TYPE.REDEEM,
      timestamp: block.timestamp * 1000,
      tokenType: type,
      qty: formatDecimal(qty, TOKEN_TYPE.USDC).toString(), // 需要修改
      amt: formatDecimal(amt, TOKEN_TYPE.USDC).toString(), // 需要修改
    });
  }
  // return records.sort((a, b) => b.timestamp - a.timestamp);
  return records;
}
