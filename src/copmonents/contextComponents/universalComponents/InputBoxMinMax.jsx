import React from 'react';
import { BigNumber, constants, utils } from 'ethers';

class InputBoxMinMax extends React.Component {
  constructor(props) {
    super(props);
    this.inputBox = React.createRef();
    this.state = {
      min: props.min,
      max: props.max,
      value: props.value,
      style: props.style,
      isVisible: props.isVisible,
      classSuffix: props.classSuffix,
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (
      state.max?.toString() !== props.max?.toString() ||
      state.min?.toString() !== props.min?.toString() ||
      state.style?.toString() !== props.style?.toString() ||
      state.isVisible !== props.isVisible ||
      (state.classSuffix !== undefined &&
        state.classSuffix.toString() !== props.classSuffix.toString())
    ) {
      console.debug('InputBoxMinMax.getDerivedStateFromProps', props);
      return {
        max: props.max,
        min: props.min,
        style: props.style,
        isVisible: props.isVisible,
      };
    }
    return null;
  }

  handleChange = (event) => {
    let valueBN;
    try {
      valueBN = utils.parseEther(event.target.value);
    } catch (err) {
      valueBN = constants.Zero;
    }
    let min;
    let max;
    if (this.state.min === undefined) {
      min = constants.One;
    } else {
      min = BigNumber.from(this.state.min);
    }
    if (this.state.max === undefined) {
      max = BigNumber.MAX_SAFE;
    } else {
      max = BigNumber.from(this.state.max);
    }
    if (this.props.onValueChanged) {
      this.props.onValueChanged(valueBN);
    }
    const newStateValid = valueBN.gte(min) && valueBN.lte(max);
    if (this.props.onValidChanged) {
      this.props.onValidChanged(valueBN, newStateValid);
    }
    this.setState({
      value: event.target.value,
    });
  };

  clearValue() {
    if (this.inputBox.current) {
      this.inputBox.current.value = null;
    }
    if (this.props.onValueChanged) {
      this.props.onValueChanged(constants.Zero);
    }
    if (this.props.onValidChanged) {
      this.props.onValidChanged(constants.Zero, false);
    }
  }

  componentDidMount() {
    document.addEventListener('wheel', () => {
      if (document.activeElement.type === 'number') {
        document.activeElement.blur();
      }
    });
  }

  render() {
    let useClass;
    switch (this.state.style) {
      case 1:
        useClass =
          'bg-InheritForInput w-1/2 text-white opacity-100 font-play font-bold text-[20px] leading-[24px]';
        break;
      default:
        useClass = '';
        break;
    }

    if (
      this.state.classSuffix !== undefined &&
      this.state.classSuffix.length > 0
    ) {
      useClass = `${useClass}${this.state.classSuffix}`;
    }
    return (
      <input
        disabled={!this.state.isVisible}
        ref={this.inputBox}
        name={this.props.name}
        placeholder="0"
        className={useClass}
        type="number"
        onChange={this.handleChange}
      />
    );
  }
}

export default InputBoxMinMax;
