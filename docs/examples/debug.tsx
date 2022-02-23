import React from 'react';
import Slider from 'rc-slider';
import '../../assets/index.less';

export default () => {
  const [disabled, setDisabled] = React.useState(false);
  const [range, setRange] = React.useState(true);
  const [reverse, setReverse] = React.useState(false);
  const [vertical, setVertical] = React.useState(false);
  const [value, setValue] = React.useState(0);

  return (
    <div
      style={{
        transform: 'scale(1.5)',
        transformOrigin: 'top left',
      }}
    >
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
          count={2}
          disabled={disabled}
          reverse={reverse}
          vertical={vertical}
          range={range}
          defaultValue={[30, 50]}
          onChange={(nextValues) => {
            console.log('Change:', nextValues);
            setValue(nextValues as any);
          }}
          value={value}
        />
      </div>
    </div>
  );
};
