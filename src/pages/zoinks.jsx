import { useCallback, useContext, useEffect } from 'react';
import Head from 'next/head';
import { ZoinksContext } from '../zoinksPeriphery/ZoinksContext';
import NavBar from '../copmonents/contextComponents/navBar/NavBar';
import NavBarLeft from '../copmonents/contextComponents/navBar/NavBarLeft';
import ZoinksNavbar from '../copmonents/infoComponents/zoinks/ZoinksNavbar';

const Zoinks = () => {
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
      <NavBar>
        <NavBarLeft>
          <ZoinksNavbar />
        </NavBarLeft>
      </NavBar>
    </>
  );
};

export default Zoinks;
