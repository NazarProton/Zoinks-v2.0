import Image from 'next/image';
import menuBurger from '/public/hamburger.svg';
import closeIcon from '/public/header/close_big.svg';
import { useState } from 'react';
import Link from 'next/link';
import facebook from '/public/brand/facebook.svg';
import instagram from '/public/brand/instagram.svg';
import twitter from '/public/brand/twitter.svg';
import discord from '/public/brand/discord.svg';
import github from '/public/brand/github.svg';
import ConnectWalletAndAdress from './ConnectWalletAndAdress';
import logo from '/public/logo.svg';
import TableOfContent from '../../infoComponents/whitepaper/TableOfContent';
import { useRouter } from 'next/router';

const MenuBurger = ({ type }) => {
  const [isOpen, setIsOpen] = useState(false);
  let { pathname } = useRouter();

  const navigation = [
    // { name: 'About Us', href: 'about', current: false },
    // { name: 'Community', href: 'community', current: false },
    { name: 'Whitepaper', href: 'whitepaper', current: false },
    { name: 'Support', href: 'support', current: false },
    { name: 'Zoinks', href: 'zoinks', current: false },
    { name: 'Snacks', href: 'snacks', current: false },
    { name: 'Lunchbox', href: 'lunchbox', current: false },
    // { name: 'Blog', href: 'blog', current: false },
    // { name: 'FAQ', href: 'documentation', current: false },
  ];

  let links = [
    { icon: facebook, href: 'http://bit.ly/3uznIYy' },
    { icon: instagram, href: 'http://bit.ly/3VUjlD4' },
    { icon: twitter, href: 'http://bit.ly/3iPwcYQ' },
    // { icon: telegram, href: 'https://bit.ly/3P6ZO05' },
    { icon: discord, href: 'http://bit.ly/3UGpOAo' },
    { icon: github, href: 'https://github.com/ZoinksFinance' },
  ];

  return (
    <div
      onMouseLeave={() => {
        setTimeout(() => {
          setIsOpen(false);
        }, 300);
      }}
      className={`${
        type === 'main' ? 'flex pc540:hidden' : 'flex pc990:hidden'
      } relative h-full justify-center  text-left`}
    >
      <button
        onClick={() => {
          setIsOpen((prev) => !prev);
        }}
        className="flex items-center z-[110] justify-center w-full pl-4 py-2 text-sm"
      >
        {isOpen ? (
          <Image src={closeIcon} className="w-6 h-auto" alt="#" />
        ) : (
          <Image
            onMouseOver={() => {
              setIsOpen(true);
            }}
            src={menuBurger}
            onMouseEnter={() => setIsOpen((prev) => !prev)}
            className="w-6 h-auto"
            alt="#"
          />
        )}
      </button>

      {isOpen && (
        <div
          className={`absolute font-play overflow-y-auto font-bold text-base -top-2 -right-6 pc750:-right-10 w-screen ${
            pathname === '/whitepaper' ? 'h-screen' : 'h-screen'
          }  z-[100] bg-dark shadow-lg`}
        >
          <div className="w-full h-full flex flex-col justify-between bg-whiteInherit pb-12">
            <div className="w-fit min-w-[200px] flex items-center mt-1">
              <Link
                href={'/'}
                className="w-full mt-4 flex pl-6 pc740:pl-10 h-fit"
              >
                <Image src={logo} className="w-8 h-auto" alt="Zoinks Hedge" />
              </Link>
            </div>
            <div className="">
              {navigation.map((elem, index) => {
                if (pathname === `/${elem.name.toLowerCase()}`) {
                  return null;
                }
                return (
                  <Link
                    key={index}
                    href={elem.href}
                    onClick={() => setIsOpen(false)}
                    className={`block mx-6 ${
                      pathname === '/whitepaper' ? 'py-0' : 'py-2'
                    } font-play text-base hover:bg-whiteInherit opacity-60 hover:opacity-100`}
                  >
                    {elem.name}
                  </Link>
                );
              })}
              {pathname === '/whitepaper' && (
                <TableOfContent setIsOpen={setIsOpen} />
              )}
            </div>
            <div
              className={`w-full px-6 flex flex-col ${
                pathname === '/whitepaper' ? 'gap-[2vh]' : 'mt-10 gap-14'
              } `}
            >
              <div
                className={`flex ${
                  pathname === '/whitepaper' ? '' : 'mt-16'
                } w-full justify-between`}
              >
                {links.map((link, index) => {
                  return (
                    <Link key={index} href={link.href}>
                      <Image
                        src={link.icon}
                        alt=""
                        className="w-8 h-auto opacity-50 hover:opacity-100"
                      />
                    </Link>
                  );
                })}
              </div>
              <ConnectWalletAndAdress buttonType="header" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MenuBurger;
