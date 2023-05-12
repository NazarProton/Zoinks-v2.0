import { useState } from 'react';
import HoldingReward from './HoldingReward';
import Coins from '../Coins';
import MeentRedeem from './MeentRedeem';
import AutoRewards from './AutoRewards';

const Get = () => {
  let [activeCoin, setActiveCoin] = useState(2);
  let [isMint, SetIsMeent] = useState(true);

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
          isMint={isMint}
        />
        <Coins
          type="BtcSnacks"
          activeCoin={activeCoin}
          setActiveCoin={setActiveCoin}
          isMint={isMint}
        />
        <Coins
          type="EthSnacks"
          activeCoin={activeCoin}
          setActiveCoin={setActiveCoin}
          isMint={isMint}
        />
      </div>
      <div className="w-full h-full flex gap-4 flex-col pc540:flex-row">
        <MeentRedeem activeCoin={activeCoin} setIsMeentParrent={SetIsMeent} />
        <div className="pc540:w-1/2 w-full h-full min-h-[448px] gap-4 flex flex-col">
          <HoldingReward />
          <div className="w-full h-1/2 pc540:max-h-[50%]">
            <AutoRewards />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Get;
