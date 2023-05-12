import { useContext, useEffect, useState } from 'react';
import { BsCheckCircle, BsInfoCircle, BsXCircle } from 'react-icons/bs';
import { toast } from 'react-toastify';
import CustomToastWithLink from '../../contextComponents/universalComponents/CustomToastWithLink';
import CustomToast from '../../contextComponents/universalComponents/CustomToast';
import { ZoinksContext } from '../../../zoinksPeriphery/ZoinksContext';

const ToggleLunchbox = () => {
  let context = useContext(ZoinksContext);
  const [lunchboxTimerEnd, setLunchboxTimerEnd] = useState(false);

  const lunchBoxStatus =
    context.dataDomains.earnedInfo.updateableMyLunchBoxStatus;

  // useEffect(() => {
  //   if (
  //     window.ethereum.networkVersion === '56' ||
  //     window.ethereum.networkVersion === '31337'
  //   ) {
  //     checklunchboxTimerEnd();
  //   }

  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);
  function cleaInputAndUpdateData() {
    setTimeout(() => {
      context.dataDomains.balances.update();
      context.dataDomains.earnedInfo.update();
      context.dataDomains.prices.update();
    }, 3000);
  }

  function activateLunchBox() {
    context.cao.snacksPool
      .amIAbleToBecomeLunchBoxParticipant()
      .then((amIAbleToBecomeParticipant) => {
        if (amIAbleToBecomeParticipant) {
          return context.cao.snacksPool.enableLunchBoxParticipations();
        } else {
          throw {
            code: 'CUSTOM',
            message:
              'Transaction was failed. Activation is not possible due to zero deposit',
          };
        }
      })
      .then((tx) => {
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
        if (error.code === 'ACTION_REJECTED') {
          toast.error(CustomToast('Transaction was rejected'), {
            icon: <BsXCircle color="red" />,
          });
        } else if (error.code === 'CUSTOM') {
          toast.error(CustomToast(error.message), {
            icon: <BsXCircle color="red" />,
          });
        } else {
          toast.error(CustomToast('Transaction was failed'), {
            icon: <BsXCircle color="red" />,
          });
        }
      });
  }

  function checklunchboxTimerEnd() {
    const hours24 = 86400;
    let lastBlockTimestamp;
    context.profile.provider
      .getBlock()
      .then((lastBlock) => {
        lastBlockTimestamp = lastBlock.timestamp;
        return context.cao.snacksPool.getLastActivationTimePerUser(
          context.profile.myAddress()
        );
      })
      .then((myLastActivationTimestamp) => {
        const is24HoursLeft =
          lastBlockTimestamp - myLastActivationTimestamp >= hours24;
        if (is24HoursLeft) {
          setLunchboxTimerEnd(true);
        } else {
          setLunchboxTimerEnd(false);
        }
      });
  }

  function deactivateLunchBox() {
    if (!lunchboxTimerEnd) {
      throw {
        code: 'CUSTOM',
        message:
          'Transaction was failed. Deactivation is not possible because 24 hours have not passed since the last activation',
      };
    } else {
      context.cao.snacksPool
        .disableLunchBoxParticipations()
        .then((tx) => {
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
          if (error.code === 'ACTION_REJECTED') {
            toast.error(CustomToast('Transaction was rejected'), {
              icon: <BsXCircle color="red" />,
            });
          } else if (error.code === 'CUSTOM') {
            toast.error(CustomToast(error.message), {
              icon: <BsXCircle color="red" />,
            });
          } else {
            toast.error(CustomToast('Transaction was failed'), {
              icon: <BsXCircle color="red" />,
            });
          }
        });
    }
  }

  function lunchboxChanger() {
    if (!lunchBoxStatus) {
      activateLunchBox();
    } else {
      deactivateLunchBox();
    }
  }
  console.log(lunchBoxStatus);
  return (
    <button
      onChange={lunchboxChanger}
      disabled={!lunchboxTimerEnd}
      className={`${
        lunchBoxStatus ? 'bg-yellow' : 'bg-dark'
      } inline-flex min-h-[24px] min-w-[44px] items-center m-4 rounded-full`}
    >
      {/* <span className="sr-only">Enable notifications</span> */}
      <span
        className={`
        ${lunchBoxStatus ? 'translate-x-6' : 'translate-x-1'}
        inline-block h-4 w-4 transform rounded-full bg-white transition`}
      />
    </button>
  );
};

export default ToggleLunchbox;
