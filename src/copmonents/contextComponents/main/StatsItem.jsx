import Image from 'next/image';
import tvl from '/public/statsIcon/tvl.png';
import pvl from '/public/statsIcon/pvl.svg';
import lpi from '/public/statsIcon/lpi.svg';
import tnp from '/public/statsIcon/tnp.svg';
import { useContext } from 'react';
import { ZoinksContext } from '../../../zoinksPeriphery/ZoinksContext';
import Countdown from 'react-countdown';

export default function StatsItem({ statsType }) {
  const context = useContext(ZoinksContext);

  let statsText, statsNumber, statsIcon, imgStyle, timerResult;
  if (statsType === 'TNP') {
    const date14 = new Date();
    date14.setUTCHours(14, 0, 0, 0);
    const date02 = new Date();
    date02.setUTCHours(2, 0, 0, 0);

    const currentDate = new Date();

    let diff = date14.getTime() - currentDate.getTime();
    if (diff < 0) {
      const tomorrow = new Date();
      tomorrow.setUTCDate(tomorrow.getUTCDate() + 1);
      tomorrow.setUTCHours(14, 0, 0, 0);
      diff = tomorrow.getTime() - currentDate.getTime();
    }

    let diff2 = date02.getTime() - currentDate.getTime();
    if (diff2 < 0) {
      const tomorrow = new Date();
      tomorrow.setUTCDate(tomorrow.getUTCDate() + 1);
      tomorrow.setUTCHours(2, 0, 0, 0);
      diff2 = tomorrow.getTime() - currentDate.getTime();
    }

    timerResult = Math.min(diff, diff2);
  }

  let renderer = (data) => {
    if (data.completed) {
      return <Countdown date={Date.now() + 43200000} renderer={renderer} />;
    } else {
      return (
        <p className="text-2xl flex gap-2 whitespace-nowrap">
          {data.formatted.hours}:{data.formatted.minutes}:
          {data.formatted.seconds}
        </p>
      );
    }
  };

  switch (statsType) {
    case 'TVL':
      statsText = 'Total Value Locked:';
      statsNumber = `$${context.dataDomains.statisticsMain.updateableTvl}`;
      statsIcon = tvl;
      imgStyle = 'min-w-[24px] h-[24px]';
      break;

    case 'PVL':
      statsText = 'Pulse Value Locked:';
      statsNumber = `$${context.dataDomains.statisticsMain.updateablePvl}`;
      statsIcon = pvl;
      imgStyle = 'w-[28px] h-[28px]';
      break;

    case 'LPI':
      statsText = 'Last Pulse Increase:';
      statsNumber = `$${context.dataDomains.statisticsMain.updateableLpi}`;
      statsIcon = lpi;
      imgStyle = 'w-[28px] h-[28px]';
      break;

    case 'TNP':
      statsText = 'The Next Pulse:';
      statsNumber = '10:24:58';
      statsIcon = tnp;
      imgStyle = 'w-[28px] h-[28px]';
      break;
  }

  return (
    <div
      className={`flex ${
        statsType !== 'TNP' && statsType !== 'LPI' ? '' : ''
      } pc540:w-[215px] w-[215px] pc442:w-full gap-4 pc540:py-4 justify-center`}
    >
      <Image
        className={`${imgStyle} mt-2.5`}
        quality={100}
        src={statsIcon}
        alt="#"
      />
      <div className="flex mt-1 pc540:mt-0 w-full pc442:justify-between flex-col pc442:flex-row pc540:flex-col gap-2 pc540:gap-0 pc442:items-center pc540:items-start">
        <p className="font-play text-sm leading-[21px] whitespace-nowrap">
          {statsText}
        </p>
        <h3
          className={`font-orb ${
            statsType !== 'TNP' ? '' : 'min-w-[140px]'
          } font-bold text-2xl leading-[36px] flex pc442:justify-end pc540:justify-start`}
        >
          {statsType !== 'TNP' ? (
            statsNumber
          ) : (
            <Countdown date={Date.now() + timerResult} renderer={renderer} />
          )}
        </h3>
      </div>
    </div>
  );
}
