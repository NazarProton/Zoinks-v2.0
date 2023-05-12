import { useState } from 'react';
import StatsBlock from '../zoinks/StatsBlock';
import TableLunchbox from './TableLunchbox';

const NavBarLunchbox = () => {
  let [activeGet, setActiveGet] = useState(true);

  return (
    <>
      <div className="flex flex-col w-full h-full px-6 pc750:pl-0 pc750:pr-10">
        <div className="relative flex w-full font-orb font-black text-2xl leading-[36px]">
          <StatsBlock key1="stvl" key2="ltvl" colorScheme={3} />
          <div
            onClick={() => {
              setActiveGet(true);
            }}
            className={` w-full h-fit pb-3 border-b-2 cursor-pointer border-white ${
              activeGet ? '' : ' opacity-20 hover:opacity-60'
            }`}
          >
            Lunchbox
          </div>
        </div>
        <TableLunchbox />
      </div>
    </>
  );
};

export default NavBarLunchbox;
