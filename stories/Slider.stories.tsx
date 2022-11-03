import React from 'react';
import { Meta, Story } from '@storybook/react';
import TooltipSlider, { handleRender } from './components/TooltipSlider';
import Slider, { SliderProps } from '../src/Slider';
import Range, { RangeProps } from '../src/Range';
import './assets/index.css';

const meta: Meta = {
  title: 'RC-Slider',
  component: Slider,
};

export default meta;

const Template: Story<SliderProps> = (args) => <Slider {...args} />;

export const Default = Template.bind({});

Default.args = {};

export const Handle = () => {
  const wrapperStyle = { width: 400, margin: 50 };

  return (
    <div>
      <div style={wrapperStyle}>
        <p>Slider with custom handle</p>
        <Slider min={0} max={20} defaultValue={3} handleRender={handleRender} />
      </div>
      <div style={wrapperStyle}>
        <p>Reversed Slider with custom handle</p>
        <Slider
          min={0}
          max={20}
          reverse
          defaultValue={3}
          handleRender={handleRender}
        />
      </div>
      <div style={wrapperStyle}>
        <p>Slider with fixed values</p>
        <Slider
          min={20}
          defaultValue={20}
          marks={{ 20: 20, 40: 40, 100: 100 }}
          step={null}
        />
      </div>
      <div style={wrapperStyle}>
        <p>Range with custom tooltip</p>
        <TooltipSlider
          tipProps={{}}
          range
          min={0}
          max={20}
          defaultValue={[3, 10]}
          tipFormatter={(value: number) => `${value}!`}
        />
      </div>
    </div>
  );
};

export const Marks = () => {
  const style = { width: 400, margin: 50 };
  const marks = {
    '-10': '-10°C',
    0: <strong>0°C</strong>,
    26: '26°C',
    37: '37°C',
    50: '50°C',
    100: (
      <strong
        style={{
          color: 'red',
        }}
      >
        100°C
      </strong>
    ),
  };

  function log(value: any) {
    console.log(value);
  }

  return (
    <div>
      <div style={style}>
        <p>Slider with marks, `step=null`</p>
        <Slider
          min={-10}
          marks={marks}
          step={null}
          onChange={log}
          defaultValue={20}
        />
      </div>

      {/* <div style={style}>
      <p>Range Slider with marks, `step=null`, pushable, draggableTrack</p>
      <Range
        min={-10}
        marks={marks}
        step={null}
        onChange={log}
        defaultValue={[-10, 0]}
        allowCross={false}
        pushable
        draggableTrack
      />
    </div> */}

      <div style={style}>
        <p>
          Slider with marks and steps - allows picking specific values that are
          multiples of `step`, or specific marked values.
        </p>
        <Slider
          dots
          min={-10}
          marks={marks}
          step={10}
          onChange={log}
          defaultValue={20}
        />
      </div>
      <div style={style}>
        <p>Reversed Slider with marks and steps</p>
        <Slider
          dots
          reverse
          min={-10}
          marks={marks}
          step={10}
          onChange={log}
          defaultValue={20}
        />
      </div>

      <div style={style}>
        <p>Slider with marks, `included=false`</p>
        <Slider min={-10} marks={marks} included={false} defaultValue={20} />
      </div>
      <div style={style}>
        <p>Slider with marks and steps, `included=false`</p>
        <Slider
          min={-10}
          marks={marks}
          step={10}
          included={false}
          defaultValue={20}
        />
      </div>

      <div style={style}>
        <p>Range with marks</p>
        <Range
          min={-10}
          marks={marks}
          onChange={log}
          defaultValue={[20, 25, 30, 40]}
        />
      </div>
      <div style={style}>
        <p>Range with marks and steps</p>
        <Range
          min={-10}
          marks={marks}
          step={10}
          onChange={log}
          defaultValue={[20, 40]}
        />
      </div>
    </div>
  );
};

export const RangeInput = () => {
  const style = { width: 400, margin: 50 };

  function log(value: any) {
    console.log(value);
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
          <input
            type="number"
            value={this.state.lowerBound}
            onChange={this.onLowerBoundChange}
          />
          <br />
          <label>UpperBound: </label>
          <input
            type="number"
            value={this.state.upperBound}
            onChange={this.onUpperBoundChange}
          />
          <br />
          <button type="button" onClick={this.handleApply}>
            Apply
          </button>
          <br />
          <br />
          <Range
            allowCross={false}
            value={this.state.value}
            onChange={this.onSliderChange}
          />
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
          <input
            type="number"
            value={this.state.min}
            onChange={this.onMinChange}
          />
          <br />
          <label>Max: </label>
          <input
            type="number"
            value={this.state.max}
            onChange={this.onMaxChange}
          />
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
        <Range
          defaultValue={[20, 40, 60, 80]}
          onChange={this.handleChange}
          allowCross={false}
        />
      );
    }
  }

  return (
    <div>
      <div style={style}>
        <p>Basic Range, `allowCross=false`</p>
        <Range allowCross={false} defaultValue={[0, 20]} onChange={log} />
      </div>
      <div style={style}>
        <p>Basic reverse Range, `allowCross=false`</p>
        <Range
          allowCross={false}
          defaultValue={[0, 20]}
          onChange={log}
          reverse
        />
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
        <Range
          allowCross={false}
          defaultValue={[0, 20]}
          onChange={log}
          disabled
        />
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
        <Range
          allowCross={false}
          defaultValue={[0, 40]}
          draggableTrack
          onChange={log}
        />
      </div>
      <div style={style}>
        <p>draggableTrack two points(reverse)</p>
        <Range
          allowCross={false}
          reverse
          defaultValue={[0, 40]}
          draggableTrack
          onChange={log}
        />
      </div>
      <div style={style}>
        <p>draggableTrack multiple points</p>
        <Range
          allowCross={false}
          defaultValue={[0, 20, 30, 40, 50]}
          draggableTrack
          onChange={log}
        />
      </div>
    </div>
  );
};

export const SliderInput = () => {
  const style = { width: 400, margin: 50 };

  function log(value: any) {
    console.log(value);
  }

  function percentFormatter(v: number) {
    return `${v}%`;
  }

  class NullableSlider extends React.Component<any, any> {
    constructor(props: any) {
      super(props);
      this.state = {
        value: null,
      };
    }

    onSliderChange = (value: any) => {
      log(value);
      this.setState({
        value,
      });
    };

    reset = () => {
      console.log('reset value');
      this.setState({ value: null });
    };

    render() {
      return (
        <div>
          <Slider value={this.state.value} onChange={this.onSliderChange} />
          <button type="button" onClick={this.reset}>
            Reset
          </button>
        </div>
      );
    }
  }

  const NullableRangeSlider = () => {
    const [value, setValue] = React.useState<null | number[]>(null);

    return (
      <div>
        <Range value={value} onChange={setValue} />
        <button type="button" onClick={() => setValue(null)}>
          Reset
        </button>
      </div>
    );
  };

  class CustomizedSlider extends React.Component<any, any> {
    constructor(props: any) {
      super(props);
      this.state = {
        value: 50,
      };
    }

    onSliderChange = (value: any) => {
      log(value);
      this.setState({
        value,
      });
    };

    render() {
      return <Slider value={this.state.value} onChange={this.onSliderChange} />;
    }
  }

  class DynamicBounds extends React.Component<any, any> {
    constructor(props: any) {
      super(props);
      this.state = {
        min: 1,
        max: 100,
        step: 10,
        value: 1,
      };
    }

    onSliderChange = (value: any) => {
      log(value);
      this.setState({ value });
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

    onStepChange = (e: any) => {
      this.setState({
        step: +e.target.value || 1,
      });
    };

    render() {
      const labelStyle = { minWidth: '60px', display: 'inline-block' };
      const inputStyle = { marginBottom: '10px' };
      return (
        <div>
          <label style={labelStyle}>Min: </label>
          <input
            type="number"
            value={this.state.min}
            onChange={this.onMinChange}
            style={inputStyle}
          />
          <br />
          <label style={labelStyle}>Max: </label>
          <input
            type="number"
            value={this.state.max}
            onChange={this.onMaxChange}
            style={inputStyle}
          />
          <br />
          <label style={labelStyle}>Step: </label>
          <input
            type="number"
            value={this.state.step}
            onChange={this.onStepChange}
            style={inputStyle}
          />
          <br />
          <br />
          <label style={labelStyle}>Value: </label>
          <span>{this.state.value}</span>
          <br />
          <br />
          <Slider
            value={this.state.value}
            min={this.state.min}
            max={this.state.max}
            step={this.state.step}
            onChange={this.onSliderChange}
          />
        </div>
      );
    }
  }

  return (
    <div>
      <div style={style}>
        <p>Basic Slider</p>
        <Slider onChange={log} />
      </div>
      <div style={style}>
        <p>Basic Slider, `startPoint=50`</p>
        <Slider onChange={log} startPoint={50} />
      </div>
      <div style={style}>
        <p>Slider reverse</p>
        <Slider onChange={log} reverse min={20} max={60} />
      </div>
      <div style={style}>
        <p>Basic Slider, `step=20`</p>
        <Slider step={20} defaultValue={50} />
      </div>
      <div style={style}>
        <p>Basic Slider, `step=20, dots`</p>
        <Slider dots step={20} defaultValue={100} />
      </div>
      <div style={style}>
        <p>
          Basic Slider, `step=20, dots, dotStyle={"{borderColor: 'orange'}"},
          activeDotStyle=
          {"{borderColor: 'yellow'}"}`
        </p>
        <Slider
          dots
          step={20}
          defaultValue={100}
          dotClassName="rc-slider-dot docs-slider-dot"
          activeDotClassName="rc-slider-dot-active docs-slider-dot-active"
        />
      </div>
      <div style={style}>
        <p>Slider with tooltip, with custom `tipFormatter`</p>
        <TooltipSlider
          tipFormatter={percentFormatter}
          tipProps={{ overlayClassName: 'foo' }}
          onChange={log}
        />
      </div>
      <div style={style}>
        <p>
          Slider with custom handle and track style.
        </p>
        <Slider
          defaultValue={30}
          railClassName="rc-slider-rail docs-slider-rail"
          trackClassName="rc-slider-track docs-slider-track"
          handleClassName="rc-slider-handle docs-handle-handle"
        />
      </div>
      <div style={style}>
        <p>
          Reversed Slider with custom handle and track style.
        </p>
        <Slider
          defaultValue={30}
          reverse
          railClassName="rc-slider-rail docs-slider-rail"
          trackClassName="rc-slider-track docs-slider-track"
          handleClassName="rc-slider-handle docs-handle-handle"
        />
      </div>
      <div style={style}>
        <p>Basic Slider, disabled</p>
        <Slider onChange={log} disabled />
      </div>
      <div style={style}>
        <p>Controlled Slider</p>
        <Slider value={50} />
      </div>
      <div style={style}>
        <p>Customized Slider</p>
        <CustomizedSlider />
      </div>
      <div style={style}>
        <p>Slider with null value and reset button</p>
        <NullableSlider />
      </div>
      <div style={style}>
        <p>Range Slider with null value and reset button</p>
        <NullableRangeSlider />
      </div>
      <div style={style}>
        <p>Slider with dynamic `min` `max` `step`</p>
        <DynamicBounds />
      </div>
    </div>
  );
};

export const Vertical = () => {
  const style: React.CSSProperties = {
    float: 'left',
    width: 160,
    height: 400,
    marginBottom: 160,
    marginLeft: 50,
  };
  const parentStyle = { overflow: 'hidden' };

  console.log(Slider);

  const marks = {
    '-10': '-10°C',
    0: <strong>0°C</strong>,
    26: '26°C',
    37: '37°C',
    50: '50°C',
    100: <strong style={{ color: 'red' }}>100°C</strong>,
  };

  function log(value: any) {
    console.log(value);
  }

  return (
    <div style={parentStyle}>
      <div style={style}>
        <p>Slider with marks, `step=null`</p>
        <Slider
          vertical
          min={-10}
          marks={marks}
          step={null}
          onChange={log}
          defaultValue={20}
        />
      </div>
      <div style={style}>
        <p>Slider with marks, `step=null` and `startPoint=0`</p>
        <Slider
          vertical
          min={-10}
          startPoint={0}
          marks={marks}
          step={null}
          onChange={log}
          defaultValue={20}
        />
      </div>
      <div style={style}>
        <p>Reverse Slider with marks, `step=null`</p>
        <Slider
          vertical
          min={-10}
          marks={marks}
          step={null}
          onChange={log}
          defaultValue={20}
          reverse
        />
      </div>
      <div style={style}>
        <p>Slider with marks and steps</p>
        <Slider
          vertical
          dots
          min={-10}
          marks={marks}
          step={10}
          onChange={log}
          defaultValue={20}
        />
      </div>
      <div style={style}>
        <p>Slider with marks, `included=false`</p>
        <Slider
          vertical
          min={-10}
          marks={marks}
          included={false}
          defaultValue={20}
        />
      </div>
      <div style={style}>
        <p>Slider with marks and steps, `included=false`</p>
        <Slider
          vertical
          min={-10}
          marks={marks}
          step={10}
          included={false}
          defaultValue={20}
        />
      </div>
      <div style={style}>
        <p>Range with marks</p>
        <Range
          vertical
          min={-10}
          marks={marks}
          onChange={log}
          defaultValue={[20, 40]}
        />
      </div>
      <div style={style}>
        <p>Range with marks and steps</p>
        <Range
          vertical
          min={-10}
          marks={marks}
          step={10}
          onChange={log}
          defaultValue={[20, 40]}
        />
      </div>
      <div style={style}>
        <p>Range with marks and draggableTrack</p>
        <Range
          draggableTrack
          vertical
          min={-10}
          marks={marks}
          onChange={log}
          defaultValue={[20, 40]}
        />
      </div>
      <div style={style}>
        <p>Range with marks and draggableTrack(reverse)</p>
        <Range
          draggableTrack
          vertical
          reverse
          min={-10}
          marks={marks}
          onChange={log}
          defaultValue={[20, 40]}
        />
      </div>
    </div>
  );
};
