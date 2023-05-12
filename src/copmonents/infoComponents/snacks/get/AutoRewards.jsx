import Image from 'next/image';
import { useContext } from 'react';
import TextWithIconAndTooltip from '../../universalComponents/TextWithIconAndTooltip';
import { ZoinksContext } from '../../../../zoinksPeriphery/ZoinksContext';
import snack from '/public/coins/Snack.svg';
import BSnack from '/public/coins/BSnack.svg';
import EtSnack from '/public/coins/EtSnack.svg';

const AutoRewards = () => {
  let context = useContext(ZoinksContext);

  let comissionsForThePast12Hours = [
    context.dataDomains.pendingCommissions.updateableBalanceOfPendingSnacks,
    context.dataDomains.pendingCommissions.updateableBalanceOfPendingBtcSnacks,
    context.dataDomains.pendingCommissions.updateableBalanceOfPendingEthSnacks,
  ];

  return (
    <div
      className={`w-full h-full flex items-center flex-col bg-whiteInherit text-white font-orb text-lg leading-[21.6px] font-bold`}
    >
      <div className="w-full flex justify-between pc960:flex-row flex-col">
        <TextWithIconAndTooltip text={'AUTO REWARDS'} />
      </div>
      <div className="flex h-full items-center justify-center font-play text-xl w-full px-4 gap-8 flex-col">
        <div className="w-full flex justify-between">
          <p>{comissionsForThePast12Hours[0]}</p>
          <Image src={snack} alt="" className="h-6 w-auto" />
        </div>
        <div className="w-full flex justify-between">
          <p>{comissionsForThePast12Hours[1]}</p>
          <Image src={BSnack} alt="" className="h-6 w-auto" />
        </div>
        <div className="w-full flex justify-between">
          <p>{comissionsForThePast12Hours[2]}</p>
          <Image src={EtSnack} alt="" className="h-6 w-auto" />
        </div>
      </div>
    </div>
  );
};

export default AutoRewards;
