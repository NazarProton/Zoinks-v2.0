import MetamaskSingleRewardPool from "./MetamaskSingleRewardPool";

export default class MetamaskBiSwapPool extends MetamaskSingleRewardPool {
  constructor(contractsInfo, defaultAbis, profile, feesInfo) {
    super("BiSwapPool", "BiLP", contractsInfo, defaultAbis, profile, feesInfo);
  }
}
