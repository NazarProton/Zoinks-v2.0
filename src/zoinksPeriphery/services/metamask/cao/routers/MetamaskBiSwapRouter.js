import MetamaskUniswapV2Router from "./MetamaskUniswapV2Router";

export default class MetamaskBiSwapRouter extends MetamaskUniswapV2Router {
  constructor(contractsInfo, defaultAbis, profile, feesInfo) {
    super("BiSwapRouter", contractsInfo, defaultAbis, profile, feesInfo);
  }
}
