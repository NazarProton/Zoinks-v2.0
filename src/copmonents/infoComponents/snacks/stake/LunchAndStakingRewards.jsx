import Image from 'next/image';
import TextWithIconAndTooltip from '../../universalComponents/TextWithIconAndTooltip';
import { useContext } from 'react';
import { ZoinksContext } from '../../../../zoinksPeriphery/ZoinksContext';
import Snack from '/public/coins/Snack.svg';
import BSnack from '/public/coins/BSnack.svg';
import EtSnack from '/public/coins/EtSnack.svg';
import DataDomain from '../../../../zoinksPeriphery/services/dataDomains/DataDomain';
import LunchboxIcon from '/public/LunchboxIcon.svg';
import ClaimButton from './ClaimButton';
import { ThreeDots } from 'react-loader-spinner';
import ToggleLunchbox from '../../lunchBox/ToggleLunchbox';

const LunchAndStakingRewards = () => {
  let context = useContext(ZoinksContext);

  const earnedSnacksFromStaking =
    context.dataDomains.earnedInfo.updateableBalancesOfEarnedFromStakingSnacks;
  const lunchBoxStatus =
    context.dataDomains.earnedInfo.updateableMyLunchBoxStatus;
  const ernadFromLunchbox =
    context.dataDomains.earnedInfo.updateableBalanceOfEarnedFromLunchBox;
  return (
    <div
      className={`w-full pc540:w-1/2 flex items-center flex-col gap-10 bg-whiteInherit text-white font-orb text-lg leading-[21.6px] font-bold`}
    >
      <div className="w-full h-full flex gap-10 flex-col">
        <TextWithIconAndTooltip text={'STAKING REWARDS'} />

        <div className="flex h-1/2 items-center justify-center font-play text-xl w-full px-4 gap-4 flex-col">
          <div className="w-full flex justify-between">
            <p>
              {lunchBoxStatus
                ? DataDomain.formatBalance(ernadFromLunchbox)
                : DataDomain.formatBalance(earnedSnacksFromStaking[0])}
            </p>
            <div className="flex gap-2">
              SNACK
              <Image src={Snack} alt="" className="h-6 w-auto" />
            </div>
          </div>
          <div
            className={`w-full ${
              lunchBoxStatus ? 'hidden' : ''
            } flex justify-between`}
          >
            <p>{DataDomain.formatBalance(earnedSnacksFromStaking[1])}</p>
            <div className="flex gap-2">
              BSNACK
              <Image src={BSnack} alt="" className="h-6 w-auto" />
            </div>
          </div>
          <div
            className={`w-full ${
              lunchBoxStatus ? 'hidden' : ''
            } flex justify-between`}
          >
            <p>{DataDomain.formatBalance(earnedSnacksFromStaking[2])}</p>
            <div className="flex gap-2">
              ETSNACK
              <Image src={EtSnack} alt="" className="h-6 w-auto" />
            </div>
          </div>
        </div>
      </div>
      <div className="w-full h-full gap-2 flex flex-col">
        <div className="h-full w-full flex justify-between">
          <div className="flex relative items-center justify-between w-full h-5/6 m-4 border border-white border-opacity-70">
            <div className="absolute w-fit font-bold pl-2 pr-1 gap-1 -top-3 left-5 flex bg-InheritForInput">
              <Image src={LunchboxIcon} alt="" className="h-6 w-auto" />
              Lunchbox
              <TextWithIconAndTooltip />
            </div>
            <div className="text-sm ml-4 flex justify-center">
              {!lunchBoxStatus ? (
                <p className="text-sm">
                  Start sending rewards to the Lunchbox. <b>Earn more.</b>
                </p>
              ) : (
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
              )}
            </div>
            <ToggleLunchbox />
          </div>
        </div>
        <div className="w-full flex justify-center">
          <ClaimButton type="snacks" />
        </div>
      </div>
    </div>
  );
};

export default LunchAndStakingRewards;
