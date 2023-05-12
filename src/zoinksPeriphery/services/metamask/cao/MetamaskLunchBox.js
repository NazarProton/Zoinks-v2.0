import CAO from './CAO';

export default class MetamaskLunchBox extends CAO {
  prepare() {
    this.prepareContract('LunchBox');
  }

  async getMyEarnings() {
    return await this.contracts.LunchBox.earned(this.profile.myAddress());
  }
}
