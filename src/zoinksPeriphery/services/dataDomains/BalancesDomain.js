import { constants } from "ethers";
import DataDomain from "./DataDomain";

export default class BalancesDomain extends DataDomain {
    updateableBalanceOfZoinks = constants.Zero;
    updateableBalanceOfSnacks = constants.Zero;
    updateableBalanceOfBtcSnacks = constants.Zero;
    updateableBalanceOfEthSnacks = constants.Zero;
    updateableBalanceOfPancakeLp = constants.Zero;
    updateableBalanceOfApeLp = constants.Zero;
    updateableBalanceOfBiLp = constants.Zero;
    updateableBalanceOfBtc = constants.Zero;
    updateableBalanceOfEth = constants.Zero;
    updateableBalanceOfBusd = constants.Zero;

    constructor(zoinksPeripheryHoc, networkInfo, caoTokens, caoZoinks, caoBtcSnacks, caoEthSnacks, caoSnacks) {
        super(zoinksPeripheryHoc, networkInfo);
        this.caoTokens = caoTokens;
        this.caoZoinks = caoZoinks;
        this.caoBtcSnacks = caoBtcSnacks;
        this.caoEthSnacks = caoEthSnacks;
        this.caoSnacks = caoSnacks;
        super.populateSetters();
    }

    refreshBalanceOfZoinks() {
        this.caoZoinks.myBalanceOfZoinks()
            .then(myZoinksBalance => {
                this._updateDataDomain(() => {
                    return {
                        balances: this._updateableBalanceOfZoinks(myZoinksBalance)
                    };
                });
            })
            .catch(console.error);
    }

    refreshBalanceOfSnacks() {
        this.caoSnacks.myBalanceOfBuyToken()
            .then(myBalanceOfSnacks => {
                this._updateDataDomain(() => {
                    return {
                        balances: this._updateableBalanceOfSnacks(myBalanceOfSnacks)
                    };
                });
            })
            .catch(console.error);
    }

    refreshBalanceOfBtcSnacks() {
        this.caoBtcSnacks.myBalanceOfBuyToken()
            .then(myBalanceOfBtcSnacks => {
                this._updateDataDomain(() => {
                    return {
                        balances: this._updateableBalanceOfBtcSnacks(myBalanceOfBtcSnacks)
                    };
                });
            })
            .catch(console.error);
    }

    refreshBalanceOfEthSnacks() {
        this.caoEthSnacks.myBalanceOfBuyToken()
            .then(myBalanceOfEthSnacks => {
                this._updateDataDomain(() => {
                    return {
                        balances: this._updateableBalanceOfEthSnacks(myBalanceOfEthSnacks)
                    };
                });
            })
            .catch(console.error);
    }

    refreshBalanceOfApeLp() {
        this.caoTokens.myBalanceOfApeLP()
            .then(myBalanceOfApeLP => {
                this._updateDataDomain(() => {
                    return {
                        balances: this._updateableBalanceOfApeLp(myBalanceOfApeLP)
                    };
                });
            })
            .catch(console.error);
    }

    refreshBalanceOfBiLp() {
        this.caoTokens.myBalanceOfBiLP()
            .then(myBalanceOfBiLP => {
                this._updateDataDomain(() => {
                    return {
                        balances: this._updateableBalanceOfBiLp(myBalanceOfBiLP)
                    };
                });
            })
            .catch(console.error);
    }

    refreshBalanceOfPancakeLp() {
        this.caoTokens.myBalanceOfPancakeLP()
            .then(myBalanceOfPancakeLP => {
                this._updateDataDomain(() => {
                    return {
                        balances: this._updateableBalanceOfPancakeLp(myBalanceOfPancakeLP)
                    };
                });
            })
            .catch(console.error);
    }

    refreshBalanceOfEth() {
        this.caoTokens.myBalanceOfEth()
            .then(myBalanceOfEth => {
                this._updateDataDomain(() => {
                    return {
                        balances: this._updateableBalanceOfEth(myBalanceOfEth)
                    };
                });
            })
            .catch(console.error);
    }

    refreshBalanceOfBtc() {
        this.caoTokens.myBalanceOfBtc()
            .then(myBalanceOfBtc => {
                this._updateDataDomain(() => {
                    return {
                        balances: this._updateableBalanceOfBtc(myBalanceOfBtc)
                    };
                });
            })
            .catch(console.error);
    }

    refreshBalanceOfBusd() {
        this.caoTokens.myBalanceOfBusd()
            .then(myBalanceOfBusd => {
                this._updateDataDomain(() => {
                    return {
                        balances: this._updateableBalanceOfBusd(myBalanceOfBusd)
                    };
                });
            })
            .catch(console.error);
    }
}