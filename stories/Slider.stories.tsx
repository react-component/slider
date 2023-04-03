import React, { useState } from 'react';
import { Meta, Story } from '@storybook/react';
import TooltipSlider, { handleRender } from './components/TooltipSlider';
import Slider from '../src/Slider';
import Range from '../src/Range';
import './assets/index.css';
import {
  RangeWithState,
  SliderWithState,
  SliderWithStateProps,
} from './UncontrolledComponents';

const meta: Meta = {
  title: 'RC-Slider',
  component: Range,
};

export default meta;

const Template: Story<SliderWithStateProps> = (args) => (
  <SliderWithState {...args} />
);

export const Default = Template.bind({});

Default.args = {};

export const Handle = () => {
  return (
    <div>
      <div style={{ width: 400, margin: 50 }}>
        <p>Slider with custom handle</p>
        <SliderWithState
          min={0}
          max={20}
          defaultValue={3}
          handleRender={handleRender}
        />
      </div>
      <div style={{ width: 400, margin: 50 }}>
        <p>Reversed Slider with custom handle</p>
        <SliderWithState
          min={0}
          max={20}
          reverse
          defaultValue={3}
          handleRender={handleRender}
        />
      </div>
      <div style={{ width: 400, margin: 50 }}>
        <p>Slider with fixed values</p>
        <SliderWithState
          min={20}
          defaultValue={20}
          marks={{ 20: 20, 40: 40, 100: 100 }}
          step={null}
        />
      </div>
      <div style={{ width: 400, margin: 50 }}>
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

  return (
    <div>
      <div style={{ width: 400, margin: 50 }}>
        <p>Slider with marks, `step=null`</p>
        <SliderWithState
          min={-10}
          marks={marks}
          step={null}
          defaultValue={20}
        />
      </div>

      {/* <div style={{ width: 400, margin: 50 }}>
      <p>Range Slider with marks, `step=null`, pushable, draggableTrack</p>
      <RangeWithState 
        min={-10}
        marks={marks}
        step={null}
        defaultValue={[-10, 0]}
        allowCross={false}
        pushable
        draggableTrack
      />
    </div> */}

      <div style={{ width: 400, margin: 50 }}>
        <p>
          Slider with marks and steps - allows picking specific values that are
          multiples of `step`, or specific marked values.
        </p>
        <SliderWithState
          dots
          min={-10}
          marks={marks}
          step={10}
          defaultValue={20}
        />
      </div>
      <div style={{ width: 400, margin: 50 }}>
        <p>Reversed Slider with marks and steps</p>
        <SliderWithState
          dots
          reverse
          min={-10}
          marks={marks}
          step={10}
          defaultValue={20}
        />
      </div>

      <div style={{ width: 400, margin: 50 }}>
        <p>Slider with marks, `included=false`</p>
        <SliderWithState
          min={-10}
          marks={marks}
          included={false}
          defaultValue={20}
        />
      </div>
      <div style={{ width: 400, margin: 50 }}>
        <p>Slider with marks and steps, `included=false`</p>
        <SliderWithState
          min={-10}
          marks={marks}
          step={10}
          included={false}
          defaultValue={20}
        />
      </div>

      <div style={{ width: 400, margin: 50 }}>
        <p>Range with marks</p>
        <RangeWithState
          min={-10}
          marks={marks}
          defaultValue={[20, 25, 30, 40]}
        />
      </div>
      <div style={{ width: 400, margin: 50 }}>
        <p>Range with marks and steps</p>
        <RangeWithState
          min={-10}
          marks={marks}
          step={10}
          defaultValue={[20, 40]}
        />
      </div>
    </div>
  );
};

const CustomizedRange = () => {
  const [lowerBound, setLowerBound] = useState(20);
  const [upperBound, setUpperBound] = useState(40);
  const [value, setValue] = useState([20, 40]);

  return (
    <div>
      <label>LowerBound: </label>
      <input
        type="number"
        value={lowerBound}
        onChange={(e) => setLowerBound(Number(e.target.value))}
      />
      <br />
      <label>UpperBound: </label>
      <input
        type="number"
        value={upperBound}
        onChange={(e) => setUpperBound(Number(e.target.value))}
      />
      <br />
      <button type="button" onClick={() => setValue([lowerBound, upperBound])}>
        Apply
      </button>
      <br />
      <br />
      <Range allowCross={false} value={value} onChange={setValue} />
    </div>
  );
};

const DynamicBounds = () => {
  const [min, setMin] = useState(0);
  const [max, setMax] = useState(100);
  const [value, setValue] = useState([20, 50]);
  return (
    <div>
      <label>Min: </label>
      <input
        type="number"
        value={min}
        onChange={(e) => setMin(Number(e.target.value))}
      />
      <br />
      <label>Max: </label>
      <input
        type="number"
        value={max}
        onChange={(e) => setMax(Number(e.target.value))}
      />
      <br />
      <br />
      <Range min={min} max={max} value={value} onChange={setValue} />
    </div>
  );
};

export const RangeInput = () => {
  return (
    <div>
      <div style={{ width: 400, margin: 50 }}>
        <p>Basic Range, `allowCross=false`</p>
        <RangeWithState allowCross={false} defaultValue={[0, 20]} />
      </div>
      <div style={{ width: 400, margin: 50 }}>
        <p>Basic reverse Range, `allowCross=false`</p>
        <RangeWithState allowCross={false} defaultValue={[0, 20]} reverse />
      </div>
      <div style={{ width: 400, margin: 50 }}>
        <p>Basic Range, `step=20` </p>
        <RangeWithState step={20} defaultValue={[20, 20]} />
      </div>
      <div style={{ width: 400, margin: 50 }}>
        <p>Basic Range, `step=20, dots` </p>
        <RangeWithState dots step={20} defaultValue={[20, 40]} />
      </div>
      <div style={{ width: 400, margin: 50 }}>
        <p>Basic Range, disabled</p>
        <RangeWithState allowCross={false} defaultValue={[0, 20]} disabled />
      </div>
      <div style={{ width: 400, margin: 50 }}>
        <p>Multi Range, count=3 and pushable=true</p>
        <RangeWithState count={3} defaultValue={[20, 40, 60, 80]} pushable />
      </div>
      <div style={{ width: 400, margin: 50 }}>
        <p>Multi Range with custom track and handle style and pushable</p>
        <RangeWithState
          count={3}
          defaultValue={[20, 40, 60, 80]}
          pushable
          trackClassName="rc-slider-track docs-slider-track"
          handleClassName="rc-slider-handle docs-slider-handle"
          railClassName="rc-slider-rail docs-slider-rail"
        />
      </div>
      <div style={{ width: 400, margin: 50 }}>
        <p>Customized Range</p>
        <CustomizedRange />
      </div>
      <div style={{ width: 400, margin: 50 }}>
        <p>Range with dynamic `max` `min`</p>
        <DynamicBounds />
      </div>
      <div style={{ width: 400, margin: 50 }}>
        <p>draggableTrack two points</p>
        <RangeWithState
          allowCross={false}
          defaultValue={[0, 40]}
          draggableTrack
        />
      </div>
      <div style={{ width: 400, margin: 50 }}>
        <p>draggableTrack two points(reverse)</p>
        <RangeWithState
          allowCross={false}
          reverse
          defaultValue={[0, 40]}
          draggableTrack
        />
      </div>
      <div style={{ width: 400, margin: 50 }}>
        <p>draggableTrack multiple points</p>
        <RangeWithState
          allowCross={false}
          defaultValue={[0, 20, 30, 40, 50]}
          draggableTrack
        />
      </div>
    </div>
  );
};

const NullableSlider = () => {
  const [value, setValue] = useState<null | number>(null);
  return (
    <div>
      <Slider value={value} onChange={setValue} />

      <button type="button" onClick={() => setValue(null)}>
        Reset
      </button>
    </div>
  );
};

const NullableRange = () => {
  const [value, setValue] = useState<null | number[]>(null);
  return (
    <div>
      <Range value={value} onChange={setValue} />

      <button type="button" onClick={() => setValue(null)}>
        Reset
      </button>
    </div>
  );
};

export const SliderInput = () => {
  function percentFormatter(v: number) {
    return `${v}%`;
  }

  return (
    <div>
      <div style={{ width: 400, margin: 50 }}>
        <p>Basic Slider</p>
        <SliderWithState defaultValue={null} />
      </div>
      <div style={{ width: 400, margin: 50 }}>
        <p>Basic Slider, `startPoint=50`</p>
        <SliderWithState defaultValue={null} startPoint={50} />
      </div>
      <div style={{ width: 400, margin: 50 }}>
        <p>Slider reverse</p>
        <SliderWithState defaultValue={null} reverse min={20} max={60} />
      </div>
      <div style={{ width: 400, margin: 50 }}>
        <p>Basic Slider, `step=20`</p>
        <SliderWithState step={20} defaultValue={50} />
      </div>
      <div style={{ width: 400, margin: 50 }}>
        <p>Basic Slider, `step=20, dots`</p>
        <SliderWithState dots step={20} defaultValue={100} />
      </div>
      <div style={{ width: 400, margin: 50 }}>
        <p>
          Basic Slider, `step=20, dots, dotStyle={"{borderColor: 'orange'}"},
          activeDotStyle=
          {"{borderColor: 'yellow'}"}`
        </p>
        <SliderWithState
          dots
          step={20}
          defaultValue={100}
          dotClassName="rc-slider-dot docs-slider-dot"
          activeDotClassName="rc-slider-dot-active docs-slider-dot-active"
        />
      </div>
      <div style={{ width: 400, margin: 50 }}>
        <p>Slider with tooltip, with custom `tipFormatter`</p>
        <TooltipSlider
          defaultValue={null}
          tipFormatter={percentFormatter}
          tipProps={{ overlayClassName: 'foo' }}
        />
      </div>
      <div style={{ width: 400, margin: 50 }}>
        <p>Slider with custom handle and track style.</p>
        <SliderWithState
          defaultValue={30}
          railClassName="rc-slider-rail docs-slider-rail"
          trackClassName="rc-slider-track docs-slider-track"
          handleClassName="rc-slider-handle docs-handle-handle"
        />
      </div>
      <div style={{ width: 400, margin: 50 }}>
        <p>Reversed Slider with custom handle and track style.</p>
        <SliderWithState
          defaultValue={30}
          reverse
          railClassName="rc-slider-rail docs-slider-rail"
          trackClassName="rc-slider-track docs-slider-track"
          handleClassName="rc-slider-handle docs-handle-handle"
        />
      </div>
      <div style={{ width: 400, margin: 50 }}>
        <p>Basic Slider, disabled</p>
        <SliderWithState defaultValue={null} disabled />
      </div>
      <div style={{ width: 400, margin: 50 }}>
        <p>Slider with null value and reset button</p>
        <NullableSlider />
      </div>
      <div style={{ width: 400, margin: 50 }}>
        <p>Range Slider with null value and reset button</p>
        <NullableRange />
      </div>
      <div style={{ width: 400, margin: 50 }}>
        <p>Slider with dynamic `min` `max` `step`</p>
        <DynamicBounds />
      </div>
    </div>
  );
};

export const Vertical = () => {
  const marks = {
    '-10': '-10°C',
    0: <strong>0°C</strong>,
    26: '26°C',
    37: '37°C',
    50: '50°C',
    100: <strong style={{ color: 'red' }}>100°C</strong>,
  };

  return (
    <div style={{ overflow: 'hidden' }}>
      <div
        style={{
          float: 'left',
          width: 160,
          height: 400,
          marginBottom: 160,
          marginLeft: 50,
        }}
      >
        <p>Slider with marks, `step=null`</p>
        <SliderWithState
          vertical
          min={-10}
          marks={marks}
          step={null}
          defaultValue={20}
        />
      </div>
      <div
        style={{
          float: 'left',
          width: 160,
          height: 400,
          marginBottom: 160,
          marginLeft: 50,
        }}
      >
        <p>Slider with marks, `step=null` and `startPoint=0`</p>
        <SliderWithState
          vertical
          min={-10}
          startPoint={0}
          marks={marks}
          step={null}
          defaultValue={20}
        />
      </div>
      <div
        style={{
          float: 'left',
          width: 160,
          height: 400,
          marginBottom: 160,
          marginLeft: 50,
        }}
      >
        <p>Reverse Slider with marks, `step=null`</p>
        <SliderWithState
          vertical
          min={-10}
          marks={marks}
          step={null}
          defaultValue={20}
          reverse
        />
      </div>
      <div
        style={{
          float: 'left',
          width: 160,
          height: 400,
          marginBottom: 160,
          marginLeft: 50,
        }}
      >
        <p>Slider with marks and steps</p>
        <SliderWithState
          vertical
          dots
          min={-10}
          marks={marks}
          step={10}
          defaultValue={20}
        />
      </div>
      <div
        style={{
          float: 'left',
          width: 160,
          height: 400,
          marginBottom: 160,
          marginLeft: 50,
        }}
      >
        <p>Slider with marks, `included=false`</p>
        <SliderWithState
          vertical
          min={-10}
          marks={marks}
          included={false}
          defaultValue={20}
        />
      </div>
      <div
        style={{
          float: 'left',
          width: 160,
          height: 400,
          marginBottom: 160,
          marginLeft: 50,
        }}
      >
        <p>Slider with marks and steps, `included=false`</p>
        <SliderWithState
          vertical
          min={-10}
          marks={marks}
          step={10}
          included={false}
          defaultValue={20}
        />
      </div>
      <div
        style={{
          float: 'left',
          width: 160,
          height: 400,
          marginBottom: 160,
          marginLeft: 50,
        }}
      >
        <p>Range with marks</p>
        <RangeWithState
          vertical
          min={-10}
          marks={marks}
          defaultValue={[20, 40]}
        />
      </div>
      <div
        style={{
          float: 'left',
          width: 160,
          height: 400,
          marginBottom: 160,
          marginLeft: 50,
        }}
      >
        <p>Range with marks and steps</p>
        <RangeWithState
          vertical
          min={-10}
          marks={marks}
          step={10}
          defaultValue={[20, 40]}
        />
      </div>
      <div
        style={{
          float: 'left',
          width: 160,
          height: 400,
          marginBottom: 160,
          marginLeft: 50,
        }}
      >
        <p>Range with marks and draggableTrack</p>
        <RangeWithState
          draggableTrack
          vertical
          min={-10}
          marks={marks}
          defaultValue={[20, 40]}
        />
      </div>
      <div
        style={{
          float: 'left',
          width: 160,
          height: 400,
          marginBottom: 160,
          marginLeft: 50,
        }}
      >
        <p>Range with marks and draggableTrack(reverse)</p>
        <RangeWithState
          draggableTrack
          vertical
          reverse
          min={-10}
          marks={marks}
          defaultValue={[20, 40]}
        />
      </div>
    </div>
  );
};
