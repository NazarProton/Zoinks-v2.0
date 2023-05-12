import MetamaskAbstractSnacks from "./MetamaskAbstractSnacks";

export default class MetamaskEthSnacks extends MetamaskAbstractSnacks {
  constructor(contractsInfo, defaultAbis, profile, feesInfo, caoRouter) {
    super("EthSnacks", "ETH", contractsInfo, defaultAbis, profile, feesInfo, caoRouter);
  }
}
