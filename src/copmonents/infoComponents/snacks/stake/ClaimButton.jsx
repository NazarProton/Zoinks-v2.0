import { useContext, useEffect, useState } from 'react';
import LoaderForButton from '../../loadersForButton/LoaderForButton';
import { ZoinksContext } from '../../../../zoinksPeriphery/ZoinksContext';
import CustomToastWithLink from '../../../contextComponents/universalComponents/CustomToastWithLink';
import { toast } from 'react-toastify';
import { BsCheckCircle, BsInfoCircle, BsXCircle } from 'react-icons/bs';
import { constants } from 'ethers';
import CustomToast from '../../../contextComponents/universalComponents/CustomToast';

const ClaimButton = ({ type, text }) => {
  let context = useContext(ZoinksContext);
  // const [isClaimActive, setIsClaimActive] = useState(false);
  const [loader, setLoader] = useState(false);

  function cleaInputAndUpdateData() {
    setTimeout(() => {
      context.dataDomains.balances.update();
      context.dataDomains.earnedInfo.update();
      context.dataDomains.prices.update();
    }, 3000);
  }
  let style;
  switch (type) {
    case 'snacks':
      style = `w-full  font-play bg-yellow opacity-80 hover:opacity-100 ${
        loader ? 'py-2 disabled:bg-yellow' : 'py-4 disabled:bg-whiteInherit'
      } mt-0 m-4 flex justify-center`;
      break;
    case 'lunchbox':
      style = `px-4 ${
        loader ? 'py-1.5' : 'py-4'
      } min-w-[120.7px] flex justify-center disabled:bg-whiteInherit font-play bg-yellow opacity-80 hover:opacity-100`;
      break;

    default:
      break;
  }

  const ernadFromLunchbox =
    context.dataDomains.earnedInfo.updateableBalanceOfEarnedFromLunchBox;
  const earnedSnacksFromStaking =
    context.dataDomains.earnedInfo
      .updateableBalancesOfEarnedFromStakingSnacks[0];
  const lunchBoxStatus =
    context.dataDomains.earnedInfo.updateableMyLunchBoxStatus;

  function handleClaim() {
    setLoader(true);
    context.cao.snacksPool
      .getReward()
      .then((tx) => {
        toast.info(CustomToastWithLink(tx.hash), {
          autoClose: false,
          icon: <BsInfoCircle className="text-zoinksSolid" />,
        });
        tx.wait(context.networkInfo.confirmationsToWait).then(() => {
          toast.success(CustomToast('Transaction was confirmed'), {
            icon: <BsCheckCircle color="green" />,
          });
          setLoader(false);
          cleaInputAndUpdateData();
        });
      })
      .catch((error) => {
        setLoader(false);
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
    <button
      onClick={handleClaim}
      disabled={
        loader
          ? loader
          : lunchBoxStatus
          ? ernadFromLunchbox.lte(constants.Zero)
          : earnedSnacksFromStaking.lte(constants.Zero)
      }
      className={style}
    >
      {loader ? (
        <LoaderForButton size={30} color={'yellow'} />
      ) : text ? (
        text
      ) : (
        'Claim'
      )}
    </button>
  );
};

export default ClaimButton;
