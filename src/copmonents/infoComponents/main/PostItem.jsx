import Image from 'next/image';
import Link from 'next/link';
import post1 from '/public/posts/post1.jpg';
import post2 from '/public/posts/post2.jpg';
import post3 from '/public/posts/post3.jpg';

const PostItem = ({ postType }) => {
  let headerText,
    bodyText,
    href,
    image = {};
  switch (postType) {
    case 1:
      headerText = 'Decentralized hedging';
      bodyText = (
        <>
          {
            "The system's monetary instruments are crypto tokens issued via smart contracts on the Binance Smart Chain."
          }
          <br />
          {
            'There are two types of crypto-tokens in the system (zoinks and snacks)'
          }
        </>
      );
      href = 'http://bit.ly/3PHmGng';
      image = post1;
      break;

    case 2:
      headerText = (
        <p>
          Give me more <br /> SNACKS!🔥
        </p>
      );
      bodyText = (
        <>
          There are three different kind of SNACKS in the Zoinks ecosystem.{' '}
          <br />
          🔗 We have SNACKS - which is backed by Zoinks.
          <br />
          🔗 We have BSNACK - which is backed by BTC
        </>
      );
      href = 'http://bit.ly/3jb5mut';
      image = post2;

      break;

    case 3:
      headerText = 'Hedge Zoinks Community!👋';
      bodyText = (
        <>
          We have added{' '}
          <Link target="_blank" href={'https://medium.com/@HedgeZoinks'}>
            Medium
          </Link>{' '}
          to our social networks. Stay with us and follow our{' '}
          <Link target="_blank" href={'https://medium.com/@HedgeZoinks'}>
            Medium
          </Link>{' '}
          and check the first article,{' '}
          <Link target="_blank" href={'https://bit.ly/3YAUpmj'}>
            {'Hedge Zoinks - Intro'}
          </Link>
        </>
      );
      href = 'https://bit.ly/3YAUpmj';
      image = post3;

      break;
  }
  return (
    <>
      <Image className="w-full object-cover" src={image} alt="coin" />
      <div className="grow p-8 h-fit pc630:h-[300px] flex flex-col items-stretch justify-between">
        <div className="mb-4 leading-[24px] h-fit text-base font-orb font-bold">
          {headerText}
          <div className="pc740:grow h-fit mt-4 text-[12px] leading-[18px] overflow-hidden font-play">
            {bodyText}
          </div>
        </div>
        <Link
          target="_blank"
          href={href}
          className="whitespace-nowrap leading-[18px] text-[12px] font-bold font-play"
        >
          Look at original post →
        </Link>
      </div>
    </>
  );
};

export default PostItem;
