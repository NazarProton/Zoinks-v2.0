import Image from 'next/image';
import { useContext, useEffect, useRef, useState } from 'react';
import directly from '/public/exchanges/directly.svg';
import arrowDirectly from '/public/exchanges/arrowDirectly.svg';
import arrowSwap from '/public/exchanges/arrowSwap.svg';
import busd from '/public/coins/busd.svg';
import { constants } from 'ethers';
import { ZoinksContext } from '../../../../zoinksPeriphery/ZoinksContext';
import DataDomain from '../../../../zoinksPeriphery/services/dataDomains/DataDomain';
import { formatEther } from 'ethers/lib/utils';
import CustomToastWithLink from '../../../contextComponents/universalComponents/CustomToastWithLink';
import CustomToast from '../../../contextComponents/universalComponents/CustomToast';
import { BsCheckCircle, BsInfoCircle, BsXCircle } from 'react-icons/bs';
import LoaderForButton from '../../loadersForButton/LoaderForButton';
import { toast } from 'react-toastify';
import ChartArea from './ChartArea';
import TextWithIconAndTooltip from '../../universalComponents/TextWithIconAndTooltip';
import InputBoxMinMax from '../../../contextComponents/universalComponents/InputBoxMinMax';

const MintSwap = ({ activeExchange, SetInputForBusdParrent }) => {
  let context = useContext(ZoinksContext);
  let inputRef = useRef();
  let outRef = useRef();
  let [inputForBusd, setInputForBusd] = useState(true);
  let [inputedValue, setInputedValue] = useState(constants.Zero);
  let [amountOut, setAmountOut] = useState(constants.Zero);
  let [inputValid, setInputValid] = useState(false);
  let [loader, setLoader] = useState(false);
  let [showTooltip, setShowTooltip] = useState(false);

  let balanceBusd = context.dataDomains.balances.updateableBalanceOfBusd;
  let balanceZoinks = context.dataDomains.balances.updateableBalanceOfZoinks;
  let busdAddress = context.dataDomains.prices.state.busdAddress;
  let zoinksAddress = context.dataDomains.prices.state.zoinksAddress;

  function getAmountOut(amountIn) {
    let router = getRouter();
    router
      .getSwappedAmount(
        amountIn,
        inputForBusd ? busdAddress : zoinksAddress,
        inputForBusd ? zoinksAddress : busdAddress
      )
      .then((amountOut) => {
        setAmountOut(amountOut);
      });
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
        SetInputForBusdParrent(!prevState);
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
    inputRef.current?.clearValue();
    setLoader(false);
    setTimeout(() => {
      context.dataDomains.balances.update();
      context.dataDomains.earnedInfo.update();
      context.dataDomains.prices.update();
    }, 3000);
  }

  function mint() {
    setLoader(true);
    console.log(inputedValue.toString());
    context.cao.zoinks
      .mint(inputedValue.toString())
      .then((tx) => {
        toast.info(CustomToastWithLink(tx.hash), {
          autoClose: false,
          icon: <BsInfoCircle className="text-zoinksSolid" />,
        });
        console.debug('Transaction tx', tx);
        tx.wait(context.networkInfo.confirmationsToWait).then(() => {
          toast.success(CustomToast('Transaction was confirmed'), {
            icon: <BsCheckCircle color="green" />,
          });
          cleaInputAndUpdateData();
        });
      })
      .catch((error) => {
        cleaInputAndUpdateData();
        console.error('MINT1', error);
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

  function handleSwap() {
    setLoader(true);
    let router = getRouter();
    const slippagePercentageInBasePoints = 500; // 0.5%//
    const deadlineDurationInSeconds = 1200; // 20 minutes//
    const fromAdress = inputForBusd ? busdAddress : zoinksAddress;
    const toAdress = inputForBusd ? zoinksAddress : busdAddress;
    router
      .performSwap(
        inputedValue.toString(),
        slippagePercentageInBasePoints,
        deadlineDurationInSeconds,
        fromAdress,
        toAdress
      )
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
        console.error('ERROR 2: SwapBlock.Swap', error);
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
    <div className="w-full h-full flex gap-4 flex-col  pc540:flex-row">
      <div className="pc540:w-1/2 w-full min-h-[448px] flex flex-col items-center bg-whiteInherit text-white font-orb text-lg leading-[21.6px] font-bold">
        <TextWithIconAndTooltip text={activeExchange === 1 ? 'MINT' : 'SWAP'} />
        <div className="flex h-full items-center px-4 w-full flex-col">
          <div className="relative h-1/2 w-full">
            <div className="absolute flex gap-2 font-play bottom-0 left-0 w-full h-fit pb-7">
              <InputBoxMinMax
                name="swapInput"
                style={1}
                value={inputedValue}
                max={inputForBusd ? balanceBusd : balanceZoinks}
                ref={inputRef}
                isVisible={
                  context.dataDomains.connectivity.updateableIsConnected
                }
                onValidChanged={(inputValue, newStateValid) => {
                  if (activeExchange === 1) {
                    setAmountOut(inputValue);
                    setInputedValue(inputValue);
                    setInputValid(newStateValid);
                  } else {
                    onAmountChange(inputValue);
                    setInputValid(newStateValid);
                  }
                }}
              />
              <div className="relative flex gap-2 w-1/2 justify-end">
                <button
                  disabled={(inputForBusd ? balanceBusd : balanceZoinks).eq(
                    constants.Zero
                  )}
                  onClick={getMax}
                  className="bg-cyan opacity-90 hover:opacity-100 font-normal mb-1 px-2 py-1 disabled:bg-whiteDark rounded-full text-sm"
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
            <div
              onClick={() => {
                if (activeExchange !== 1) {
                  setInputForBusd((prevState) => {
                    SetInputForBusdParrent(!prevState);
                    return !prevState;
                  });
                  onAmountChange(constants.Zero);
                  setInputValid(false);
                  inputRef.current.inputBox.current.value = null;
                }
              }}
              className="flex h-6 w-6 justify-end z-10 -mt-2.5 bg-InheritForInput"
            >
              <Image
                src={activeExchange === 1 ? arrowDirectly : arrowSwap}
                className={`w-6 h-6 ${
                  activeExchange === 1 ? '' : 'cursor-pointer'
                }`}
                alt="#"
              />
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
            onClick={() => {
              activeExchange === 1 ? mint() : handleSwap();
            }}
            disabled={!inputValid}
            className="w-full disabled:bg-whiteInherit font-play bg-cyan opacity-80 hover:opacity-100 p-4 m-4 flex justify-center"
          >
            {loader ? (
              <LoaderForButton size={16} />
            ) : activeExchange === 1 ? (
              'Mint'
            ) : (
              'Swap'
            )}
          </button>
        </div>
      </div>
      <ChartArea
        inputForBUSD={inputForBusd}
        selectedExchange={
          activeExchange === 1
            ? 'DIRECTLY'
            : activeExchange === 2
            ? 'PANCAKE'
            : activeExchange === 3
            ? 'BI'
            : 'APE'
        }
      />
    </div>
  );
};
export default MintSwap;
