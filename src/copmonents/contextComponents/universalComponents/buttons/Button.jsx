import React, { useContext } from 'react';
import { ZoinksContext } from '../../../../zoinksPeriphery/ZoinksContext';
import Image from 'next/image';
import play from '/public/play.svg';
import linker from '/public/linker.svg';

export default function Button({ buttonType, styles }) {
  const context = useContext(ZoinksContext);
  let icon, text, color, hover, href;

  switch (buttonType) {
    case 'Manual':
      icon = play;
      text = 'Manual';
      color = 'bg-whiteDarkest';
      hover = 'hover:bg-whiteDark';
      href = '#manual';
      break;

    case 'LearnMore':
      icon = linker;
      text = 'Learn more';
      color = 'bg-whiteDarkest';
      hover = 'hover:bg-whiteDark';
      href = '#learnmore';
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
      <a
        className={`flex items-center justify-center pc390:px-8 whitespace-nowrap font-play font-bold gap-2 px-6 py-4 ${color} transition duration-300 ${hover}`}
        href={href}
      >
        <Image src={icon} alt="#" />
        {text}
      </a>
    </button>
  );
}
