import CAO from '../../CAO'

export default class MetamaskSingleRewardPool extends CAO {
  constructor(
    contractName,
    stakingTokenName,
    contractsInfo,
    defaultAbis,
    profile,
    feesInfo
  ) {
    super(contractsInfo, defaultAbis, profile);
    this.contractName = contractName;
    this.stakingTokenName = stakingTokenName;
    this.feesInfo = feesInfo;
  }

  prepare() {
    this.prepareContract(this.stakingTokenName);
    this.prepareContract(this.contractName);
  }

  async stake(amountInStakingTokenWei) {
    const contractAddress = this.getAddressOf(this.contractName);
    const curentAllowance = await this.contracts[this.stakingTokenName]
      .allowance(this.profile.myAddress(), contractAddress);

    if (curentAllowance.lt(amountInStakingTokenWei)) {
      const txApprove =await this.contracts[this.stakingTokenName].approve(
        contractAddress,
        this.MAX_UINT256
      );
      await txApprove.wait(this.profile.networkInfo.confirmationsAmount);
    }
    return await this.contracts[this.contractName].stake(amountInStakingTokenWei);
  }

  async calculatueAmountOfWithdraw(amountOfStakedTokensWei) {
    const lastDepositTime = await this.contracts[
      this.contractName
    ].userLastDepositTime(this.profile.myAddress());
    
    let seniorageFeeAmount;
    const timeOfNextDayAfterLastDeposit = lastDepositTime.add(3600 * 24).toNumber();
    if (Date.now() <= timeOfNextDayAfterLastDeposit) {
      seniorageFeeAmount = amountOfStakedTokensWei / this.feesInfo.senioragePennyDivider;
    } else {
      seniorageFeeAmount = amountOfStakedTokensWei / this.feesInfo.seniorageNormalDivider;
    }
    return amountOfStakedTokensWei.sub(seniorageFeeAmount);
  }

  async withdraw(amountOfStakedTokensWei) {
    return await this.contracts[this.contractName].withdraw(amountOfStakedTokensWei);
  }

  async exit() {
    return await this.contracts[this.contractName].exit();
  }

  async getReward() {
    return await this.contracts[this.contractName].getReward();
  }

  async myDepositBalance() {
    return await this.contracts[this.contractName].balances(
      this.profile.myAddress()
    );
  }

  async getRewardForDuration() {
    return await this.contracts[this.contractName].getRewardForDuration();
  }

  async earned() {
    return await this.contracts[this.contractName].earned(this.profile.myAddress());
  }

  async totalSupply() {
    return await this.contracts[this.contractName].totalSupply();
  }
}
