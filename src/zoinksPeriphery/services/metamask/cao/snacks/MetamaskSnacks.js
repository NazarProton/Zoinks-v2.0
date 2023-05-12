import MetamaskAbstractSnacks from './MetamaskAbstractSnacks';
import { ethers } from 'ethers';
import axios from 'axios';

export default class MetamaskSnacks extends MetamaskAbstractSnacks {
  static SnacksType = class {
    static SNACKS = new this('Snacks', 'snacksAdjustmentFactor');
    static BTC_SNACKS = new this('BtcSnacks', 'btcSnacksAdjustmentFactor');
    static ETH_SNACKS = new this('EthSnacks', 'ethSnacksAdjustmentFactor');

    constructor(name, adjustmentFactorName) {
      this.name = name;
      this.adjustmentFactorName = adjustmentFactorName;
    }

    toString() {
      return this.name;
    }

    getAdjustmentFactorName() {
      return this.adjustmentFactorName;
    }
  };

  constructor(contractsInfo, defaultAbis, profile, feesInfo, caoRouter) {
    super(
      MetamaskSnacks.SnacksType.SNACKS.toString(),
      'Zoinks',
      contractsInfo,
      defaultAbis,
      profile,
      feesInfo,
      caoRouter
    );
  }

  prepare() {
    super.prepare();
    this.prepareContract(MetamaskSnacks.SnacksType.ETH_SNACKS.toString());
    this.prepareContract(MetamaskSnacks.SnacksType.BTC_SNACKS.toString());
  }

  async myBalanceAndDepositOfSnacks() {
    return await this.contracts.Snacks.balanceAndDepositOf(
      this.profile.myAddress()
    );
  }

  async myDepositOfSnacks() {
    return (
      await this.contracts.Snacks.balanceAndDepositOf(this.profile.myAddress())
    ).sub(await this.contracts.Snacks.balanceOf(this.profile.myAddress()));
  }

  async withdrawMyBtcSnacks() {
    return await this.contracts.Snacks['withdrawBtcSnacks()']();
  }

  async withdrawMyEthSnacks() {
    return await this.contracts.Snacks['withdrawEthSnacks()']();
  }

  async _getCommissionBelongingToMeInAnySnacksFor12Hours(snacksType) {
    let actualBalance;
    if (snacksType === MetamaskSnacks.SnacksType.SNACKS) {
      actualBalance = parseFloat(
        ethers.utils.formatEther(
          await this.contracts[snacksType.toString()].balanceAndDepositOf(
            this.profile.myAddress()
          )
        )
      );
    } else {
      actualBalance = parseFloat(
        ethers.utils.formatEther(
          await this.contracts[snacksType.toString()].balanceOf(
            this.profile.myAddress()
          )
        )
      );
    }
    const actualAdjustmentFactor = parseFloat(
      ethers.utils.formatEther(
        await this.contracts[snacksType.toString()].adjustmentFactor()
      )
    );
    const pureBalance = actualBalance / actualAdjustmentFactor;
    const previousAdjustmentFactor = parseFloat(
      ethers.utils.formatEther(
        (await axios.get(this.profile.networkInfo.zoinksSnacksStatisticsApiUrl))
          .data[snacksType.getAdjustmentFactorName()]
      )
    );
    const previousBalance = pureBalance * previousAdjustmentFactor;
    return actualBalance - previousBalance;
  }

  async getCommissionBelongingToMeInSnacksFor12Hours() {
    return await this._getCommissionBelongingToMeInAnySnacksFor12Hours(
      MetamaskSnacks.SnacksType.SNACKS
    );
  }

  async getCommissionBelongingToMeInBtcSnacksFor12Hours() {
    return await this._getCommissionBelongingToMeInAnySnacksFor12Hours(
      MetamaskSnacks.SnacksType.BTC_SNACKS
    );
  }

  async getCommissionBelongingToMeInEthSnacksFor12Hours() {
    return await this._getCommissionBelongingToMeInAnySnacksFor12Hours(
      MetamaskSnacks.SnacksType.ETH_SNACKS
    );
  }

  async getMyPendingBtcSnacks() {
    return await this.contracts.HoldingFeeDistributor[
      'cumulativeBtcSnacksClaimed'
    ]();
  }

  async getMyPendingEthSnacks() {
    return await this.contracts.HoldingFeeDistributor[
      'cumulativeEthSnacksClaimed'
    ]();
  }
  async getMyProofDataFromBackend() {
    return await axios.get(
      `https://zoinks.fi/api/statistic/proof/${this.profile.myAddress()}`
    );
  }
}
