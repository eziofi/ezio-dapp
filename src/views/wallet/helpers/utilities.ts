import { OneInchQuoteParams, ZeroExQuoteParams } from './types';
import { BigNumber, FixedNumber } from 'ethers';
import qs from 'qs';
import { formatUnits } from 'ethers/lib/utils';
import { QUOTE_CHANNEL, TOKEN_DECIMAL, TOKEN_TYPE } from './constant';
import { SwapQuoteStruct } from '../arbitrum/contract/contracts/interfaces/v1/IEzVault';

export function capitalize(string: string): string {
  return string
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

/**
 * 格式化数值，转换小数位数
 * @param value wei 单位的数值
 * @param tokenType token种类，影响计算位数
 * @param floatDecimal 最多显示多少位小数，默认2位
 * @param manualDecimal 自定义除以的位数
 * @returns 带小数的FixedNumber
 */
export function formatDecimal(
  value: BigNumber | undefined,
  tokenType: TOKEN_TYPE,
  floatDecimal: number = 2,
  manualDecimal?: number,
): FixedNumber {
  if (!value) {
    return FixedNumber.from(0);
  }
  const ether = formatUnits(value, manualDecimal ? manualDecimal : TOKEN_DECIMAL[tokenType]);
  return formatString(ether, floatDecimal);
}

export function add(x: number, y: number) {
  return x + y;
}

export const formatString = (str: string | FixedNumber, decimal: number = 2) => {
  let _str;
  if (str instanceof FixedNumber) {
    _str = str.toString();
  } else {
    _str = str;
  }
  const numArr = _str.split('.');

  if (numArr.length == 1) {
    return FixedNumber.from(numArr[0]);
  }
  if (numArr[1] === '0') {
    return FixedNumber.from(numArr[0]);
  }

  const res = FixedNumber.from(
    `${numArr[0]}.${numArr[1].length > decimal ? numArr[1].substring(0, decimal) : numArr[1]}`,
  );
  return res;
};

export function timestampFormat(timestamp: number) {
  let date = new Date(timestamp);
  const Y = date.getFullYear() + '-';
  const M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
  const D = date.getDate() + ' ';
  const h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
  const m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
  const s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
  return Y + M + D + h + m + s;
}

/**
 * 计算Y轴最大值
 * @param data，数据列表
 * @returns Y轴最大值
 */
export function getYMax(data: number[]) {
  if (data.length === 0) return 0;
  const max = Math.max(...data);
  if (max > 1) {
    const length = max.toString().split('.')[0].length;
    const float = max / Math.pow(10, length - 1);
    const first = Math.ceil(float);
    const maxYValue = first * Math.pow(10, length - 1);

    return maxYValue;
  } else {
    const floatString = max.toString().split('.')[1];
    let firstNumDecimal = floatString?.length - String(parseInt(floatString)).length; // 小数点后有多少个零
    const roundMax = max * Math.pow(10, firstNumDecimal + 1); // 乘为整数
    const ceilNum = Math.ceil(roundMax); // 向上圆整到最小整数
    const res = ceilNum / Math.pow(10, firstNumDecimal + 1); //再除为原先的位数
    return res;
  }
}

/**
 * 计算Y轴最小值
 * @param data，数据列表
 * @returns Y轴最小值
 */
export function getYMin(data: number[]) {
  if (data.length === 0) return 0;
  const min = Math.min(...data);
  if (min > 1) {
    const length = min.toString().split('.')[0].length;
    const float = min / Math.pow(10, length - 1);
    const first = Math.floor(float);
    const minValue = first * Math.pow(10, length - 1);

    return minValue;
  }
}

function getMinMaxValues(data: number[], smSection?: boolean) {
  let minValue = Math.min(...data);
  let maxValue = Math.max(...data);

  // 计算一个缓冲区，以便在绘制图表时确保Y轴上的所有数据都可以被完全显示
  let buffer = maxValue - minValue;

  if (!smSection) {
    return {
      min: Math.floor(minValue) - buffer,
      max: maxValue + buffer * 5,
    };
  } else {
    return {
      min: minValue - buffer * 0.5,
      max: maxValue + buffer * 0.5,
    };
  }
}

/**
 *
 * @param data numbers[]
 * @param smSection boolean 更小的区间
 * @returns {max,min} 接近data最大值和最小值，圆整后的最大值和最小值
 *
 */
export function roundMinMaxValues(data: number[], smSection?: boolean) {
  let yAxisRange = getMinMaxValues(data, smSection);

  if (!smSection) {
    if (yAxisRange.max - yAxisRange.min > 1) {
      yAxisRange.min = Math.floor(yAxisRange.min / 10) * 10;
      yAxisRange.max = Math.ceil(yAxisRange.max / 10) * 10;

      // 将最大值向上舍入，以确保它们满足指定的步长（10、20、30、40...）。
      if (yAxisRange.max - yAxisRange.min < 15) {
        yAxisRange.min = Math.floor(yAxisRange.min / 5) * 5;
        yAxisRange.max = Math.ceil(yAxisRange.max / 5) * 5;
      }
    }
  }

  return yAxisRange;
}

export function getDecimal(data: number[]) {
  if (data.length === 0) return 0;
  const max = Math.max(...data);
  if (max > 1) return 0;
  else {
    const floatString = max.toString().split('.')[1];
    let firstNumDecimal = floatString?.length - String(parseInt(floatString)).length; // 小数点后有多少个零
    return firstNumDecimal + 2;
  }
}

export async function getOneInchQuoteResponse(quoteParams: OneInchQuoteParams, ONEINCH_API_QUOTE_URL: string) {
  let quote: SwapQuoteStruct;
  let quoteUrl = `${ONEINCH_API_QUOTE_URL}?${qs.stringify(quoteParams)}`;
  let response = await getJson(quoteUrl);
  //console.log("=======response=",response);
  quote = {
    buyToken: quoteParams.toTokenAddress,
    sellAmount: quoteParams.amount,
    sellToken: quoteParams.fromTokenAddress,
    swapCallData: response.tx.data,
  };
  return quote;
}

export async function getZeroExQuoteResponse(quoteParams: ZeroExQuoteParams, ZEROEX_API_QUOTE_URL: string) {
  let quoteResponse: SwapQuoteStruct;
  let quoteUrl = `${ZEROEX_API_QUOTE_URL}?${qs.stringify(quoteParams)}`;
  let response = await getJson(quoteUrl);
  quoteResponse = {
    buyToken: quoteParams.buyToken,
    sellAmount: quoteParams.sellAmount,
    sellToken: quoteParams.sellToken,
    swapCallData: response.data,
  };
  return quoteResponse;
}

export async function getJson(url: RequestInfo | URL) {
  const res = await fetch(url);
  const json = await res.json();
  if (!json) {
    throw new Error('no response');
  }
  if (json.error) {
    console.log(json);
    throw new Error(json.description || json.error);
  }
  return json;
}

export async function getQuote(
  channel: QUOTE_CHANNEL,
  fromTokenAddress: string,
  toTokenAddress: string,
  amount: string,
  slippage: number,
  ONEINCH_API_QUOTE_URL: string,
  ZEROEX_API_QUOTE_URL: string,
  ezioAddress: string,
) {
  const blankRes = {
    buyToken: '',
    sellAmount: 0,
    sellToken: '',
    swapCallData: '',
  };
  try {
    if (channel === QUOTE_CHANNEL.OneInch) {
      const quoteParams: OneInchQuoteParams = {
        fromTokenAddress,
        toTokenAddress,
        amount,
        fromAddress: ezioAddress,
        slippage,
        disableEstimate: true,
      };
      return await getOneInchQuoteResponse(quoteParams, ONEINCH_API_QUOTE_URL);
    }
    if (channel === QUOTE_CHANNEL.ZeroEx) {
      const quoteParams: ZeroExQuoteParams = {
        sellToken: fromTokenAddress,
        buyToken: toTokenAddress,
        sellAmount: amount,
        slippagePercentage: String(slippage / 100),
      };
      return await getZeroExQuoteResponse(quoteParams, ZEROEX_API_QUOTE_URL);
    }
    return blankRes;
  } catch (e) {
    console.error(e);
    return blankRes;
  }
}
