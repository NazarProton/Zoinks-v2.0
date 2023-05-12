import FaqItem from './FaqItem';

const FaqBlock = () => {
  return (
    <div className="w-full px-0 pc390:px-5 pc500:px-[60px] pc740:px-[120px]">
      <p className="text-2xl font-orb leading-9 font-black mb-4">FAQ</p>
      <p className="font-play leading-[21px] mb-16">
        Having a questions? We are here to help
      </p>
      <FaqItem
        num={1}
        title="How can I buy Zoinks?"
        content="Lorem ipsum dolor sit amet consectetur. Facilisis sit sagittis magnis sed. At fames pulvinar diam nulla enim sed ultrices pretium a. Curabitur arcu risus turpis integer nibh scelerisque consequat nulla mattis."
      />
      <FaqItem
        num={2}
        title="Where can I find Lunchbox?"
        content="Lorem ipsum dolor sit amet consectetur. Facilisis sit sagittis magnis sed. At fames pulvinar diam nulla enim sed ultrices pretium a. Curabitur arcu risus turpis integer nibh scelerisque consequat nulla mattis."
      />
      <FaqItem
        num={3}
        title="What is love? Baby don't hurt me"
        content="Lorem ipsum dolor sit amet consectetur. Facilisis sit sagittis magnis sed. At fames pulvinar diam nulla enim sed ultrices pretium a. Curabitur arcu risus turpis integer nibh scelerisque consequat nulla mattis."
      />
    </div>
  );
};

export default FaqBlock;
