import React, { useContext } from 'react';
import { ZoinksContext } from '../../../zoinksPeriphery/ZoinksContext';
import Snack from '/public/coins/Snack.svg';
import Image from 'next/image';
import DataDomain from '../../../zoinksPeriphery/services/dataDomains/DataDomain';
import { ThreeDots } from 'react-loader-spinner';
import Countdown from 'react-countdown';
import { BigNumber, constants } from 'ethers';
import ClaimButton from '../snacks/stake/ClaimButton';
import ToggleLunchbox from './ToggleLunchbox';

export default function TableLunchbox() {
  let context = useContext(ZoinksContext);
  const lunchBoxStatus =
    context.dataDomains.earnedInfo.updateableMyLunchBoxStatus;
  const ernadFromLunchbox =
    context.dataDomains.earnedInfo.updateableBalanceOfEarnedFromLunchBox;

  let renderer = (data) => {
    if (data.completed) {
      return (
        <div className="flex flex-col gap-2 justify-center">
          accumulation
          <div className="flex gap-2 justify-center">
            rewards{' '}
            <ThreeDots
              height="20"
              width="20"
              radius="9"
              color={'#F2BC53'}
              wrapperStyle={{ marginTop: '4px' }}
              ariaLabel="three-dots-loading"
              visible={true}
            />
          </div>
        </div>
      );
    } else {
      return data.formatted.days > 0 ? (
        <>
          Updating
          <ThreeDots
            height="20"
            width="20"
            radius="9"
            color={'#F2BC53'}
            wrapperStyle={{ marginTop: '4px' }}
            ariaLabel="three-dots-loading"
            visible={true}
          />
        </>
      ) : (
        <p className="pc940:text-sm pc750:text-[10px] pc540:text-[9px] pc850:text-[12px] pc400:text-sm text-[10px] pc1024:text-base flex gap-2 whitespace-nowrap items-center justify-center">
          Deactivations will be
          <br />{' '}
          {`able in [${data.formatted.hours}:${data.formatted.minutes}:${data.formatted.seconds}]`}
        </p>
      );
    }
  };

  let lastDepositTime =
    context.dataDomains.statisticsSnacks.updateableLastDepositTimeLunchBox;

  let timeLeft = constants.Zero;
  const day = BigNumber.from('86400');
  const currentTime = BigNumber.from(Math.round(Date.now() / 1000).toString());
  if (day.gte(currentTime.sub(lastDepositTime))) {
    timeLeft = currentTime.add(day.sub(currentTime.sub(lastDepositTime)));
  } else {
    timeLeft = currentTime;
  }
  return (
    <>
      <div className="flex-col mt-10 pc600:flex hidden">
        <div className="w-full inline-block align-middle">
          <div className="w-full">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr className="opacity-50 font-play">
                  <th
                    scope="col"
                    className="px-3 pc900:px-6 py-3 text-xs font-bold text-center text-gray-500 uppercase "
                  >
                    Source
                  </th>
                  <th
                    scope="col"
                    className="px-3 pc900:px-6 py-3 text-xs font-bold text-center text-gray-500 uppercase "
                  >
                    Percentage
                  </th>
                  <th
                    scope="col"
                    className="px-3 pc900:px-6 py-3 text-xs font-bold text-center text-gray-500 uppercase "
                  >
                    Rewards
                  </th>
                  <th
                    scope="col"
                    className="px-3 pc900:px-6 py-3 text-xs font-bold text-center text-gray-500 uppercase "
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-3 pc900:px-6 py-3 text-xs font-bold text-center text-gray-500 uppercase "
                  >
                    Switch
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y font-play  divide-dark">
                <tr className="bg-whiteInherit">
                  <td className="px-3 pc900:px-6 py-4 text-sm font-medium text-center text-gray-800 whitespace-nowrap">
                    Luncbox Rewards
                  </td>
                  <td className="px-3 pc900:px-6 py-4 text-sm gap-1 text-center text-gray-800 whitespace-nowrap">
                    {context.dataDomains.statisticsSnacks.updateableLunchBoxApr}
                    %
                  </td>
                  <td className="px-3 pc900:px-6 py-4 text-sm text-center font-medium whitespace-nowrap">
                    <div className="h-full flex gap-1 justify-center">
                      <p className="">
                        {lunchBoxStatus
                          ? DataDomain.formatBalance(ernadFromLunchbox)
                          : '0'}
                      </p>
                      <Image src={Snack} alt="" className="" />
                    </div>
                  </td>
                  <td className="px-3 pc900:px-6 py-4 w-4/12 text-sm text-center font-medium whitespace-nowrap">
                    {lunchBoxStatus ? (
                      <Countdown
                        date={Number(timeLeft.toString()) * 1000}
                        renderer={renderer}
                      />
                    ) : (
                      <p>
                        Start the Lunchbox <br /> to earn more
                      </p>
                    )}
                  </td>
                  <td className="px-3 pc900:px-6 py-4 text-sm -ml-1 font-medium flex justify-center whitespace-nowrap">
                    <ToggleLunchbox />
                  </td>
                </tr>
                <tr>
                  <td className="px-3 pc900:px-6 py-4 text-sm font-medium text-center text-gray-800 whitespace-nowrap">
                    All Sources
                  </td>
                  <td className="px-3 pc900:px-6 py-4 text-sm gap-1 text-center text-gray-800 whitespace-nowrap">
                    {context.dataDomains.statisticsSnacks.updateableLunchBoxApr}
                    %
                  </td>
                  <td className="px-3 pc900:px-6 py-4 text-sm text-center font-medium whitespace-nowrap">
                    <div className="h-full flex gap-1 justify-center">
                      <p>
                        {lunchBoxStatus
                          ? DataDomain.formatBalance(ernadFromLunchbox)
                          : '0'}
                      </p>
                      Snack
                      <Image src={Snack} alt="" />
                    </div>
                  </td>
                  <td className="text-sm text-center font-medium whitespace-nowrap"></td>
                  <td className="px-3 pc900:px-6 py-4 text-sm -ml-1 font-medium flex justify-center whitespace-nowrap">
                    <ClaimButton type="lunchbox" text={'Claim rewards'} />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div className="w-full pb-24 mx-13 flex flex-col items-center gap-6">
        <div className="w-full  flex flex-col items-center font-play pc600:hidden gap-8">
          <div className="flex flex-col items-center gap-12">
            <p className="mt-10">All Sources</p>
            <p>{context.dataDomains.statisticsSnacks.updateableLunchBoxApr}%</p>
            <div className="h-full flex gap-1 items-center justify-center">
              <p>
                {lunchBoxStatus
                  ? DataDomain.formatBalance(ernadFromLunchbox)
                  : '0'}
              </p>
              Snack
              <Image src={Snack} alt="" className="" />
            </div>
          </div>
          <ClaimButton type="lunchbox" text={'Claim rewards'} />
        </div>
        <div className="w-full max-h-[50%] pt-5 bg-whiteInherit flex flex-col items-center font-play pc600:hidden gap-8">
          <p>Luncbox Rewards</p>
          <p>{context.dataDomains.statisticsSnacks.updateableLunchBoxApr}%</p>
          <div className="h-full flex gap-1 items-center justify-center">
            <p>
              {lunchBoxStatus
                ? DataDomain.formatBalance(ernadFromLunchbox)
                : '0'}
            </p>
            Snack
            <Image src={Snack} alt="" className="" />
          </div>
          {lunchBoxStatus ? (
            <Countdown
              date={Number(timeLeft.toString()) * 1000}
              renderer={renderer}
            />
          ) : (
            <p className="text-center">
              Start the Lunchbox <br /> to earn more
            </p>
          )}
          <ToggleLunchbox />
        </div>
      </div>
    </>
  );
}
