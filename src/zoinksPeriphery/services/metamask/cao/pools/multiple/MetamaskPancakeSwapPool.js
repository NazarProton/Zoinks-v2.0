import MetamaskMultipleRewardPool from './MetamaskMultipleRewardPool';

export default class MetamaskPancakeSwapPool extends MetamaskMultipleRewardPool {
  constructor(contractsInfo, defaultAbis, profile, feesInfo) {
    super('PancakeSwapPool', 'PancakeLP', contractsInfo, defaultAbis, profile, feesInfo);
  }
}
