import MetamaskSingleRewardPool from "./MetamaskSingleRewardPool";

export default class MetamaskApeSwapPool extends MetamaskSingleRewardPool {
  constructor(contractsInfo, defaultAbis, profile, feesInfo) {
    super("ApeSwapPool", "ApeLP", contractsInfo, defaultAbis, profile, feesInfo);
  }
}
