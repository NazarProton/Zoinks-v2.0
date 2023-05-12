import MetamaskUniswapV2Router from "./MetamaskUniswapV2Router";

export default class MetamaskPancakeSwapRouter extends MetamaskUniswapV2Router {
  constructor(contractsInfo, defaultAbis, profile, feesInfo) {
    super("PancakeSwapRouter", contractsInfo, defaultAbis, profile, feesInfo);
  }
}
