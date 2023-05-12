import CAO from '../../CAO';

export default class MetamaskMultipleRewardPool extends CAO {
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
    const currentAllowance = await this.contracts[this.stakingTokenName]
      .allowance(this.profile.myAddress(), contractAddress);

    if (currentAllowance.lt(amountInStakingTokenWei)) {
     const txApprove = await this.contracts[this.stakingTokenName].approve(
        contractAddress,
        this.MAX_UINT256,
      );
      await txApprove.wait(this.profile.networkInfo.confirmationsAmount);
    }

    return await this.contracts[this.contractName].stake(amountInStakingTokenWei);
  }

  async calculateAmountOfWithdrawForMe(amountOfStakedTokensWei) {
    let seniorageFeeAmount;
    const lastDepositTime = await this.getLastDepositTime();
    const timeOfNextDayAfterLastDeposit = lastDepositTime.add(3600 * 24).toNumber(); 
    if (Date.now() <= timeOfNextDayAfterLastDeposit) {
      seniorageFeeAmount = amountOfStakedTokensWei / this.feesInfo.senioragePennyDivider;
    } else {
      seniorageFeeAmount = amountOfStakedTokensWei / this.feesInfo.seniorageNormalDivider;
    }
    
    return amountOfStakedTokensWei.sub(seniorageFeeAmount);
  }

  async withdraw(amountOfStakedTokensWei) {
    return await this.contracts[this.contractName].withdraw(amountOfStakedTokensWei)
  }

  async exit() {
    return await this.contracts[this.contractName].exit();
  }

  async getReward() {
    return await this.contracts[this.contractName].getReward();
  }

  async getRewardForDuration(rewardTokenAddress) {
    return await this.contracts[this.contractName].getRewardForDuration(
      rewardTokenAddress,
    );
  }

  async getRewardTokens() {
    const result = [];
    const rewardTokensCount = (
      await this.contracts[this.contractName].getRewardTokensCount()
    ).toNumber();
    for (let i = 0; i < rewardTokensCount; i++) {
      result.push(await this.contracts[this.contractName].getRewardToken(i));
    }
    return result;
  }

  async calculateMyPotentialReward(tokenAddress, durationInSeconds) {
    return await this.contracts[this.contractName].calculatePotentialReward(
      tokenAddress,
      this.profile.myAddress(),
      durationInSeconds,
    );
  }

  async myDepositBalance() {
    return await this.contracts[this.contractName].getBalance(
      this.profile.myAddress(),
    );
  }

  async earnedByMe(tokenAddress) {
    return await this.contracts[this.contractName].earned(
      this.profile.myAddress(),
      tokenAddress,
    );
  }

  async earnedAllTokensByMe() {
    const tokens = await this.getRewardTokens();
    const result = [];
    for (const token of tokens) {
      result.push(await this.earnedByMe(token));
    }
    return result;
  }

  async calculateAllMyPotentialRewards(durationInSeconds) {
    const tokens = await this.getRewardTokens();
    const result = [];
    for (const token of tokens) {
      result.push(
        await this.calculateMyPotentialReward(token, durationInSeconds)
      );
    }
    return result;
  }

  async totalSupply() {
      return await this.contracts[this.contractName].getTotalSupply();
  }
  async getLastDepositTime() {
      return await this.contracts[this.contractName].userLastDepositTime(this.profile.myAddress());
  }
}
