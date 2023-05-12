import MetamaskUniswapV2Router from "./MetamaskUniswapV2Router";

export default class MetamaskApeSwapRouter extends MetamaskUniswapV2Router {
  constructor(contractsInfo, defaultAbis, profile, feesInfo) {
    super("ApeSwapRouter", contractsInfo, defaultAbis, profile, feesInfo);
  }
}
