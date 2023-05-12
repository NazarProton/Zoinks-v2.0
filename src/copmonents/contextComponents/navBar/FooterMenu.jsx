import Image from 'next/image';
import Link from 'next/link';
import Zoinks from '/public/ZoinksIcon.svg';
import Snacks from '/public/SnacksIcon.svg';
import Lunchbox from '/public/LunchboxIcon.svg';
import { useRouter } from 'next/router';

const FooterMenu = () => {
  let { pathname } = useRouter();
  return (
    <div className="w-full flex fixed bottom-0 z-20 pc750:hidden px-6 pb-3 bg-dark">
      <div className="flex w-full border border-whiteDark border-collapse">
        {['Zoinks', 'Snacks', 'Lunchbox'].map((elem, index) => (
          <Link
            href={`/${elem.toLowerCase()}`}
            key={index}
            className={`w-1/3 flex p-2 flex-col items-center bg-whiteInherit ${
              pathname.slice(1) === elem.toLowerCase()
                ? `ring-1  ${
                    elem === 'Zoinks'
                      ? 'ring-cyan'
                      : elem === 'Snacks'
                      ? 'ring-green'
                      : 'ring-yellow'
                  }
                   ${
                     elem === 'Zoinks'
                       ? ' nav__block__zoinks'
                       : elem === 'Snacks'
                       ? ' nav__block__snacks'
                       : ' nav__block__lunchbox'
                   }`
                : ''
            }`}
          >
            <Image
              src={
                elem === 'Zoinks'
                  ? Zoinks
                  : elem === 'Snacks'
                  ? Snacks
                  : Lunchbox
              }
              className="w-6 h-auto"
              alt="#"
            />
            <p className="font-play">{elem}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default FooterMenu;
