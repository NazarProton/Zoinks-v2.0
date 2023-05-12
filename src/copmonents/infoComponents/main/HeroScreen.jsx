import Image from 'next/image';
import Button from '../../contextComponents/universalComponents/buttons/Button';
import facebook from '/public/brand/facebook.svg';
import instagram from '/public/brand/instagram.svg';
import twitter from '/public/brand/twitter.svg';
import discord from '/public/brand/discord.svg';
import github from '/public/brand/github.svg';
import dog1 from '/public/dog1.svg';
import LaunchAppButton from '../../contextComponents/universalComponents/buttons/LaunchAppButton';
import StatsBlock from './StatsBlock';

const HeroScreen = () => {
  let links = [
    { icon: facebook, href: 'http://bit.ly/3uznIYy' },
    { icon: instagram, href: 'http://bit.ly/3VUjlD4' },
    { icon: twitter, href: 'http://bit.ly/3iPwcYQ' },
    { icon: discord, href: 'http://bit.ly/3UGpOAo' },
    { icon: github, href: 'https://github.com/ZoinksFinance' },
  ];

  return (
    <div className="flex w-full flex-col">
      <div className="flex w-full pt-40 py-36 items-center gradient">
        <div className="flex w-full pc740:w-1/2">
          <ul className="flex-col w-1/5 justify-between hidden pc740:flex">
            {links.map((link, index) => (
              <li className="flex w-8" key={index}>
                <a href={link.href} target="_blank">
                  <Image
                    className="w-8 h-8 transition duration-150 ease-in-out opacity-30 hover:opacity-100"
                    src={link.icon}
                    alt="#"
                  />
                </a>
              </li>
            ))}
          </ul>
          <div className="flex w-full flex-col gap-8 pc740:ml-16">
            <div className="flex w-full flex-col gap-4">
              <div className="font-orb w-full font-black pc990:text-3xl pc390:text-xl text-lg">
                <p className="w-full whitespace-nowrap ">
                  MULTIPLE INVESTMENTS,
                </p>{' '}
                <p className="w-full whitespace-nowrap">RISK-FREE SERVICE</p>
              </div>
              <p className="font-play w-full pc990:text-lg pc390:text-base text-sm">
                Make earnings without any risk and diversify your
                <br /> portfolio with only one innovative service
              </p>
            </div>
            <div className="flex gap-4">
              <Button buttonType="Manual" />
              <LaunchAppButton buttonType="heroScreen" />
            </div>
          </div>
        </div>
        <div className="pc740:flex hidden w-1/2 justify-end">
          <Image priority src={dog1} alt="dog1" className="mix-blend-lighten" />
        </div>
      </div>
      <StatsBlock />
    </div>
  );
};

export default HeroScreen;
