import Image from 'next/image';
import Ellipse from '/public/Ellipse.svg';

const NoOneInfoBlock = () => {
  return (
    <div className="w-full flex flex-col items-center bg-whiteInherit d-flex">
      <p className="text-[24px] mt-8 font-black leading-9 font-orb">
        NO ONE BUT US
      </p>
      <div className="flex gap-4 pc740:mt-[73px] mt-10 pc740:mb-24 mb-6 w-5/6 justify-center flex-col pc740:flex-row">
        {[1, 2, 3, 4, 5].map((el) => {
          return (
            <div key={el} className="flex flex-col items-left mb-6">
              <Image src={Ellipse} alt="ellipse" className="w-6 h-6" />
              <p className="mt-4 mb-2 font-play text-sm font-bold leading-[21px]">
                Innovative Service
              </p>
              <p className="font-play text-[12px] leading-[18px]">
                Lorem ipsum dolor sit amet consec. Convallis donec aenean.
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default NoOneInfoBlock;
