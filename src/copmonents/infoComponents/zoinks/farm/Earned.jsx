import Image from 'next/image';
import { useContext, useState } from 'react';
import { ZoinksContext } from '../../../../zoinksPeriphery/ZoinksContext';
import DataDomain from '../../../../zoinksPeriphery/services/dataDomains/DataDomain';
import Zoinks from '/public/coins/Zoinks.svg';
import Snack from '/public/coins/Snack.svg';
import BSnack from '/public/coins/BSnack.svg';
import EtSnack from '/public/coins/EtSnack.svg';
import { BsCheckCircle, BsInfoCircle, BsXCircle } from 'react-icons/bs';
import { constants } from 'ethers';
import TextWithIconAndTooltip from '../../universalComponents/TextWithIconAndTooltip';
import LoaderForButton from '../../loadersForButton/LoaderForButton';

const Earned = () => {
  let context = useContext(ZoinksContext);
  let [loader, setLoader] = useState(false);

  let earnedByStaking =
    context.dataDomains.earnedInfo.updateableEarnedPancakeSwap;

  function cleaInputAndUpdateData() {
    setLoader(false);
    setTimeout(() => {
      context.dataDomains.balances.update();
      context.dataDomains.earnedInfo.update();
      context.dataDomains.prices.update();
    }, 3000);
  }

  function claim() {
    setLoader(true);
    let router =
      activeExchange === 2
        ? context.cao.pancakeSwapPool
        : activeExchange === 3
        ? context.cao.biSwapPool
        : context.cao.apeSwapPool;

    router
      .getReward()
      .then((tx) => {
        console.error('Transaction tx', { tx });
        toast.info(CustomToastWithLink(tx.hash), {
          autoClose: false,
          icon: <BsInfoCircle className="text-zoinksSolid" />,
        });
        tx.wait(context.networkInfo.confirmationsToWait).then(() => {
          toast.success(CustomToast('Transaction was confirmed'), {
            icon: <BsCheckCircle color="green" />,
          });
          cleaInputAndUpdateData();
        });
      })
      .catch((error) => {
        cleaInputAndUpdateData();
        console.error('ERROR 2: FarmBlock.claim', error);
        if (error.code === 'ACTION_REJECTED') {
          toast.error(CustomToast('Transaction was rejected'), {
            icon: <BsXCircle color="red" />,
          });
        } else {
          toast.error(CustomToast('Transaction was failed'), {
            icon: <BsXCircle color="red" />,
          });
        }
      });
  }

  return (
    <div className="w-full h-1/2 flex flex-col min-h-[272px] pc540:min-h-fit items-center bg-whiteInherit text-white font-orb text-lg leading-[21.6px] font-bold">
      <TextWithIconAndTooltip text={'FARMING REWARDS'} />
      <div className="flex h-full items-center gap-1 px-4 pb-0 w-full">
        {['HZUSD', 'SNACK', 'BSNACK', 'ETSNACK'].map((el, index) => {
          return (
            <div
              key={index}
              className="h-fit w-1/4 flex gap-1 flex-col text-[12px] font-play pc960:text-base items-center justify-center"
            >
              <Image
                alt=""
                src={
                  index === 0
                    ? Zoinks
                    : index === 1
                    ? Snack
                    : index === 2
                    ? BSnack
                    : EtSnack
                }
                className="w-6 h-auto"
              />
              <p className="w-full text-center">{el}</p>
              <p className="w-full text-center">
                {DataDomain.formatBalance(earnedByStaking[index])}
              </p>
            </div>
          );
        })}
      </div>
      <div className="w-full flex justify-center">
        <button
          onClick={claim}
          disabled={
            earnedByStaking[0].eq(constants.Zero) &&
            earnedByStaking[1].eq(constants.Zero) &&
            earnedByStaking[2].eq(constants.Zero) &&
            earnedByStaking[3].eq(constants.Zero)
          }
          className="w-full disabled:bg-whiteInherit font-play bg-cyan opacity-80 hover:opacity-100 p-4 m-4 mt-0 flex justify-center"
        >
          {loader ? <LoaderForButton size={16} /> : 'Claim'}
        </button>
      </div>
    </div>
  );
};

export default Earned;
