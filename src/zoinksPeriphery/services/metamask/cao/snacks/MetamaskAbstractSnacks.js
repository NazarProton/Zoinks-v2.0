import CAO from '../CAO';
import { ethers } from 'ethers';

export default class MetamaskAbstractSnacks extends CAO {
  constructor(
    contractName,
    payTokenContractName,
    contractsInfo,
    defaultAbis,
    profile,
    feesInfo,
    caoRouter
  ) {
    super(contractsInfo, defaultAbis, profile);
    this.feesInfo = feesInfo;
    this.contractName = contractName;
    this.payTokenContractName = payTokenContractName;
    this.caoRouter = caoRouter;
  }

  prepare() {
    this.prepareContract(this.contractName);
    this.prepareContract('PancakeSwapRouter');
    this.prepareContract(this.payTokenContractName);
    this.prepareContract('BUSD');
  }

  async myBalanceOfBuyToken() {
    return await this.contracts[this.contractName].balanceOf(
      this.profile.myAddress()
    );
  }

  async myBalanceOfPayToken() {
    return await this.contracts[this.payTokenContractName].balanceOf(
      this.profile.myAddress()
    );
  }

  async myBalanceOfBuyTokenInBusd() {
    const myBalanceOfBuyToken = await this.contracts[
      this.contractName
    ].balanceOf(this.profile.myAddress());
    return await this.priceOfBuyTokenInBusdOnRedeem(myBalanceOfBuyToken);
  }

  async busdEquivalentOfBuyTokenAmount(amountInBuyTokenWei) {
    const payTokenAmountOnMintWithoutFees = await this.contracts[
      this.contractName
    ].calculatePayTokenAmountOnMint(amountInBuyTokenWei);
    return await this._priceOfPayTokenInBusdInWei(
      this.payTokenContractName,
      payTokenAmountOnMintWithoutFees
    );
  }

  async amountOfBuyTokenOutIfUsingPayTokenToMint(amountInPayTokenWei) {
    const amountOfBuyToken = await this.contracts[
      this.contractName
    ].calculateBuyTokenAmountOnMint(amountInPayTokenWei);
    // accounting fees
    return amountOfBuyToken
      .mul(this.feesInfo.base - this.feesInfo.snacksMint)
      .div(this.feesInfo.base);
  }

  async amountOfPayTokenOutIfBuyTokenMinted(amountInBuyTokenWei) {
    return await this.contracts[
      this.contractName
    ].calculatePayTokenAmountOnMint(amountInBuyTokenWei);
  }

  async amountOfPayTokenOutIfBuyTokenRedeemed(amountInBuyTokenWei) {
    return await this.contracts[
      this.contractName
    ].calculatePayTokenAmountOnRedeem(
      // accounting fees
      amountInBuyTokenWei
        .mul(this.feesInfo.base - this.feesInfo.snacksRedeem)
        .div(this.feesInfo.base)
    );
  }

  async busdEquivalentOfOneBuyToken() {
    return await this.busdEquivalentOfBuyTokenAmount(
      ethers.constants.WeiPerEther
    );
  }

  async getFeeInPayTokenOfAmountInWei(amountOfPayTokenInWei) {
    const amountInBuyToken = await this.contracts[
      this.contractName
    ].calculateBuyTokenAmountOnMint(amountOfPayTokenInWei);

    const amountWithFeesInBuyToken = amountInBuyToken
      .mul(this.feesInfo.snacksMint)
      .div(this.feesInfo.base);

    return await this.contracts[
      this.contractName
    ].calculatePayTokenAmountOnMint(amountWithFeesInBuyToken);
  }

  getFeeInBuyTokenOfAmountInWei(amountBuyTokenInWei) {
    return amountBuyTokenInWei
      .mul(this.feesInfo.snacksMint)
      .div(this.feesInfo.base);
  }

  async isAmountOfBuyTokensSufficientForMint(amountInWei) {
    return await this.contracts[
      this.contractName
    ].sufficientBuyTokenAmountOnMint(amountInWei);
  }

  async isAmountOfPayTokensSufficientForMint(amountInWei) {
    return await this.contracts[
      this.contractName
    ].sufficientPayTokenAmountOnMint(amountInWei);
  }

  async isAmountOfBuyTokensSufficientForRedeem(amountInWei) {
    return await this.contracts[
      this.contractName
    ].sufficientBuyTokenAmountOnRedeem(amountInWei);
  }

  async mintBuyTokenUsingPayToken(amountInPayToken) {
    const amountInPayTokenWei = ethers.utils.parseEther(amountInPayToken);

    const currentAllowance = await this.contracts[
      this.payTokenContractName
    ].allowance(this.profile.myAddress(), this.getAddressOf(this.contractName));

    if (currentAllowance.lt(amountInPayTokenWei)) {
      const txApprove = await this.contracts[this.payTokenContractName].approve(
        this.getAddressOf(this.contractName),
        this.MAX_UINT256
      );
      await txApprove.wait(this.profile.networkInfo.confirmationsAmount);
    }
    return await this.contracts[this.contractName].mintWithPayTokenAmount(
      amountInPayTokenWei
    );
  }

  async mintBuyTokenUsingBuyToken(amountInBuyToken) {
    const amountInBuyTokenWei = ethers.utils.parseEther(amountInBuyToken);
    const amountOfBuyTokenWithFee = amountInBuyTokenWei.add(
      await this.getFeeInBuyTokenOfAmountInWei(amountInBuyTokenWei)
    );

    const amountOfPayTokenWithFee = await this.contracts[
      this.contractName
    ].calculatePayTokenAmountOnMint(amountOfBuyTokenWithFee);

    const txApprove = await this.contracts[this.payTokenContractName].approve(
      this.getAddressOf(this.contractName),
      amountOfPayTokenWithFee
    );
    await txApprove.wait(this.profile.networkInfo.confirmationsAmount);
    return await this.contracts[this.contractName].mintWithBuyTokenAmount(
      amountOfBuyTokenWithFee
    );
  }

  async redeemBuyToken(amountInBuyToken) {
    return await this.contracts[this.contractName].redeem(
      ethers.utils.parseEther(amountInBuyToken)
    );
  }

  async balanceOf(address) {
    return await this.contracts[this.contractName].balanceOf(address);
  }

  async totalSupply() {
    return await this.contracts[this.contractName].totalSupply();
  }
}
