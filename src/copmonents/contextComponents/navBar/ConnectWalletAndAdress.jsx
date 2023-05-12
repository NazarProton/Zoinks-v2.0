import Image from 'next/image';
import LaunchAppButton from '../universalComponents/buttons/LaunchAppButton';
import { ZoinksContext } from '../../../zoinksPeriphery/ZoinksContext';
import { useContext, useState } from 'react';
import coolicon from '/public/header/coolicon.svg';

const ConnectWalletAndAdress = ({ setIsModalOpen, buttonType }) => {
  const context = useContext(ZoinksContext);
  const [showCopied, setShowCopied] = useState(false);

  function getKeyBeautyful(key) {
    if (context.dataDomains.connectivity.updateableIsConnected) {
      const newKeyStart = key.slice(0, 6);
      const newKeyEnd = key.slice(-4);
      return `${newKeyStart}...${newKeyEnd}`;
    }
  }

  function isGoodNetwork() {
    if (
      window.ethereum?.networkVersion === '56' ||
      window.ethereum?.networkVersion === '31337'
    ) {
      return true;
    }
    return false;
  }
  return (
    <>
      <button
        hidden={!isGoodNetwork()}
        onClick={() => {
          setIsModalOpen(true);
        }}
        className={`${
          !isGoodNetwork() ? 'flex' : 'hidden'
        } justify-center text-center hover:bg-cyan bg-whiteDarkest whitespace-nowrap font-play font-bold gap-2 px-8 py-4 transition duration-300`}
      >
        {!window.ethereum ? 'Install Metamask' : 'Change Network'}
      </button>
      {context.dataDomains.connectivity.updateableIsConnected ? (
        <div
          type="button"
          onClick={() => {
            navigator.clipboard.writeText(
              context.dataDomains.connectivity.updateableMyAddress
            );
            setShowCopied(true);
            setTimeout(() => setShowCopied(false), 1000);
          }}
          className="text-play text-whiteDark font-bold text-sm flex justify-center border-2 border-whiteDark rounded-full p-4 leading-[21px]"
        >
          <Image
            src={coolicon}
            className="w-5 h-4 mt-0.5 mr-1"
            alt="Zoinks Hedge"
          />
          <p className="w-24 text-center text-whiteDark cursor-grab transition-all duration-300 hover:text-white">
            {(showCopied && 'Copied!') ||
              getKeyBeautyful(
                context.dataDomains.connectivity.updateableMyAddress
              )}
          </p>
        </div>
      ) : (
        <LaunchAppButton buttonType={buttonType} />
      )}
    </>
  );
};

export default ConnectWalletAndAdress;
