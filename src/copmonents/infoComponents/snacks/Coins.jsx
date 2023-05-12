import Image from 'next/image';
import { useContext } from 'react';
import Snack from '/public/coins/Snack.svg';
import BSnack from '/public/coins/BSnack.svg';
import EtSnack from '/public/coins/EtSnack.svg';
import CoinGray from '/public/coins/CoinGray.svg';
import DataDomain from '../../../zoinksPeriphery/services/dataDomains/DataDomain';
import { ZoinksContext } from '../../../zoinksPeriphery/ZoinksContext';
import { parseEther } from 'ethers/lib/utils';

const Coins = ({ type, activeCoin, setActiveCoin }) => {
  let context = useContext(ZoinksContext);
  let image, index, busdPrice, zoinksPrice;

  switch (type) {
    case 'Snacks':
      image = Snack;
      index = 2;
      busdPrice = context.dataDomains.prices.updateableBusdPricePancake;
      zoinksPrice = context.dataDomains.prices.updateableZoinksPricePancake;
      break;
    case 'BtcSnacks':
      image = BSnack;
      index = 3;
      busdPrice = context.dataDomains.prices.updateableBusdPriceBi;
      zoinksPrice = context.dataDomains.prices.updateableZoinksPriceBi;
      break;
    case 'EthSnacks':
      image = EtSnack;
      index = 4;
      busdPrice = context.dataDomains.prices.updateableBusdPriceApe;
      zoinksPrice = context.dataDomains.prices.updateableZoinksPriceApe;
      break;
    default:
      break;
  }

  return (
    <>
      <div
        onClick={() => {
          setActiveCoin(index);
        }}
        className={`w-1/3 flex-col items-center pc960:flex-row cursor-pointer flex justify-center gap-2 pc442:p-4 p-2 font-play font-bold text-sm leading-[21px] ${
          activeCoin === index
            ? 'bg-whiteInherit'
            : 'opacity-40 hover:opacity-70'
        } `}
      >
        <div className="flex gap-2 flex-col pc540:flex-row items-center">
          <Image
            src={activeCoin === index ? image : CoinGray}
            className="w-6 h-auto -mt-0.5"
            alt="#"
          />
          <p className="pc442:text-[14px] text-[12px]">{type}</p>
        </div>
        <div className="flex gap-1 text-center">
          {type === 'Snacks'
            ? `${DataDomain.formatBalance(
                parseEther(
                  context.dataDomains.statisticsSnacks.updateableSnacksCurrentRate.toString()
                ),
                6
              )} HZUSD`
            : type === 'BtcSnacks'
            ? `${DataDomain.formatBalance(
                parseEther(
                  context.dataDomains.statisticsSnacks.updateableBtcSnacksCurrentRate.toString()
                ),
                6
              )} BTCB`
            : `${DataDomain.formatBalance(
                parseEther(
                  context.dataDomains.statisticsSnacks.updateableEthSnacksCurrentRate.toString()
                ),
                6
              )} ETH`}
        </div>
      </div>
    </>
  );
};

export default Coins;
