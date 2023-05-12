import { useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import EllipseActive from '/public/EllipseActive.svg';
import EllipseInherit from '/public/EllipseInherit.svg';
import arrowRightTimeline from '/public/arrows/arrowRightTimeline.svg';
import arrowLeftTimeline from '/public/arrows/arrowLeftTimeline.svg';
import Image from 'next/image';

const Timeline = () => {
  const [activeIndex, setActiveIndex] = useState(2);

  const handlers = useSwipeable({
    onSwipedLeft: () =>
      setActiveIndex(activeIndex !== 5 ? activeIndex + 1 : activeIndex),
    onSwipedRight: () =>
      setActiveIndex(activeIndex !== 1 ? activeIndex - 1 : activeIndex),
  });
  return (
    <div className="w-full">
      <div className="w-full hidden pc540:block">
        <div className="flex justify-between mb-5">
          <div className="w-1/5 flex flex-col items-center">
            <p className="font-play text-sm font-bold leading-[21px] text-center whitespace-nowrap">
              System v1.0
              <br /> Lunch
            </p>
            <p className="font-play mt-2 text-[12px] leading-[18px] text-center whitespace-nowrap">
              January, 2023
            </p>
          </div>
          <div className="w-1/5 flex justify-center"></div>
          <div className="w-1/5 flex flex-col items-center opacity-40">
            <p className="font-play text-sm font-bold leading-[21px] text-center whitespace-nowrap">
              IDO Platform
              <br /> Lunch
            </p>
            <p className="font-play mt-2 text-[12px] leading-[18px] text-center whitespace-nowrap">
              January, 2023
            </p>
          </div>
          <div className="w-1/5 flex justify-center"></div>
          <div className="w-1/5 flex flex-col items-center opacity-40">
            <p className="font-play text-sm font-bold leading-[21px] text-center whitespace-nowrap">
              Support Services
              <br /> Update
            </p>
            <p className="font-play mt-2 text-[12px] leading-[18px] text-center whitespace-nowrap">
              January, 2023
            </p>
          </div>
        </div>
        <div className="max-w-[1920px] w-full mx-auto relative">
          <div className="h-1 w-full bg-whiteInherit absolute left-0 right-0 top-1/2 transform -translate-y-1/2"></div>
          <div className="flex justify-between items-center mt-4 text-sm text-gray-500">
            <div className="w-1/5 flex justify-center">
              <p className="border-[6px] w-4 h-4 border-cyan"></p>
            </div>
            <div className="w-1/5 flex justify-center">
              <p className="border-[8px] w-6 h-6 border-cyan"></p>
            </div>
            <div className="w-1/5 flex justify-center">
              <p className="border-[6px] w-4 h-4 bg-dark border-whiteInheriter opacity-90"></p>
            </div>
            <div className="w-1/5 flex justify-center">
              <p className="border-[6px] w-4 h-4 bg-dark border-whiteInheriter opacity-90"></p>
            </div>
            <div className="w-1/5 flex justify-center">
              <p className="border-[6px] w-4 h-4 bg-dark border-whiteInheriter opacity-90"></p>
            </div>
          </div>
        </div>
        <div className="flex justify-between mt-5">
          <div className="w-1/5 flex justify-center"></div>
          <div className="w-1/5 flex flex-col items-center">
            <p className="font-play mb-2 text-[12px] leading-[18px] text-center whitespace-nowrap">
              April, 2023
            </p>
            <p className="w-full p-4 font-play bg-cyan text-sm font-bold leading-[21px] text-center">
              Application
              <br /> Redesign
            </p>
          </div>
          <div className="w-1/5 flex justify-center"></div>
          <div className="w-1/5 flex flex-col items-center opacity-40">
            <p className="font-play mb-2 text-[12px] leading-[18px] text-center whitespace-nowrap">
              January, 2023
            </p>
            <p className="font-play text-sm font-bold leading-[21px] text-center whitespace-nowrap">
              IDO Platform
              <br /> Lunch
            </p>
          </div>
          <div className="w-1/5 flex justify-center"></div>
        </div>
      </div>
      <div {...handlers} className="relative w-full h-fit block pc540:hidden">
        <div
          onClick={() =>
            setActiveIndex(activeIndex !== 1 ? activeIndex - 1 : activeIndex)
          }
          className="absolute top-8 z-[5] left-0 h-4/6 flex opacity-70 hover:opacity-100 justify-center transition-opacity cursor-pointer"
        >
          <Image
            src={arrowLeftTimeline}
            alt=""
            className="w-8 h-auto"
            hidden={activeIndex === 1}
          />
        </div>
        <div
          onClick={() =>
            setActiveIndex(activeIndex !== 5 ? activeIndex + 1 : activeIndex)
          }
          className="absolute top-8 z-[5] right-0 h-4/6 flex opacity-70 hover:opacity-100 justify-center transition-opacity cursor-pointer"
        >
          <Image
            src={arrowRightTimeline}
            alt=""
            className="w-8 h-auto"
            hidden={activeIndex === 5}
          />
        </div>

        <div className="flex h-[155px] relative w-full justify-between bg-dark overflow-hidden">
          {[1, 2, 3, 4, 5].map((elem) => {
            const classes = ['post'];
            if (elem === activeIndex) classes.push('active');
            else if (elem === activeIndex + 1) classes.push('nextTimeLine');
            else if (elem === activeIndex + 2) classes.push('nextierTimeLine');
            else if (elem === activeIndex + 3)
              classes.push('nextiererTimeLine');
            else if (elem === activeIndex + 4)
              classes.push('nextierestTimeLine');
            else if (elem === activeIndex - 1) classes.push('prevTimeLine');
            else if (elem === activeIndex - 2) classes.push('previerTimeLine');
            else if (elem === activeIndex - 3)
              classes.push('previererTimeLine');
            else if (elem === activeIndex - 4)
              classes.push('previerestTimeLine');
            return (
              <div
                key={elem}
                className={`h-full absolute w-full flex-col flex ${classes.join(
                  ' '
                )}`}
              >
                <div className="w-full h-10 mb-5 relative">
                  <div className="h-1 w-full bg-whiteInherit absolute left-0 top-1/2 transform -translate-y-1/2"></div>
                  <div
                    className={`w-full ${
                      elem === 2 ? 'mt-0.5' : 'mt-1.5'
                    } flex justify-center`}
                  >
                    <p
                      className={`bg-dark ${
                        elem === 2 ? 'border-8 h-6 w-6' : 'border-[6px] w-4 h-4'
                      } 
                        ${
                          elem === 1 || elem === 2
                            ? 'border-cyan'
                            : 'border-whiteInheriter opacity-90'
                        }`}
                    ></p>
                  </div>
                </div>
                <div
                  className={`w-full h-full items-center flex justify-center flex-col`}
                >
                  <div
                    className={`w-fit mb-2 h-fit py-4 px-6 flex justify-center font-play font-bold items-center ${
                      elem === 2 ? 'bg-cyan' : 'bg-dark opacity-90'
                    } `}
                  >
                    {elem === 1 ? (
                      <p className="text-center">
                        System v1.0
                        <br /> Lunch
                      </p>
                    ) : elem === 2 ? (
                      <p className="text-center">
                        Application
                        <br /> Redesign
                      </p>
                    ) : elem === 3 ? (
                      <p className="text-center">
                        IDO Platform
                        <br /> Lunch
                      </p>
                    ) : elem === 4 ? (
                      <p className="text-center">
                        Angels System
                        <br />
                        Lunch
                      </p>
                    ) : (
                      <p className="text-center whitespace-nowrap">
                        Support Services
                        <br /> Update
                      </p>
                    )}
                  </div>
                  <p className="text-cente font-play">
                    {elem === 1
                      ? 'January, 2023'
                      : elem === 2
                      ? 'April, 2023'
                      : elem === 3
                      ? 'January, 2023'
                      : elem === 4
                      ? 'March, 2023'
                      : 'January, 2023'}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="w-full mt-10 pc540:hidden flex justify-center">
        <div className="w-full flex gap-2 justify-center">
          {[1, 2, 3, 4, 5].map((elem) => {
            return (
              <button
                key={elem}
                onClick={() => setActiveIndex(elem)}
                className={`text-8xl leading-[0px] ${
                  activeIndex === elem ? 'text-cyan' : 'text-whiteInherit'
                }`}
              >
                <Image
                  src={elem === activeIndex ? EllipseActive : EllipseInherit}
                  alt=""
                  className="w-2 h-auto"
                />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Timeline;
