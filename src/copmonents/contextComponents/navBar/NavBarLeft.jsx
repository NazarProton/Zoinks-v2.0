import ZoinksIcon from '/public/ZoinksIcon.svg';
import SnacksIcon from '/public/SnacksIcon.svg';
import LunchboxIcon from '/public/LunchboxIcon.svg';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Link from 'next/link';

const NavBarLeft = ({ children }) => {
  let { pathname } = useRouter();
  return (
    <div className="w-full z-0 max-w-[1920px] flex">
      <div className="w-fit h-full items-center justify-center hidden pc750:flex">
        <div className="flex flex-col justify-start font-play font-bold">
          <Link
            href="/zoinks"
            className={`px-10 h-16 w-[200px] flex gap-4 items-center ${
              pathname === '/zoinks'
                ? 'bg-gradient-to-r'
                : 'opacity-60 hover:opacity-100'
            } from-cyan`}
          >
            <Image src={ZoinksIcon} alt="#" />
            Zoinks
          </Link>
          <Link
            href="/snacks"
            className={`px-10 h-16 w-[200px] flex gap-4 items-center ${
              pathname === '/snacks'
                ? 'bg-gradient-to-r'
                : 'opacity-60 hover:opacity-100'
            } from-green`}
          >
            <Image src={SnacksIcon} alt="#" />
            Snacks
          </Link>
          <Link
            href="/lunchbox"
            className={`px-10 h-16 w-[200px] flex gap-4 items-center ${
              pathname === '/lunchbox'
                ? 'bg-gradient-to-r'
                : 'opacity-60 hover:opacity-100'
            } from-yellow`}
          >
            <Image src={LunchboxIcon} alt="#" />
            Lunchbox
          </Link>
        </div>
      </div>
      <div className="w-full h-full pt-[135px] flex">{children}</div>
    </div>
  );
};

export default NavBarLeft;
