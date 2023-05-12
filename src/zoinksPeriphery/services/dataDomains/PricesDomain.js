import { formatEther, parseEther } from 'ethers/lib/utils';
import DataDomain from './DataDomain';
import axios from 'axios';
import { constants } from 'ethers';

export default class PricesDomain extends DataDomain {
  // the comments below are the keys from JSON which
  // is returned from statistics API

  // "ZoinksPricePancake"
  updateableZoinksPricePancake = constants.Zero;

  // "BusdPricePancake"
  updateableBusdPricePancake = constants.Zero;

  // "ZoinksPriceApe"
  updateableZoinksPriceApe = constants.Zero;

  // "BusdPriceApe"
  updateableBusdPriceApe = constants.Zero;

  // "ZoinksPriceBi"
  updateableZoinksPriceBi = constants.Zero;

  // "BusdPriceBi"
  updateableBusdPriceBi = constants.Zero;

  constructor(zoinksPeripheryHoc, networkInfo, contractsInfo) {
    super(zoinksPeripheryHoc, networkInfo, contractsInfo);
    this.state = {
      contractsInfo,
      zoinksAddress:
        contractsInfo.contractsInfo.Zoinks.address[
          window.ethereum.networkVersion
        ],
      busdAddress:
        contractsInfo.contractsInfo.BUSD.address[
          window.ethereum.networkVersion
        ],
    };
    this.refreshAdress = this.refreshAdress.bind(this);
    super.populateSetters();
  }

  refreshAdress() {
    this.state = {
      contractsInfo: this.state.contractsInfo,
      zoinksAddress:
        this.state.contractsInfo.contractsInfo.Zoinks.address[
          window.ethereum.networkVersion
        ],
      busdAddress:
        this.state.contractsInfo.contractsInfo.BUSD.address[
          window.ethereum.networkVersion
        ],
    };
  }

  refreshPricesPancake() {
    this.zoinksPeripheryHoc.context.cao.pancakeSwapRouter
      .getLastReserves(this.state.zoinksAddress, this.state.busdAddress)
      .then((pairReserves) => {
        this._updateDataDomain(() => {
          return {
            prices: this._updateableZoinksPricePancake(
              parseEther(
                (
                  Number(formatEther(pairReserves[0])) /
                  Number(formatEther(pairReserves[1]))
                ).toFixed(18)
              )
            )._updateableBusdPricePancake(
              parseEther(
                (
                  Number(formatEther(pairReserves[1])) /
                  Number(formatEther(pairReserves[0]))
                ).toFixed(18)
              )
            ),
          };
        });
      });
  }
  refreshPricesApeSwap() {
    this.zoinksPeripheryHoc.context.cao.apeSwapRouter
      .getLastReserves(this.state.zoinksAddress, this.state.busdAddress)
      .then((pairReserves) => {
        this._updateDataDomain(() => {
          return {
            prices: this._updateableZoinksPriceApe(
              parseEther(
                (
                  Number(formatEther(pairReserves[0])) /
                  Number(formatEther(pairReserves[1]))
                ).toFixed(18)
              )
            )._updateableBusdPriceApe(
              parseEther(
                (
                  Number(formatEther(pairReserves[1])) /
                  Number(formatEther(pairReserves[0]))
                ).toFixed(18)
              )
            ),
          };
        });
      });
  }
  refreshPricesBiSwap() {
    this.zoinksPeripheryHoc.context.cao.biSwapRouter
      .getLastReserves(this.state.zoinksAddress, this.state.busdAddress)
      .then((pairReserves) => {
        this._updateDataDomain(() => {
          return {
            prices: this._updateableZoinksPriceBi(
              parseEther(
                (
                  Number(formatEther(pairReserves[0])) /
                  Number(formatEther(pairReserves[1]))
                ).toFixed(18)
              )
            )._updateableBusdPriceBi(
              parseEther(
                (
                  Number(formatEther(pairReserves[1])) /
                  Number(formatEther(pairReserves[0]))
                ).toFixed(18)
              )
            ),
          };
        });
      });
  }
}
