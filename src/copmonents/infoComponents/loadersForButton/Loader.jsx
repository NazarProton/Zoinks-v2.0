import LoaderForButton from './LoaderForButton';

const Loader = ({ text }) => {
  return (
    <div className=" w-full px-16 md:px-0 h-screen flex items-center justify-center">
      <div className="bg-dark text-white border border-gray-200 flex flex-col items-center justify-center px-4 md:px-8 lg:px-24 py-8 rounded-lg shadow-2xl">
        <div className="text-zoinks w-fit text-3xl flex justify-center font-hind mt-4 pb-4 border-b-2 text-center">
          {text}
          <LoaderForButton size={30} visible={true} />
        </div>
      </div>
    </div>
  );
};

export default Loader;
