import detectEthereumProvider from '@metamask/detect-provider';
import { ethers } from 'ethers';

export default class MetamaskProfile {
  queuedCallbacks = [];

  constructor(networkInfo, isDevBuild, nodeUrl) {
    this.isDevBuild = isDevBuild;
    this.nodeUrl = nodeUrl;
    this.networkInfo = networkInfo;
  }

  _updateCallbacksOnMetamaskProvider() {
    if (this.metamaskProvider !== undefined) {
      while (this.queuedCallbacks.length > 0) {
        const nameAndCallback = this.queuedCallbacks.pop();
        this.metamaskProvider.on(nameAndCallback[0], nameAndCallback[1]);
      }
    }
  }

  async initializeProvider() {
    this.metamaskProvider = await detectEthereumProvider();
    if (
      typeof window.ethereum !== 'undefined' &&
      window.ethereum.isMetaMask &&
      !window.ethereum.isBraveWallet &&
      this.metamaskProvider !== null
    ) {
      this.provider = new ethers.providers.Web3Provider(this.metamaskProvider);
      const accounts = await this.metamaskProvider.request({
        method: 'eth_accounts',
      });
      this.currentSigner = this.provider.getSigner();
      this.isConnected = accounts.length > 0;
      this._updateCallbacksOnMetamaskProvider();
    } else {
      if (this.isDevBuild) {
        this.nodeUrl = this.networkInfo.devNetUrl;
      }
      this.provider = new ethers.providers.JsonRpcProvider(
        ethers.getDefaultProvider(this.nodeUrl)
      );
      this.currentSigner = this.provider.getSigner();
      this.isConnected = false;
    }
  }

  myAddress() {
    if (this.metamaskProvider !== undefined && this.metamaskProvider !== null) {
      return this.metamaskProvider.selectedAddress;
    } else {
      return this.networkInfo.defaultAddress;
    }
  }

  chainId() {
    if (this.metamaskProvider !== undefined && this.metamaskProvider !== null) {
      return this.metamaskProvider.networkVersion;
    } else {
      return this.networkInfo.defaultChainId;
    }
  }

  async connect() {
    const accounts = await this.metamaskProvider.request({
      method: 'eth_requestAccounts',
    });
    this.isConnected = accounts.length > 0;
    this.currentSigner = this.provider.getSigner();
  }

  isReadyToRequestPersonalizedData() {
    return (
      this.metamaskProvider !== undefined &&
      this.metamaskProvider !== null &&
      this.myAddress() !== this.networkInfo.defaultAddress
    );
  }

  onConnected(callback) {
    const decorator = (accounts) => {
      this.isConnected = accounts.length > 0;
      callback(this.isConnected);
    };
    if (this.metamaskProvider === undefined || this.metamaskProvider === null) {
      this.queuedCallbacks.push(['accountsChanged', decorator]);
    } else {
      this.metamaskProvider.on('accountsChanged', decorator);
    }
  }

  onAccountsChanged(callback) {
    if (this.metamaskProvider === undefined || this.metamaskProvider === null) {
      this.queuedCallbacks.push(['accountsChanged', callback]);
    } else {
      this.metamaskProvider.on('accountsChanged', callback);
    }
  }

  // callback is called with argument: chainId (int)
  onChainChanged(callback) {
    if (this.metamaskProvider === undefined || this.metamaskProvider === null) {
      this.queuedCallbacks.push(['chainChanged', callback]);
    } else {
      this.metamaskProvider.on('chainChanged', callback);
    }
  }

  // callback is called with argument: connectInfo (ConnectInfo)
  onConnectToNetwork(callback) {
    if (this.metamaskProvider === undefined || this.metamaskProvider === null) {
      this.queuedCallbacks.push(['connect', callback]);
    } else {
      this.metamaskProvider.on('connect', callback);
    }
  }

  // callback is called with argument: error (ProviderRpcError)
  onDisconnectFromNetwork(callback) {
    if (this.metamaskProvider === undefined || this.metamaskProvider === null) {
      this.queuedCallbacks.push(['disconnect', callback]);
    } else {
      this.metamaskProvider.on('disconnect', callback);
    }
  }

  // callback is called with argument: error (ProviderMessage)
  onMessage(callback) {
    if (this.metamaskProvider === undefined || this.metamaskProvider === null) {
      this.queuedCallbacks.push(['message', callback]);
    } else {
      this.metamaskProvider.on('message', callback);
    }
  }
}
