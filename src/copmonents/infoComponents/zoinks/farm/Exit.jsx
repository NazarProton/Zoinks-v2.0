import Image from 'next/image';
import { useContext, useState } from 'react';
import { ZoinksContext } from '../../../../zoinksPeriphery/ZoinksContext';
import LoaderForButton from '../../loadersForButton/LoaderForButton';
import TextWithIconAndTooltip from '../../universalComponents/TextWithIconAndTooltip';
import DataDomain from '../../../../zoinksPeriphery/services/dataDomains/DataDomain';
import { BsCheckCircle, BsInfoCircle, BsXCircle } from 'react-icons/bs';
import { BigNumber, constants } from 'ethers';
import pancake from '/public/exchanges/pancake.svg';
import { toast } from 'react-toastify';
import CustomToastWithLink from '../../../contextComponents/universalComponents/CustomToastWithLink';
import CustomToast from '../../../contextComponents/universalComponents/CustomToast';
import Countdown from 'react-countdown';
import { ThreeDots } from 'react-loader-spinner';
import exitErrorRed from '/public/exitErrorRed.svg';
import exitErrorWhite from '/public/exitErrorWhite.svg';
import successBlue from '/public/exitSuccessBlue.svg';
import successWhite from '/public/exitSuccessWhite.svg';

const Exit = ({ isExit, SetIsExit, activeExchange }) => {
  let context = useContext(ZoinksContext);
  let [loader, setLoader] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [IsDataCompleted, setIsDataCompleted] = useState(true);

  let depositBalance =
    context.dataDomains.earnedInfo.updateableDepositBalancePancakeSwap;

  function cleaInputAndUpdateData() {
    setLoader(false);
    setTimeout(() => {
      context.dataDomains.balances.update();
      context.dataDomains.earnedInfo.update();
      context.dataDomains.prices.update();
    }, 3000);
  }

  function exit() {
    setLoader(true);
    let pool =
      activeExchange === 2
        ? context.cao.pancakeSwapPool
        : activeExchange === 3
        ? context.cao.biSwapPool
        : context.cao.apeSwapPool;
    pool
      .exit()
      .then((tx) => {
        console.log(tx);
        toast.info(CustomToastWithLink(tx.hash), {
          autoClose: false,
          icon: <BsInfoCircle className="text-zoinksSolid" />,
        });
        console.debug('Transaction tx', tx);
        tx.wait(this.context.networkInfo.confirmationsToWait).then(() => {
          toast.success(CustomToast('Transaction was confirmed'), {
            icon: <BsCheckCircle color="green" />,
          });
          cleaInputAndUpdateData();
        });
      })
      .catch((error) => {
        cleaInputAndUpdateData();
        console.error('ERROR 2: FarmBlock.exit', error);
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
          Exit with a 10% fee
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
    context.dataDomains.statisticsZoinks.updateableLastDepositTime;
  // lastDepositTime =
  //   context.dataDomains.statisticsSnacks.updateableLastDepositTime;

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
      } w-full flex items-center flex-col min-h-[272px] pc540:min-h-fit bg-whiteInherit text-white font-orb text-lg leading-[21.6px] font-bold`}
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
      <div className="flex h-full items-center gap-1 px-5 pb-0 w-full">
        <div className="h-full w-full flex gap-1 flex-col text-[12px] font-play pc960:text-base items-center justify-center">
          <Image alt="" src={pancake} className="w-6 h-auto" />
          <p className="w-full text-center">CAKE-LP</p>
          <p className="w-full text-center">
            {DataDomain.formatBalance(depositBalance)}
          </p>
        </div>
      </div>
      <div className="w-full flex justify-center">
        <button
          onClick={exit}
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
              date={Number(timeLeft.toString()) * 1000 + 10000}
              renderer={renderer}
            />
          )}
        </button>
      </div>
    </div>
  );
};

export default Exit;
