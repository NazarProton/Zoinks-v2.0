import DataDomain from './DataDomain';

export default class PendingCommissionsDomain extends DataDomain {
  updateableBalanceOfPendingSnacks = 0;
  updateableBalanceOfPendingBtcSnacks = 0;
  updateableBalanceOfPendingEthSnacks = 0;
  updateableHoldedBsnack = 0;
  updateableHoldedEtsnack = 0;

  constructor(zoinksPeripheryHoc, networkInfo, caoSnacks) {
    super(zoinksPeripheryHoc, networkInfo);
    this.caoSnacks = caoSnacks;
    super.populateSetters();
  }

  refreshPendingEthSnacks() {
    this.caoSnacks
      .getCommissionBelongingToMeInEthSnacksFor12Hours()
      .then((myPendingEthSnacks) => {
        myPendingEthSnacks =
          myPendingEthSnacks < 0.000001 ? '0.0' : myPendingEthSnacks.toFixed(6);
        this._updateDataDomain(() => {
          return {
            pendingCommissions:
              this._updateableBalanceOfPendingEthSnacks(myPendingEthSnacks),
          };
        });
      })
      .catch(console.error);
  }

  refreshPendingBtcSnacks() {
    this.caoSnacks
      .getCommissionBelongingToMeInBtcSnacksFor12Hours()
      .then((myPendingBtcSnacks) => {
        myPendingBtcSnacks =
          myPendingBtcSnacks < 0.000001 ? '0.0' : myPendingBtcSnacks.toFixed(6);
        this._updateDataDomain(() => {
          return {
            pendingCommissions:
              this._updateableBalanceOfPendingBtcSnacks(myPendingBtcSnacks),
          };
        });
      })
      .catch(console.error);
  }

  refreshPendingSnacks() {
    this.caoSnacks
      .getCommissionBelongingToMeInSnacksFor12Hours()
      .then((myPendingSnacks) => {
        myPendingSnacks =
          myPendingSnacks < 0.000001 ? '0.0' : myPendingSnacks.toFixed(6);
        this._updateDataDomain(() => {
          return {
            pendingCommissions:
              this._updateableBalanceOfPendingSnacks(myPendingSnacks),
          };
        });
      })
      .catch(console.error);
  }

  // refreshMyHoldBtcSnacks() {
  //   this.caoSnacks
  //     .getMyPendingBtcSnacks()
  //     .then((heldBtcSnacks) => {
  //       console.log(heldBtcSnacks);
  //       this._updateDataDomain(() => {
  //         return {
  //           pendingCommissions: this._updateableHoldedBsnack(
  //             heldBtcSnacks.toFixed(6)
  //           ),
  //         };
  //       });
  //     })
  //     .catch(console.error);
  // }

  // refreshMyHoldEthSnacks() {
  //   this.caoSnacks
  //     .getMyPendingEthSnacks()
  //     .then((heldEthSnacks) => {
  //       console.log(heldEthSnacks);
  //       this._updateDataDomain(() => {
  //         return {
  //           pendingCommissions: this._updateableHoldedEtsnack(
  //             heldEthSnacks.toFixed(6)
  //           ),
  //         };
  //       });
  //     })
  //     .catch(console.error);
  // }
}
