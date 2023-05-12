import { useState } from 'react';
import Exchange from '../Exchange';
import MintSwap from './MintSwap';

const Get = () => {
  let [activeExchange, setActiveExchange] = useState(1);
  let [inputForBusd, SetInputForBusd] = useState(true);

  return (
    <div
      className={`w-full flex h-fit pc540:h-full pc750:pb-10 flex-col pb-24 gap-4`}
    >
      <div className="w-full h-fit flex gap-0 pc1024:gap-4 mt-4">
        {' '}
        <Exchange
          type="Directly"
          activeExchange={activeExchange}
          setActiveExchange={setActiveExchange}
          inputForBusd={inputForBusd}
        />
        <Exchange
          type="Pancake"
          activeExchange={activeExchange}
          setActiveExchange={setActiveExchange}
          inputForBusd={inputForBusd}
        />
        <Exchange
          type="BiSwap"
          activeExchange={activeExchange}
          setActiveExchange={setActiveExchange}
          inputForBusd={inputForBusd}
        />
        <Exchange
          type="ApeSwap"
          activeExchange={activeExchange}
          setActiveExchange={setActiveExchange}
          inputForBusd={inputForBusd}
        />
      </div>
      <MintSwap
        activeExchange={activeExchange}
        SetInputForBusdParrent={SetInputForBusd}
      />
    </div>
  );
};

export default Get;
