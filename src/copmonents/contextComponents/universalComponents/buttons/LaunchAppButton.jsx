import React, { useContext } from 'react';
import { ZoinksContext } from '../../../../zoinksPeriphery/ZoinksContext';
import Image from 'next/image';
import launch from '/public/launch.svg';
import Link from 'next/link';

export default function LaunchAppButton({ buttonType, type }) {
  const context = useContext(ZoinksContext);
  let text, color, hover, styles;
  let icon = launch;

  switch (buttonType) {
    case 'header':
      text = 'Launch App';
      color = 'bg-whiteDarkest';
      hover = 'hover:bg-cyan';
      styles = `flex whitespace-nowrap glitch__effect font-play font-bold gap-2 ${color} transition duration-300 ${hover}`;
      break;
    case 'heroScreen':
      text = 'Launch App';
      color = `${type ? 'bg-whiteInheritLess' : 'bg-whiteDarkest'}`;
      hover = 'hover:bg-cyan';
      styles = `flex whitespace-nowrap glitch__effect font-play font-bold gap-2 ${color} transition duration-300 ${hover}`;
      break;
  }

  function addNetwork(id) {
    let networkData;
    switch (id) {
      //bsc
      case '56':
        networkData = [
          {
            chainId: '0x38',
            chainName:
              'BNB Smart Chain (previously Binance Smart Chain Mainnet)',
            rpcUrls: ['https://bsc-dataseed.binance.org/'],
            nativeCurrency: {
              name: 'BINANCE COIN',
              symbol: 'BNB',
              decimals: 18,
            },
            blockExplorerUrls: ['https://bscscan.com/'],
          },
        ];
        break;
      default:
        break;
    }
    if (!window.ethereum) {
      return connectWallet();
    }
    // agregar red o cambiar red
    return window.ethereum.request({
      method: 'wallet_addEthereumChain',
      params: networkData,
    });
  }

  function connectWallet() {
    context.profile
      .connect()
      .then(() => {
        context.dataDomains.connectivity.update();
      })
      .catch((err) => {
        console.error('Error at wallet connect', { err });
      });
  }

  return (
    <button
      href="/zoinks"
      onClick={() => {
        if (
          !(
            window.ethereum?.networkVersion === '56' ||
            window.ethereum?.networkVersion === '31337'
          )
        ) {
          addNetwork('56').then(() => {
            if (
              window.ethereum?.networkVersion === '56' ||
              window.ethereum?.networkVersion === '31337'
            ) {
              connectWallet();
            }
          });
        } else {
          connectWallet();
        }
      }}
      className={styles}
    >
      {!context.dataDomains.connectivity.updateableIsConnected ? (
        <Link href="/zoinks" className="flex w-full h-full gap-2 px-8 py-4">
          <Image src={icon} alt="" />
          Launch App
        </Link>
      ) : (
        <Link href="/zoinks" className="flex w-full h-full gap-2 px-8 py-4">
          <Image src={icon} alt="text" />
          Open App
        </Link>
      )}
    </button>
  );
}
