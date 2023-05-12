import { useContext } from 'react';
import { ZoinksContext } from '../../../zoinksPeriphery/ZoinksContext';

const StatsBlock = ({ key1, key2, colorScheme }) => {
  let context = useContext(ZoinksContext);

  let datas = {
    twap: context.dataDomains.statisticsZoinks.updateableLastTwap,
    ts: context.dataDomains.statisticsZoinks.updateableTotalSupply,
    sapr: context.dataDomains.statisticsSnacks.updateableStakingApr,
    lapr: context.dataDomains.statisticsSnacks.updateableLunchBoxApr,
    ltvl: context.dataDomains.statisticsSnacks.updateableLunchBoxTvl,
    stvl: context.dataDomains.statisticsSnacks.updateableStakingTvl,
  };
  let color1, color2, color3;
  switch (colorScheme) {
    case 1:
      color1 = 'text-cyan';
      color2 = 'text-cyan';
      color3 = 'text-cyan';
      break;
    case 2:
      color1 = 'text-green';
      color2 = 'text-white';
      color3 = 'text-yellow';
      break;
    case 3:
      color1 = 'text-yellow';
      color2 = 'text-yellow';
      color3 = 'text-yellow';
      break;

    default:
      break;
  }

  return (
    <div className="absolute opacity-100 pc750:-top-2 pc400:top-12 top-9 justify-center -mt-[101px] left-0 flex flex-col pc400:flex-row gap-[14px] font-play text-sm font-bold">
      <div className={`text-center ${color1} flex gap-2`}>
        <p className="whitespace-nowrap">
          {colorScheme === 1
            ? 'Last TWAP'
            : colorScheme === 2
            ? 'Staking APR'
            : 'Staking TVL'}
          :
        </p>
        {datas[key1]}
        {colorScheme === 1 ? '$' : colorScheme === 2 ? '%' : ''}
      </div>
      <p className={`-mt-1 hidden pc400:block ${color2}`}>.</p>
      <div className={`text-center ${color3} flex gap-2`}>
        <p className="whitespace-nowrap">
          {colorScheme === 1
            ? 'Total Supply'
            : colorScheme === 2
            ? 'Lunchbox APR'
            : 'Lunchbox TVL'}
          :
        </p>
        {datas[key2]}
        {colorScheme === 1 ? '$' : colorScheme === 2 ? '%' : ''}
      </div>
    </div>
  );
};

export default StatsBlock;
