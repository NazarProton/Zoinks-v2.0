import { useState } from 'react';
import Exchange from '../Exchange';
import StakeLp from './StakeLp';
import FarmLp from './FarmLp';
import Earned from './Earned';
import Withdraw from './Withdraw';
import Exit from './Exit';

const FarmBlock = () => {
  let [activeExchange, setActiveExchange] = useState(2);
  let [inputForBusd, SetInputForBusd] = useState(false);
  let [isFarm, SetIsFarm] = useState(false);
  let [isExit, SetIsExit] = useState(false);

  return (
    <div
      className={`w-full  flex h-fit pc540:h-full pc750:pb-10 flex-col pb-24 gap-4`}
    >
      <div className="w-full h-fit flex gap-0 pc1024:gap-4 mt-4">
        {' '}
        <Exchange
          type="Pancake"
          activeExchange={activeExchange}
          setActiveExchange={setActiveExchange}
          inputForBusd={inputForBusd}
        />
        <div className="w-1/4 flex-col items-center pc960:flex-row flex justify-center gap-2 pc442:p-4 p-2 font-play"></div>
        <div className="w-1/4 flex-col items-center pc960:flex-row flex justify-center gap-2 pc442:p-4 p-2 font-play"></div>
        <div className="w-1/4 flex-col items-center pc960:flex-row flex justify-center gap-2 pc442:p-4 p-2 font-play"></div>
      </div>
      <div className="w-full h-full flex gap-4 flex-col  pc540:flex-row">
        <div className="flip-card pc540:w-1/2 w-full h-full min-h-[448px]">
          <div
            className={`flip-card-inner ${
              isFarm ? 'flip-card-flipped' : ''
            } w-full h-full`}
          >
            <FarmLp
              activeExchange={activeExchange}
              setInputForBusdParrent={SetInputForBusd}
              isFarm={isFarm}
              SetIsFarm={SetIsFarm}
            />
            <StakeLp
              activeExchange={activeExchange}
              setInputForBusdParrent={SetInputForBusd}
              isFarm={isFarm}
              SetIsFarm={SetIsFarm}
            />
          </div>
        </div>
        <div className="pc540:w-1/2 w-full h-full min-h-[448px] gap-4 flex flex-col">
          <Earned />
          <div className="flip-card w-full h-1/2 pc540:max-h-[50%]">
            <div
              className={`flip-card-inner ${
                isExit ? 'flip-card-flipped' : ''
              } w-full h-full`}
            >
              <Withdraw
                isExit={isExit}
                activeExchange={activeExchange}
                SetIsExit={SetIsExit}
              />
              <Exit
                isExit={isExit}
                activeExchange={activeExchange}
                SetIsExit={SetIsExit}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FarmBlock;
