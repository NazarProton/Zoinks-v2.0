import { useState } from 'react';
import Coins from '../Coins';
import WithdrawSnacks from './WithdrawSnacks';
import ExitSnacks from './ExitSnacks';
import StakeSnacksBlock from './StakeSnacksBlock';
import LunchAndStakingRewards from './LunchAndStakingRewards';

const StakeSnacks = () => {
  let [activeExchange, setActiveExchange] = useState(2);
  let [activeCoin, setActiveCoin] = useState(2);
  let [isExit, SetIsExit] = useState(false);

  return (
    <div
      className={`w-full flex h-fit pc540:h-full pc750:pb-10 flex-col pb-24 gap-4`}
    >
      <div className="w-full h-fit flex gap-0 pc1024:gap-4 mt-4">
        {' '}
        <Coins
          type="Snacks"
          activeCoin={activeCoin}
          setActiveCoin={setActiveCoin}
        />
        <div className="w-1/3 flex-col items-center pc960:flex-row flex justify-center pc442:p-4 p-2 font-play"></div>
        <div className="w-1/3 flex-col items-center pc960:flex-row flex justify-center pc442:p-4 p-2 font-play"></div>
      </div>
      <div className="w-full h-full flex gap-4 flex-col pc540:flex-row">
        <div className="pc540:w-1/2 w-full h-full min-h-[448px] gap-4 flex flex-col">
          <StakeSnacksBlock />
          <div className="w-full h-1/2 flex gap-4 flex-col  pc540:flex-row">
            <div className="flip-card w-full h-full min-h-1/2">
              <div
                className={`flip-card-inner ${
                  isExit ? 'flip-card-flipped' : ''
                } w-full h-full`}
              >
                <ExitSnacks
                  isExit={isExit}
                  activeExchange={activeExchange}
                  SetIsExit={SetIsExit}
                />
                <WithdrawSnacks
                  isExit={isExit}
                  activeExchange={activeExchange}
                  SetIsExit={SetIsExit}
                />
              </div>
            </div>
          </div>
        </div>
        <LunchAndStakingRewards />
      </div>
    </div>
  );
};
export default StakeSnacks;
