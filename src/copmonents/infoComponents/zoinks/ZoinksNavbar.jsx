import { useState } from 'react';
import Get from './get/Get';
import StatsBlock from './StatsBlock';
import FarmBlock from './farm/FarmBlock';

const ZoinksNavbar = () => {
  let [activeGet, setActiveGet] = useState(true);

  return (
    <>
      <div className="flex flex-col h-full w-full px-6 pc750:pl-0 pc750:pr-10">
        <div className="relative flex w-full font-orb font-black text-2xl leading-[36px]">
          <StatsBlock key1="twap" key2="ts" colorScheme={1} />
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
            FARM
          </div>
        </div>
        {activeGet ? <Get /> : <FarmBlock />}
      </div>
    </>
  );
};

export default ZoinksNavbar;
