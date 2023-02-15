import {
  EzUSD,
  EzUSD__factory,
  EzMATIC,
  EzMATIC__factory,
  EzioERC20,
  EzioERC20__factory,
  EzioV1,
  EzioV1__factory,
} from '../contract';

import { ERC20_ABI, POLYGON_TOKENS, TOKEN_TYPE, TRANSFER_TYPE } from './constant';
import { BigNumber, ContractTransaction, ethers, Signer, utils } from 'ethers';
import type { Provider } from '@ethersproject/providers';
import { formatNumToString, getOneInchQuoteResponse } from './utilities';
import { OneInchQuoteParams } from './types';
// import { Treasury__factory } from '../contract/factories/contracts/Treasury__factory';
// import { EzPurchase__factory } from '../contract/factories/contracts/EzPurchase__factory';
// import { USDT__factory } from '../contract/factories/contracts/USDT__factory';

const usdtJson = require('../contract/abi/USDT.json');
const stEthJson = require('../contract/abi/StETH.json');
const ezatJson = require('../contract/abi/EzUSD.json');
const ezbtJson = require('../contract/abi/EzMATIC.json');
const ezioJson = require('../contract/abi/EzioERC20.json');
const treasuryJson = require('../contract/abi/Treasury.json');
const purchaseJson = require('../contract/abi/EzPurchase.json');
const swapJson = require('../contract/abi/Swap.json');
const EzioV1Json = require('../contract/abi/EzioV1.json');
const EzioERC20Json = require('../contract/abi/EzioERC20.json');
const EzUSDJson = require('../contract/abi/EzUSD.json');
const EzMATICJson = require('../contract/abi/EzMATIC.json');

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

function TreasuryConnect(signerOrProvider: Signer | Provider) {
  return Treasury__factory.connect(treasuryJson.address, signerOrProvider);
}

function EzatConnect(signerOrProvider: Signer | Provider) {
  return EzUSD__factory.connect(ezatJson.address, signerOrProvider);
}

function EzbtConnect(signerOrProvider: Signer | Provider): EzMATIC {
  return EzMATIC__factory.connect(ezbtJson.address, signerOrProvider);
}

/*function EzioConnect(signerOrProvider: Signer | Provider): EzioERC20 {
  return EzioERC20__factory.connect(ezioJson.address, signerOrProvider);
}*/

function EzPurchaseConnect(signerOrProvider: Signer | Provider) {
  return EzPurchase__factory.connect(purchaseJson.address, signerOrProvider);
}
function USDTConnect(signerOrProvider: Signer | Provider) {
  return USDT__factory.connect(usdtJson.address, signerOrProvider);
}
function EzioConnect(signerOrProvider: Signer | Provider) {
  return EzioV1__factory.connect(ezioJson.address, signerOrProvider);
}

/**
 * 获取 金库储量
 * @returns 金库储量
 */
export async function treasuryTotalNetWorth(signerOrProvider: Signer | Provider): Promise<BigNumber> {
  return TreasuryConnect(signerOrProvider).totalNetWorth();
}

/**
 * 获取 日利息
 * @returns 日利息
 */
export async function treasuryInterestRate(signerOrProvider: Signer | Provider): Promise<BigNumber> {
  return TreasuryConnect(signerOrProvider).interestRate();
}

/**
 * 获取 ezat token 数量
 * @param address 账户地址
 * @returns ezat token 数量
 */
export async function ezatBalanceOf(signerOrProvider: Signer | Provider, address: string): Promise<BigNumber> {
  return EzatConnect(signerOrProvider).balanceOf(address);
}

/**
 * 获取 ezbt token 数量
 * @param address 账户地址
 * @returns ezbt token 数量
 */
export async function ezbtBalanceOf(signerOrProvider: Signer | Provider, address: string): Promise<BigNumber> {
  return EzbtConnect(signerOrProvider).balanceOf(address);
}

/**
 * 获取 ezio token 数量
 * @param address 账户地址
 * @returns ezio token 数量
 */
/*export async function ezioBalanceOf(signerOrProvider: Signer | Provider, address: string): Promise<BigNumber> {
  return EzioConnect(signerOrProvider).balanceOf(address);
}*/

/**
 * 获取账户的 eth 余额
 * @returns eth 余额
 */
/*export async function ethBalanceOf(signerOrProvider: Signer | Provider): Promise<BigNumber> {
  return signerOrProvider.getBalance('latest');
}*/

/**
 * 获取 usdt token 数量
 * @param address 账户地址
 * @returns ezio token 数量
 */
export async function usdtBalanceOf(signerOrProvider: Signer | Provider, address: string): Promise<BigNumber> {
  return USDTConnect(signerOrProvider).balanceOf(address);
}

/**
 * 获取 ezat 净值
 * @returns ezat 净值
 */
export async function ezatNetWorth(signerOrProvider: Signer | Provider): Promise<BigNumber> {
  return EzatConnect(signerOrProvider).netWorth();
}

/**
 * 获取 ezbt 净值
 * @returns ezbt 净值
 */
export async function ezbtNetWorth(signerOrProvider: Signer | Provider): Promise<BigNumber> {
  return EzbtConnect(signerOrProvider).netWorth();
}

/**
 * 获取 ezio totalSupply
 * @returns ezio totalSupply
 */
/*export async function ezioTotalSupply(signerOrProvider: Signer | Provider): Promise<BigNumber> {
  return EzioConnect(signerOrProvider).totalSupply();
}*/

/**
 * 获取 ezat totalSupply
 * @returns ezat totalSupply
 */
export async function ezatTotalSupply(signerOrProvider: Signer | Provider): Promise<BigNumber> {
  return EzatConnect(signerOrProvider).totalSupply();
}

/**
 * 获取 ezbt totalSupply
 * @returns ezbt totalSupply
 */
export async function ezbtTotalSupply(signerOrProvider: Signer | Provider): Promise<BigNumber> {
  return EzbtConnect(signerOrProvider).totalSupply();
}

/**
 * 获取当前 eth 价格
 * @returns eth 价格
 */
export async function ethPrice(signerOrProvider: Signer | Provider): Promise<BigNumber> {
  return TreasuryConnect(signerOrProvider).ethPrice();
}

export async function purchase(signerOrProvider: Signer | Provider) {
  let quoteParams1: OneInchQuoteParams = {
    fromTokenAddress: USDT_ADDRESS,
    toTokenAddress: USDC_ADDRESS,
    amount: '2500000000',
    fromAddress: ezioJson.address,
    slippage: 1,
    disableEstimate: true,
  };
  const usdt = new ethers.Contract(USDT_ADDRESS, ERC20_ABI, signerOrProvider);
  let quoteResponse1 = await getOneInchQuoteResponse(quoteParams1);
  await usdt.approve(ezioJson.address, quoteResponse1.sellAmount);
  let quotes1 = [quoteResponse1];
  await EzioConnect(signerOrProvider).purchase(0, quotes1);
}

// /**
//  * 购买 token
//  * @param type token 类型
//  * @param amt 申购所用USDT
//  * @param signer  ether signer
//  * @returns
//  */
// export async function purchase(type: TOKEN_TYPE, amt: number, signer: Signer) {
//   const daiContract = USDTConnect(signer);
//   const parseQty = utils.parseEther(`${amt}`);
//   await daiContract.approve(purchaseJson.address, parseQty, override);
//   await new Promise(resolve => setTimeout(resolve, 2000));
//
//   const contract = EzPurchaseConnect(signer);
//   const purchaseTr = await contract.purchase(type, parseQty, override);
//   return purchaseTr;
// }

// /**
//  * 赎回
//  * @param type 0为ezat,1为ezbt
//  * @param tokenQty 赎回数量
//  * @param signerOrProvider  ether provider or signer
//  * @returns
//  */
// export async function redeem(
//   type: number,
//   tokenQty: number,
//   signerOrProvider: Signer | Provider,
// ): Promise<ContractTransaction> {
//   return EzPurchaseConnect(signerOrProvider).redeem(type, utils.parseEther(`${tokenQty}`), override);
// }

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
 * @returns 申购记录
 */
export async function queryPurchaseRecord(
  signerOrProvider: Signer | Provider,
  address: string,
  tokenType: TOKEN_TYPE,
): Promise<PurchaseRecord[]> {
  const contract = EzPurchaseConnect(signerOrProvider);
  const purchaseEvents = await contract.queryFilter(contract.filters.Purchase(address, tokenType));
  let records: Array<PurchaseRecord> = [];
  for (const event of purchaseEvents) {
    const block = await event.getBlock();
    const [, , amt, qty] = event.args;
    records.push({
      transferType: TRANSFER_TYPE.PURCHASE,
      timestamp: block.timestamp * 1000,
      tokenType,
      amt: formatNumToString(amt),
      qty: formatNumToString(qty),
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
 * 查询账户的赎回记录
 * @param signerOrProvider ether signer or provider
 * @param address 账户地址
 * @returns 账户赎回记录
 */
export async function queryRedeemRecord(
  signerOrProvider: Signer | Provider,
  address: string,
): Promise<Array<RedeemRecord>> {
  const contract = EzPurchaseConnect(signerOrProvider);
  const redeemEvents = await contract.queryFilter(contract.filters.Redeem(address));
  let records: Array<RedeemRecord> = [];
  for (const event of redeemEvents) {
    const block = await event.getBlock();
    const [, type, qty, amt] = event.args;
    records.push({
      transferType: TRANSFER_TYPE.REDEEM,
      timestamp: block.timestamp * 1000,
      tokenType: type,
      qty: formatNumToString(qty),
      amt: formatNumToString(amt),
    });
  }
  // return records.sort((a, b) => b.timestamp - a.timestamp);
  return records;
}
