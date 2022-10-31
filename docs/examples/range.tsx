/* eslint react/no-multi-comp: 0, no-console: 0 */
import React from 'react';
import { Range } from '@tordek/rc-slider';
import '../../assets/index.less';

const style = { width: 400, margin: 50 };

function log(value: any) {
  console.log(value); //eslint-disable-line
}

class CustomizedRange extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      lowerBound: 20,
      upperBound: 40,
      value: [20, 40],
    };
  }

  onLowerBoundChange = (e: any) => {
    this.setState({ lowerBound: +e.target.value });
  };

  onUpperBoundChange = (e: any) => {
    this.setState({ upperBound: +e.target.value });
  };

  onSliderChange = (value: any) => {
    log(value);
    this.setState({
      value,
    });
  };

  handleApply = () => {
    const { lowerBound, upperBound } = this.state;
    this.setState({ value: [lowerBound, upperBound] });
  };

  render() {
    return (
      <div>
        <label>LowerBound: </label>
        <input type="number" value={this.state.lowerBound} onChange={this.onLowerBoundChange} />
        <br />
        <label>UpperBound: </label>
        <input type="number" value={this.state.upperBound} onChange={this.onUpperBoundChange} />
        <br />
        <button type="button" onClick={this.handleApply}>
          Apply
        </button>
        <br />
        <br />
        <Range allowCross={false} value={this.state.value} onChange={this.onSliderChange} />
      </div>
    );
  }
}

class DynamicBounds extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      min: 0,
      max: 100,
    };
  }

  onSliderChange = (value: any) => {
    log(value);
  };

  onMinChange = (e: any) => {
    this.setState({
      min: +e.target.value || 0,
    });
  };

  onMaxChange = (e: any) => {
    this.setState({
      max: +e.target.value || 100,
    });
  };

  render() {
    return (
      <div>
        <label>Min: </label>
        <input type="number" value={this.state.min} onChange={this.onMinChange} />
        <br />
        <label>Max: </label>
        <input type="number" value={this.state.max} onChange={this.onMaxChange} />
        <br />
        <br />
        <Range
          defaultValue={[20, 50]}
          min={this.state.min}
          max={this.state.max}
          onChange={this.onSliderChange}
        />
      </div>
    );
  }
}

class ControlledRange extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      value: [20, 40, 60, 80],
    };
  }

  handleChange = (value: any) => {
    this.setState({
      value,
    });
  };

  render() {
    return <Range value={this.state.value} onChange={this.handleChange} />;
  }
}

class ControlledRangeDisableAcross extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      value: [20, 40, 60, 80],
    };
  }

  handleChange = (value: any) => {
    this.setState({
      value,
    });
  };

  render() {
    return (
      <Range
        value={this.state.value}
        onChange={this.handleChange}
        allowCross={false}
        {...this.props}
      />
    );
  }
}

// https://github.com/react-component/slider/issues/226
class PureRenderRange extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      foo: false,
    };
  }

  handleChange = (value: any) => {
    console.log(value);
    this.setState(({ foo }: { foo: boolean }) => ({ foo: !foo }));
  };

  render() {
    return (
      <Range defaultValue={[20, 40, 60, 80]} onChange={this.handleChange} allowCross={false} />
    );
  }
}

export default () => (
  <div>
    <div style={style}>
      <p>Basic Range, `allowCross=false`</p>
      <Range allowCross={false} defaultValue={[0, 20]} onChange={log} />
    </div>
    <div style={style}>
      <p>Basic reverse Range, `allowCross=false`</p>
      <Range allowCross={false} defaultValue={[0, 20]} onChange={log} reverse />
    </div>
    <div style={style}>
      <p>Basic Range, `step=20` </p>
      <Range step={20} defaultValue={[20, 20]} />
    </div>
    <div style={style}>
      <p>Basic Range, `step=20, dots` </p>
      <Range dots step={20} defaultValue={[20, 40]} />
    </div>
    <div style={style}>
      <p>Basic Range, disabled</p>
      <Range allowCross={false} defaultValue={[0, 20]} onChange={log} disabled />
    </div>
    <div style={style}>
      <p>Controlled Range</p>
      <ControlledRange />
    </div>
    <div style={style}>
      <p>Controlled Range, not allow across</p>
      <ControlledRangeDisableAcross />
    </div>
    <div style={style}>
      <p>Controlled Range, not allow across, pushable=5</p>
      <ControlledRangeDisableAcross pushable={5} />
    </div>
    <div style={style}>
      <p>Multi Range, count=3 and pushable=true</p>
      <Range count={3} defaultValue={[20, 40, 60, 80]} pushable />
    </div>
    <div style={style}>
      <p>Multi Range with custom track and handle style and pushable</p>
      <Range
        count={3}
        defaultValue={[20, 40, 60, 80]}
        pushable
        trackClassName="rc-slider-track docs-slider-track"
        handleClassName="rc-slider-handle docs-slider-handle"
        railClassName="rc-slider-rail docs-slider-rail"
      />
    </div>
    <div style={style}>
      <p>Customized Range</p>
      <CustomizedRange />
    </div>
    <div style={style}>
      <p>Range with dynamic `max` `min`</p>
      <DynamicBounds />
    </div>
    <div style={style}>
      <p>Range as child component</p>
      <PureRenderRange />
    </div>
    <div style={style}>
      <p>draggableTrack two points</p>
      <Range allowCross={false} defaultValue={[0, 40]} draggableTrack onChange={log} />
    </div>
    <div style={style}>
      <p>draggableTrack two points(reverse)</p>
      <Range allowCross={false} reverse defaultValue={[0, 40]} draggableTrack onChange={log} />
    </div>
    <div style={style}>
      <p>draggableTrack multiple points</p>
      <Range allowCross={false} defaultValue={[0, 20, 30, 40, 50]} draggableTrack onChange={log} />
    </div>
  </div>
);
