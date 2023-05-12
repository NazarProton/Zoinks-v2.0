import MetamaskMultipleRewardPool from './MetamaskMultipleRewardPool';

export default class MetamaskSnacksPool extends MetamaskMultipleRewardPool {
  constructor(
    contractsInfo,
    defaultAbis,
    profile,
    caoRouter,
    caoSnacks,
    feesInfo,
    networkInfo
  ) {
    super(
      'SnacksPool',
      'Snacks',
      contractsInfo,
      defaultAbis,
      profile,
      feesInfo
    );
    this.caoRouter = caoRouter;
    this.caoSnacks = caoSnacks;
    this.networkInfo = networkInfo;
  }

  async amIAbleToLeaveLunchBoxProgram() {
    const timeLimit = (
      await this.contracts.SnacksPool.lastActivationTimePerUser(
        this.profile.myAddress()
      )
    )
      .add(3600 * 24)
      .toNumber();
    const isNotTooEarlyToDeactivate = Date.now() < timeLimit;
    const isAlreadyParticipant = await this.amILunchBoxParticipant();
    return isNotTooEarlyToDeactivate && isAlreadyParticipant;
  }

  async amIAbleToBecomeLunchBoxParticipant() {
    const isBalanceGreaterThanZero = (
      await this.contracts.SnacksPool.getBalance(this.profile.myAddress())
    ).gt(this.ZERO);
    const isNotAlreadyParticipant = !(await this.amILunchBoxParticipant());
    return isBalanceGreaterThanZero && isNotAlreadyParticipant;
  }

  async enableLunchBoxParticipations() {
    return await this.contracts.SnacksPool.activateLunchBox();
  }

  async disableLunchBoxParticipations() {
    return await this.contracts.SnacksPool.deactivateLunchBox();
  }

  async amILunchBoxParticipant() {
    return await this.contracts.SnacksPool.isLunchBoxParticipant(
      this.profile.myAddress()
    );
  }

  async getLunchBoxParticipantsTotalSupply() {
    return await this.contracts.SnacksPool.getLunchBoxParticipantsTotalSupply();
  }

  async totalSupplyInBusd() {
    return await this.caoSnacks.priceOfBuyTokenInBusdOnRedeem(
      await super.totalSupply()
    );
  }

  async getLunchBoxParticipantsTotalSupplyInBusd() {
    const totalSupply = await this.getLunchBoxParticipantsTotalSupply();

    const isAmountOfBuyTokensSufficientForRedeem =
      await this.caoSnacks.isAmountOfBuyTokensSufficientForRedeem(totalSupply);

    if (!isAmountOfBuyTokensSufficientForRedeem) {
      return this.ZERO;
    }
    return await this.caoSnacks.amountOfPayTokenOutIfBuyTokenRedeemed(
      totalSupply
    );
  }

  async getLastActivationTimePerUser() {
    return await this.contracts.SnacksPool.lastActivationTimePerUser(
      this.profile.myAddress()
    );
  }
}
