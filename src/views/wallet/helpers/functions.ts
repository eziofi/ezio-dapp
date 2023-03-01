import { BigNumber, ethers, FixedNumber, Signer } from 'ethers';
import { Provider } from '@ethersproject/providers';
import { POLYGON_TOKENS, QUOTE_CHANNEL, TOKEN_TYPE, TRANSFER_TYPE } from './constant';
import { SwapQuoteStruct } from '../contract/contracts/interfaces/v1/IEzio';
import { formatDecimal, getQuote, getOneInchQuoteResponse } from './utilities';
import { OneInchQuoteParams } from './types';
import {
  EzatConnect,
  EzbtConnect,
  EzioConnect,
  stMaticConnect,
  treasuryInterestRate,
  USDCConnect,
  USDTConnect,
} from './contract_call';

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

const channel = process.env.REACT_APP_QUOTE_CHANNEL === '1inch' ? QUOTE_CHANNEL.OneInch : QUOTE_CHANNEL.ZeroEx;

export async function purchaseA(
  signerOrProvider: Signer | Provider,
  fromType: TOKEN_TYPE.USDT | TOKEN_TYPE.USDC,
  amount: number,
  slippage: number,
) {
  let quoteResponse: SwapQuoteStruct = {
    buyToken: '',
    sellAmount: 0,
    sellToken: '',
    swapCallData: '',
  };
  if (fromType === TOKEN_TYPE.USDT) {
    // 购买A之前，先把USDT换成USDC
    quoteResponse = await getQuote(channel, USDT_ADDRESS, USDC_ADDRESS, String(amount * 1000000), slippage);
  } else if (fromType === TOKEN_TYPE.USDC) {
    // 直接购买，不通过1inch
    quoteResponse = {
      sellToken: USDC_ADDRESS,
      buyToken: ethers.constants.AddressZero,
      sellAmount: String(amount * 1000000),
      swapCallData: ethers.constants.HashZero,
    };
  }
  console.log('approve');
  await (fromType === TOKEN_TYPE.USDT ? USDTConnect : USDCConnect)(signerOrProvider).approve(
    ezioJson.address,
    quoteResponse.sellAmount,
  );
  await EzioConnect(signerOrProvider).purchase(TOKEN_TYPE.ezUSD, channel, [quoteResponse]);
}

export async function purchaseB(
  signerOrProvider: Signer | Provider,
  fromType: TOKEN_TYPE.USDT | TOKEN_TYPE.USDC,
  amount: number,
  slippage: number,
) {
  const ezio = EzioConnect(signerOrProvider);
  let quotes: SwapQuoteStruct[];
  // const quoteParams: OneInchQuoteParams = {
  //   fromTokenAddress: fromType === TOKEN_TYPE.USDT ? USDT_ADDRESS : USDC_ADDRESS,
  //   toTokenAddress: STMATIC_ADDRESS,
  //   amount: String(amount * 1000000),
  // amount: BigNumber.from(amount).mul(1000000).toString(),
  // fromAddress: ezioJson.address,
  // slippage,
  // disableEstimate: true,
  // };
  // const quoteResponse = await getOneInchQuoteResponse(quoteParams);

  // 先把USDC/USDT换成stMatic
  const fromTokenAddress = fromType === TOKEN_TYPE.USDT ? USDT_ADDRESS : USDC_ADDRESS;
  const quoteResponse = await getQuote(channel, fromTokenAddress, STMATIC_ADDRESS, String(amount * 1000000), slippage);
  console.log('approve');
  await (fromType === TOKEN_TYPE.USDT ? USDTConnect : USDCConnect)(signerOrProvider).approve(
    ezioJson.address,
    quoteResponse.sellAmount,
  );
  // const quoteNetWorth = BigNumber.from(String(amount * 1000000))
  //   .mul(fromType === TOKEN_TYPE.USDT ? await ezio.getPrice(fromTokenAddress) : 1000000)
  //   .div(1000000);
  const quoteNetWorth =
    fromType === TOKEN_TYPE.USDT
      ? BigNumber.from(amount * 1000000)
          .mul(await ezio.getPrice(fromTokenAddress))
          .div(BigNumber.from('10').pow(6))
      : BigNumber.from(amount * 1000000);
  const pooledA = await ezio.pooledA();

  if (quoteNetWorth.lte(pooledA)) {
    console.log('quoteNetWorth=' + quoteNetWorth.toString());
    console.log('pooledA=' + pooledA.toString());
    console.log('使用金库USDC');
    // 如果金库USDC足够，用USDC转换成stmatic
    const convertSellAmount =
      fromType === TOKEN_TYPE.USDT
        ? await ezio.convertAmt(fromTokenAddress, USDC_ADDRESS, BigNumber.from(String(amount * 1000000)))
        : // 这是是否要转换小数位
          String(amount * 1000000);
    const quoteResponse2 = await getQuote(
      channel,
      USDC_ADDRESS,
      STMATIC_ADDRESS,
      convertSellAmount.toString(),
      slippage,
    );
    quotes = [quoteResponse, quoteResponse2];
  } else {
    console.log('直接购买');
    quotes = [quoteResponse];
  }
  console.log(quotes);
  await ezio.purchase(TOKEN_TYPE.ezMatic, channel, quotes);
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
 * 购买
 * @param fromType 花费token类型，USDT或者USDC
 * @param toType 购买的token类型，tokenA或tokenB
 * @param amount
 * @param slippage 滑点
 * @param signerOrProvider signerOrProvider
 */
export async function purchase(
  fromType: TOKEN_TYPE.USDT | TOKEN_TYPE.USDC,
  toType: TOKEN_TYPE.ezUSD | TOKEN_TYPE.ezMatic,
  amount: number,
  slippage: number,
  signerOrProvider: Signer | Provider,
) {
  await (toType === TOKEN_TYPE.ezUSD ? purchaseA : purchaseB)(signerOrProvider, fromType, amount, slippage);
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

const getRedeemQuoteQty = async (
  type: number,
  qty: BigNumber,
  token: TOKEN_TYPE.USDC | TOKEN_TYPE.stMatic,
  signerOrProvider: Signer | Provider,
) => {
  let amt: BigNumber;
  let quoteQty: BigNumber = BigNumber.from('0');
  const aToken = EzatConnect(signerOrProvider);
  const bToken = EzbtConnect(signerOrProvider);
  const ezio = EzioConnect(signerOrProvider);
  const stMatic = stMaticConnect(signerOrProvider);
  if (type === TOKEN_TYPE.ezUSD) {
    if (token === TOKEN_TYPE.USDC) {
      amt = qty.mul(await aToken.netWorth()).div(BigNumber.from('10').pow(await aToken.decimals()));
      console.log('amt=' + amt.toString());
      console.log('pooledA=' + (await ezio.pooledA()).toString());
      if (amt.gt(await ezio.pooledA())) {
        quoteQty = amt
          .sub(await ezio.pooledA())
          .mul(BigNumber.from('10').pow(await stMatic.decimals()))
          .div(await ezio.getPrice(STMATIC_ADDRESS));
      }
    }
  } else {
    // amt = qty.mul(await bToken.netWorth()).div(BigNumber.from('10').pow(await bToken.decimals()));
    if (token === TOKEN_TYPE.USDC) {
      quoteQty = qty.mul(await ezio.totalReserve()).div(await bToken.totalSupply());
    } else if (token === TOKEN_TYPE.stMatic) {
      const redeemReserveQty = qty.mul(await ezio.totalReserve()).div(await bToken.totalSupply());
      const leverage: BigNumber = await ezio.leverage();
      quoteQty = redeemReserveQty.mul(leverage.sub(await ezio.LEVERAGE_DENOMINATOR())).div(leverage);
    }
  }
  return quoteQty;
};

/**
 * 赎回
 * @param fromType 卖出token类型，tokenA或者tokenB
 * @param toType 获得的token类型，USDC或者stMatic
 * @param amount
 * @param slippage 滑点
 * @param signerOrProvider signerOrProvider
 */
export async function redeem(
  fromType: TOKEN_TYPE.ezUSD | TOKEN_TYPE.ezMatic,
  toType: TOKEN_TYPE.USDC | TOKEN_TYPE.stMatic,
  amount: number,
  signerOrProvider: Signer | Provider,
  slippage: number,
) {
  await (toType === TOKEN_TYPE.USDC ? redeemToUSDC : redeemToStMatic)(fromType, amount, signerOrProvider, slippage);
}

/**
 * 赎回成USDC
 * @param fromType 卖出token类型，tokenA或者tokenB
 * @param amount
 * @param slippage 滑点
 * @param signerOrProvider signerOrProvider
 */
export async function redeemToUSDC(
  fromType: TOKEN_TYPE.ezUSD | TOKEN_TYPE.ezMatic,
  amount: number,
  signerOrProvider: Signer | Provider,
  slippage: number,
) {
  const redeemAmount = ethers.utils.parseEther(String(amount));
  const convertAmount = await getRedeemQuoteQty(fromType, redeemAmount, TOKEN_TYPE.USDC, signerOrProvider);
  if (convertAmount.gt(BigNumber.from(0))) {
    const quoteResponse = await getQuote(channel, STMATIC_ADDRESS, USDC_ADDRESS, convertAmount.toString(), slippage);
    console.log('USDC储量不够，动用stMatic换成USDC');
    await EzioConnect(signerOrProvider)
      .connect(signerOrProvider)
      .redeem(fromType, channel, redeemAmount, USDC_ADDRESS, quoteResponse);
  } else {
    // 把USDC直接转给用户
    console.log('把USDC直接转给用户');
    const quoteResponse = {
      sellToken: USDC_ADDRESS,
      buyToken: ethers.constants.AddressZero,
      sellAmount: convertAmount,
      swapCallData: ethers.constants.HashZero,
    };
    await EzioConnect(signerOrProvider)
      .connect(signerOrProvider)
      .redeem(fromType, channel, redeemAmount, USDC_ADDRESS, quoteResponse);
  }
}

/**
 * 赎回成USDC
 * @param fromType 卖出token类型，tokenA或者tokenB
 * @param amount
 * @param slippage 滑点
 * @param signerOrProvider signerOrProvider
 */
export async function redeemToStMatic(
  fromType: TOKEN_TYPE.ezUSD | TOKEN_TYPE.ezMatic,
  amount: number,
  signerOrProvider: Signer | Provider,
  slippage: number,
) {
  const redeemAmount = ethers.utils.parseEther(String(amount));
  const convertAmount = await getRedeemQuoteQty(fromType, redeemAmount, TOKEN_TYPE.stMatic, signerOrProvider);
  const quoteResponse = await getQuote(channel, STMATIC_ADDRESS, USDC_ADDRESS, convertAmount.toString(), slippage);
  await EzioConnect(signerOrProvider).redeem(1, channel, redeemAmount, STMATIC_ADDRESS, quoteResponse);
}

export async function interestRateYear(signerOrProvider: Signer | Provider) {
  const rate = await treasuryInterestRate(signerOrProvider);
  const yearRate = (1 + rate.toNumber() / 100) * (10 ^ 365);
  return yearRate;
}
