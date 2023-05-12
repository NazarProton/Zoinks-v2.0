import CAO from './CAO';
import { ethers } from "ethers";

export default class MetamaskTokens extends CAO {
  constructor(contractsInfo, defaultAbis, profile, caoRouter) {
    super(contractsInfo, defaultAbis, profile);
    this.caoRouter = caoRouter;
  }

  prepare() {
    this.prepareContract('Zoinks');
    this.prepareContract('BUSD');
    this.prepareContract('BTC');
    this.prepareContract('ETH');
    this.prepareContract('PancakeLP');
    this.prepareContract('ApeLP');
    this.prepareContract('BiLP');
  }

  async getLastPriceOfZoinksInBusd() {
    const lastReserves = await this.caoRouter.getLastReserves(
      this.contracts.Zoinks.address,
      this.contracts.BUSD.address
    );
    return parseFloat(ethers.utils.formatUnits(lastReserves[1]))
      / parseFloat(ethers.utils.formatUnits(lastReserves[0]));
  }

  async getLastPriceOfBusdInZoinks() {
    const lastReserves = await this.caoRouter.getLastReserves(
      this.contracts.Zoinks.address,
      this.contracts.BUSD.address
    );
    return parseFloat(ethers.utils.formatUnits(lastReserves[0]))
      / parseFloat(ethers.utils.formatUnits(lastReserves[1]));
  }

  async myBalanceOfEth() {
    return await this.contracts.ETH.balanceOf(this.profile.myAddress());
  }

  async myBalanceOfBtc() {
    return await this.contracts.BTC.balanceOf(this.profile.myAddress());
  }

  async myBalanceOfBusd() {
    return await this.contracts.BUSD.balanceOf(this.profile.myAddress());
  }

  async myBalanceOfPancakeLP() {
    return await this.contracts.PancakeLP.balanceOf(this.profile.myAddress());
  }

  async myBalanceOfApeLP() {
    return await this.contracts.ApeLP.balanceOf(this.profile.myAddress());
  }

  async myBalanceOfBiLP() {
    return await this.contracts.BiLP.balanceOf(this.profile.myAddress());
  }
}