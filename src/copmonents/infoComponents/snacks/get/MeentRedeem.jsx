import Image from 'next/image';
import { useContext, useEffect, useRef, useState } from 'react';
import { constants } from 'ethers';
import { formatEther, parseEther } from 'ethers/lib/utils';
import { BsCheckCircle, BsInfoCircle, BsXCircle } from 'react-icons/bs';
import { toast } from 'react-toastify';
import { ZoinksContext } from '../../../../zoinksPeriphery/ZoinksContext';
import directly from '/public/exchanges/directly.svg';
import arrowSwap from '/public/exchanges/arrowSwap.svg';
import snack from '/public/coins/Snack.svg';
import BSnack from '/public/coins/BSnack.svg';
import EtSnack from '/public/coins/EtSnack.svg';
import Eth from '/public/coins/Eth.svg';
import Btc from '/public/coins/Btc.svg';
import InputBoxMinMax from '../../../contextComponents/universalComponents/InputBoxMinMax';
import CustomToastWithLink from '../../../contextComponents/universalComponents/CustomToastWithLink';
import CustomToast from '../../../contextComponents/universalComponents/CustomToast';
import LoaderForButton from '../../loadersForButton/LoaderForButton';
import DataDomain from '../../../../zoinksPeriphery/services/dataDomains/DataDomain';
import TextWithIconAndTooltip from '../../universalComponents/TextWithIconAndTooltip';

const MeentRedeem = ({ activeCoin, setIsMeentParrent }) => {
  let context = useContext(ZoinksContext);
  let inputRef = useRef();
  let outRef = useRef();
  let [isMint, setIsMint] = useState(true);
  let [inputedValue, setInputedValue] = useState(constants.Zero);
  let [amountOut, setAmountOut] = useState(constants.Zero);
  let [inputValid, setInputValid] = useState(false);
  let [loader, setLoader] = useState(false);

  let balanceSnacks = context.dataDomains.balances.updateableBalanceOfSnacks;
  let balanceZoinks = context.dataDomains.balances.updateableBalanceOfZoinks;
  let balanceEth = context.dataDomains.balances.updateableBalanceOfEth;
  let balanceEtSnack =
    context.dataDomains.balances.updateableBalanceOfEthSnacks;
  let balanceBtc = context.dataDomains.balances.updateableBalanceOfBtc;
  let balanceBSnack = context.dataDomains.balances.updateableBalanceOfBtcSnacks;

  let firsthCoin,
    secondCoin,
    firsthCoinName,
    secondCoinName,
    firsthCoinBalance,
    secondCoinBalance,
    cao,
    bg;
  switch (activeCoin) {
    case 2:
      firsthCoin = directly;
      secondCoin = snack;
      firsthCoinName = 'HZUSD';
      secondCoinName = 'SNACK';
      firsthCoinBalance = balanceZoinks;
      secondCoinBalance = balanceSnacks;
      cao = context.cao.snacks;
      bg = 'bg-green';
      break;
    case 3:
      firsthCoin = Btc;
      secondCoin = BSnack;
      firsthCoinName = 'BTCB';
      secondCoinName = 'BSNACK';
      firsthCoinBalance = balanceBtc;
      secondCoinBalance = balanceBSnack;
      cao = context.cao.btcSnacks;
      bg = 'bg-yellow';
      break;
    case 4:
      firsthCoin = Eth;
      secondCoin = EtSnack;
      firsthCoinName = 'ETH';
      secondCoinName = 'ETSNACK';
      firsthCoinBalance = balanceEth;
      secondCoinBalance = balanceEtSnack;
      cao = context.cao.ethSnacks;
      bg = 'bg-blue';
      break;

    default:
      break;
  }

  function getAmountOut(amountIn) {
    cao[
      isMint
        ? 'isAmountOfPayTokensSufficientForMint'
        : 'isAmountOfBuyTokensSufficientForRedeem'
    ](amountIn)
      .then((isSufficient) => {
        setInputValid(
          amountIn.lte(isMint ? firsthCoinBalance : secondCoinBalance) &&
            amountOut.lte(!isMint ? firsthCoinBalance : secondCoinBalance) &&
            amountIn.gt(constants.Zero) &&
            isSufficient
        );
        if (isSufficient) {
          try {
            cao[
              isMint
                ? 'amountOfBuyTokenOutIfUsingPayTokenToMint'
                : 'amountOfPayTokenOutIfBuyTokenRedeemed'
            ](amountIn)
              .then((result) => {
                setAmountOut(result);
              })
              .catch(() => {
                setAmountOut(constants.Zero);
              });
          } catch {
            setAmountOut(constants.Zero);
          }
        }
      })
      .catch(() => {
        setInputValid(false);
        setAmountOut(constants.Zero);
      });
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
    let balance = isMint ? firsthCoinBalance : secondCoinBalance;
    inputRef.current.inputBox.current.value = formatEther(balance);
    setInputedValue(balance);
    onAmountChange(balance);
  }

  useEffect(() => {
    onAmountChange(inputedValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeCoin]);

  function cleaInputAndUpdateData() {
    inputRef.current.clearValue();
    setTimeout(() => {
      context.dataDomains.balances.update();
      context.dataDomains.earnedInfo.update();
      context.dataDomains.prices.update();
    }, 3000);
  }

  function mintRedeem() {
    setLoader(true);
    cao[isMint ? 'mintBuyTokenUsingPayToken' : 'redeemBuyToken'](inputedValue)
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
        error.code === 'ACTION_REJECTED'
          ? toast.error(CustomToast('Transaction was rejected'), {
              icon: <BsXCircle color="red" />,
            })
          : toast.error(CustomToast('Transaction was failed'), {
              icon: <BsXCircle color="red" />,
            });
      });
  }

  function onValidChanged(inputValue, newStateValid) {
    if (activeCoin === 1 && inputValue.lt(parseEther('1.1'))) {
      setAmountOut(constants.Zero);
      setInputValid(false);
    } else {
      onAmountChange(inputValue);
    }
  }

  return (
    <div className="pc540:w-1/2 w-full min-h-[448px] flex flex-col items-center bg-whiteInherit text-white font-orb text-lg leading-[21.6px] font-bold">
      <TextWithIconAndTooltip text={isMint ? 'MINT' : 'REDEEM'} />
      <div className="flex h-full items-center px-4 w-full flex-col">
        <div className="relative h-1/2 w-full">
          <div className="absolute flex gap-2 font-play bottom-0 left-0 w-full h-fit pb-7">
            <InputBoxMinMax
              name="swapInput"
              style={1}
              value={inputedValue}
              max={isMint ? firsthCoinBalance : secondCoinBalance}
              ref={inputRef}
              isVisible={context.dataDomains.connectivity.updateableIsConnected}
              onValidChanged={onValidChanged}
            />
            <div className="relative flex gap-2 w-1/2 justify-end font-play">
              <button
                disabled={(isMint ? firsthCoinBalance : secondCoinBalance).eq(
                  constants.Zero
                )}
                onClick={getMax}
                className="bg-cyan opacity-90 hover:opacity-100 font-normal mb-1 px-2 py-[3px] disabled:bg-whiteDark rounded-full text-sm"
              >
                <p className="-mt-[1px]">max</p>
              </button>
              {isMint ? firsthCoinName : secondCoinName}
              <Image
                src={isMint ? firsthCoin : secondCoin}
                className="h-auto w-6 -mt-1"
                alt="#"
              />
              <div className="absolute -mt-8 font-play text-white font-normal opacity-40 text-sm whitespace-nowrap">
                {`Balance: ${DataDomain.formatBalance(
                  isMint ? firsthCoinBalance : secondCoinBalance
                )}`}
              </div>
            </div>
          </div>
        </div>
        <div className="flex w-full gap-3 justify-between">
          <div className="w-full h-[1px] opacity-40 bg-white"></div>
          <div
            onClick={() => {
              if (
                (
                  <div
                    onClick={() => {
                      if (activeCoin !== 1) {
                        setIsMint((prevState) => {
                          setIsMeentParrent(!prevState);
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
                      src={arrowSwap}
                      className={`w-6 h-6 ${
                        activeCoin === 1 ? '' : 'cursor-pointer'
                      }`}
                      alt="#"
                    />
                  </div>
                ) !== 1
              ) {
                setIsMint((prevState) => {
                  setIsMeentParrent(!prevState);
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
              src={arrowSwap}
              className={`w-6 h-6 cursor-pointer`}
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
                inputedValue.gt(constants.Zero) ? formatEther(amountOut) : '0'
              }
              disabled
            />
            <div className="relative left-0 flex gap-2 w-1/2 font-play justify-end">
              {!isMint ? firsthCoinName : secondCoinName}
              <Image
                src={!isMint ? firsthCoin : secondCoin}
                className="h-auto w-6 -mt-1"
                alt="#"
              />
              <div className="absolute mt-8 font-play text-white opacity-40 font-normal text-sm whitespace-nowrap">
                {`Balance: ${DataDomain.formatBalance(
                  !isMint ? firsthCoinBalance : secondCoinBalance
                )}`}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex justify-center">
        <button
          onClick={mintRedeem}
          disabled={!inputValid}
          className={`w-full disabled:bg-whiteInherit ${bg} font-play opacity-80 hover:opacity-100 p-4 m-4 flex justify-center`}
        >
          {loader ? <LoaderForButton size={18} /> : isMint ? 'Mint' : 'Redeem'}
        </button>
      </div>
    </div>
  );
};
export default MeentRedeem;
