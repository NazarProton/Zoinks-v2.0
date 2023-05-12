import Image from 'next/image';
import { useContext } from 'react';
import directly from '/public/exchanges/directly.svg';
import directlyGray from '/public/exchanges/directlyGray.svg';
import pancake from '/public/exchanges/pancake.svg';
import pancakeGray from '/public/exchanges/pancakeGray.svg';
import apeGray from '/public/exchanges/apeGray.svg';
import ape from '/public/exchanges/ape.svg';
import biGray from '/public/exchanges/biGray.svg';
import bi from '/public/exchanges/bi.svg';
import arrow from '/public/exchanges/arrow.svg';
import DataDomain from '../../../zoinksPeriphery/services/dataDomains/DataDomain';
import { ZoinksContext } from '../../../zoinksPeriphery/ZoinksContext';

const Exchange = ({
  type,
  activeExchange,
  setActiveExchange,
  inputForBusd,
}) => {
  let context = useContext(ZoinksContext);
  let image, grayImage, index, busdPrice, zoinksPrice;

  switch (type) {
    case 'Directly':
      image = directly;
      grayImage = directlyGray;
      index = 1;
      break;
    case 'Pancake':
      image = pancake;
      grayImage = pancakeGray;
      index = 2;
      busdPrice = context.dataDomains.prices.updateableBusdPricePancake;
      zoinksPrice = context.dataDomains.prices.updateableZoinksPricePancake;
      break;
    case 'BiSwap':
      image = bi;
      grayImage = biGray;
      index = 3;
      busdPrice = context.dataDomains.prices.updateableBusdPriceBi;
      zoinksPrice = context.dataDomains.prices.updateableZoinksPriceBi;
      break;
    case 'ApeSwap':
      image = ape;
      grayImage = apeGray;
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
          setActiveExchange(index);
        }}
        className={`w-1/4 flex-col items-center pc960:flex-row cursor-pointer flex justify-center gap-2 pc442:p-4 p-2 font-play font-bold text-sm leading-[21px] ${
          activeExchange === index
            ? 'bg-whiteInheritLess'
            : 'opacity-40 hover:opacity-70'
        } `}
      >
        <div className="flex gap-2 flex-col pc540:flex-row items-center">
          <Image
            src={activeExchange === index ? image : grayImage}
            className="w-6 h-auto -mt-0.5"
            alt="#"
          />
          <p className="pc442:text-[14px] text-[12px]">{type}</p>
        </div>
        <div className="flex gap-1">
          <Image src={arrow} className="h-3 w-4 mt-1" alt="#" />
          {type === 'Directly'
            ? '1:1'
            : DataDomain.formatBalance(!inputForBusd ? busdPrice : zoinksPrice)}
        </div>
      </div>
    </>
  );
};

export default Exchange;
