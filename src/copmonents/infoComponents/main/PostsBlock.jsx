import { useState } from 'react';
import PostItem from './PostItem';
import { useSwipeable } from 'react-swipeable';

const PostsBlock = () => {
  const [activeIndex, setActiveIndex] = useState(2);

  const handlers = useSwipeable({
    onSwipedLeft: () =>
      setActiveIndex(activeIndex !== 3 ? activeIndex + 1 : activeIndex),
    onSwipedRight: () =>
      setActiveIndex(activeIndex !== 1 ? activeIndex - 1 : activeIndex),
  });
  return (
    <>
      <div {...handlers} className="w-full pc740:hidden">
        <div className="flex flex-col w-full justify-center">
          <div className="flex relative h-[500px] pc400:h-[550px] pc500:h-[600px] pc630:h-[700px] w-full justify-between overflow-hidden">
            {[1, 2, 3].map((elem) => {
              const classes = ['post'];
              if (elem === activeIndex) classes.push('active');
              else if (elem === activeIndex + 1) classes.push('next');
              else if (elem === activeIndex + 2) classes.push('nextier');
              else if (elem === activeIndex - 1) classes.push('prev');
              else if (elem === activeIndex - 2) classes.push('previer');
              return (
                <div
                  key={elem}
                  className={`h-full absolute w-full flex-col bg-whiteInherit flex ${classes.join(
                    ' '
                  )}`}
                >
                  <PostItem postType={elem} />
                </div>
              );
            })}
          </div>
          <div className="w-full pc740:hidden h-fit flex justify-center cursor-pointer">
            <div className="w-full flex justify-center">
              {[1, 2, 3].map((elem) => {
                return (
                  <div
                    key={elem}
                    onClick={() => setActiveIndex(elem)}
                    className={`text-8xl ${
                      activeIndex === elem ? 'text-cyan' : 'text-whiteInherit'
                    }`}
                  >
                    .
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <div className="w-full hidden pc740:flex">
        <div className="flex flex-col w-full justify-center">
          <div className="flex w-auto pc740:flex-row justify-center pc740:gap-4 overflow-hidden">
            {[1, 2, 3].map((elem) => {
              return (
                <div
                  key={elem}
                  className={`w-full h-full flex-col bg-whiteInherit flex`}
                >
                  <PostItem postType={elem} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};
export default PostsBlock;
