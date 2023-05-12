import Image from 'next/image';
import launch from '/public/launch.svg';
import ZoinksIcon from '/public/ZoinksIcon.svg';
import SnacksIcon from '/public/SnacksIcon.svg';
import LunchboxIcon from '/public/LunchboxIcon.svg';
import arrowRight from '/public/arrowRight.svg';

export default function ManualItem({ manualType }) {
  let icon, text, number;

  switch (manualType) {
    case 'Launch App':
      icon = launch;
      text =
        'Lorem ipsum dolor sit amet consectetur. Adipiscing amet viverra sed et porta eget id morbi. Lorem ipsum dolor sit amet consectetur. ';
      number = '01';
      break;

    case 'Get Zoinks':
      icon = ZoinksIcon;
      text =
        'Lorem ipsum dolor sit amet consectetur. Adipiscing amet viverra sed et porta eget id morbi. Lorem ipsum dolor sit amet consectetur. ';
      number = '02';
      break;

    case 'Make Snacks':
      icon = SnacksIcon;
      text =
        'Lorem ipsum dolor sit amet consectetur. Adipiscing amet viverra sed et porta eget id morbi. Lorem ipsum dolor sit amet consectetur. ';
      number = '03';
      break;

    case 'Earn more':
      icon = LunchboxIcon;
      text =
        'Lorem ipsum dolor sit amet consectetur. Adipiscing amet viverra sed et porta eget id morbi. Lorem ipsum dolor sit amet consectetur. ';
      number = '04';
      break;
  }

  return (
    <div className="flex gap-4 flex-col pc630:flex-row py-4 pc630:py-8 w-full items-center justify-center">
      <div className="flex gap-4 w-full flex-col pc630:w-1/2">
        <div className="flex w-fit gap-2">
          <Image className="w-8 h-8" src={icon} alt="#" />
          <p className="font-play font-bold text-lg w-fit">{manualType}</p>
          <Image className="w-8 h-8" src={arrowRight} alt="#" />
        </div>
        <p className="font-play pc630:ml-10 text-sm leading-[21px] max-w-[100%]">
          {text}
        </p>
      </div>
      <div
        className={`flex w-full pc630:w-1/2 ${
          number !== '02' && number !== '04'
            ? 'order-first pc630:order-last'
            : 'order-first'
        }`}
      >
        <span className="font-orb font-bold pc630:text-8xl text-5xl text-whiteDarker pc630:ml-10">
          {number}
        </span>
      </div>
    </div>
  );
}
