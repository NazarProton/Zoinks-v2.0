import React from 'react';
import { ZoinksContext } from './ZoinksContext';
import config from './configuration';
import Loader from '../copmonents/infoComponents/loadersForButton/Loader';

function withZoinksPeriphery(WrappedComponent) {
  return class Periphery extends React.Component {
    static contextType = ZoinksContext;

    constructor(props) {
      super(props);
      this.state = {
        isConfigured: false,
      };
    }

    componentDidMount() {
      config(
        this,
        process.env.NEXT_PUBLIC_IS_DEV_BUILD,
        process.env.NEXT_PUBLIC_MEGANODE_URL_KEY
      ).then((data) => {
        this.setState({
          ...data,
          isConfigured: true,
        });
      });
    }

    render() {
      return (
        <ZoinksContext.Provider value={this.state}>
          {this.state.isConfigured ? (
            <WrappedComponent {...this.props} />
          ) : (
            <Loader text={'Configuring...'} />
          )}
        </ZoinksContext.Provider>
      );
    }
  };
}
export default withZoinksPeriphery;
