export default {
  common: {
    ok: '确定',
    warning: '警告',
    errorNetworkTip: '您连接的不是Arbitrum网络，请至您的钱包软件中切换网络。',
  },
  header: {
    selectNet: '请选择网络',
  },
  nav: {
    home: '首页',
    swap: '兑换',
    // purchase: '购买',
    // redeem: '赎回',
    account: '账户',
    analytics: '分析',
    wallet: '连接钱包',
  },
  message: {
    request0x: '请求0x...',
    approving: '发送授权交易……',
    approveWaiting: '等待授权结果……',
    sendingTx: '发送交易……',
    waitingTx: '等待交易确认……',
    approved: '授权交易已确认',
    txConfirmed: '交易已确认',
    errorNetTip: '请连接arbitrum或polygon链',
  },
  home: {
    card: {
      rate: 'ezUSD APR',
      fundCost: 'E2LP年化成本',
      rebalancePrice: 'E2LP下折价格',
      leverage: 'E2LP杠杆率',
    },
    coin: '币别',
    price: '净值',
    one_day_change: '24H变化',
    one_day_purchase: '24H购买量',
    treasury: '金库资产市值',
    EZAT_totalSupply: 'ezUSD发行数量',
    EZBT_totalSupply: 'E2LP发行数量',
    EZIO_totalSupply: 'eZIO发行数量',
    treasury_totalValue: '金库总净值($)',
    EZAT_Rate: 'ezUSD日利率',
    net: '网络',
    lang: '语言',
    wallet: '钱包',
    mainnet: '主网',
    testnet: '测试网',
    connectedAccount: '已连接账号',
    logout: '退出账号',
    login: '连接钱包',
    connecting: '连接中...',
    treasuryValue: '金库市值',
    priceTitle: 'Token价格',
    ethPrice: '以太币价格',
    netWorthAxis: '价格',
    netWorthEzatAxis: 'Token价格',
    netWorthEzbtAxis: 'E2LP价格',
    aRateAxis: 'ezUSD回报率',
    totalSupplyTitle: 'Token供应量',
    totalSupplyAxis: '供应量',
    aNetWorthSeries: 'ezUSD价格',
    bNetWorthSeries: 'E2LP价格',
    wstETHPrice: 'wstETH价格',
    stMATICPrice: 'stMATIC价格',
    aTotalSupplySeries: 'ezUSD供应量',
    bTotalSupplySeries: 'E2LP供应量',
    copyText: '复制成功',
    E2LPTotalnetworth: 'E2LP总净值',
    ezUsdTotalnetworth: 'ezUSD总净值',
    abNetworth: 'Token总净值',
    ShowSevenDays: '7天',
    ShowTwelveHours: '12小时',
  },
  purchase: {
    purchaseValue: '购买',
    leftBalance: '账户余额：',
    leftAvailableAmount: '本轮剩余额度',
    currentTime: '当前时间',
    purchaseAction: '购买',
    approveAction: '授权使用',
    checkTips: '查看下折规则说明',
    reward: '奖励',
    tipTitle: '下折规则说明',
    // rewardTips: '每满1000 USD奖励 1 EZIO',
    unitPrice: '参考单价',
    USDTEstimated: '预估获得',
    estimated: '预计获得',
    EZATRate: 'ezUSD参考年利率',
    feeRate: '赎回手续费率',
    moreThanAvailableMsg: '购买金额不能大于本轮剩余数量。',
    moreThanBalanceMsg: '购买金额不能大于余额。',
    extractAction: '提取',
    ivtSeq: '申购邀约ID',
    time: '时间',
    tokenName: '币别',
    amount: '金额',
    action: '操作',
    slippageSetting: '设置',
    PleaseEnterTheSlipPoint: '请输入滑点',
    slippage: '滑点',
    cancel: '取消',
    ok: '确定',
    purchaseTip: '交易中，请在metamask中操作',
    maxValue: '最大',
    slippageTolerance: '滑点容差',
    voluntarily: '自动',
  },
  redeem: {
    redeemValue: '赎回',
    title: '赎回',
    redeemInputLabel: '份数',
    redeemAction: '赎回',
    maxRedeemAmount: '最大赎回数量',
    overAmount: '赎回数量超过上限',
    ETHEstimated: '预计获得ETH数量',
    moreThanBalanceMsg: '赎回数量不能大于账户token剩余数量。',
  },
  account: {
    extractAction: '提取',
    balance: '余额',
    detail: '交易记录',
    checkDetail: '查看明细>>',
    netWorth: '总价值',
    recordPurchaseAction: '购买',
    recordRedeemAction: '赎回',
  },
  analytics: {
    title: {
      usdc: '金库USDC价值',
      wstETH: '金库wstETH价值',
      stMATIC: '金库stMATIC价值',
      fee: '手续费收入(过去24h)',
    },
    everyday: '每日',
    accumulativeTotal: '累计',
    CommissionDetail: '手续费',
  },
  tips: {
    line1: '由于stETH大幅下跌可能会给TokenA的投资人带来风险。',
    line2: '当TokenB的所有者权益低于已匹配TokenA资金的60%时，TokenA的持有人将减少出借资金。',
    line3: '出售金库中1/4的stETH，资金存入TokenA未匹配资金。',
  },
};
