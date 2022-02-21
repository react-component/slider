import React from 'react';
import Slider from 'rc-slider';
import '../../assets/index.less';

export default () => {
  const [range, setRange] = React.useState(false);

  return (
    <div style={{ height: 300 }}>
      <label>
        <input type="checkbox" checked={range} onChange={() => setRange(!range)} />
        Range
      </label>
      <Slider
        reverse
        // vertical
        range={range}
        defaultValue={[10, 50]}
        onChange={(nextValues) => console.log('Change:', nextValues)}
      />
    </div>
  );
};
