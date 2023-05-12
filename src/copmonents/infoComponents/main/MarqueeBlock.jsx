import Image from 'next/image';
import Marquee from 'react-fast-marquee';
import dailyCoin from '/public/DailyCoin.png';

export default function MarqueeBlock() {
  return (
    <Marquee speed={30} pauseOnHover gradient={false}>
      <a href="joopa" className="gap-8 flex">
        <Image src={dailyCoin} alt="sponsor" />
        <Image src={dailyCoin} alt="sponsor" />
        <Image src={dailyCoin} alt="sponsor" />
        <Image src={dailyCoin} alt="sponsor" />
        <Image src={dailyCoin} alt="sponsor" />
        <Image src={dailyCoin} alt="sponsor" />
        <Image src={dailyCoin} alt="sponsor" />
        <Image src={dailyCoin} alt="sponsor" className="mr-5" />
      </a>
    </Marquee>
  );
}
