import { ethers } from "ethers";
// abstract
export default class CAO {
  constructor(contractsInfo, defaultAbis, profile) {
    this.contractsInfo = contractsInfo;
    this.profile = profile;
    this.defaultAbis = defaultAbis;
    this.MAX_UINT256 = ethers.constants.MaxUint256;
    this.ZERO = ethers.constants.Zero;
  }

  // mind that you have to call prepareContract on pay token contract and BUSD before the utilization
  async _priceOfPayTokenInBusdInWei(payTokenContractName, amountInPayTokenWei) {
    const swapResult = await this.contracts.PancakeSwapRouter.getAmountsOut(
      amountInPayTokenWei,
      [this.getAddressOf(payTokenContractName), this.getAddressOf('BUSD')],
    );
    return swapResult[1];
  }

  getAddressOf(contractName) {
    return this.contractsInfo[contractName].address[this.profile.chainId()];
  }

  prepareContract(contractName, customContractAddress, customAbi) {
    let abi;
    if (customAbi === undefined) {
      if (this.contractsInfo[contractName].abi === 'auto') {
        throw new Error('Not implemeted yet!');
      } else if (typeof this.contractsInfo[contractName].abi === 'string') {
        abi = this.defaultAbis[this.contractsInfo[contractName].abi].abi;
      } else if ('length' in this.contractsInfo[contractName].abi) {
        abi = this.contractsInfo[contractName].abi.reduce((a, b) => [
          ...this.defaultAbis[a].abi,
          ...this.defaultAbis[b].abi,
        ]);
      } else {
        throw new TypeError(
          `Invalid '${abi}' key value in config for contract ${contractName}`,
        );
      }
    }

    if (customContractAddress === undefined) {
      if (
        !(this.profile.chainId() in this.contractsInfo[contractName].address)
      ) {
        throw new ReferenceError(
          `Non-existent chaid ID (${this.profile.chainId()}) in config for contract ${contractName}`,
        );
      }
    }

    if (this.contracts === undefined) {
      this.contracts = {};
    }

    this.contracts[contractName] = new ethers.Contract(
      customContractAddress === undefined
        ? this.contractsInfo[contractName].address[this.profile.chainId()]
        : customContractAddress,
      customAbi === undefined ? abi : customAbi,
      this.profile.provider
    );
    this.contracts[contractName] = this.contracts[contractName].connect(
      this.profile.currentSigner
    );
  }
}
