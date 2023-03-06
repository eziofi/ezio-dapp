import { BigNumber, ethers, Signer } from 'ethers';
import { Provider } from '@ethersproject/providers';
import { POLYGON_TOKENS, QUOTE_CHANNEL, TOKEN_TYPE } from '../views/wallet/helpers/constant';
import { SwapQuoteStruct } from '../views/wallet/contract/contracts/interfaces/v1/IEzio';
import { getQuote } from '../views/wallet/helpers/utilities';
import {
  EzatConnect,
  EzbtConnect,
  EzioConnect,
  stMaticConnect,
  USDCConnect,
  USDTConnect,
} from '../views/wallet/helpers/contract_call';
import { useContext } from 'react';
import { UIContext } from '../layouts/dashboard/DashboardLayout';
import { useTranslation } from 'react-i18next';

const ezatJson = require('../views/wallet/contract/abi/EzUSDV1.json');
const ezbtJson = require('../views/wallet/contract/abi/EzMATICV1.json');
const ezioJson = require('../views/wallet//contract/abi/EzioV1.json');

const USDC_ADDRESS = POLYGON_TOKENS.USDC;
const USDT_ADDRESS = POLYGON_TOKENS.USDT;
const DAI_ADDRESS = POLYGON_TOKENS.DAI;
const WETH_ADDRESS = POLYGON_TOKENS.WETH;
const STMATIC_ADDRESS = POLYGON_TOKENS.stMATIC;
const USDC_TAKER_ADDRESS = process.env.POLYGON_USDC_TAKER_ADDRESS || '';
const USDT_TAKER_ADDRESS = process.env.POLYGON_USDT_TAKER_ADDRESS || '';
const DAI_TAKER_ADDRESS = process.env.POLYGON_DAI_TAKER_ADDRESS || '';

const channel = process.env.REACT_APP_QUOTE_CHANNEL === '1inch' ? QUOTE_CHANNEL.OneInch : QUOTE_CHANNEL.ZeroEx;

export default function useTx() {
  const { openBackLoading, closeBackLoading, setBackLoadingText, setMsg, openMsg, closeMsg } = useContext(UIContext);
  const { t } = useTranslation();

  /**
   * 购买
   * @param fromType 花费token类型，USDT或者USDC
   * @param toType 购买的token类型，tokenA或tokenB
   * @param amount
   * @param slippage 滑点
   * @param signerOrProvider signerOrProvider
   */
  async function purchase(
    fromType: TOKEN_TYPE.USDT | TOKEN_TYPE.USDC,
    toType: TOKEN_TYPE.ezUSD | TOKEN_TYPE.ezMatic,
    amount: number,
    slippage: number,
    signerOrProvider: Signer | Provider,
  ) {
    await (toType === TOKEN_TYPE.ezUSD ? purchaseA : purchaseB)(signerOrProvider, fromType, amount, slippage);
  }

  async function purchaseA(
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
      setBackLoadingText(t('message.request0x'));
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
    setBackLoadingText(t('message.approving'));
    const approveTx = await (fromType === TOKEN_TYPE.USDT ? USDTConnect : USDCConnect)(signerOrProvider).approve(
      ezioJson.address,
      quoteResponse.sellAmount,
    );
    console.log('approve waiting');
    setBackLoadingText(t('message.approveWaiting'));
    await approveTx.wait();
    console.log('approved');
    setBackLoadingText(t('message.sendingTx'));
    const purchaseTx = await EzioConnect(signerOrProvider).purchase(TOKEN_TYPE.ezUSD, channel, [quoteResponse]);
    setBackLoadingText(t('message.waitingTx'));
    await purchaseTx.wait();
  }

  async function purchaseB(
    signerOrProvider: Signer | Provider,
    fromType: TOKEN_TYPE.USDT | TOKEN_TYPE.USDC,
    amount: number,
    slippage: number,
  ) {
    const ezio = EzioConnect(signerOrProvider);
    let quotes: SwapQuoteStruct[];
    // 先把USDC/USDT换成stMatic
    const fromTokenAddress = fromType === TOKEN_TYPE.USDT ? USDT_ADDRESS : USDC_ADDRESS;
    setBackLoadingText(t('message.request0x'));
    const quoteResponse = await getQuote(
      channel,
      fromTokenAddress,
      STMATIC_ADDRESS,
      String(amount * 1000000),
      slippage,
    );
    console.log('approve');
    setBackLoadingText(t('message.approving'));
    const approveTx = await (fromType === TOKEN_TYPE.USDT ? USDTConnect : USDCConnect)(signerOrProvider).approve(
      ezioJson.address,
      quoteResponse.sellAmount,
    );
    console.log('approve waiting');
    setBackLoadingText(t('message.approveWaiting'));
    await approveTx.wait();
    console.log('approved');
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
    console.log('quoteNetWorth=' + quoteNetWorth.toString());
    console.log('pooledA=' + pooledA.toString());
    if (quoteNetWorth.lte(pooledA)) {
      console.log('使用金库USDC');
      // 如果金库USDC足够，用USDC转换成stmatic
      const convertSellAmount =
        fromType === TOKEN_TYPE.USDT
          ? await ezio.convertAmt(fromTokenAddress, USDC_ADDRESS, BigNumber.from(String(amount * 1000000)))
          : // 这是是否要转换小数位
            String(amount * 1000000);
      setBackLoadingText(t('message.request0x'));
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
    setBackLoadingText(t('message.sendingTx'));
    const purchaseTx = await ezio.purchase(TOKEN_TYPE.ezMatic, channel, quotes);
    setBackLoadingText(t('message.waitingTx'));
    await purchaseTx.wait();
  }

  /**
   * 赎回
   * @param fromType 卖出token类型，tokenA或者tokenB
   * @param toType 获得的token类型，USDC或者stMatic
   * @param amount
   * @param slippage 滑点
   * @param signerOrProvider signerOrProvider
   */
  async function redeem(
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
  async function redeemToUSDC(
    fromType: TOKEN_TYPE.ezUSD | TOKEN_TYPE.ezMatic,
    amount: number,
    signerOrProvider: Signer | Provider,
    slippage: number,
  ) {
    const redeemAmount = ethers.utils.parseEther(String(amount));
    const convertAmount = await getRedeemQuoteQty(fromType, redeemAmount, TOKEN_TYPE.USDC, signerOrProvider);
    if (convertAmount.gt(BigNumber.from(0))) {
      setBackLoadingText(t('message.request0x'));
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
      setBackLoadingText(t('message.sendingTx'));
      const purchaseTx = await EzioConnect(signerOrProvider)
        .connect(signerOrProvider)
        .redeem(fromType, channel, redeemAmount, USDC_ADDRESS, quoteResponse);
      setBackLoadingText(t('message.waitingTx'));
      await purchaseTx.wait();
    }
  }

  /**
   * 赎回成USDC
   * @param fromType 卖出token类型，tokenA或者tokenB
   * @param amount
   * @param slippage 滑点
   * @param signerOrProvider signerOrProvider
   */
  async function redeemToStMatic(
    fromType: TOKEN_TYPE.ezUSD | TOKEN_TYPE.ezMatic,
    amount: number,
    signerOrProvider: Signer | Provider,
    slippage: number,
  ) {
    const redeemAmount = ethers.utils.parseEther(String(amount));
    const convertAmount = await getRedeemQuoteQty(fromType, redeemAmount, TOKEN_TYPE.stMatic, signerOrProvider);
    if (convertAmount.gt(BigNumber.from(0))) {
      setBackLoadingText(t('message.request0x'));
      const quoteResponse = await getQuote(channel, STMATIC_ADDRESS, USDC_ADDRESS, convertAmount.toString(), slippage);
      await EzioConnect(signerOrProvider).redeem(1, channel, redeemAmount, STMATIC_ADDRESS, quoteResponse);
    } else {
      // convertAmount为零
      let quoteResponse6 = {
        sellToken: STMATIC_ADDRESS,
        buyToken: ethers.constants.AddressZero,
        sellAmount: convertAmount.toString(),
        swapCallData: ethers.constants.HashZero,
      };
      const purchaseTx = await EzioConnect(signerOrProvider).redeem(
        1,
        channel,
        convertAmount,
        STMATIC_ADDRESS,
        quoteResponse6,
      );
      setBackLoadingText(t('message.waitingTx'));
      await purchaseTx.wait();
    }
  }

  const getRedeemQuoteQty = async (
    fromToken: TOKEN_TYPE.ezUSD | TOKEN_TYPE.ezMatic,
    qty: BigNumber,
    toToken: TOKEN_TYPE.USDC | TOKEN_TYPE.stMatic,
    signerOrProvider: Signer | Provider,
  ) => {
    let amt: BigNumber;
    let quoteQty: BigNumber = BigNumber.from('0');
    const aToken = EzatConnect(signerOrProvider);
    const bToken = EzbtConnect(signerOrProvider);
    const ezio = EzioConnect(signerOrProvider);
    const stMatic = stMaticConnect(signerOrProvider);
    if (fromToken === TOKEN_TYPE.ezUSD) {
      if (toToken === TOKEN_TYPE.USDC) {
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
      if (toToken === TOKEN_TYPE.USDC) {
        quoteQty = qty.mul(await ezio.totalReserve()).div(await bToken.totalSupply());
      } else if (toToken === TOKEN_TYPE.stMatic) {
        let redeemReserveQty = qty.mul(await ezio.totalReserve()).div(await bToken.totalSupply());
        let leverage: BigNumber = await ezio.leverage();
        const DENOMINATOR = await ezio.LEVERAGE_DENOMINATOR();
        const scaledLeverage = leverage.sub(DENOMINATOR);
        quoteQty = redeemReserveQty.mul(scaledLeverage).div(leverage);
        const _DENOMINATOR = DENOMINATOR.toString();
        const _scaledLeverage = scaledLeverage.toString();
        const _leverage = leverage.toString();
      }
    }
    return quoteQty;
  };

  return { purchase, redeem };
}
