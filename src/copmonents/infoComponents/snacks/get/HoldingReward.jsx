import Image from 'next/image';
import { useContext, useState } from 'react';
import BSnack from '/public/coins/BSnack.svg';
import EtSnack from '/public/coins/EtSnack.svg';
import { BsCheckCircle, BsInfoCircle, BsXCircle } from 'react-icons/bs';
import { ZoinksContext } from '../../../../zoinksPeriphery/ZoinksContext';
import LoaderForButton from '../../loadersForButton/LoaderForButton';
import TextWithIconAndTooltip from '../../universalComponents/TextWithIconAndTooltip';
import { toast } from 'react-toastify';
import CustomToast from '../../../contextComponents/universalComponents/CustomToast';
import CustomToastWithLink from '../../../contextComponents/universalComponents/CustomToastWithLink';

const HoldingReward = () => {
  let context = useContext(ZoinksContext);
  let [loader, setLoader] = useState(2);

  let holdedBsnack =
    context.dataDomains.pendingCommissions.updateableHoldedBsnack;
  let holdedEtsnack =
    context.dataDomains.pendingCommissions.updateableHoldedEtsnack;

  function cleaInputAndUpdateData() {
    setLoader(2);
    setTimeout(() => {
      context.dataDomains.balances.update();
      context.dataDomains.earnedInfo.update();
      context.dataDomains.prices.update();
      context.dataDomains.earnedInfo.update();
      context.dataDomains.pendingCommissions.update();
    }, 3000);
  }
  function withdrawMyPendingSnacks(type) {
    setLoader(type);
    console.log(!type ? 'withdrawMyBtcSnacks()' : 'withdrawMyEthSnacks()');
    context.cao.snacks[!type ? 'withdrawMyBtcSnacks' : 'withdrawMyEthSnacks']()
      .then((tx) => {
        toast.info(CustomToastWithLink(tx.hash), {
          autoClose: false,
          icon: <BsInfoCircle className="text-green" />,
        });
        tx.wait(context.networkInfo.confirmationsToWait).then(() => {
          toast.success(CustomToast('Transaction was confirmed'), {
            icon: <BsCheckCircle color="green" />,
          });
          this.setState({ isLoaderEnabled: false });
          cleaInputAndUpdateData();
        });
      })
      .catch((error) => {
        cleaInputAndUpdateData();
        error.code === 'ACTION_REJECTED'
          ? toast.error(CustomToast('Transaction was rejected'), {
              icon: <BsXCircle color="red" />,
            })
          : toast.error(CustomToast('Transaction was failed'), {
              icon: <BsXCircle color="red" />,
            });
      });
  }

  return (
    <div className="w-full h-1/2 flex flex-col items-center bg-whiteInherit text-white font-orb text-lg leading-[21.6px] font-bold">
      <TextWithIconAndTooltip text={'HOLDING REWARDS'} />
      <div className="flex h-full items-center gap-[14px] px-4 w-full justify-center mb-4">
        {['BSNACK', 'ETSNACK'].map((el, index) => {
          return (
            <div
              key={index}
              className="h-full w-1/2 flex flex-col text-[12px] font-play pc960:text-base items-center justify-between"
            >
              <div className="w-full h-full flex flex-col items-center gap-4 justify-center">
                <Image
                  alt=""
                  src={index === 0 ? BSnack : EtSnack}
                  className="w-6 h-auto"
                />
                <p className="w-full text-center">{el}</p>
                <p className="w-full text-center">
                  {index ? holdedEtsnack : holdedBsnack}
                </p>
              </div>
              <button
                onClick={() => withdrawMyPendingSnacks(index)}
                disabled={index ? holdedEtsnack <= 0 : holdedBsnack <= 0}
                className="w-full disabled:bg-whiteInherit bg-cyan font-play opacity-80 hover:opacity-100 py-4 flex justify-center"
              >
                {loader === index ? <LoaderForButton size={18} /> : 'Claim'}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HoldingReward;
