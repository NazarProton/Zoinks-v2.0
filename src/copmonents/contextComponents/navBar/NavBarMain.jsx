import Image from 'next/image';
import Link from 'next/link';
import NetworkChangeModal from '../universalComponents/modals/NetworkChangeModal';
import { useContext, useEffect, useState } from 'react';
import logo from '/public/logo.svg';
import { ZoinksContext } from '../../../zoinksPeriphery/ZoinksContext';
import ConnectWalletAndAdress from './ConnectWalletAndAdress';
import MenuBurger from './MenuBurger';

const NavBarMain = ({ children, keywords, title }) => {
  const context = useContext(ZoinksContext);
  let [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (
      window.ethereum?.networkVersion === '56' ||
      window.ethereum?.networkVersion === '31337'
    ) {
      context.dataDomains.connectivity.update();
    } else {
      setIsModalOpen(true);
    }
  }, [
    context.dataDomains.balances,
    context.dataDomains.connectivity,
    context.dataDomains.earnedInfo,
    context.dataDomains.statisticsSnacks,
    context.dataDomains.statisticsZoinks,
    isModalOpen,
  ]);

  const navigation = [
    // { name: 'About Us', href: 'about', current: false },
    // { name: 'Community', href: 'community', current: false },
    { name: 'Whitepaper', href: 'whitepaper', current: false },
    { name: 'Support', href: 'support', current: false },
    // { name: 'Blog', href: 'blog', current: false },
    // { name: 'FAQ', href: 'documentation', current: false },
  ];

  return (
    <>
      <nav
        className={`mx-auto fixed py-2 left-0 h-fit bg-dark flex justify-center max-w-[1920px] items-center z-[10] pr-6 pc740:pr-8 w-full`}
      >
        <div className="flex w-full min-h-[56px]">
          <div className="w-fit min-w-[200px] flex items-center">
            <Link href={'/'} className="w-full flex pl-6 pc740:pl-10 h-fit">
              <Image
                src={logo}
                className="min-w-8 min-h-8"
                alt="Zoinks Hedge"
              />
            </Link>
          </div>
          <div className="flex w-full justify-end  text-sm font-play font-bold leading-[21px]">
            <div className="gap-8 justify-center z-[10] items-center hidden pc540:flex">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`text-whiteDark font-bold transition-all duration-300 hover:text-white`}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </Link>
              ))}
              <ConnectWalletAndAdress
                setIsModalOpen={setIsModalOpen}
                buttonType="header"
              />
            </div>
            <MenuBurger type={'main'} />
          </div>
        </div>
      </nav>
      <NetworkChangeModal
        isOpen={isModalOpen}
        showHideModal={(isModalOpen) => setIsModalOpen(isModalOpen)}
      />
      <div className="flex mx-auto justify-center scrollbar-hidden max-w-[1920px] w-full flex-col items-center px-6 pc740:px-10 gap-16 pc740:gap-32">
        {children}
      </div>
    </>
  );
};

export default NavBarMain;
