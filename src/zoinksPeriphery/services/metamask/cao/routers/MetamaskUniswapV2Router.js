import CAO from "../CAO";

// abstract
export default class MetamaskUniswapV2Router extends CAO {
  constructor(
    routerContractName,
    contractsInfo,
    defaultAbis,
    profile,
    feesInfo
  ) {
    super(contractsInfo, defaultAbis, profile);
    this.feesInfo = feesInfo;
    this.routerContractName = routerContractName;
  }

  prepare() {
    this.prepareContract(this.routerContractName);
  }

  async performSwap(
    amountIn,
    slippagePercentageInBasePoints,
    deadlineDurationInSeconds,
    fromAddress,
    toAddress
  ) {
    const amountInWei = amountIn;
    const tokenAName = `${this.routerContractName}TemporaryTokenA`;
    this.prepareContract(tokenAName, fromAddress, this.defaultAbis.IERC20.abi);

    const routerAddress = this.getAddressOf(this.routerContractName);
    const currentAllowance = await this.contracts[tokenAName].allowance(
      this.profile.myAddress(),
      routerAddress
    );

    if (currentAllowance.lt(amountInWei)) {
      const txApprove = await this.contracts[tokenAName].approve(routerAddress, this.MAX_UINT256);
      await txApprove.wait(this.profile.networkInfo.confirmationsAmount);
    }
    const expectedSwapResults =
      await this.contracts[this.routerContractName].getAmountsOut(amountInWei, [
        fromAddress,
        toAddress
      ]);
    const amountOutMin = expectedSwapResults[1].sub(
      expectedSwapResults[1]
        .mul(slippagePercentageInBasePoints)
        .div(this.feesInfo.base)
    );

    return await this.contracts[this.routerContractName].swapExactTokensForTokens(
      amountInWei,
      amountOutMin,
      [fromAddress, toAddress],
      this.profile.myAddress(),
      Date.now() + deadlineDurationInSeconds
    );
  }

  async getLastReserves(token0, token1) {
    const factoryAddress = await this.contracts[this.routerContractName].factory();
    const factoryName = `${this.routerContractName}TemporaryFactory`;
    this.prepareContract(factoryName, factoryAddress, this.defaultAbis.IFactory.abi);

    const getReservesABI = [
      'function getReserves() external view returns (uint112 reserve0, uint112 reserve1, uint32 blockTimestampLast)'
    ];
    const pairName = `${this.routerContractName}TemporaryPair`;
    const pairAddress = await this.contracts[factoryName].getPair(token0, token1);
    this.prepareContract(pairName, pairAddress, getReservesABI);
    return await this.contracts[pairName].getReserves();
  }

  async addLiquidity(
    amount0,
    amount1,
    token0,
    token1,
    slippagePercentageInBasePoints,
    deadlineDurationInSeconds
  ) {
    const token0Name = `${this.routerContractName}TemporaryToken0`;
    const token1Name = `${this.routerContractName}TemporaryToken1`;
    this.prepareContract(token0Name, token0, this.defaultAbis.IERC20.abi);
    this.prepareContract(token1Name, token1, this.defaultAbis.IERC20.abi);
    // Approve to router
    const routerAddress = this.getAddressOf(this.routerContractName);
    const currentAllowance0 = await this.contracts[token0Name].allowance(
      this.profile.myAddress(),
      routerAddress
    );
    if (currentAllowance0.lt(amount0)) {
      const txApprove = await this.contracts[token0Name].approve(routerAddress, this.MAX_UINT256);
      await txApprove.wait(this.profile.networkInfo.confirmationsAmount);
    }
    const currentAllowance1 = await this.contracts[token1Name].allowance(
      this.profile.myAddress(),
      routerAddress
    );
    if (currentAllowance1.lt(amount1)) {
      const txApprove = await this.contracts[token1Name].approve(routerAddress, this.MAX_UINT256);
      await txApprove.wait(this.profile.networkInfo.confirmationsAmount);
    }
    const amount0Min = amount0.sub(amount0.mul(slippagePercentageInBasePoints).div(this.feesInfo.base));
    const amount1Min = amount1.sub(amount1.mul(slippagePercentageInBasePoints).div(this.feesInfo.base));
    const deadline = (await this.profile.provider.getBlock()).timestamp + deadlineDurationInSeconds;
    return await this.contracts[this.routerContractName].addLiquidity(
      token0,
      token1,
      amount0,
      amount1,
      amount0Min,
      amount1Min,
      this.profile.myAddress(),
      deadline
    );
  }

  async getSwappedAmount(amountInWei, fromAddress, toAddress) {
    const expectedSwapResults =
      await this.contracts[this.routerContractName].getAmountsOut(amountInWei, [
        fromAddress,
        toAddress
      ]);
    return expectedSwapResults[1];
  }
}
