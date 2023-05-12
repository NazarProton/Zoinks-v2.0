import Image from 'next/image';
import { useContext, useRef, useState } from 'react';
import { constants } from 'ethers';
import { ZoinksContext } from '/src/zoinksPeriphery/ZoinksContext';
import { formatEther } from 'ethers/lib/utils';
import { BsCheckCircle, BsInfoCircle, BsXCircle } from 'react-icons/bs';
import { toast } from 'react-toastify';
import Snack from '/public/coins/Snack.svg';
import LoaderForButton from '../../loadersForButton/LoaderForButton';
import DataDomain from '/src/zoinksPeriphery/services/dataDomains/DataDomain';
import TextWithIconAndTooltip from '/src/copmonents/infoComponents/universalComponents/TextWithIconAndTooltip';
import CustomToast from '/src/copmonents/contextComponents/universalComponents/CustomToast';
import CustomToastWithLink from '/src/copmonents/contextComponents/universalComponents/CustomToastWithLink';
import InputBoxMinMax from '/src/copmonents/contextComponents/universalComponents/InputBoxMinMax';

const StakeSnacksBlock = ({}) => {
  let context = useContext(ZoinksContext);
  let inputRef = useRef();
  let [inputedValue, setInputedValue] = useState(constants.Zero);
  let [inputValid, setInputValid] = useState(false);
  let [loader, setLoader] = useState(false);

  let balanceOfSnacks = context.dataDomains.balances.updateableBalanceOfSnacks;

  function getMax() {
    inputRef.current.inputBox.current.value = formatEther(balanceOfSnacks);
    setInputedValue(balanceOfSnacks);
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

  function handleStake() {
    setLoader(true);
    const valueBN =
      this.state.inputValue.toString() === ''
        ? constants.Zero
        : this.state.inputValue;
    this.context.cao.snacksPool
      .stake(valueBN)
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
        console.error(error);
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
    <div
      className={`h-1/2 min-w-[50%] flex flex-col items-center bg-whiteInherit text-white font-orb text-lg leading-[21.6px] font-bold`}
    >
      <TextWithIconAndTooltip text="STAKE" />
      <div className="flex h-full items-center w-full px-4 flex-col">
        <div className="relative h-full w-full">
          <div className="absolute flex gap-2 font-play bottom-0 left-0 w-full h-fit pb-7">
            <InputBoxMinMax
              name="FarmInput"
              style={1}
              value={inputedValue}
              max={balanceOfSnacks}
              ref={inputRef}
              isVisible={context.dataDomains.connectivity.updateableIsConnected}
              onValidChanged={(inputValue, newStateValid) => {
                setInputedValue(inputValue);
                setInputValid(newStateValid);
              }}
            />
            <div className="relative flex gap-2 w-1/2 justify-end">
              <button
                disabled={balanceOfSnacks.eq(constants.Zero)}
                onClick={getMax}
                className="bg-cyan opacity-90 cursor-pointer hover:opacity-100 font-normal mb-1 px-2 disabled:bg-whiteDark rounded-full text-sm"
              >
                max
              </button>
              <p className="whitespace-nowrap text-lg">{'SNACK'}</p>
              <Image src={Snack} className="h-[28px] w-6 -mt-1" alt="#" />
              <div className="absolute -mt-8 font-play text-white font-normal opacity-40 text-sm whitespace-nowrap">
                {`Balance: ${DataDomain.formatBalance(balanceOfSnacks)}`}
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
          onClick={handleStake}
          disabled={!inputValid}
          className="w-11/12 disabled:bg-whiteInherit font-play bg-cyan opacity-80 hover:opacity-100 p-4 m-4 flex justify-center"
        >
          {loader ? <LoaderForButton size={18} /> : 'Stake'}
        </button>
      </div>
    </div>
  );
};
export default StakeSnacksBlock;
