import DataDomain from "./DataDomain";

export default class ConnectivityDomain extends DataDomain {
    updateableIsConnected = false;
    updateableMyAddress = '';

    constructor(zoinksPeripheryHoc, networkInfo, profile) {
        super(zoinksPeripheryHoc, networkInfo);
        this.profile = profile;
        super.populateSetters();
    }

    refreshIsConnected(isConnected) {
        this._updateDataDomain(() => {
            return {
                connectivity: this._updateableIsConnected(typeof isConnected === "boolean" ? isConnected : this.profile.isConnected)
            };
        });
    }

    refreshMyAddress() {
        this._updateDataDomain(() => {
            return {
                connectivity: this._updateableMyAddress(this.profile.myAddress())
            };
        });
    }
}