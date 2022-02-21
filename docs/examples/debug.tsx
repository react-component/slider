import React from 'react';
import Slider from 'rc-slider';
import '../../assets/index.less';

export default () => {
  const [range, setRange] = React.useState(false);
  const [reverse, setReverse] = React.useState(false);
  const [vertical, setVertical] = React.useState(false);

  return (
    <div>
      <div>
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

      <div style={{ height: 300 }}>
        <Slider
          reverse={reverse}
          vertical={vertical}
          range={range}
          defaultValue={[10, 50]}
          onChange={(nextValues) => console.log('Change:', nextValues)}
        />
      </div>
    </div>
  );
};
