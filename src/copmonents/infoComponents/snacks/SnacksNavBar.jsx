import { useState } from 'react';
import StatsBlock from '../../infoComponents/zoinks/StatsBlock';
import Get from './get/Get';
import StakeSnacks from './stake/StakeSnacks';

const SnacksNavBar = () => {
  let [activeGet, setActiveGet] = useState(true);

  return (
    <>
      <div className="flex flex-col h-full w-full px-6 pc750:pl-0 pc750:pr-10">
        <div className="relative flex w-full font-orb font-black text-2xl leading-[36px]">
          <StatsBlock key1="sapr" key2="lapr" colorScheme={2} />
          <div
            onClick={() => {
              setActiveGet(true);
            }}
            className={` w-1/2 h-fit pb-3 border-b-2 cursor-pointer border-white ${
              activeGet ? '' : ' opacity-20 hover:opacity-60'
            }`}
          >
            GET
          </div>
          <div
            onClick={() => {
              setActiveGet(false);
            }}
            className={`w-1/2 h-fit pb-3 border-b-2 cursor-pointer border-white ${
              !activeGet ? '' : 'opacity-20 hover:opacity-60'
            }`}
          >
            STAKE
          </div>
        </div>
        <div className="w-full h-full flex gap-4 flex-col  pc540:flex-row">
          {activeGet ? <Get /> : <StakeSnacks />}
        </div>
      </div>
    </>
  );
};

export default SnacksNavBar;
