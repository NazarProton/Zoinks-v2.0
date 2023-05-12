import Image from 'next/image';
import InputBoxMinMax from '../../../contextComponents/universalComponents/InputBoxMinMax';
import { useContext, useRef, useState } from 'react';
import { constants } from 'ethers';
import { ZoinksContext } from '../../../../zoinksPeriphery/ZoinksContext';
import DataDomain from '../../../../zoinksPeriphery/services/dataDomains/DataDomain';
import { formatEther, parseEther } from 'ethers/lib/utils';
import CustomToastWithLink from '../../../contextComponents/universalComponents/CustomToastWithLink';
import CustomToast from '../../../contextComponents/universalComponents/CustomToast';
import { BsCheckCircle, BsInfoCircle, BsXCircle } from 'react-icons/bs';
import LoaderForButton from '../../loadersForButton/LoaderForButton';
import { toast } from 'react-toastify';
import pancake from '/public/exchanges/pancake.svg';
import TextWithIconAndTooltip from '../../universalComponents/TextWithIconAndTooltip';

const StakeLp = ({ activeExchange, isFarm, SetIsFarm }) => {
  let context = useContext(ZoinksContext);
  let inputRef = useRef();
  let [inputedValue, setInputedValue] = useState(constants.Zero);
  let [inputValid, setInputValid] = useState(false);
  let [loader, setLoader] = useState(false);

  let lpTokenBalance =
    context.dataDomains.balances.updateableBalanceOfPancakeLp;

  function getMax() {
    inputRef.current.inputBox.current.value = formatEther(lpTokenBalance);
    setInputedValue(lpTokenBalance);
    setInputValid(true);
  }

  function cleaInputAndUpdateData() {
    inputRef.current.clearValue();
    setLoader(false);
    setTimeout(() => {
      context.dataDomains.balances.update();
      context.dataDomains.earnedInfo.update();
      context.dataDomains.prices.update();
    }, 3000);
  }

  function stake() {
    setLoader(true);
    let pool =
      activeExchange === 2
        ? context.cao.pancakeSwapPool
        : activeExchange === 3
        ? context.cao.biSwapPool
        : context.cao.apeSwapPool;

    // Stake LP tokens
    pool
      .stake(inputedValue)
      .then((tx) => {
        console.debug('LP tokens stake transaction was sent', tx);
        // Tx: Add Liquidity
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
        console.error('ERROR 2: LpTokenBlock.stake', error);
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
      className={`flip-card-back ${
        isFarm ? '' : '-z-50'
      } w-1/2 h-full min-w-[50%] min-h-[448px] flex flex-col items-center bg-whiteInherit text-white font-orb text-lg leading-[21.6px] font-bold`}
    >
      <TextWithIconAndTooltip text="STAKE" />
      <div className="absolute top-12 left-0 flex justify-start px-4 w-full">
        <p className="font-play text-sm z-[1]">
          if you haven&apos;t LP tokens,{' '}
          <button onClick={() => SetIsFarm(false)} className="text-cyan">
            click here
          </button>
        </p>
      </div>
      <div className="flex h-full items-center w-full px-5 flex-col">
        <div className="relative h-1/2 w-full">
          <div className="absolute flex gap-2 font-play bottom-0 left-0 w-full h-fit pb-7">
            <InputBoxMinMax
              name="FarmInput"
              style={1}
              value={inputedValue}
              max={lpTokenBalance}
              ref={inputRef}
              isVisible={context.dataDomains.connectivity.updateableIsConnected}
              onValidChanged={(inputValue, newStateValid) => {
                setInputedValue(inputValue);
                setInputValid(newStateValid);
              }}
            />
            <div className="relative flex gap-2 w-1/2 justify-end">
              <button
                disabled={lpTokenBalance.eq(constants.Zero)}
                onClick={getMax}
                className="bg-cyan opacity-90 cursor-pointer hover:opacity-100 font-normal -mt-1 mb-1 px-2 py-1 disabled:bg-whiteDark rounded-full text-sm"
              >
                <p className="">max</p>
              </button>
              <p className="whitespace-nowrap">{'CAKE-LP'}</p>
              <Image src={pancake} className="h-[28px] w-6 -mt-1" alt="#" />
              <div className="absolute -mt-8 font-play text-white font-normal opacity-40 text-sm whitespace-nowrap">
                {`Balance: ${DataDomain.formatBalance(lpTokenBalance)}`}
              </div>
            </div>
          </div>
        </div>
        <div className="flex w-full my-[7px] justify-between">
          <div className="w-full h-[1px] -mt-[7px] opacity-40 bg-white"></div>
        </div>
        <div className="h-1/2 w-full"></div>
      </div>
      <div className="w-full flex justify-center">
        <button
          onClick={stake}
          disabled={!inputValid}
          className="w-11/12 disabled:bg-whiteInherit font-play bg-cyan opacity-80 hover:opacity-100 p-4 m-4 flex justify-center"
        >
          {loader ? <LoaderForButton size={16} /> : 'Stake'}
        </button>
      </div>
    </div>
  );
};
export default StakeLp;
