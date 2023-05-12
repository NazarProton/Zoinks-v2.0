import { BigNumber, constants } from 'ethers';
import React, { useContext } from 'react';
import { ZoinksContext } from '../../../zoinksPeriphery/ZoinksContext';
import Countdown from 'react-countdown';
import { ThreeDots } from 'react-loader-spinner';

function Timer({ num, isExit }) {
  const context = useContext(ZoinksContext);
  let renderer = (data) => {
    if (data.completed) {
      return num === 1 ? 'Withdraw with a 10% fee' : 'Withdraw with a 10% fee';
    } else {
      return data.formatted.days > 0 ? (
        <p>
          Updating
          <ThreeDots
            height="20"
            width="20"
            radius="9"
            color={num === 1 ? '#86D5D3' : 'white'}
            wrapperStyle={{ marginTop: '4px' }}
            ariaLabel="three-dots-loading"
            visible={true}
          />
        </p>
      ) : (
        <div
          className={`w-fit pc850:text-sm pc540:text-[12px] pc360:text-sm text-[12px] pc1024:text-base h-fit font-play flex justify-center ${
            num === 1 ? 'text-red hover:text-white' : 'text-white'
          } gap-1 font-bold`}
        >
          <p className="whitespace-nowrap text-center">
            Exit with a 50% penalty
          </p>
          <p>
            {`[${data.formatted.hours}:${data.formatted.minutes}:${data.formatted.seconds}]`}
          </p>
        </div>
      );
    }
  };

  let lastDepositTime;
  if (num === 1) {
    lastDepositTime =
      context.dataDomains.statisticsZoinks.updateableLastDepositTime;
  } else if (num === 2) {
    lastDepositTime =
      context.dataDomains.statisticsSnacks.updateableLastDepositTime;
  }
  let timeLeft = constants.Zero;
  const day = BigNumber.from('86400');
  const currentTime = BigNumber.from(Math.round(Date.now() / 1000).toString());
  if (day.gte(currentTime.sub(lastDepositTime))) {
    timeLeft = currentTime.add(day.sub(currentTime.sub(lastDepositTime)));
  } else {
    timeLeft = currentTime;
  }

  return (
    <Countdown
      date={Number(timeLeft.toString()) * 1000 + 10000}
      renderer={renderer}
    />
  );
}

export default Timer;
