import Image from 'next/image';
import { useState } from 'react';
import infoSquare from '/public/infoSquare.svg';

const TextWithIconAndTooltip = ({ text, style }) => {
  let [showTooltip, setShowTooltip] = useState(false);

  let tooltipText;
  switch (text) {
    case 'STAKE':
      tooltipText = 'Tip to explain any thing you guess we need to explain';
      break;

    default:
      tooltipText = 'Tip to explain any thing you guess we need to explain';
      break;
  }

  return (
    <div
      className={`relative ${style ? style : 'w-full'} ${
        !text ? '' : 'px-4 pt-4 items-center gap-2'
      }  flex`}
    >
      <p className={`w-fit ${!text ? 'hidden' : ''} text-white opacity-80`}>
        {text}
      </p>
      <div
        // onMouseOut={() => {
        //   setTimeout(() => {
        //     setShowTooltip(false);
        //   }, 300);
        // }}
        onClick={() => setShowTooltip((prev) => !prev)}
        className="relative w-fit"
      >
        <Image src={infoSquare} className="h-6 w-6" alt="#" />
        <div
          hidden={!showTooltip}
          className={`absolute font-play rounded-3xl p-3 -top-1 w-48 ${
            text === 'FARMING REWARDS' ||
            text === 'HOLDING REWARDS' ||
            text === 'STAKING REWARDS' ||
            text === 'AUTO REWARDS' ||
            !text
              ? '-left-[155px]'
              : '-left-[84px]'
          } -mt-[93px] bg-green text-sm text-white`}
        >
          <p
            className={`${
              text === 'FARMING REWARDS' ||
              text === 'HOLDING REWARDS' ||
              text === 'STAKING REWARDS' ||
              text === 'AUTO REWARDS' ||
              !text
                ? 'thought-block-right'
                : 'thought-block'
            }`}
          ></p>
          {tooltipText}
        </div>
      </div>
    </div>
  );
};

export default TextWithIconAndTooltip;
