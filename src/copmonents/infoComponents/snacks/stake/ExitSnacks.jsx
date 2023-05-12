import Image from 'next/image';
import { useContext, useState } from 'react';
import { ZoinksContext } from '/src/zoinksPeriphery/ZoinksContext';
import { ThreeDots } from 'react-loader-spinner';
import { BsCheckCircle, BsInfoCircle, BsXCircle } from 'react-icons/bs';
import { BigNumber, constants } from 'ethers';
import { toast } from 'react-toastify';
import Countdown from 'react-countdown';
import exitErrorRed from '/public/exitErrorRed.svg';
import exitErrorWhite from '/public/exitErrorWhite.svg';
import successBlue from '/public/exitSuccessBlue.svg';
import successWhite from '/public/exitSuccessWhite.svg';
import TextWithIconAndTooltip from '/src/copmonents/infoComponents/universalComponents/TextWithIconAndTooltip';
import CustomToast from '/src/copmonents/contextComponents/universalComponents/CustomToast';
import CustomToastWithLink from '/src/copmonents/contextComponents/universalComponents/CustomToastWithLink';
import LoaderForButton from '../../loadersForButton/LoaderForButton';
import DataDomain from '/src/zoinksPeriphery/services/dataDomains/DataDomain';
import Snack from '/public/coins/Snack.svg';

const ExitSnacks = ({ isExit, SetIsExit, activeExchange }) => {
  let context = useContext(ZoinksContext);
  let [loader, setLoader] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [IsDataCompleted, setIsDataCompleted] = useState(true);

  let depositBalance =
    context.dataDomains.earnedInfo.updateableBalanceOfStakedSnacks;

  function cleaInputAndUpdateData() {
    setLoader(false);
    setTimeout(() => {
      context.dataDomains.balances.update();
      context.dataDomains.earnedInfo.update();
      context.dataDomains.prices.update();
    }, 3000);
  }

  function handleExit() {
    setLoader(true);
    context.cao.snacksPool
      .exit()
      .then((tx) => {
        toast.info(CustomToastWithLink(tx.hash), {
          autoClose: false,
          icon: <BsInfoCircle className="text-zoinksSolid" />,
        });
        tx.wait(this.context.networkInfo.confirmationsToWait).then(() => {
          toast.success(CustomToast('Transaction was confirmed'), {
            icon: <BsCheckCircle color="green" />,
          });
          cleaInputAndUpdateData();
        });
      })
      .catch((error) => {
        cleaInputAndUpdateData();
        let errorMessage = '';
        if (error.code === 'ACTION_REJECTED') {
          errorMessage = 'Transaction was rejected';
        } else if (
          error.message &&
          error.message.includes('SnacksPool: too early deactivation')
        ) {
          errorMessage =
            'Transaction was failed. Deactivation is not possible because 24 hours have not passed since the last activation';
        } else {
          errorMessage = 'Transaction was failed';
        }
        toast.error(CustomToast(errorMessage), {
          icon: <BsXCircle color="red" />,
        });
      });
  }

  let renderer = (data) => {
    if (data.completed) {
      setIsDataCompleted(true);
      return (
        <p className="flex gap-2 items-center">
          <Image
            className="w-4 h-4"
            src={isHovered ? successWhite : successBlue}
            alt=""
          />
          Exit
        </p>
      );
    } else {
      setIsDataCompleted(false);
      return data.formatted.days > 0 ? (
        <p>
          Updating
          <ThreeDots
            height="20"
            width="20"
            radius="9"
            color={'#FF375B'}
            wrapperStyle={{ marginTop: '4px' }}
            ariaLabel="three-dots-loading"
            visible={true}
          />
        </p>
      ) : (
        <p className="pc850:text-sm pc540:text-[12px] pc360:text-sm whitespace-nowrap text-[12px] pc1024:text-base flex gap-2 items-center justify-center">
          <Image
            className="w-4 h-4"
            src={isHovered ? exitErrorWhite : exitErrorRed}
            alt=""
          />{' '}
          {`Exit with a 50% penalty [${data.formatted.hours}:${data.formatted.minutes}:${data.formatted.seconds}]`}
        </p>
      );
    }
  };

  let lastDepositTime =
    context.dataDomains.statisticsSnacks.updateableLastDepositTime;

  let timeLeft = constants.Zero;
  const day = BigNumber.from('86400');
  const currentTime = BigNumber.from(Math.round(Date.now() / 1000).toString());
  if (day.gte(currentTime.sub(lastDepositTime))) {
    timeLeft = currentTime.add(day.sub(currentTime.sub(lastDepositTime)));
  } else {
    timeLeft = currentTime;
  }

  return (
    <div
      className={`flip-card-front ${
        isExit ? '-z-50' : ''
      } w-full flex items-center flex-col min-h-[50%] pc540:min-h-fit bg-whiteInherit text-white font-orb text-lg leading-[21.6px] font-bold`}
    >
      <div className="w-full flex justify-between flex-col">
        <TextWithIconAndTooltip text={'EXIT'} />
        <div className="flex w-fit justify-end items-center px-4  pt-1">
          <div className="font-play text-sm gap-2 z-[1] flex flex-nowrap">
            <p className="whitespace-nowrap">to withdraw a part </p>
            <button
              onClick={() => SetIsExit(true)}
              className="z-[1] text-cyan whitespace-nowrap"
            >
              click here
            </button>
          </div>
        </div>
      </div>
      <div className="relative h-full w-full px-4">
        <div className="absolute flex gap-2 justify-end font-play bottom-0 right-4 w-full h-fit">
          <div className="relative flex gap-2 w-1/2 justify-end">
            <p className="whitespace-nowrap">{'SNACK'}</p>
            <Image src={Snack} className="h-[28px] w-6 -mt-1" alt="#" />
            <div className="absolute -mt-8 font-play text-white font-normal opacity-40 text-sm whitespace-nowrap">
              {`Balance: ${DataDomain.formatBalance(depositBalance)}`}
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex justify-center">
        <button
          onClick={handleExit}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          disabled={depositBalance.lte(constants.Zero)}
          className={`w-full disabled:bg-whiteInherit ${
            IsDataCompleted
              ? ' text-cyan hover:text-white hover:bg-cyan'
              : ' text-red hover:text-white hover:bg-red'
          } bg-whiteInherit font-play opacity-80 hover:opacity-100 p-4 m-4 flex justify-center`}
        >
          {loader ? (
            <LoaderForButton size={18} />
          ) : depositBalance.lte(constants.Zero) ? (
            <p className="text-white font-play">Exit</p>
          ) : (
            <Countdown
              date={Number(timeLeft.toString()) * 1000}
              renderer={renderer}
            />
          )}
        </button>
      </div>
    </div>
  );
};

export default ExitSnacks;
