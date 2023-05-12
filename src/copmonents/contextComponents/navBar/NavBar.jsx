import Image from 'next/image';
import Link from 'next/link';
import NetworkChangeModal from '../universalComponents/modals/NetworkChangeModal';
import { useContext, useEffect, useState } from 'react';
import logo from '/public/logo.svg';
import { ZoinksContext } from '../../../zoinksPeriphery/ZoinksContext';
import MenuBurger from './MenuBurger';
import FooterMenu from './FooterMenu';
import ConnectWalletAndAdress from './ConnectWalletAndAdress';

const NavBar = ({ children, keywords, title }) => {
  const context = useContext(ZoinksContext);
  let [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (
      window.ethereum?.networkVersion === '56' ||
      window.ethereum?.networkVersion === '31337'
    ) {
      context.dataDomains.connectivity.update();
      setTimeout(() => {
        if (context.dataDomains.connectivity.updateableIsConnected) {
          context.dataDomains.statisticsZoinks.refreshLastDepositTime();
          context.dataDomains.statisticsSnacks.refreshLastDepositTimeSnacksPool();
          context.dataDomains.statisticsSnacks.refreshLastDepositTimeLanchbox();
          context.dataDomains.balances.update();
          context.dataDomains.earnedInfo.update();
          context.dataDomains.pendingCommissions.update();
          context.dataDomains.prices.refreshAdress();
          setTimeout(() => {
            context.dataDomains.prices.update();
          }, 2000);
        }
      }, 0);
    } else {
      setIsModalOpen(true);
    }
  }, [
    context.dataDomains.balances,
    context.dataDomains.connectivity,
    context.dataDomains.earnedInfo,
    context.dataDomains.pendingCommissions,
    context.dataDomains.prices,
    context.dataDomains.statisticsSnacks,
    context.dataDomains.statisticsZoinks,
  ]);

  return (
    <>
      <nav className="mx-auto fixed py-2 pc540:static bg-dark pc540:bg-transparent max-w-[1920px] h-fit z-[50] pr-6 pc750:pr-10 w-full">
        <div className="flex w-full min-h-[56px]">
          <div className="min-w-[200px] flex items-center z-[10]">
            <Link href={'/'} className="w-fit pl-6 pc750:pl-10 h-fit">
              <Image src={logo} className="w-auto h-8" alt="Zoinks Hedge" />
            </Link>
          </div>
          <div className="flex w-full justify-end  text-sm font-play font-bold leading-[21px]">
            <div className="items-center text-cyan flex"></div>
            <div className="gap-8 justify-center z-[50] items-center hidden pc990:flex">
              <Link
                href="/"
                className={`text-whiteDark whitespace-nowrap font-bold transition-all duration-300 hover:text-white`}
              >
                Back to the Welcome Page
              </Link>
              <ConnectWalletAndAdress
                setIsModalOpen={setIsModalOpen}
                buttonType="header"
              />
            </div>
            <MenuBurger type={'app'} />
          </div>
        </div>
      </nav>
      <NetworkChangeModal
        isOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
      <div className="w-full pc750:h-screen  h-full flex justify-center min-w-[300px] absolute top-0 left-0 ">
        {children}
      </div>
      <FooterMenu />
    </>
  );
};

export default NavBar;
