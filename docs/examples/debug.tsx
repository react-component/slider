import Slider from 'rc-slider';
import React from 'react';
import '../../assets/index.less';

export default () => {
  const [disabled, setDisabled] = React.useState(false);
  const [range, setRange] = React.useState(false);
  const [reverse, setReverse] = React.useState(false);
  const [vertical, setVertical] = React.useState(false);

  return (
    <div style={{ transform: 'scale(1.5)', transformOrigin: 'top left' }}>
      <div>
        <label>
          <input type="checkbox" checked={disabled} onChange={() => setDisabled(!disabled)} />
          Disabled
        </label>
        <label>
          <input type="checkbox" checked={range} onChange={() => setRange(!range)} />
          Range
        </label>
        <label>
          <input type="checkbox" checked={reverse} onChange={() => setReverse(!reverse)} />
          Reverse
        </label>
        <label>
          <input type="checkbox" checked={vertical} onChange={() => setVertical(!vertical)} />
          Vertical
        </label>
      </div>

      <div style={{ height: 300, width: 600 }}>
        <Slider
          onChange={(nextValues) => {
            console.log('Change:', nextValues);
          }}
          onChangeComplete={(v) => {
            console.log('AfterChange:', v);
          }}
          min={0}
          max={1}
          defaultValue={0.81}
          step={0.01}
        />
      </div>
    </div>
  );
};
