import LaunchAppButton from '../../contextComponents/universalComponents/buttons/LaunchAppButton';

const LastBlock = () => {
  return (
    <div className="w-full bg-whiteInherit pb-[95px] mb-80 flex flex-col items-center">
      <p className="font-orb font-bold text-2xl leading-9 text-center mt-[94px]">
        DONT MISS YOUR CHANCE
      </p>
      <p className="w-4/5 pc390:w-3/5 pc740:w-2/5 mb-8 font-play mt-2 text-sm leading-[21px] text-center">
        Lorem ipsum dolor sit amet consectetur. Sodales mus et tellus mattis at.
        Bibendum amet mauris in placerat sed blandit viverra.
      </p>
      <LaunchAppButton buttonType="heroScreen" type="footer" />
    </div>
  );
};

export default LastBlock;
