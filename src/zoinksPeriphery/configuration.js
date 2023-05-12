import IERC20 from './defaultAbis/IERC20.json';
import IRouter from './defaultAbis/IRouter.json';
import Zoinks from './defaultAbis/Zoinks.json';
import Snacks from './defaultAbis/Snacks.json';
import EthSnacks from './defaultAbis/EthSnacks.json';
import BtcSnacks from './defaultAbis/BtcSnacks.json';
import ApeSwapPool from './defaultAbis/ApeSwapPool.json';
import BiSwapPool from './defaultAbis/BiSwapPool.json';
import PancakeSwapPool from './defaultAbis/PancakeSwapPool.json';
import SnacksPool from './defaultAbis/SnacksPool.json';
import LunchBox from './defaultAbis/LunchBox.json';
import IFactory from './defaultAbis/IFactory.json';
import Pulse from './defaultAbis/Pulse.json';
import HoldingFeeDistributor from './defaultAbis/HoldingFeeDistributor.json';

import { generatedShape } from './ZoinksContext';

import MetamaskProfile from './services/metamask/MetamaskProfile';
import MetamaskZoinks from './services/metamask/cao/MetamaskZoinks';
import MetamaskTokens from './services/metamask/cao/MetamaskTokens';
import MetamaskLunchBox from './services/metamask/cao/MetamaskLunchBox';
import MetamaskPulse from './services/metamask/cao/MetamaskPulse';

import MetamaskSnacks from './services/metamask/cao/snacks/MetamaskSnacks';
import MetamaskBtcSnacks from './services/metamask/cao/snacks/MetamaskBtcSnacks';
import MetamaskEthSnacks from './services/metamask/cao/snacks/MetamaskEthSnacks';

import MetamaskApeSwapPool from './services/metamask/cao/pools/single/MetamaskApeSwapPool';
import MetamaskBiSwapPool from './services/metamask/cao/pools/single/MetamaskBiSwapPool';
import MetamaskSnacksPool from './services/metamask/cao/pools/multiple/MetamaskSnacksPool';
import MetamaskPancakeSwapPool from './services/metamask/cao/pools/multiple/MetamaskPancakeSwapPool';
import MetamaskPancakeSwapRouter from './services/metamask/cao/routers/MetamaskPancakeSwapRouter';
import MetamaskApeSwapRouter from './services/metamask/cao/routers/MetamaskApeSwapRouter';
import MetamaskBiSwapRouter from './services/metamask/cao/routers/MetamaskBiSwapRouter';

import BalancesDomain from './services/dataDomains/BalancesDomain';
import PendingCommissionsDomain from './services/dataDomains/PendingCommissionsDomain';
import EarningsInfoDomain from './services/dataDomains/EarningsInfoDomain';
import ConnectivityDomain from './services/dataDomains/ConnectivityDomain';
import StatisticsMainDomain from './services/dataDomains/StatisticsMainDomain';
import StatisticsSnacksDomain from './services/dataDomains/StatisticsSnacksDomain';
import StatisticsZoinksDomain from './services/dataDomains/StatisticsZoinksDomain';
import PricesDomain from './services/dataDomains/PricesDomain';

// All dependencies must be set up on abstractions!
const config = async (zoinksPeripheryHoc, isDevBuild, nodeUrl) => {
  const config = {
    ...generatedShape,
  };

  // TODO: there will be auto fetching abis from deployed contracts and
  // they will be async operations

  config.defaultAbis = {
    IERC20,
    IRouter,
    Zoinks,
    Snacks,
    BtcSnacks,
    EthSnacks,
    ApeSwapPool,
    BiSwapPool,
    PancakeSwapPool,
    SnacksPool,
    LunchBox,
    IFactory,
    Pulse,
    HoldingFeeDistributor,
  };

  config.profile = new MetamaskProfile(config.networkInfo, isDevBuild, nodeUrl);

  config.cao.zoinks = new MetamaskZoinks(
    config.contractsInfo,
    config.defaultAbis,
    config.profile,
    config.networkInfo
  );

  config.cao.lunchBox = new MetamaskLunchBox(
    config.contractsInfo,
    config.defaultAbis,
    config.profile
  );

  config.cao.pulse = new MetamaskPulse(
    config.contractsInfo,
    config.defaultAbis,
    config.profile,
    ['Zoinks', 'Snacks', 'BtcSnacks', 'EthSnacks']
  );

  config.cao.pancakeSwapRouter = new MetamaskPancakeSwapRouter(
    config.contractsInfo,
    config.defaultAbis,
    config.profile,
    config.feesInfo
  );
  config.cao.apeSwapRouter = new MetamaskApeSwapRouter(
    config.contractsInfo,
    config.defaultAbis,
    config.profile,
    config.feesInfo
  );
  config.cao.biSwapRouter = new MetamaskBiSwapRouter(
    config.contractsInfo,
    config.defaultAbis,
    config.profile,
    config.feesInfo
  );

  config.cao.snacks = new MetamaskSnacks(
    config.contractsInfo,
    config.defaultAbis,
    config.profile,
    config.feesInfo,
    config.cao.pancakeSwapRouter
  );
  config.cao.ethSnacks = new MetamaskEthSnacks(
    config.contractsInfo,
    config.defaultAbis,
    config.profile,
    config.feesInfo,
    config.cao.pancakeSwapRouter
  );
  config.cao.btcSnacks = new MetamaskBtcSnacks(
    config.contractsInfo,
    config.defaultAbis,
    config.profile,
    config.feesInfo,
    config.cao.pancakeSwapRouter
  );

  config.cao.apeSwapPool = new MetamaskApeSwapPool(
    config.contractsInfo,
    config.defaultAbis,
    config.profile,
    config.feesInfo
  );
  config.cao.biSwapPool = new MetamaskBiSwapPool(
    config.contractsInfo,
    config.defaultAbis,
    config.profile,
    config.feesInfo
  );
  config.cao.pancakeSwapPool = new MetamaskPancakeSwapPool(
    config.contractsInfo,
    config.defaultAbis,
    config.profile,
    config.feesInfo
  );
  config.cao.snacksPool = new MetamaskSnacksPool(
    config.contractsInfo,
    config.defaultAbis,
    config.profile,
    config.cao.pancakeSwapRouter,
    config.cao.snacks,
    config.feesInfo,
    config.networkInfo
  );

  config.cao.tokens = new MetamaskTokens(
    config.contractsInfo,
    config.defaultAbis,
    config.profile
  );

  // a place where the updateable read-only data exists
  config.dataDomains = {
    balances: new BalancesDomain(
      zoinksPeripheryHoc,
      config.networkInfo,
      config.cao.tokens,
      config.cao.zoinks,
      config.cao.btcSnacks,
      config.cao.ethSnacks,
      config.cao.snacks
    ),
    prices: new PricesDomain(
      zoinksPeripheryHoc,
      config.networkInfo,
      config.cao.tokens,
      config.cao.zoinks,
      config.cao.btcSnacks,
      config.cao.ethSnacks,
      config.cao.snacks,
      config.contractsInfo,
      config.cao.pancakeSwapRouter
    ),
    pendingCommissions: new PendingCommissionsDomain(
      zoinksPeripheryHoc,
      config.networkInfo,
      config.cao.snacks
    ),
    statisticsMain: new StatisticsMainDomain(
      zoinksPeripheryHoc,
      config.networkInfo
    ),
    statisticsZoinks: new StatisticsZoinksDomain(
      zoinksPeripheryHoc,
      config.networkInfo,
      config.cao.pancakeSwapPool
    ),
    statisticsSnacks: new StatisticsSnacksDomain(
      zoinksPeripheryHoc,
      config.networkInfo,
      config.cao.snacksPool
    ),
    earnedInfo: new EarningsInfoDomain(
      zoinksPeripheryHoc,
      config.networkInfo,
      config.cao.snacksPool,
      config.cao.lunchBox,
      config.cao.zoinks,
      config.cao.pancakeSwapPool,
      config.cao.biSwapPool,
      config.cao.apeSwapPool
    ),
    connectivity: new ConnectivityDomain(
      zoinksPeripheryHoc,
      config.networkInfo,
      config.profile
    ),
  };

  return config;
};

export default config;
