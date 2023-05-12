import CAO from './CAO';

export default class MetamaskZoinks extends CAO {

  constructor(contractsInfo, defaultAbis, profile, networkInfo) {
    super(contractsInfo, defaultAbis, profile);
    this.networkInfo = networkInfo;
  }

  prepare() {
    this.prepareContract('Zoinks');
    this.prepareContract('BUSD');
  }

  async mint(amountInWei) {
    console.debug('Amount:', amountInWei.toString());
    const currentAllowance = await this.contracts.BUSD.allowance(
      this.profile.myAddress(),
      this.getAddressOf('Zoinks'),
    );
    if (currentAllowance.lt(amountInWei)) {
      const txApprove = await this.contracts.BUSD.approve(
        this.getAddressOf('Zoinks'),
        this.MAX_UINT256,
      );
      await txApprove.wait(this.networkInfo.confirmationsAmount);
    }
    return await this.contracts.Zoinks.mint(amountInWei);
  }

  async myBalanceOfZoinks() {
    return await this.contracts.Zoinks.balanceOf(this.profile.myAddress());
  }

  async balanceOf(address) {
    return await this.contracts.Zoinks.balanceOf(address);
  }
}