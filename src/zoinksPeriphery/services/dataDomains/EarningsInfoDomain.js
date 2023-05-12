import { constants } from 'ethers';
import DataDomain from './DataDomain';

export default class EarningsInfoDomain extends DataDomain {
  updateableBalanceOfStakedSnacks = constants.Zero;
  updateableBalanceOfEarnedFromLunchBox = constants.Zero;
  updateableBalancesOfEarnedFromStakingSnacks = [
    constants.Zero,
    constants.Zero,
    constants.Zero,
  ];
  updateableMyLunchBoxStatus = false;
  updateableDepositBalancePancakeSwap = constants.Zero;
  updateableDepositBalanceBiSwap = constants.Zero;
  updateableDepositBalanceApeSwap = constants.Zero;
  updateableEarnedPancakeSwap = [
    constants.Zero,
    constants.Zero,
    constants.Zero,
    constants.Zero,
  ];
  updateableEarnedBiSwap = constants.Zero;
  updateableEarnedApeSwap = constants.Zero;

  constructor(
    zoinksPeripheryHoc,
    networkInfo,
    caoSnacksPool,
    caoLunchBox,
    caoZoinks,
    caoPancakeSwapPool,
    caoBiSwapPool,
    caoApeSwapPool
  ) {
    super(zoinksPeripheryHoc, networkInfo);
    this.caoSnacksPool = caoSnacksPool;
    this.caoLunchBox = caoLunchBox;
    this.caoZoinks = caoZoinks;
    this.caoPancakeSwapPool = caoPancakeSwapPool;
    this.caoBiSwapPool = caoBiSwapPool;
    this.caoApeSwapPool = caoApeSwapPool;
    super.populateSetters();
  }

  refreshBalanceOfEarnedFromLunchbox() {
    this.caoLunchBox
      .getMyEarnings()
      .then((myEarnings) => {
        this._updateDataDomain(() => {
          return {
            earnedInfo: this._updateableBalanceOfEarnedFromLunchBox(myEarnings),
          };
        });
      })
      .catch(console.error);
  }

  refreshBalanceOfStakedSnacks() {
    this.caoSnacksPool
      .myDepositBalance()
      .then((myDepositBalance) => {
        this._updateDataDomain(() => {
          return {
            earnedInfo: this._updateableBalanceOfStakedSnacks(myDepositBalance),
          };
        });
      })
      .catch(console.error);
  }

  refreshBalancesOfEarnedFromStakingSnacks() {
    this.caoSnacksPool
      .earnedAllTokensByMe()
      .then((earnedAllTokensByMe) => {
        this._updateDataDomain(() => {
          return {
            earnedInfo:
              this._updateableBalancesOfEarnedFromStakingSnacks(
                earnedAllTokensByMe
              ),
          };
        });
      })
      .catch(console.error);
  }
  refreshMyLunchBoxStatus() {
    this.caoSnacksPool
      .amILunchBoxParticipant()
      .then((isLunchBoxActive) => {
        this._updateDataDomain(() => {
          return {
            earnedInfo: this._updateableMyLunchBoxStatus(isLunchBoxActive),
          };
        });
      })
      .catch(console.error);
  }

  refreshMyPancakeDepositeBalance() {
    this.caoPancakeSwapPool
      .myDepositBalance()
      .then((depositBalancePancakeSwap) => {
        this._updateDataDomain(() => {
          return {
            earnedInfo: this._updateableDepositBalancePancakeSwap(
              depositBalancePancakeSwap
            ),
          };
        });
      })
      .catch(console.error);
  }

  refreshMyBiSwapDepositeBalance() {
    this.caoBiSwapPool
      .myDepositBalance()
      .then((depositBalanceBiSwap) => {
        this._updateDataDomain(() => {
          return {
            earnedInfo:
              this._updateableDepositBalanceBiSwap(depositBalanceBiSwap),
          };
        });
      })
      .catch(console.error);
  }
  refreshMyApeSwapDepositeBalance() {
    this.caoApeSwapPool
      .myDepositBalance()
      .then((depositBalanceApeSwap) => {
        this._updateDataDomain(() => {
          return {
            earnedInfo: this._updateableDepositBalanceApeSwap(
              depositBalanceApeSwap
            ),
          };
        });
      })
      .catch(console.error);
  }
  refreshMyPancakeEarnedInStaking() {
    this.caoPancakeSwapPool
      .earnedAllTokensByMe()
      .then((earnedPancakeSwap) => {
        this._updateDataDomain(() => {
          return {
            earnedInfo: this._updateableEarnedPancakeSwap(earnedPancakeSwap),
          };
        });
      })
      .catch(console.error);
  }

  refreshMyBiSwapEarnedInStaking() {
    this.caoBiSwapPool
      .earned()
      .then((earnedBiSwap) => {
        this._updateDataDomain(() => {
          return {
            earnedInfo: this._updateableEarnedBiSwap(earnedBiSwap),
          };
        });
      })
      .catch(console.error);
  }
  refreshMyApeSwapEarnedInStaking() {
    this.caoApeSwapPool
      .earned()
      .then((earnedApeSwap) => {
        this._updateDataDomain(() => {
          return {
            earnedInfo: this._updateableEarnedApeSwap(earnedApeSwap),
          };
        });
      })
      .catch(console.error);
  }
}
