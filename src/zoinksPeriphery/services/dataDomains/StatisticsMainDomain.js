import DataDomain from "./DataDomain";
import axios from "axios";

export default class StatisticsMainDomain extends DataDomain {

    // the comments below are the keys from JSON which 
    // is returned from statistics API

    // "btcSnacksCurrentRate"
    updateableBtcSnacksCurrentRate = 0;

    // "ethSnacksCurrentRate"
    updateableEthSnacksCurrentRate = 0;

    // "snacksCurrentRate"
    updateableSnacksCurrentRate = 0;

    //"btcSnacksPrice"
    updateableBtcSnacksPrice = 0;

    //"ethSnacksPrice"
    updateableEthSnacksPrice = 0;

    //"snacksPrice"
    updateableSnacksPrice = 0;

    //lpi
    updateableLpi = 0;

    //pvl
    updateablePvl = 0;

    //tvl
    updateableTvl = 0;

    constructor(zoinksPeripheryHoc, networkInfo) {
        super(zoinksPeripheryHoc, networkInfo);
        super.populateSetters();
    }

    refreshMainStatistics() {
        axios.get(this.networkInfo.zoinksMainStatisticsApiUrl)
            .then(({ data }) => {
                this._updateDataDomain(() => {
                    return {
                        statisticsMain: this
                            ._updateableBtcSnacksCurrentRate(data.btcSnacksCurrentRate)
                            ._updateableEthSnacksCurrentRate(data.ethSnacksCurrentRate)
                            ._updateableSnacksCurrentRate(data.snacksCurrentRate)
                            ._updateableBtcSnacksPrice(data.btcSnacksPrice)
                            ._updateableEthSnacksPrice(data.ethSnacksPrice)
                            ._updateableSnacksPrice(data.snacksPrice)
                            ._updateableLpi(data.lpi)
                            ._updateablePvl(data.pvl)
                            ._updateableTvl(data.tvl)
                    };
                });
            })
            .catch(console.error);
    }

}