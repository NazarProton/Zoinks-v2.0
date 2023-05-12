import CAO from "./CAO";

export default class MetamaskPulse extends CAO {
  pulseContractName = "Pulse";

  constructor(contractsInfo, defaultAbis, profile, tokenNames) {
    super(contractsInfo, defaultAbis, profile);
    this.tokenNames = tokenNames;
  }

  prepare() {
    this.prepareContract(this.pulseContractName);
    this.prepareContract("PancakeSwapRouter");
    for (const tokenName of this.tokenNames) {
      this.prepareContract(tokenName);
    }
  }

  async _getBalanceInTokenWei(tokenName) {
    const pulseAddress = this.getAddressOf(this.pulseContractName);
    return await this.contracts[tokenName].balanceOf(pulseAddress);
  }

  async getBalances() {
    const result = {};
    for (const tokenName of this.tokenNames) {
      result[tokenName] = await this._getBalanceInTokenWei(tokenName);
    }
    return result;
  }
}
