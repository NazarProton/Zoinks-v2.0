import Head from 'next/head';
import NavBarMain from '../copmonents/contextComponents/navBar/NavBarMain';
import HeroScreen from '../copmonents/infoComponents/main/HeroScreen';
import { useCallback, useContext, useEffect } from 'react';
import { ZoinksContext } from '../zoinksPeriphery/ZoinksContext';
import ManualBlock from '../copmonents/infoComponents/main/ManualBlock';
import JoinUsTextBlock from '../copmonents/infoComponents/main/JoinUsTextBlock';
import PostsBlock from '../copmonents/infoComponents/main/PostsBlock';
import MarqueeBlock from '../copmonents/infoComponents/main/MarqueeBlock';
import HeroScreenSecond from '../copmonents/infoComponents/main/HeroScreenSecond';
import NoOneInfoBlock from '../copmonents/infoComponents/main/NoOneInfoBlock';
import Timeline from '../copmonents/infoComponents/main/Timeline';
import FaqBlock from '../copmonents/infoComponents/main/FaqBlock';
import LastBlock from '../copmonents/infoComponents/main/LastBlock';
import StatsGroupSecond from '../copmonents/infoComponents/main/StatsGroupSecond';

export default function Home() {
  const context = useContext(ZoinksContext);

  const updateStatistics = useCallback(() => {
    context.dataDomains.statisticsMain.update();
    context.dataDomains.statisticsZoinks.update();
    context.dataDomains.statisticsSnacks.update();
  }, [
    context.dataDomains.statisticsMain,
    context.dataDomains.statisticsSnacks,
    context.dataDomains.statisticsZoinks,
  ]);

  useEffect(() => {
    updateStatistics();
  }, [updateStatistics]);
  return (
    <>
      <Head>
        <title>Zoinks Hedge</title>
        <meta name="description" content="Zoinks Hedge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBarMain>
        <HeroScreen />
        <ManualBlock />
        <JoinUsTextBlock />
        <PostsBlock />
        <MarqueeBlock />
        <HeroScreenSecond />
        <NoOneInfoBlock />
        <Timeline />
        <StatsGroupSecond />
        <FaqBlock />
        <LastBlock />
      </NavBarMain>
    </>
  );
}
