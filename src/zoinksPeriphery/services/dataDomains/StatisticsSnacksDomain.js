import { constants } from 'ethers';
import DataDomain from './DataDomain';
import axios from 'axios';

export default class StatisticsSnacksDomain extends DataDomain {
  // the comments below are the keys from JSON which
  // is returned from statistics API

  // "btcSnacksCurrentRate"
  updateableBtcSnacksCurrentRate = 0;

  // "btcSnacksHoldingApr"
  updateableBtcSnacksHoldingApr = 0;

  // "btcSnacksTotalSupply"
  updateableBtcSnacksTotalSupply = 0;

  // "ethSnacksCurrentRate"
  updateableEthSnacksCurrentRate = 0;

  // "ethSnacksHoldingApr"
  updateableEthSnacksHoldingApr = 0;

  // "ethSnacksTotalSupply"
  updateableEthSnacksTotalSupply = 0;

  // "holdingApr"
  updateableHoldingApr = 0;

  // "lunchBoxApr"
  updateableLunchBoxApr = 0;

  // "lunchBoxTvl"
  updateableLunchBoxTvl = 0;

  // "snacksCurrentRate"
  updateableSnacksCurrentRate = 0;

  // "snacksHoldingApr"
  updateableSnacksHoldingApr = 0;

  // "snacksTotalSupply"
  updateableSnacksTotalSupply = 0;

  // "stakingApr"
  updateableStakingApr = 0;

  // "stakingTvl"
  updateableStakingTvl = 0;

  //'LastDepositTime'
  updateableLastDepositTime = constants.Zero;

  //'LastDepositTimeLunchBox'
  updateableLastDepositTimeLunchBox = constants.Zero;

  constructor(zoinksPeripheryHoc, networkInfo, caoSnackPool) {
    super(zoinksPeripheryHoc, networkInfo);
    this.caoSnackPool = caoSnackPool;
    super.populateSetters();
  }

  refreshSnacksStatistics() {
    axios
      .get(this.networkInfo.zoinksSnacksStatisticsApiUrl)
      .then(({ data }) => {
        this._updateDataDomain(() => {
          return {
            statisticsSnacks: this._updateableBtcSnacksCurrentRate(
              data.btcSnacksCurrentRate
            )
              ._updateableBtcSnacksHoldingApr(data.btcSnacksHoldingApr)
              ._updateableBtcSnacksTotalSupply(data.btcSnacksTotalSupply)
              ._updateableEthSnacksCurrentRate(data.ethSnacksCurrentRate)
              ._updateableEthSnacksHoldingApr(data.ethSnacksHoldingApr)
              ._updateableEthSnacksTotalSupply(data.ethSnacksTotalSupply)
              ._updateableHoldingApr(data.holdingApr)
              ._updateableLunchBoxApr(data.lunchBoxApr)
              ._updateableLunchBoxTvl(data.lunchBoxTvl)
              ._updateableSnacksCurrentRate(data.snacksCurrentRate)
              ._updateableSnacksHoldingApr(data.snacksHoldingApr)
              ._updateableSnacksTotalSupply(data.snacksTotalSupply)
              ._updateableStakingApr(data.stakingApr)
              ._updateableStakingTvl(data.stakingTvl),
          };
        });
      })
      .catch(console.error);
  }
  refreshLastDepositTimeSnacksPool() {
    if (
      (window.ethereum.networkVersion === '56' ||
        window.ethereum.networkVersion === '31337') &&
      window.ethereum.selectedAddress
    ) {
      this.caoSnackPool
        .getLastDepositTime()
        .then((lastDepositTime) => {
          this._updateDataDomain(() => {
            return {
              statisticsSnacks:
                this._updateableLastDepositTime(lastDepositTime),
            };
          });
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }
  refreshLastDepositTimeLanchbox() {
    if (
      (window.ethereum.networkVersion === '56' ||
        window.ethereum.networkVersion === '31337') &&
      window.ethereum.selectedAddress
    ) {
      this.caoSnackPool
        .getLastActivationTimePerUser()
        .then((lastDepositTime) => {
          this._updateDataDomain(() => {
            return {
              statisticsSnacks:
                this._updateableLastDepositTimeLunchBox(lastDepositTime),
            };
          });
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }
}
