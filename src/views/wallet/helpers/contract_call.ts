import { EzioV1__factory, EzWETHV1, REVERSE_COIN__factory, EzUSDV1__factory } from '../arbitrum/contract';

import {
  ERC20_ABI,
  ARBITRUM_TOKENS,
  TOKEN_DECIMAL,
  TOKEN_TYPE,
  TRANSFER_TYPE,
  POLYGON_TOKENS,
  REVERSE_COIN,
  NETWORK_TYPE,
} from './constant';
import { BigNumber, ethers, Signer } from 'ethers';
import type { Provider } from '@ethersproject/providers';
import { formatDecimal, formatString } from './utilities';

import { queryAccumulatedFees24H } from '../../../api/api';
import useWallet from '../../hooks/useWallet';

export const ezUSDJson = {
  [NETWORK_TYPE.arbitrum]: require('../arbitrum/contract/abi/EzUSDV1.json'),
  [NETWORK_TYPE.polygon]: require('../polygon/contract/abi/EzUSDV1.json'),
};

// NETWORK CONFIG
export const E2LPJson = {
  [NETWORK_TYPE.arbitrum]: require('../arbitrum/contract/abi/EzWETHV1.json'),
  [NETWORK_TYPE.polygon]: require('../polygon/contract/abi/EzMATICV1.json'),
};

export const ezioJson = {
  [NETWORK_TYPE.arbitrum]: require('../arbitrum/contract/abi/EzioV1.json'),
  [NETWORK_TYPE.polygon]: require('../polygon/contract/abi/EzioV1.json'),
};

export const TOKENS = {
  [NETWORK_TYPE.polygon]: POLYGON_TOKENS,
  [NETWORK_TYPE.arbitrum]: ARBITRUM_TOKENS,
};

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

export function EzUSDConnect(signerOrProvider: Signer | Provider, network: NETWORK_TYPE) {
  console.log(ezUSDJson[network].address);
  return EzUSDV1__factory.connect(ezUSDJson[network].address, signerOrProvider);
}

export function E2LPConnect(signerOrProvider: Signer | Provider, network: NETWORK_TYPE): EzWETHV1 {
  return REVERSE_COIN__factory.connect(E2LPJson[network].address, signerOrProvider);
}

export function USDTConnect(signerOrProvider: Signer | Provider, network: NETWORK_TYPE) {
  return new ethers.Contract(TOKENS[network].USDT, ERC20_ABI, signerOrProvider);
}

export function EzioConnect(signerOrProvider: Signer | Provider, network: NETWORK_TYPE) {
  return EzioV1__factory.connect(ezioJson[network].address, signerOrProvider);
}

export function USDCConnect(signerOrProvider: Signer | Provider, network: NETWORK_TYPE) {
  return new ethers.Contract(TOKENS[network].USDC, ERC20_ABI, signerOrProvider);
}

export function reverseCoinConnect(signerOrProvider: Signer | Provider, network: NETWORK_TYPE) {
  // @ts-ignore
  return new ethers.Contract(TOKENS[network][REVERSE_COIN[network]], ERC20_ABI, signerOrProvider);
}

/**
 * 获取 金库储量
 * @returns 金库储量
 */
export async function treasuryTotalNetWorth(
  signerOrProvider: Signer | Provider,
  network: NETWORK_TYPE,
): Promise<BigNumber> {
  const res = await EzioConnect(signerOrProvider, network).totalNetWorth();
  console.log('treasury Total NetWorth = ' + res.toString());
  return res;
}

/**
 * 获取 金库储量
 * @returns ezUSD总净值
 */
export async function getPooledA(signerOrProvider: Signer | Provider, network: NETWORK_TYPE) {
  const data = await EzioConnect(signerOrProvider, network).pooledA();
  const res = formatDecimal(data, TOKEN_TYPE.USDC).toString();
  console.log('pooledA = ' + res);
  return res;
}

/**
 * 获取 金库储量
 * @returns ezWETH总净值
 */
export async function ezWETHReverse(signerOrProvider: Signer | Provider, network: NETWORK_TYPE) {
  const totalReserve = await EzioConnect(signerOrProvider, network).totalReserve();
  const reverseCoinPrice = await EzioConnect(signerOrProvider, network).getPrice(
    // @ts-ignore
    TOKENS[network][REVERSE_COIN[network]],
  );
  const res = formatDecimal(
    totalReserve.mul(reverseCoinPrice),
    TOKEN_TYPE.USDC, // 此参数无用
    2,
    TOKEN_DECIMAL[TOKEN_TYPE.USDC] + TOKEN_DECIMAL[TOKEN_TYPE.ReverseCoin],
  ).toString();
  console.log('ezWETH Reverse = ' + res);
  return res;
}

/**
 * 获取 手续费收入
 * @returns 过去24小时手续费汇总 fees24H
 */
export async function commissionIncome(networkId?: NETWORK_TYPE | undefined) {
  console.log('-----------', networkId);
  const res = await (await queryAccumulatedFees24H(networkId)).data.data.fees24H;
  return res;
}

/**
 * 获取 日利息
 * @returns 日利息
 */
export async function treasuryInterestRate(
  signerOrProvider: Signer | Provider,
  network: NETWORK_TYPE,
): Promise<BigNumber> {
  const res = await EzioConnect(signerOrProvider, network).interestRate();
  console.log('interestRate = ' + res.toString());
  return res;
}
/**
 * 获取 手续费比率
 * @returns 手续费比率
 */
export async function redeemFeeRate(signerOrProvider: Signer | Provider, network: NETWORK_TYPE) {
  const rawRate = await EzioConnect(signerOrProvider, network).redeemFeeRate();
  const denominator = await EzioConnect(signerOrProvider, network).REDEEM_RATE_DENOMINATOR();
  const rate = (rawRate / denominator.toNumber()) * 100 + '%';
  console.log('redeemFeeRate = ' + rate);
  return rate;
}
/**
 * 获取 杠杆率
 * @returns 杠杆率
 */
export async function getLeverage(signerOrProvider: Signer | Provider, network: NETWORK_TYPE) {
  const res = formatDecimal(await EzioConnect(signerOrProvider, network).leverage(), TOKEN_TYPE.USDC).toString();
  console.log('leverage = ' + res.toString());
  return res;
}

/**
 * 获取 ezat token 数量
 * @param signerOrProvider
 * @param address 账户地址
 * @returns ezat token 数量
 */
export async function ezatBalanceOf(signerOrProvider: Signer | Provider, address: string, network: NETWORK_TYPE) {
  const data = await EzUSDConnect(signerOrProvider, network).balanceOf(address);
  const res = formatDecimal(data, TOKEN_TYPE.ezUSD, 18).toString();
  console.log('ezat Balance = ' + res);
  return res;
}

/**
 * 获取 ezbt token 数量
 * @param signerOrProvider
 * @param address 账户地址
 * @returns ezbt token 数量
 */
export async function ezbtBalanceOf(signerOrProvider: Signer | Provider, address: string, network: NETWORK_TYPE) {
  const data = await E2LPConnect(signerOrProvider, network).balanceOf(address);
  const res = formatDecimal(data, TOKEN_TYPE.E2LP, 18).toString();
  console.log('ezbt Balance = ' + res);
  return res;
}

/**
 * 获取 usdt token 数量
 * @param signerOrProvider
 * @param address 账户地址
 * @returns usdt token 数量
 */
export async function usdtBalanceOf(signerOrProvider: Signer | Provider, address: string, network: NETWORK_TYPE) {
  const data = await USDTConnect(signerOrProvider, network).balanceOf(address);
  const res = formatDecimal(data, TOKEN_TYPE.USDT, 6).toString();
  console.log('usdt Balance = ' + res);
  return res;
}

/**
 * 获取 已授权数量
 * @param signerOrProvider
 * @param address 账户地址
 * @param tokenType
 * @returns usdt token allowance
 */
export async function getAllowance(
  signerOrProvider: Signer | Provider,
  address: string,
  tokenType: TOKEN_TYPE.USDC | TOKEN_TYPE.USDT,
  network: NETWORK_TYPE,
): Promise<BigNumber> {
  const res = await (tokenType === TOKEN_TYPE.USDC ? USDCConnect : USDTConnect)(signerOrProvider, network).allowance(
    address,
    ezioJson[network as keyof typeof ezioJson].address,
  );
  console.log(TOKEN_TYPE[tokenType] + ' allowance =' + res.toString());
  return res;
}

/**
 * 获取 usdc token 数量
 * @param signerOrProvider
 * @param address 账户地址
 * @returns usdc token 数量
 */
export async function usdcBalanceOf(signerOrProvider: Signer | Provider, address: string, network: NETWORK_TYPE) {
  const data = await USDCConnect(signerOrProvider, network).balanceOf(address);
  const res = formatDecimal(data, TOKEN_TYPE.USDC, 6).toString();
  console.log('usdc Balance = ' + res);
  return res;
}

/**
 * 获取 ReverseCoin token 数量
 * @param signerOrProvider
 * @param address 账户地址
 * @returns ReverseCoin token 数量
 */
export async function reverseCoinBalanceOf(
  signerOrProvider: Signer | Provider,
  address: string,
  network: NETWORK_TYPE,
) {
  const data = await reverseCoinConnect(signerOrProvider, network).balanceOf(address);
  const res = formatDecimal(data, TOKEN_TYPE.ReverseCoin, 18).toString();
  console.log('reverseCoin Balance = ' + res);
  return res;
}

/**
 * 获取 ezWETH 资产成本
 * @returns ezWETH 资产成本
 */
export async function ezWETHFundCost(signerOrProvider: Signer | Provider, network: NETWORK_TYPE) {
  const data = await EzioConnect(signerOrProvider, network).rewardRate();
  const yearRate = '' + (data / 1000000) * 365 * 100;
  console.log('ezWETH Fund Cost = ' + yearRate);
  return formatString(yearRate) + '%';
}

/**
 * 获取 ezWETH 下折价格
 * @returns ezWETH 下折价格
 */
export async function convertDownPrice(signerOrProvider: Signer | Provider, network: NETWORK_TYPE) {
  const data = await EzioConnect(signerOrProvider, network).convertDownPrice();
  const res = formatDecimal(data, TOKEN_TYPE.USDT, 3).toString();
  console.log('convertDown Price = ' + res);
  return res;
}

/**
 * 获取 ezat 净值
 * @returns ezat 净值
 */
export async function ezUSDPrice(signerOrProvider: Signer | Provider, network: NETWORK_TYPE) {
  const data = await EzUSDConnect(signerOrProvider, network).netWorth();
  const res = formatDecimal(data, TOKEN_TYPE.USDC, 6).toString();
  console.log('ezUSD netWorth = ' + res);
  return res;
}

/**
 * 获取 ezbt 净值
 * @returns ezbt 净值
 */
export async function ezWETHPrice(signerOrProvider: Signer | Provider, network: NETWORK_TYPE) {
  const data = await E2LPConnect(signerOrProvider, network).netWorth();
  const res = formatDecimal(data, TOKEN_TYPE.USDC, 6).toString();
  console.log('ezWETH netWorth = ' + res);
  return res;
}

/**
 * 获取 ReverseCoin 净值
 * @returns ezbt 净值
 */
export async function reverseCoinPrice(signerOrProvider: Signer | Provider, network: NETWORK_TYPE) {
  // @ts-ignore
  const data = await EzioConnect(signerOrProvider, network).getPrice(TOKENS[network][REVERSE_COIN[network]]);
  const res = formatDecimal(data, TOKEN_TYPE.USDC, 6).toString();
  console.log('ReverseCoin Price = ' + res);
  return res;
}
/**
 * 获取 USDT 净值
 * @returns ezbt 净值
 */
export async function usdtPrice(signerOrProvider: Signer | Provider, network: NETWORK_TYPE) {
  const data = await EzioConnect(signerOrProvider, network).getPrice(TOKENS[network].USDT);
  const res = formatDecimal(data, TOKEN_TYPE.USDC, 6).toString();
  console.log('usdt Price = ' + res);
  return res;
}
/**
 * 获取 USDC 净值
 * @returns ezbt 净值
 */
export async function usdcPrice(signerOrProvider: Signer | Provider, network: NETWORK_TYPE) {
  const data = await EzioConnect(signerOrProvider, network).getPrice(TOKENS[network].USDC);
  const res = formatDecimal(data, TOKEN_TYPE.USDC, 6).toString();
  console.log('usdc Price = ' + res);
  return res;
}

/**
 * 获取 ezat totalSupply
 * @returns ezat totalSupply
 */
export async function ezatTotalSupply(signerOrProvider: Signer | Provider, network: NETWORK_TYPE): Promise<BigNumber> {
  const res = await EzUSDConnect(signerOrProvider, network).totalSupply();
  console.log('ezatTotalSupply = ' + res.toString());
  return res;
}

/**
 * 获取 ezbt totalSupply
 * @returns ezbt totalSupply
 */
export async function ezbtTotalSupply(signerOrProvider: Signer | Provider, network: NETWORK_TYPE): Promise<BigNumber> {
  const res = await E2LPConnect(signerOrProvider, network).totalSupply();
  console.log('ezbtTotalSupply = ' + res.toString());
  return res;
}

export async function interestRateYear(signerOrProvider: Signer | Provider, network: NETWORK_TYPE) {
  const rate = await treasuryInterestRate(signerOrProvider, network);
  const yearRate = '' + (rate.toNumber() / 1000000) * 365 * 100;
  // const yearRate2 = '' + ((1 + rate.toNumber() / 1000000) * (10 ^ 365)) / 100;
  return formatString(yearRate);
}

export async function interestRateDay(signerOrProvider: Signer | Provider, network: NETWORK_TYPE) {
  const rate = await treasuryInterestRate(signerOrProvider, network);
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
  network: NETWORK_TYPE,
): Promise<PurchaseRecord[]> {
  const contract = EzioConnect(signerOrProvider, network);
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
  network: NETWORK_TYPE,
): Promise<Array<RedeemRecord>> {
  const contract = EzioConnect(signerOrProvider, network);
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
