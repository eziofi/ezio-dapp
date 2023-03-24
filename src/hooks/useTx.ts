import { BigNumber, ethers, Signer } from 'ethers';
import { Provider } from '@ethersproject/providers';
import { MAX_UINT256, QUOTE_CHANNEL, TOKEN_TYPE, NETWORK_TYPE, REVERSE_COIN } from '../views/wallet/helpers/constant';
import { getQuote } from '../views/wallet/helpers/utilities';
import {
  EzUSDConnect,
  E2LPConnect,
  EzioConnect,
  reverseCoinConnect,
  USDCConnect,
  USDTConnect,
  ezioJson,
  TOKENS,
} from '../views/wallet/helpers/contract_call';
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import useWallet from '../views/hooks/useWallet';
import { SwapQuoteStruct } from '../views/wallet/arbitrum/contract/contracts/interfaces/v1/IEzTreasury';
import { UIContext } from '../views/context/UIProvider';

const channel = process.env.REACT_APP_QUOTE_CHANNEL === '1inch' ? QUOTE_CHANNEL.OneInch : QUOTE_CHANNEL.ZeroEx;

export default function useTx() {
  const { setBackLoadingText, openMsg } = useContext(UIContext);
  const { t } = useTranslation();

  const { networkName } = useWallet();

  const ZEROEX_API_QUOTE_URL = `https://${networkName}.api.0x.org/swap/v1/quote`;
  const ONEINCH_API_QUOTE_URL = 'https://api.1inch.io/v5.0/137/swap';

  async function approve(fromType: TOKEN_TYPE.USDT | TOKEN_TYPE.USDC, signerOrProvider: Signer | Provider) {
    console.log('approve');
    setBackLoadingText(t('message.approving'));
    const approveTx = await (fromType === TOKEN_TYPE.USDT ? USDTConnect : USDCConnect)(
      signerOrProvider,
      networkName as NETWORK_TYPE,
    ).approve(
      ezioJson[networkName as keyof typeof ezioJson].address,
      MAX_UINT256.toString(),
      // '0',
    );
    console.log('approve waiting');
    setBackLoadingText(t('message.approveWaiting'));
    await approveTx.wait();
    console.log('approved');
    openMsg(t('message.approved'), 'success', 2000);
  }

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
    toType: TOKEN_TYPE.ezUSD | TOKEN_TYPE.E2LP,
    amount: number,
    slippage: number,
    signerOrProvider: Signer | Provider,
  ) {
    await (toType === TOKEN_TYPE.ezUSD ? purchaseA : purchaseB)(signerOrProvider, fromType, amount, slippage);
    openMsg(t('message.txConfirmed'), 'success', 2000);
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
      quoteResponse = await getQuote(
        channel,
        TOKENS[networkName as NETWORK_TYPE].USDT,
        TOKENS[networkName as NETWORK_TYPE].USDC,
        String(amount * 1000000),
        slippage,
        ONEINCH_API_QUOTE_URL,
        ZEROEX_API_QUOTE_URL,
        ezioJson[networkName as keyof typeof ezioJson].address,
      );
    } else if (fromType === TOKEN_TYPE.USDC) {
      // 直接购买，不通过1inch
      quoteResponse = {
        sellToken: TOKENS[networkName as NETWORK_TYPE].USDC,
        buyToken: ethers.constants.AddressZero,
        sellAmount: String(amount * 1000000),
        swapCallData: ethers.constants.HashZero,
      };
    }
    // console.log('approve');
    // setBackLoadingText(t('message.approving'));
    // const approveTx = await (fromType === TOKEN_TYPE.USDT ? USDTConnect : USDCConnect)(signerOrProvider).approve(
    //   ezioJson.address,
    //   quoteResponse.sellAmount,
    // );
    // console.log('approve waiting');
    // setBackLoadingText(t('message.approveWaiting'));
    // await approveTx.wait();
    // console.log('approved');
    setBackLoadingText(t('message.sendingTx'));
    const purchaseTx = await EzioConnect(signerOrProvider, networkName as NETWORK_TYPE).purchase(
      TOKEN_TYPE.ezUSD,
      channel,
      [quoteResponse],
    );
    setBackLoadingText(t('message.waitingTx'));
    await purchaseTx.wait();
  }

  async function purchaseB(
    signerOrProvider: Signer | Provider,
    fromType: TOKEN_TYPE.USDT | TOKEN_TYPE.USDC,
    amount: number,
    slippage: number,
  ) {
    const ezio = EzioConnect(signerOrProvider, networkName as NETWORK_TYPE);
    let quotes: SwapQuoteStruct[];
    // 先把USDC/USDT换成储备币
    const fromTokenAddress =
      fromType === TOKEN_TYPE.USDT
        ? TOKENS[networkName as NETWORK_TYPE].USDT
        : TOKENS[networkName as NETWORK_TYPE].USDC;
    setBackLoadingText(t('message.request0x'));
    const quoteResponse = await getQuote(
      channel,
      fromTokenAddress,
      // @ts-ignore
      TOKENS[networkName][REVERSE_COIN[networkName]],
      String(amount * 1000000),
      slippage,
      ONEINCH_API_QUOTE_URL,
      ZEROEX_API_QUOTE_URL,
      ezioJson[networkName as keyof typeof ezioJson].address,
    );
    // console.log('approve');
    // setBackLoadingText(t('message.approving'));
    // const approveTx = await (fromType === TOKEN_TYPE.USDT ? USDTConnect : USDCConnect)(signerOrProvider).approve(
    //   ezioJson.address,
    //   quoteResponse.sellAmount,
    // );
    // console.log('approve waiting');
    // setBackLoadingText(t('message.approveWaiting'));
    // await approveTx.wait();
    // console.log('approved');

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
      // 如果金库USDC足够，用USDC转换成储备币
      const convertSellAmount =
        fromType === TOKEN_TYPE.USDT
          ? await ezio.convertAmt(
              fromTokenAddress,
              TOKENS[networkName as NETWORK_TYPE].USDC,
              BigNumber.from(String(amount * 1000000)),
            )
          : // 这是是否要转换小数位
            String(amount * 1000000);
      setBackLoadingText(t('message.request0x'));
      const quoteResponse2 = await getQuote(
        channel,
        TOKENS[networkName as NETWORK_TYPE].USDC,
        // @ts-ignore
        TOKENS[networkName][REVERSE_COIN[networkName]],
        convertSellAmount.toString(),
        slippage,
        ONEINCH_API_QUOTE_URL,
        ZEROEX_API_QUOTE_URL,
        ezioJson[networkName as keyof typeof ezioJson].address,
      );
      quotes = [quoteResponse, quoteResponse2];
    } else {
      console.log('直接购买');
      quotes = [quoteResponse];
    }
    console.log(quotes);
    setBackLoadingText(t('message.sendingTx'));
    const purchaseTx = await ezio.purchase(TOKEN_TYPE.E2LP, channel, quotes);
    setBackLoadingText(t('message.waitingTx'));
    await purchaseTx.wait();
  }

  /**
   * 赎回
   * @param fromType 卖出token类型，tokenA或者tokenB
   * @param toType 获得的token类型，USDC或者储备币
   * @param amount
   * @param slippage 滑点
   * @param signerOrProvider signerOrProvider
   */
  async function redeem(
    fromType: TOKEN_TYPE.ezUSD | TOKEN_TYPE.E2LP,
    toType: TOKEN_TYPE.USDC | TOKEN_TYPE.ReverseCoin,
    amount: number,
    signerOrProvider: Signer | Provider,
    slippage: number,
  ) {
    await (toType === TOKEN_TYPE.USDC ? redeemToUSDC : redeemToReverseCoin)(
      fromType,
      amount,
      signerOrProvider,
      slippage,
    );
    openMsg(t('message.txConfirmed'), 'success', 2000);
  }

  /**
   * 赎回成USDC
   * @param fromType 卖出token类型，tokenA或者tokenB
   * @param amount
   * @param slippage 滑点
   * @param signerOrProvider signerOrProvider
   */
  async function redeemToUSDC(
    fromType: TOKEN_TYPE.ezUSD | TOKEN_TYPE.E2LP,
    amount: number,
    signerOrProvider: Signer | Provider,
    slippage: number,
  ) {
    const redeemAmount = ethers.utils.parseEther(String(amount));
    const convertAmount = await getRedeemQuoteQty(fromType, redeemAmount, TOKEN_TYPE.USDC, signerOrProvider);
    if (convertAmount.gt(BigNumber.from(0))) {
      setBackLoadingText(t('message.request0x'));
      const quoteResponse = await getQuote(
        channel,
        // @ts-ignore
        TOKENS[networkName][REVERSE_COIN[networkName]],
        TOKENS[networkName as NETWORK_TYPE].USDC,
        convertAmount.toString(),
        slippage,
        ONEINCH_API_QUOTE_URL,
        ZEROEX_API_QUOTE_URL,
        ezioJson[networkName as keyof typeof ezioJson].address,
      );
      console.log('USDC储量不够，动用储备币换成USDC');
      await EzioConnect(signerOrProvider, networkName as NETWORK_TYPE)
        .connect(signerOrProvider)
        .redeem(fromType, channel, redeemAmount, TOKENS[networkName as NETWORK_TYPE].USDC, quoteResponse);
    } else {
      // 把USDC直接转给用户
      console.log('把USDC直接转给用户');
      const quoteResponse = {
        sellToken: TOKENS[networkName as NETWORK_TYPE].USDC,
        buyToken: ethers.constants.AddressZero,
        sellAmount: convertAmount,
        swapCallData: ethers.constants.HashZero,
      };
      setBackLoadingText(t('message.sendingTx'));
      const purchaseTx = await EzioConnect(signerOrProvider, networkName as NETWORK_TYPE)
        .connect(signerOrProvider)
        .redeem(fromType, channel, redeemAmount, TOKENS[networkName as NETWORK_TYPE].USDC, quoteResponse);
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
  async function redeemToReverseCoin(
    fromType: TOKEN_TYPE.ezUSD | TOKEN_TYPE.E2LP,
    amount: number,
    signerOrProvider: Signer | Provider,
    slippage: number,
  ) {
    const redeemAmount = ethers.utils.parseEther(String(amount));
    const convertAmount = await getRedeemQuoteQty(fromType, redeemAmount, TOKEN_TYPE.ReverseCoin, signerOrProvider);
    if (convertAmount.gt(BigNumber.from(0))) {
      setBackLoadingText(t('message.request0x'));
      const quoteResponse = await getQuote(
        channel,
        // @ts-ignore
        TOKENS[networkName][REVERSE_COIN[networkName]],
        TOKENS[networkName as NETWORK_TYPE].USDC,
        convertAmount.toString(),
        slippage,
        ONEINCH_API_QUOTE_URL,
        ZEROEX_API_QUOTE_URL,
        ezioJson[networkName as keyof typeof ezioJson].address,
      );
      await EzioConnect(signerOrProvider, networkName as NETWORK_TYPE).redeem(
        1,
        channel,
        redeemAmount,
        // @ts-ignore
        TOKENS[networkName][REVERSE_COIN[networkName]],
        quoteResponse,
      );
    } else {
      // convertAmount为零
      let quoteResponse6 = {
        // @ts-ignore
        sellToken: TOKENS[networkName][REVERSE_COIN[networkName]],
        buyToken: ethers.constants.AddressZero,
        sellAmount: convertAmount.toString(),
        swapCallData: ethers.constants.HashZero,
      };
      const purchaseTx = await EzioConnect(signerOrProvider, networkName as NETWORK_TYPE).redeem(
        1,
        channel,
        convertAmount,
        // @ts-ignore
        TOKENS[networkName][REVERSE_COIN[networkName]],
        quoteResponse6,
      );
      setBackLoadingText(t('message.waitingTx'));
      await purchaseTx.wait();
    }
  }

  const getRedeemQuoteQty = async (
    fromToken: TOKEN_TYPE.ezUSD | TOKEN_TYPE.E2LP,
    qty: BigNumber,
    toToken: TOKEN_TYPE.USDC | TOKEN_TYPE.ReverseCoin,
    signerOrProvider: Signer | Provider,
  ) => {
    let amt: BigNumber;
    let quoteQty: BigNumber = BigNumber.from('0');
    const aToken = EzUSDConnect(signerOrProvider, networkName as NETWORK_TYPE);
    const bToken = E2LPConnect(signerOrProvider, networkName as NETWORK_TYPE);
    const ezio = EzioConnect(signerOrProvider, networkName as NETWORK_TYPE);
    const reverseCoin = reverseCoinConnect(signerOrProvider, networkName as NETWORK_TYPE);
    if (fromToken === TOKEN_TYPE.ezUSD) {
      if (toToken === TOKEN_TYPE.USDC) {
        amt = qty.mul(await aToken.netWorth()).div(BigNumber.from('10').pow(await aToken.decimals()));
        console.log('amt=' + amt.toString());
        console.log('pooledA=' + (await ezio.pooledA()).toString());
        if (amt.gt(await ezio.pooledA())) {
          quoteQty = amt
            .sub(await ezio.pooledA())
            .mul(BigNumber.from('10').pow(await reverseCoin.decimals()))
            // @ts-ignore
            .div(await ezio.getPrice(TOKENS[networkName][REVERSE_COIN[networkName]]));
        }
      }
    } else {
      // amt = qty.mul(await bToken.netWorth()).div(BigNumber.from('10').pow(await bToken.decimals()));
      if (toToken === TOKEN_TYPE.USDC) {
        quoteQty = qty.mul(await ezio.totalReserve()).div(await bToken.totalSupply());
      } else if (toToken === TOKEN_TYPE.ReverseCoin) {
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

  return { purchase, redeem, approve };
}
