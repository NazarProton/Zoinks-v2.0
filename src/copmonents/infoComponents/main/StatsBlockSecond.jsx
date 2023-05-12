import Image from 'next/image';
import Zoinks from '/public/infoBlock/zoinksCircle.png';
import Snacks from '/public/infoBlock/snacksCirlce.png';
import Lunchbox from '/public/infoBlock/lunchboxСircle.png';
import arrowToDoc from '/public/infoBlock/arrowToDoc.svg';
import { useContext } from 'react';
import { ZoinksContext } from '../../../zoinksPeriphery/ZoinksContext';

const StatsBlockSecond = ({ type }) => {
  const context = useContext(ZoinksContext);
  let text,
    href,
    totalSupply,
    LastTwap,
    FarmingApr,
    tvl,
    HoldingApr,
    StakingApr,
    apr,
    img,
    color;
  switch (type) {
    case 'ZOINKS':
      img = Zoinks;
      text =
        'Lorem ipsum dolor sit amet consectetur. Sodales mus et tellus mattisat. Bibendum amet mauris in placerat sed blandit viverra.';
      totalSupply = context.dataDomains.statisticsZoinks.updateableTotalSupply;
      LastTwap = context.dataDomains.statisticsZoinks.updateableLastTwap;
      FarmingApr = context.dataDomains.statisticsZoinks.updateablePancakeApr;
      color = 'text-cyan';
      break;
    case 'SNACKS':
      img = Snacks;
      text =
        'Lorem ipsum dolor sit amet consectetur. Sodales mus et tellus mattisat. Bibendum amet mauris in placerat sed blandit viverra.';
      totalSupply =
        context.dataDomains.statisticsSnacks.updateableSnacksTotalSupply;
      StakingApr = context.dataDomains.statisticsSnacks.updateableStakingApr;
      HoldingApr =
        context.dataDomains.statisticsSnacks.updateableSnacksHoldingApr;
      color = 'text-green';
      break;
    case 'LUNCHBOX':
      img = Lunchbox;
      text =
        'Lorem ipsum dolor sit amet consectetur. Sodales mus et tellus mattisat. Bibendum amet mauris in placerat sed blandit viverra.';
      tvl = context.dataDomains.statisticsSnacks.updateableLunchBoxTvl;
      apr = context.dataDomains.statisticsSnacks.updateableLunchBoxApr;
      color = 'text-yellow';
      break;

    default:
      break;
  }

  return (
    <div
      className={`w-full flex flex-col pc740:flex-row bg-whiteInherit ${
        type === 'SNACKS'
          ? 'stats__block__snacks pc740:flex-row-reverse justify-end'
          : type === 'ZOINKS'
          ? 'stats__block__zoinks'
          : 'stats__block__lunchbox'
      }`}
    >
      <div className="pc740:w-1/2 w-full pc740:m-auto flex justify-start pc740:justify-center">
        <Image
          src={img}
          alt=""
          quality={100}
          className="float-left w-auto pc740:h-[250px] h-[200px] mr-5"
        />
      </div>
      <div
        className={`pc740:w-1/2 w-full flex pc740:py-20 py-10 justify-start pc990:justify-center ml-6`}
      >
        <div className="flex flex-col w-1/2 justify-center">
          <div className="font-orb font-black leading-9 text-2xl gap-3 flex">
            <p>{type}</p>
            <Image
              src={arrowToDoc}
              alt=""
              className="float-left h-4 w-4 mt-2.5"
            />
          </div>
          <p className="font-play pc442:min-w-[334px] font-sm leading-[21px] mt-2">
            {text}
          </p>
          <p
            className={`mt-8 font-play font-sm font-bold leading-[21px] ${color}`}
          >
            {type === 'ZOINKS' || type === 'SNACKS'
              ? `Total Supply: ${totalSupply}`
              : `TVL: ${tvl}$`}
          </p>
          <p
            className={`mt-2 font-play font-sm font-bold leading-[21px] ${color}`}
          >
            {type === 'ZOINKS'
              ? `Last TWAP: ${LastTwap}$`
              : type === 'SNACKS'
              ? `Staking APR: ${StakingApr}%`
              : `APR: ${apr}%`}
          </p>
          <p
            className={`mt-2 font-play font-sm font-bold leading-[21px] ${color}`}
          >
            {type === 'ZOINKS'
              ? `Farming APR: ${FarmingApr}%`
              : type === 'SNACKS'
              ? `Holding APR: ${HoldingApr}%`
              : ``}
          </p>
        </div>
      </div>
    </div>
  );
};

export default StatsBlockSecond;
