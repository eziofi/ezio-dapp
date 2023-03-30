import React, { ReactElement, useContext, useEffect, useState } from 'react';
import { ethers } from 'ethers';
import WalletConnectProvider from '@walletconnect/web3-provider';
import Web3Modal from 'web3modal';
import { NETWORK_ID, NETWORK_TYPE, TOKEN_TYPE } from '../wallet/helpers/constant';
import { useQuery } from 'react-query';
import { getAllowance } from '../wallet/helpers/contract_call';
import WalletConnect from '@walletconnect/client';
import QRCodeModal from '@walletconnect/qrcode-modal';
import { UIContext } from './UIProvider';
import { useTranslation } from 'react-i18next';

interface IWalletContext {
  account: string;
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
  walletProvider?: any;
  ethersProvider?: ethers.providers.Web3Provider;
  connectState: string;
  allowanceUSDT: string;
  allowanceUSDC: string;
  // networkId: number | undefined;
  networkName: NETWORK_TYPE | '';
  switchNetwork: (network: string) => Promise<any>;
}

export const WalletContext = React.createContext<IWalletContext>({} as IWalletContext);

export default function WalletProvider({ children }: { children: ReactElement }) {
  const [connectState, setConnectState] = React.useState('unconnected');
  const [account, setAccount] = React.useState('');
  const [walletProvider, setWalletProvider] = React.useState<any>();
  const [ethersProvider, setEthersProvider] = React.useState<ethers.providers.Web3Provider>();

  const { t } = useTranslation();

  useEffect(() => {
    if (!account && connectState === 'unconnected') {
      // const connector = new WalletConnect({
      //   bridge: 'https://bridge.walletconnect.org', // Required
      //   qrcodeModal: QRCodeModal,
      // });
      // if (!connector.connected) {
      //   // create new session
      //   connector.createSession();
      // }
      if (getConnectedCache()) {
        connect();
      }
    } else {
      subscribeProvider(walletProvider);
    }
  }, []);

  const [networkId, setNetworkId] = useState<number | undefined>(undefined);
  const [networkName, setNetworkName] = useState<NETWORK_TYPE | ''>('');

  // const getNetwork = () => getChainData(this.state.chainId).network;
  const [allowanceUSDT, setAllowanceUSDT] = useState('');

  const [allowanceUSDC, setAllowanceUSDC] = useState('');

  const { setMsg, openMsg, closeMsg } = useContext(UIContext);

  useQuery(
    ['allowance', TOKEN_TYPE.USDT],
    () => getAllowance(ethersProvider!.getSigner(), account, TOKEN_TYPE.USDT, networkName as NETWORK_TYPE),
    {
      enabled: !!ethersProvider && !!account && !!networkName,
      onSuccess: data => {
        setAllowanceUSDT(data.toString());
      },
    },
  );
  useQuery(
    ['allowance', TOKEN_TYPE.USDC],
    () => getAllowance(ethersProvider!.getSigner(), account, TOKEN_TYPE.USDC, networkName as NETWORK_TYPE),
    {
      enabled: !!ethersProvider && !!account && !!networkName,
      onSuccess: data => {
        setAllowanceUSDC(data.toString());
      },
    },
  );

  const connect = async () => {
    try {
      // const infuraId = 'd7c876c8797d474cb2227e81fda1cd39';
      const web3Modal = new Web3Modal({
        network: 'mainnet', // optional
        cacheProvider: true, // optional
        providerOptions: {
          walletconnect: {
            package: WalletConnectProvider,
            options: {
              // infuraId,
              // rpc: {
              //   1337: 'https://rpc-ezio.duoblock.cn',
              // },
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
        }, // required
      });
      setConnectState('connecting');
      const web3Connect = await web3Modal.connect();
      setWalletProvider(web3Connect);
      await subscribeProvider(web3Connect);
      const provider = new ethers.providers.Web3Provider(web3Connect);
      setEthersProvider(provider);
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      const chainId = await signer.getChainId();

      if (!Object.keys(NETWORK_ID).includes(String(chainId))) {
        console.log('请选择arbitrum或polygon链');
        openMsg('请选择arbitrum或polygon链');
        openMsg(t('message.errorNetTip'));
      }

      setNetworkName(NETWORK_ID[chainId as keyof typeof NETWORK_ID]);

      setAccount(address || '');
      setConnectState('connected');
      setConnectedCache(true);
      provider.on('eth_subscribe', (p1: any, p2: any) => {
        console.log(`eth_subscribe: ${p1}`);
      });
    } catch (e) {
      setConnectState('unconnected');
    } finally {
    }
  };

  const subscribeProvider = async (provider: any) => {
    if (!provider.on) {
      return;
    }
    provider.on('close', () => {
      console.log('close');
      window.location.reload();
    });
    provider.on('accountsChanged', async (accounts: string[]) => {
      console.log(`accountsChanged: ${accounts}`);
      if (!accounts[0]) {
        setConnectedCache(false);
        window.location.reload();
      } else {
        setAccount(accounts[0]);
      }
      // await this.setState({ address: accounts[0] });
      // await this.getAccountAssets();
    });
    provider.on('chainChanged', async (chainId: number) => {
      console.log(`chainChanged: ${chainId}`);
      setNetworkId(chainId);
      setNetworkName(NETWORK_TYPE[chainId as unknown as keyof typeof NETWORK_TYPE]);
      window.location.reload();

      // const { web3 } = this.state;
      // const networkId = await web3.eth.net.getId();
      // await this.setState({ chainId, networkId });
      // await this.getAccountAssets();
    });

    provider.on('disconnect', (error: { code: number; message: string }) => {
      console.log('disconnect');
      // setConnectedCache(false);
      window.location.reload();
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

  const setConnectedCache = (connected: boolean) => {
    localStorage.setItem('connected', connected ? '1' : '0');
  };

  const getConnectedCache = () => {
    return localStorage.getItem('connected') === '1';
  };

  const networkInfo = {
    polygon: {
      chainId: '0x89',
      chainName: 'Polygon',
      nativeCurrency: {
        name: 'MATIC',
        symbol: 'MATIC',
        decimals: 18,
      },
      // rpcUrls: ['https://rpc-mainnet.maticvigil.com/'],
      blockExplorerUrls: ['https://polygonscan.com/'],
    },
    arbitrum: {
      chainId: '0xa4b1',
      chainName: 'arbitrum',
      nativeCurrency: {
        name: 'ETH',
        symbol: 'ETH',
        decimals: 18,
      },
      // rpcUrls: ['https://rpc-mainnet.maticvigil.com/'],
      blockExplorerUrls: ['https://explorer.arbitrum.io'],
    },
  };

  //切换网络
  //walletProvider是上面的web3ModalProvider，而不是ethers获取的provider
  function switchNetwork(network: string) {
    return walletProvider
      .request({
        method: 'wallet_switchEthereumChain',
        // @ts-ignore
        params: [{ chainId: networkInfo[network].chainId }],
      })
      .catch((error: any) => {
        console.error(error);
        return Promise.reject(error);
      });
  }

  //添加网络
  async function addNetwork(network: string, web3ModalProvider: any) {
    try {
      return await web3ModalProvider.request({
        method: 'wallet_addEthereumChain',
        // @ts-ignore
        params: [networkInfo[network]],
      });
    } catch (error) {
      console.log(error);
    }
  }

  const value = {
    connectState,
    account,
    walletProvider,
    ethersProvider,
    connect,
    disconnect,
    allowanceUSDT,
    allowanceUSDC,
    // networkId,
    networkName,
    switchNetwork,
  };
  return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>;
}
