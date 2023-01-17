import {
  EzatERC20,
  EzatERC20__factory,
  EzbtERC20,
  EzbtERC20__factory,
  EzPurchase,
  EzPurchase__factory,
  StETH,
  StETH__factory,
  Treasury,
  Treasury__factory,
  USDT,
  USDT__factory,
} from '../contract';
import { TOKEN_TYPE, TRANSFER_TYPE } from './constant';
import { BigNumber, ContractTransaction, Signer, utils } from 'ethers';
import type { Provider } from '@ethersproject/providers';
import { formatNumToString } from './utilities';

const usdtJson = require('../contract/abi/USDT.json');
const stEthJson = require('../contract/abi/StETH.json');
const ezatJson = require('../contract/abi/EzatERC20.json');
const ezbtJson = require('../contract/abi/EzbtERC20.json');
const ezioJson = require('../contract/abi/EzioERC20.json');
const treasuryJson = require('../contract/abi/Treasury.json');
const purchaseJson = require('../contract/abi/EzPurchase.json');
const swapJson = require('../contract/abi/Swap.json');

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

function TreasuryConnect(signerOrProvider: Signer | Provider): Treasury {
  return Treasury__factory.connect(treasuryJson.address, signerOrProvider);
}

function EzatConnect(signerOrProvider: Signer | Provider): EzatERC20 {
  return EzatERC20__factory.connect(ezatJson.address, signerOrProvider);
}

function EzbtConnect(signerOrProvider: Signer | Provider): EzbtERC20 {
  return EzbtERC20__factory.connect(ezbtJson.address, signerOrProvider);
}

/*function EzioConnect(signerOrProvider: Signer | Provider): EzioERC20 {
  return EzioERC20__factory.connect(ezioJson.address, signerOrProvider);
}*/

function EzPurchaseConnect(signerOrProvider: Signer | Provider): EzPurchase {
  return EzPurchase__factory.connect(purchaseJson.address, signerOrProvider);
}
function USDTConnect(signerOrProvider: Signer | Provider): USDT {
  return USDT__factory.connect(usdtJson.address, signerOrProvider);
}

function StEthConnect(signerOrProvider: Signer | Provider): StETH {
  return StETH__factory.connect(stEthJson.address, signerOrProvider);
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

/**
 * 购买 token
 * @param type token 类型
 * @param amt 申购所用USDT
 * @param signer  ether signer
 * @returns
 */
export async function purchase(type: TOKEN_TYPE, amt: number, signer: Signer) {
  const daiContract = USDTConnect(signer);
  const parseQty = utils.parseEther(`${amt}`);
  await daiContract.approve(purchaseJson.address, parseQty, override);
  await new Promise(resolve => setTimeout(resolve, 2000));

  const contract = EzPurchaseConnect(signer);
  const purchaseTr = await contract.purchase(type, parseQty, override);
  return purchaseTr;
}

/**
 * 赎回
 * @param type 0为ezat,1为ezbt
 * @param tokenQty 赎回数量
 * @param signerOrProvider  ether provider or signer
 * @returns
 */
export async function redeem(
  type: number,
  tokenQty: number,
  signerOrProvider: Signer | Provider,
): Promise<ContractTransaction> {
  return EzPurchaseConnect(signerOrProvider).redeem(type, utils.parseEther(`${tokenQty}`), override);
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
