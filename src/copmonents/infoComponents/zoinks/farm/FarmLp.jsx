import Image from 'next/image';
import InputBoxMinMax from '../../../contextComponents/universalComponents/InputBoxMinMax';
import { useContext, useEffect, useRef, useState } from 'react';
import directly from '/public/exchanges/directly.svg';
import busd from '/public/coins/busd.svg';
import { BigNumber, constants } from 'ethers';
import { ZoinksContext } from '../../../../zoinksPeriphery/ZoinksContext';
import DataDomain from '../../../../zoinksPeriphery/services/dataDomains/DataDomain';
import { formatEther, parseEther } from 'ethers/lib/utils';
import CustomToastWithLink from '../../../contextComponents/universalComponents/CustomToastWithLink';
import CustomToast from '../../../contextComponents/universalComponents/CustomToast';
import { BsCheckCircle, BsInfoCircle, BsXCircle } from 'react-icons/bs';
import LoaderForButton from '../../loadersForButton/LoaderForButton';
import { toast } from 'react-toastify';
import pool from '/public/exchanges/pool.svg';
import TextWithIconAndTooltip from '../../universalComponents/TextWithIconAndTooltip';

const FarmLp = ({
  activeExchange,
  setInputForBusdParrent,
  isFarm,
  SetIsFarm,
}) => {
  let context = useContext(ZoinksContext);
  let inputRef = useRef();
  let outRef = useRef();
  let [inputForBusd, setInputForBusd] = useState(false);
  let [inputedValue, setInputedValue] = useState(constants.Zero);
  let [amountOut, setAmountOut] = useState(constants.Zero);
  let [inputValid, setInputValid] = useState(false);
  let [loader, setLoader] = useState(false);

  let balanceBusd = context.dataDomains.balances.updateableBalanceOfBusd;
  let balanceZoinks = context.dataDomains.balances.updateableBalanceOfZoinks;
  let busdAddress = context.dataDomains.prices.state.busdAddress;
  let zoinksAddress = context.dataDomains.prices.state.zoinksAddress;

  function getAmountOut(amountIn) {
    setAmountOut(() => {
      let amountOut = calculateHowManyBusdNeedToSpend(
        amountIn,
        context.dataDomains.prices.updateableZoinksPricePancake
      );
      setInputValid(
        amountOut.lte(inputForBusd ? balanceBusd : balanceZoinks) &&
          amountOut.gt(constants.Zero)
      );
      return amountOut;
    });
  }

  function calculateHowManyBusdNeedToSpend(valueZoinksBN, currentZoinksPrice) {
    if (!parseFloat(valueZoinksBN) && !parseFloat(currentZoinksPrice)) {
      return constants.Zero;
    }
    let NewcurrentZoinksPrice = currentZoinksPrice.eq(constants.Zero)
      ? parseEther('1.000000000000000000')
      : currentZoinksPrice;
    if (formatEther(valueZoinksBN) >= 0.01) {
      let howManyBusdNeedToSpend = parseEther(
        (
          formatEther(valueZoinksBN) / formatEther(NewcurrentZoinksPrice)
        ).toFixed(18)
      );
      return howManyBusdNeedToSpend;
    }
    return constants.Zero;
  }

  function getPool() {
    let router =
      activeExchange === 2
        ? context.cao.pancakeSwapPool
        : activeExchange === 3
        ? context.cao.biSwapPool
        : context.cao.apeSwapPool;
    return router;
  }
  function getRouter() {
    let router =
      activeExchange === 2
        ? context.cao.pancakeSwapRouter
        : activeExchange === 3
        ? context.cao.biSwapRouter
        : context.cao.apeSwapRouter;
    return router;
  }

  function onAmountChange(amountIn) {
    if (amountIn.gt(constants.Zero)) {
      getAmountOut(amountIn);
    } else {
      setAmountOut(constants.Zero);
    }
    setInputedValue(amountIn);
  }

  function getMax() {
    let balance = inputForBusd ? balanceBusd : balanceZoinks;
    inputRef.current.inputBox.current.value = formatEther(balance);
    if (activeExchange !== 1) {
      onAmountChange(balance);
    } else {
      setInputedValue(balance);
      setAmountOut(balance);
    }
    setInputValid(true);
  }

  useEffect(() => {
    if (activeExchange === 1 && !inputForBusd) {
      setInputForBusd((prevState) => {
        if ((!inputForBusd ? balanceBusd : balanceZoinks).lt(inputedValue)) {
          setInputValid(false);
        }
        setInputForBusdParrent(!prevState);
        return !prevState;
      });
    }
    if (activeExchange !== 1) {
      onAmountChange(inputedValue);
    } else {
      setAmountOut(inputedValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeExchange]);

  function cleaInputAndUpdateData() {
    inputRef.current.clearValue();
    setTimeout(() => {
      context.dataDomains.balances.update();
      context.dataDomains.earnedInfo.update();
      context.dataDomains.prices.update();
    }, 3000);
  }

  function farm() {
    setLoader(true);
    const pool = getPool();
    const router = getRouter();

    const slippagePercentageInBasePoints = 500; // 0.5%//
    const deadlineDurationInSeconds = 1200; // 20 minutes//1200

    // Add Liquidity
    let balanceBefore;
    context.cao.tokens.myBalanceOfPancakeLP().then((actualBalance) => {
      balanceBefore = actualBalance;
    });
    router
      .addLiquidity(
        inputedValue,
        amountOut,
        zoinksAddress,
        busdAddress,
        slippagePercentageInBasePoints,
        deadlineDurationInSeconds
      )
      .then((tx) => {
        console.debug('AddLiquidity transaction sended', tx);
        // Tx: Add Liquidity
        toast.info(CustomToastWithLink(tx.hash), {
          autoClose: false,
          icon: <BsInfoCircle className="text-zoinksSolid" />,
        });
        tx.wait(context.networkInfo.confirmationsToWait).then(() => {
          toast.success(CustomToast('Transaction was confirmed'), {
            icon: <BsCheckCircle color="green" />,
          });
          context.cao.tokens.myBalanceOfPancakeLP().then((actualBalance) => {
            pool
              .stake(actualBalance.sub(balanceBefore))
              .then((tx) => {
                console.debug('Stake LP transaction sended', tx);
                // Tx: Stake LP tokens to Staking pool
                toast.info(CustomToastWithLink(tx.hash), {
                  autoClose: false,
                  icon: <BsInfoCircle className="text-zoinksSolid" />,
                });
                console.debug('Transaction tx', tx);
                tx.wait(context.networkInfo.confirmationsToWait).then(() => {
                  toast.success(CustomToast('Transaction was confirmed'), {
                    icon: <BsCheckCircle color="green" />,
                  });
                  setLoader(false);
                  cleaInputAndUpdateData();
                  context.dataDomains.statisticsZoinks.refreshLastDepositTime();
                });
              })
              .catch((error) => {
                setLoader(false);
                console.error('ERROR 2: FarmBlock.farm', error);
                toast.error(
                  CustomToast(
                    error.code === 'ACTION_REJECTED'
                      ? 'Transaction was rejected'
                      : 'Transaction was failed'
                  ),
                  {
                    icon: <BsXCircle color="red" />,
                  }
                );
              });
          });
        });
      })
      .catch((error) => {
        setLoader(false);
        console.error('ERROR 1: FarmBlock.farm', error);
        toast.error(
          CustomToast(
            error.code === 'ACTION_REJECTED'
              ? 'Transaction was rejected'
              : 'Transaction was failed'
          ),
          {
            icon: <BsXCircle color="red" />,
          }
        );
      });
  }

  return (
    <div
      className={`flip-card-front ${
        isFarm ? '-z-50' : ''
      } w-full h-full flex flex-col items-center bg-whiteInherit text-white font-orb text-lg leading-[21.6px] font-bold`}
    >
      <TextWithIconAndTooltip text="FARM" />
      <div className="absolute top-12 left-0 flex justify-start px-5 w-full">
        <p className="font-play text-sm z-[1]">
          if you already have LP tokens,{' '}
          <button onClick={() => SetIsFarm(true)} className="text-cyan">
            click here
          </button>
        </p>
      </div>
      <div className="flex h-full items-center w-full px-4 flex-col">
        <div className="relative h-1/2 w-full">
          <div className="absolute flex gap-2 font-play bottom-0 left-0 w-full h-fit pb-7">
            <InputBoxMinMax
              name="FarmInput"
              style={1}
              value={inputedValue}
              max={inputForBusd ? balanceBusd : balanceZoinks}
              ref={inputRef}
              isVisible={context.dataDomains.connectivity.updateableIsConnected}
              onValidChanged={(inputValue, newStateValid) => {
                onAmountChange(inputValue);
                setInputValid(newStateValid);
              }}
            />
            <div className="relative flex gap-2 w-1/2 justify-end">
              <button
                disabled={(inputForBusd ? balanceBusd : balanceZoinks).eq(
                  constants.Zero
                )}
                onClick={getMax}
                className="bg-cyan opacity-90 cursor-pointer hover:opacity-100 font-normal mb-1 px-2 py-1 disabled:bg-whiteDark rounded-full text-sm"
              >
                <p className="-mt-0.5">max</p>
              </button>
              {inputForBusd ? 'BUSD' : 'HZUSD'}
              <Image
                src={inputForBusd ? busd : directly}
                className="h-auto w-6 -mt-1"
                alt="#"
              />
              <div className="absolute -mt-8 font-play text-white font-normal opacity-40 text-sm whitespace-nowrap">
                {`Balance: ${DataDomain.formatBalance(
                  inputForBusd ? balanceBusd : balanceZoinks
                )}`}
              </div>
            </div>
          </div>
        </div>
        <div className="flex w-full gap-3 justify-between">
          <div className="w-full h-[1px] opacity-40 bg-white"></div>

          <div className="flex h-6 w-6 justify-end z-10 -mt-2.5 bg-InheritForInput">
            <Image src={pool} className="w-6 h-6" alt="#" />
          </div>
        </div>
        <div className="h-1/2 relative w-full">
          <div className="absolute w-full top-0 left-0 mt-7 flex justify-between">
            <input
              type="text"
              ref={outRef}
              className="bg-InheritForInput w-1/2 text-white opacity-100 font-play font-bold text-[20px] leading-[24px]"
              placeholder="0"
              value={
                inputedValue.gt(constants.Zero)
                  ? DataDomain.formatBalance(amountOut)
                  : '0'
              }
              disabled
            />
            <div className="relative left-0 flex gap-2 w-1/2 justify-end">
              {!inputForBusd ? 'BUSD' : 'HZUSD'}
              <Image
                src={!inputForBusd ? busd : directly}
                className="h-auto w-6 -mt-1"
                alt="#"
              />
              <div className="absolute mt-8 font-play text-white opacity-40 font-normal text-sm whitespace-nowrap">
                {`Balance: ${DataDomain.formatBalance(
                  !inputForBusd ? balanceBusd : balanceZoinks
                )}`}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex justify-center">
        <button
          onClick={farm}
          disabled={!inputValid}
          className="w-full disabled:bg-whiteInherit font-play bg-cyan opacity-80 hover:opacity-100 p-4 m-4 flex justify-center"
        >
          {loader ? <LoaderForButton size={16} /> : 'Farm'}
        </button>
      </div>
    </div>
  );
};
export default FarmLp;
