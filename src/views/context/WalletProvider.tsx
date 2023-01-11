import React, { ReactElement, useEffect } from 'react';
import { ethers } from 'ethers';
import WalletConnectProvider from '@walletconnect/web3-provider';
import Web3Modal from 'web3modal';

interface IWalletContext {
  account: string;
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
  walletProvider?: any;
  ethersProvider?: ethers.providers.Web3Provider;
  connectState: string;
}

export const WalletContext = React.createContext<IWalletContext>({} as IWalletContext);

export default function WalletProvider({ children }: { children: ReactElement }) {
  const [connectState, setConnectState] = React.useState('unconnected');
  const [account, setAccount] = React.useState('');
  const [walletProvider, setWalletProvider] = React.useState<any>();
  const [ethersProvider, setEthersProvider] = React.useState<ethers.providers.Web3Provider>();

  useEffect(() => {
    if (!account && connectState === 'unconnected') {
      connect()
        .then(() => {})
        .catch(() => {});
    } else {
      subscribeProvider(walletProvider)
        .then(() => {})
        .catch(() => {});
    }
  }, []);

  // const getNetwork = () => getChainData(this.state.chainId).network;

  const connect = async () => {
    const infuraId = 'd7c876c8797d474cb2227e81fda1cd39';

    const providerOptions = {
      walletconnect: {
        package: WalletConnectProvider,
        options: {
          // infuraId,
          rpc: {
            1337: 'https://rpc-ezio.duoblock.cn',
          },
          qrcodeModalOptions: {
            desktopLinks: [
              'ledger',
              'tokenary',
              'wallet',
              'wallet 3',
              'secuX',
              'ambire',
              'wallet3',
              'apolloX',
              'zerion',
              'sequence',
              'punkWallet',
              'kryptoGO',
              'nft',
              'riceWallet',
              'vision',
              'keyring',
            ],
            mobileLinks: ['rainbow', 'metamask', 'argent', 'trust', 'imtoken', 'pillar'],
          },
        },
      },
    };

    const web3Modal = new Web3Modal({
      network: 'mainnet', // optional
      cacheProvider: true, // optional
      providerOptions, // required
    });
    setConnectState('connecting');
    const connect = await web3Modal.connect();
    setWalletProvider(connect);

    await subscribeProvider(connect);

    const provider = new ethers.providers.Web3Provider(connect);
    setEthersProvider(provider);
    const signer = provider.getSigner();
    const address = await signer.getAddress();
    setAccount(address);
    setConnectState('connected');

    provider.on('eth_subscribe', (p1: any, p2: any) => {
      console.log(`eth_subscribe: ${p1}`);
    });

    // provider.on('', (log, event) => {

    // })

    // console.log(`address: ${address}`);
    // console.log(`address: ${address.substring(2)}`);
    // const network = await provider.getNetwork();
    // console.log(`chainId:${network.chainId}`);
    // const accounts = await provider.send('eth_requestAccounts', []);
    // console.log(accounts);

    // const purchase = EzPurchase__factory.connect('contractagdress', signer);
    // // 创建一个申购邀约
    // purchase.createInvitation();
    // const daiContract: DaiToken = DaiToken__factory.connect(ContractAddress.dai, signer);
    // const daiBalance = await daiContract.balanceOf('e2eb1544b1ad7ff730e8c743b1f172d52a8bf386');
    // console.log(`daiBalance: ${daiBalance}`);
  };

  const subscribeProvider = async (provider: any) => {
    if (!provider.on) {
      return;
    }
    // provider.on("close", () => this.resetApp());
    provider.on('accountsChanged', async (accounts: string[]) => {
      console.log(`accountsChanged: ${accounts}`);
      setAccount(accounts[0]);
      // await this.setState({ address: accounts[0] });
      // await this.getAccountAssets();
    });
    provider.on('chainChanged', async (chainId: number) => {
      console.log(`chainChanged: ${chainId}`);
      // const { web3 } = this.state;
      // const networkId = await web3.eth.net.getId();
      // await this.setState({ chainId, networkId });
      // await this.getAccountAssets();
    });

    provider.on('disconnect', (error: { code: number; message: string }) => {
      console.log(error);
    });

    provider.on('eth_subscribe', (p1: any, p2: any) => {
      console.log(`eth_subscribe: ${p1}`);
    });
  };

  const disconnect = async () => {
    setAccount('');
    setEthersProvider(undefined);
    setWalletProvider(undefined);
    setConnectState('unconnected');
  };

  const value = { connectState, account, walletProvider, ethersProvider, connect, disconnect };
  return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>;
}
