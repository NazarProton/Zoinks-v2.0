import Image from 'next/image';
import Button from '../../contextComponents/universalComponents/buttons/Button';
import dog1 from '/public/dog1.svg';

const HeroScreenSecond = () => {
  return (
    <div className="flex w-full gradient2">
      <div className="flex w-full flex-col gap-8 pc740:pl-[105px]">
        <div className="flex w-full flex-col gap-4">
          <div className="font-orb w-full font-black pc990:text-3xl pc390:text-xl text-lg">
            <p className="w-full whitespace-nowrap ">MULTIPLE INVESTMENTS,</p>{' '}
            <p className="w-full whitespace-nowrap">RISK-FREE SERVICE</p>
          </div>
          <p className="font-play w-full pc990:text-lg pc390:text-base text-sm">
            Make earnings without any risk and diversify your
            <br /> portfolio with only one innovative service
          </p>
          <div className="flex">
            <Button buttonType="LearnMore" styles="pc442:w-auto w-full" />
          </div>
        </div>
      </div>
      <div className="pc740:flex hidden w-1/2 justify-end">
        <Image priority src={dog1} alt="dog1" className="mix-blend-lighten" />
      </div>
    </div>
  );
};

export default HeroScreenSecond;
