import MetamaskAbstractSnacks from "./MetamaskAbstractSnacks";

export default class MetamaskBtcSnacks extends MetamaskAbstractSnacks {
  constructor(contractsInfo, defaultAbis, profile, feesInfo, caoRouter) {
    super("BtcSnacks", "BTC", contractsInfo, defaultAbis, profile, feesInfo, caoRouter);
  }
}
