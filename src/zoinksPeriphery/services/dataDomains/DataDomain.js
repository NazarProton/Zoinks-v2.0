import { ethers } from 'ethers';

// abstract
export default class DataDomain {
  static cutFloatToSixCharsAction = (value) => {
    return Math.max(0, value.toFixed(6));
  };

  static cutBigNumberToSixCharsAction = (value) => {
    return DataDomain.cutFloatToSixCharsAction(
      Number(ethers.utils.formatEther(value))
    );
  };

  static formatBalance(balance, num) {
    let formattedBalance = ethers.utils.formatEther(balance);
    if (balance.gt(ethers.constants.Zero)) {
      let indexOfDot = formattedBalance.indexOf('.');
      formattedBalance = formattedBalance.slice(
        0,
        num ? indexOfDot + num : indexOfDot + 3
      );
      if (formattedBalance === '0.00') {
        formattedBalance = '0';
      }
    } else {
      formattedBalance = '0';
    }
    return formattedBalance;
  }

  methodIntervals = {};

  // all fields which names are starting with prefix 'updateable'
  // will have a Builder-type setter called as the field named but prefixed with '_'.
  constructor(zoinksPeripheryHoc, networkInfo) {
    this.zoinksPeripheryHoc = zoinksPeripheryHoc;
    this.networkInfo = networkInfo;
  }

  _updateDataDomain(dataDomainChangeAction) {
    this.zoinksPeripheryHoc.setState((oldState) => {
      const dataDomainNewState = dataDomainChangeAction();
      return {
        dataDomains: {
          ...Object.fromEntries(
            Object.entries(oldState.dataDomains).filter(
              ([key]) => !(key in dataDomainNewState)
            )
          ),
          ...dataDomainNewState,
        },
      };
    });
  }

  populateSetters() {
    for (const methodOrField of Object.keys(this)) {
      if (methodOrField.startsWith('updateable')) {
        this[`_${methodOrField}`] = (value) => {
          this[methodOrField] = value;
          return this;
        };
      }
    }
  }

  clearScheduleOfUpdateIfNecessary(methodName = 'update') {
    if (methodName in this.methodIntervals) {
      clearInterval(this.methodIntervals[methodName]);
    }
  }

  scheduleUpdate(
    methodName = 'update',
    intervalInMilliseconds = this.networkInfo.dataDomainUpdateInterval
  ) {
    this.clearScheduleOfUpdateIfNecessary(methodName);
    this.methodIntervals[methodName] = setInterval(
      this[methodName],
      intervalInMilliseconds
    );
  }

  update() {
    const allKeysInTheInstance = Object.getOwnPropertyNames(
      Object.getPrototypeOf(this)
    );
    allKeysInTheInstance
      .filter((methodOrField) => methodOrField.startsWith('refresh'))
      .forEach((methodOrField) => this[methodOrField]());
  }
}
