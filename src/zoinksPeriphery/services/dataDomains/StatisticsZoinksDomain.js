import { constants } from 'ethers';
import DataDomain from './DataDomain';
import axios from 'axios';

export default class StatisticsZoinksDomain extends DataDomain {
  // the comments below are the keys from JSON which
  // is returned from statistics API

  //updateabLastTwap
  updateableLastTwap = 0;

  //updateableTotalSupply
  updateableTotalSupply = 0;

  //updateablePancakeSwapTvl
  updateablePancakeSwapTvl = 0;

  //updateableApeSwapTvl
  updateableApeSwapTvl = 0;

  //updateableBiSwapTvl
  updateableBiSwapTvl = 0;

  //updateablePancakeApr
  updateablePancakeApr = 0;

  //updateableBiSwapApr
  updateableBiSwapApr = 0;

  //updateableApeSwapApr
  updateableApeSwapApr = 0;

  //updateableFarmingApr
  updateableFarmingApr = 0;

  //updateableLastDepositTime
  updateableLastDepositTime = constants.Zero;

  constructor(zoinksPeripheryHoc, networkInfo, caoPancakeSwapPool) {
    super(zoinksPeripheryHoc, networkInfo);
    this.caoPancakeSwapPool = caoPancakeSwapPool;
    super.populateSetters();
  }

  refreshZoinksStatistics() {
    axios
      .get(this.networkInfo.zoinksZoinksStatisticsApiUrl)
      .then(({ data }) => {
        this._updateDataDomain(() => {
          return {
            statisticsZoinks: this._updateableLastTwap(data.lastTwap)
              ._updateableTotalSupply(data.totalSupply)
              ._updateablePancakeSwapTvl(data.pancakeSwapTvl)
              ._updateableApeSwapTvl(data.apeSwapTvl)
              ._updateableBiSwapTvl(data.biSwapTvl)
              ._updateablePancakeApr(data.pancakeApr)
              ._updateableBiSwapApr(data.biSwapApr)
              ._updateableApeSwapApr(data.apeSwapApr)
              ._updateableFarmingApr(data.farmingApr),
          };
        });
      })
      .catch(console.error);
  }
  refreshLastDepositTime() {
    if (
      (window.ethereum.networkVersion === '56' ||
        window.ethereum.networkVersion === '31337') &&
      window.ethereum.selectedAddress
    ) {
      this.caoPancakeSwapPool
        .getLastDepositTime()
        .then((lastDepositTime) => {
          this._updateDataDomain(() => {
            return {
              statisticsZoinks:
                this._updateableLastDepositTime(lastDepositTime),
            };
          });
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }
}
