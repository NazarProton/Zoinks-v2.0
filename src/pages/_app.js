import React from 'react';
import withZoinksPeriphery from '../zoinksPeriphery/withZoinksPeriphery';
import { ZoinksContext } from '../zoinksPeriphery/ZoinksContext';
import { ToastContainer, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../copmonents/infoComponents/loadersForButton/Loader';
import '../styles/globals.scss';
import '../styles/loader.scss';

class ZoinksApp extends React.Component {
  static contextType = ZoinksContext;

  constructor(props) {
    super(props);
    this.state = {
      isProviderInitialized: false,
      isConnected: false,
    };
  }

  updateData(timer) {
    this.context.dataDomains.connectivity.update();
    setTimeout(() => {
      if (
        this.context.dataDomains.connectivity.updateableIsConnected &&
        (window.ethereum?.networkVersion === '56' ||
          window.ethereum?.networkVersion === '31337')
      ) {
        this.context.dataDomains.balances.update();
        this.context.dataDomains.earnedInfo.update();
        this.context.dataDomains.prices.update();
      }
    }, timer);
  }

  prepareContracts() {
    this.context.profile.initializeProvider().then(() => {
      this.setState({
        isProviderInitialized: true,
      });
      if (
        window.ethereum?.networkVersion === '56' ||
        window.ethereum?.networkVersion === '31337'
      ) {
        this.context.dataDomains.connectivity.refreshIsConnected();
        try {
          this.context.cao.lunchBox.prepare();
          this.context.cao.pancakeSwapRouter.prepare();
          this.context.cao.biSwapRouter.prepare();
          this.context.cao.apeSwapRouter.prepare();
          this.context.cao.snacksPool.prepare();
          this.context.cao.pancakeSwapPool.prepare();
          this.context.cao.apeSwapPool.prepare();
          this.context.cao.biSwapPool.prepare();
          this.context.cao.snacks.prepare();
          this.context.cao.btcSnacks.prepare();
          this.context.cao.ethSnacks.prepare();
          this.context.cao.zoinks.prepare();
          this.context.cao.pulse.prepare();
          this.context.cao.tokens.prepare();
        } catch (e) {
          console.error(e);
        }
      } else {
        this.context.dataDomains.connectivity.refreshIsConnected(false);
      }
    });
  }

  componentDidMount() {
    this.prepareContracts();
    this.context.profile.onChainChanged(() => {
      this.prepareContracts();
      this.updateData(2000);
    });
    this.context.profile.onConnected(() => {
      this.prepareContracts();
      this.updateData(1000);
    });
  }

  render() {
    const Component = this.props.Component;
    const pageProps = this.props.pageProps;
    if (!this.state.isProviderInitialized) {
      return <Loader text={'Provider is initializing...'} />;
    }
    return (
      <>
        <Component {...pageProps} />
        <ToastContainer
          hideProgressBar
          autoClose={3000}
          transition={Zoom}
          closeButton={false}
          theme="dark"
        />
      </>
    );
  }
}

export default withZoinksPeriphery(ZoinksApp);
