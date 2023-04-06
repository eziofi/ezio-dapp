import * as ethUtil from 'ethereumjs-util';
import { IChainData, OneInchQuoteParams, ZeroExQuoteParams } from './types';
import supportedChains from './chains';
import { BigNumber, BigNumberish, FixedNumber, utils } from 'ethers';
import qs from 'qs';
import { formatUnits } from 'ethers/lib/utils';
import { QUOTE_CHANNEL, TOKEN_DECIMAL, TOKEN_TYPE } from './constant';
import { SwapQuoteStruct } from '../arbitrum/contract/contracts/interfaces/v1/IEzTreasury';
import { ezioJson } from './contract_call';
// import { apiGetGasPrices, apiGetAccountNonce } from "./api";
// import { convertAmountToRawNumber, convertStringToHex } from "./bignumber";

export function capitalize(string: string): string {
  return string
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
}

export function ellipseText(text: string = '', maxLength: number = 9999): string {
  if (text.length <= maxLength) {
    return text;
  }
  const _maxLength = maxLength - 3;
  let ellipse = false;
  let currentLength = 0;
  const result =
    text
      .split(' ')
      .filter(word => {
        currentLength += word.length;
        if (ellipse || currentLength >= _maxLength) {
          ellipse = true;
          return false;
        } else {
          return true;
        }
      })
      .join(' ') + '...';
  return result;
}

export function ellipseAddress(address: string = '', width: number = 10): string {
  return `${address.slice(0, width)}...${address.slice(-width)}`;
}

export function padLeft(n: string, width: number, z?: string): string {
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

export function sanitizeHex(hex: string): string {
  hex = hex.substring(0, 2) === '0x' ? hex.substring(2) : hex;
  if (hex === '') {
    return '';
  }
  hex = hex.length % 2 !== 0 ? '0' + hex : hex;
  return '0x' + hex;
}

export function removeHexPrefix(hex: string): string {
  return hex.toLowerCase().replace('0x', '');
}

export function getDataString(func: string, arrVals: any[]): string {
  let val = '';
  for (let i = 0; i < arrVals.length; i++) {
    val += padLeft(arrVals[i], 64);
  }
  const data = func + val;
  return data;
}

export function isMobile(): boolean {
  let mobile: boolean = false;

  function hasTouchEvent(): boolean {
    try {
      document.createEvent('TouchEvent');
      return true;
    } catch (e) {
      return false;
    }
  }

  function hasMobileUserAgent(): boolean {
    if (
      /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(
        navigator.userAgent,
      ) ||
      /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw-(n|u)|c55\/|capi|ccwa|cdm-|cell|chtm|cldc|cmd-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc-s|devi|dica|dmob|do(c|p)o|ds(12|-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(-|_)|g1 u|g560|gene|gf-5|g-mo|go(.w|od)|gr(ad|un)|haie|hcit|hd-(m|p|t)|hei-|hi(pt|ta)|hp( i|ip)|hs-c|ht(c(-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i-(20|go|ma)|i230|iac( |-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|-[a-w])|libw|lynx|m1-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|-([1-8]|c))|phil|pire|pl(ay|uc)|pn-2|po(ck|rt|se)|prox|psio|pt-g|qa-a|qc(07|12|21|32|60|-[2-7]|i-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h-|oo|p-)|sdk\/|se(c(-|0|1)|47|mc|nd|ri)|sgh-|shar|sie(-|m)|sk-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h-|v-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl-|tdg-|tel(i|m)|tim-|t-mo|to(pl|sh)|ts(70|-|m3|m5)|tx-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas-|your|zeto|zte-/i.test(
        navigator.userAgent.substr(0, 4),
      )
    ) {
      return true;
    } else if (hasTouchEvent()) {
      return true;
    }
    return false;
  }

  mobile = hasMobileUserAgent();

  return mobile;
}

export function getChainData(chainId: number): IChainData {
  const chainData = supportedChains.filter((chain: any) => chain.chain_id === chainId)[0];

  if (!chainData) {
    throw new Error('ChainId missing or not supported');
  }

  const API_KEY = process.env.REACT_APP_INFURA_ID;

  if (chainData.rpc_url.includes('infura.io') && chainData.rpc_url.includes('%API_KEY%') && API_KEY) {
    const rpcUrl = chainData.rpc_url.replace('%API_KEY%', API_KEY);

    return {
      ...chainData,
      rpc_url: rpcUrl,
    };
  }

  return chainData;
}

export function hashPersonalMessage(msg: string): string {
  const buffer = Buffer.from(msg);
  const result = ethUtil.hashPersonalMessage(buffer);
  const hash = ethUtil.bufferToHex(result);
  return hash;
}

export function recoverPublicKey(sig: string, hash: string): string {
  const sigParams = ethUtil.fromRpcSig(sig);
  const hashBuffer = Buffer.from(hash.replace('0x', ''), 'hex');
  const result = ethUtil.ecrecover(hashBuffer, sigParams.v, sigParams.r, sigParams.s);
  const signer = ethUtil.bufferToHex(ethUtil.publicToAddress(result));
  return signer;
}

export function recoverPersonalSignature(sig: string, msg: string): string {
  const hash = hashPersonalMessage(msg);
  const signer = recoverPublicKey(sig, hash);
  return signer;
}

export function isObject(obj: any): boolean {
  return typeof obj === 'object' && !!Object.keys(obj).length;
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

export const formatString = (str: string, decimal: number = 2) => {
  const numArr = str.split('.');

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

function getMinMaxValues(data: number[]) {
  let minValue = Math.min(...data);
  let maxValue = Math.max(...data);

  // 计算一个缓冲区，以便在绘制图表时确保Y轴上的所有数据都可以被完全显示
  let buffer = (maxValue - minValue) * 0.5;

  return {
    min: minValue - buffer,
    max: maxValue + buffer,
  };
}

/**
 *
 * @param data numbers[]
 * @returns {max,min} 接近data最大值和最小值，圆整后的最大值和最小值
 *
 */
export function roundMinMaxValues(data: number[]) {
  let yAxisRange = getMinMaxValues(data);

  if (yAxisRange.max - yAxisRange.min > 1) {
    yAxisRange.min = Math.floor(yAxisRange.min / 10) * 10;
    yAxisRange.max = Math.ceil(yAxisRange.max / 10) * 10;

    // 将最大值向上舍入，以确保它们满足指定的步长（10、20、30、40...）。
    if (yAxisRange.max - yAxisRange.min < 15) {
      yAxisRange.min = Math.floor(yAxisRange.min / 5) * 5;
      yAxisRange.max = Math.ceil(yAxisRange.max / 5) * 5;
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
