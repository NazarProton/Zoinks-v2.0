import Image from 'next/image';
import { useContext, useRef, useState } from 'react';
import { ZoinksContext } from '../../../../zoinksPeriphery/ZoinksContext';
import LoaderForButton from '../../loadersForButton/LoaderForButton';
import DataDomain from '../../../../zoinksPeriphery/services/dataDomains/DataDomain';
import pancake from '/public/exchanges/pancake.svg';
import { BsCheckCircle, BsInfoCircle, BsXCircle } from 'react-icons/bs';
import { BigNumber, constants } from 'ethers';
import TextWithIconAndTooltip from '../../universalComponents/TextWithIconAndTooltip';
import InputBoxMinMax from '/src/copmonents/contextComponents/universalComponents/InputBoxMinMax';
import { toast } from 'react-toastify';
import CustomToastWithLink from '../../../contextComponents/universalComponents/CustomToastWithLink';
import CustomToast from '../../../contextComponents/universalComponents/CustomToast';
import { ThreeDots } from 'react-loader-spinner';
import Countdown from 'react-countdown';
import exitErrorRed from '/public/exitErrorRed.svg';
import exitErrorWhite from '/public/exitErrorWhite.svg';
import successBlue from '/public/exitSuccessBlue.svg';
import successWhite from '/public/exitSuccessWhite.svg';

const Withdraw = ({ isExit, SetIsExit, activeExchange }) => {
  let context = useContext(ZoinksContext);
  let inputRef = useRef();
  let [loader, setLoader] = useState(false);
  let [inputValid, setInputValid] = useState(false);
  let [inputedValue, setInputedValue] = useState(constants.Zero);
  const [IsDataCompleted, setIsDataCompleted] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

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

  function withdraw() {
    setLoader(true);
    let pool =
      activeExchange === 2
        ? context.cao.pancakeSwapPool
        : activeExchange === 3
        ? context.cao.biSwapPool
        : context.cao.apeSwapPool;
    pool
      .withdraw(inputedValue)
      .then((tx) => {
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
        console.error('ERROR 2: FarmBlock.withdraw', error);
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
            src={
              isHovered ? successWhite : inputValid ? successBlue : successWhite
            }
            alt=""
          />
          Widthdraw with a 10% fee
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
        <p className="pc940:text-sm pc750:text-[10px] pc540:text-[9px] pc850:text-[12px] pc400:text-sm text-[10px] pc1024:text-base flex gap-2 whitespace-nowrap items-center justify-center">
          <Image
            className="w-4 h-4"
            src={
              isHovered
                ? exitErrorWhite
                : inputValid
                ? exitErrorRed
                : exitErrorWhite
            }
            alt=""
          />{' '}
          {`Widthdraw with a 50% penalty [${data.formatted.hours}:${data.formatted.minutes}:${data.formatted.seconds}]`}
        </p>
      );
    }
  };

  let lastDepositTime =
    context.dataDomains.statisticsZoinks.updateableLastDepositTime;

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
      className={`flip-card-back ${
        isExit ? '' : '-z-50'
      } w-full full flex items-center flex-col min-h-[272px] pc540:min-h-full bg-whiteInherit text-white font-orb text-lg leading-[21.6px] font-bold`}
    >
      <div className="w-full flex justify-between flex-col">
        <TextWithIconAndTooltip text={'WITHDRAW'} />
        <div className="flex w-fit justify-end items-center px-4  pt-1">
          <div className="font-play text-sm gap-2 z-[1] flex flex-nowrap">
            <p className="whitespace-nowrap">to exit with all rewards</p>
            <button
              onClick={() => SetIsExit(false)}
              className="z-[1] text-cyan whitespace-nowrap"
            >
              click here
            </button>
          </div>
        </div>
      </div>
      <div className="flex h-full items-center w-full px-5 flex-col">
        <div className="relative h-full w-full">
          <div className="absolute flex gap-2 font-play bottom-0 left-0 w-full h-fit">
            <InputBoxMinMax
              name="FarmInput"
              style={1}
              value={inputedValue}
              max={depositBalance}
              ref={inputRef}
              isVisible={context.dataDomains.connectivity.updateableIsConnected}
              onValidChanged={(inputValue, newStateValid) => {
                setInputedValue(inputValue);
                setInputValid(newStateValid);
              }}
            />
            <div className="relative flex gap-2 w-1/2 justify-end">
              <p className="whitespace-nowrap">{'CAKE-LP'}</p>
              <Image src={pancake} className="h-[28px] w-6 -mt-1" alt="#" />
              <div className="absolute -mt-8 font-play text-white font-normal opacity-40 text-sm whitespace-nowrap">
                {`Balance: ${DataDomain.formatBalance(depositBalance)}`}
              </div>
            </div>
          </div>
        </div>
        <div className="flex w-full my-[7px] justify-between">
          <div className="w-full h-[1px] -mt-[7px] opacity-40 bg-white"></div>
        </div>
      </div>
      <div className="w-full flex justify-center">
        <button
          onClick={withdraw}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          disabled={!inputValid}
          className={`w-full disabled:bg-whiteInherit ${
            depositBalance.lte(constants.AddressZero)
              ? 'text-cyan disabled:text-white hover:text-white hover:bg-whiteInherit'
              : IsDataCompleted
              ? ' text-cyan disabled:text-white hover:text-white hover:bg-cyan'
              : ' text-red disabled:text-white hover:text-white hover:bg-red'
          } bg-whiteInherit font-play opacity-80 hover:opacity-100 p-4 m-4 flex justify-center`}
        >
          {loader ? (
            <LoaderForButton size={18} />
          ) : depositBalance.lte(constants.Zero) ? (
            <p className="text-white">Widthdraw</p>
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

export default Withdraw;
