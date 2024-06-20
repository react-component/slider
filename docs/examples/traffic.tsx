/* eslint react/no-multi-comp: 0, no-console: 0 */
import TooltipSlider from './components/TooltipSlider';
import React, { useState } from 'react';
import '../../assets/index.less';
import './traffic.less';

const style: React.CSSProperties = {
  height: 450,
};

const data = [0, 15, 40, 60, 85];

export default () => {
  const [value, setValue] = useState<number | number[]>(data);
  const min = 0;

  return (
    <div className="wrapper">
      <h3>流量控制2</h3>
      <div style={style}>
        <TooltipSlider
          clickable={false}
          pushable
          range
          reverse
          count={(value as number[]).length - 1}
          min={min}
          max={100}
          step={1}
          value={value}
          freeze="right"
          onChange={setValue}
          tipFormatter={(_value) => {
            return <>{_value}</>;
          }}
          tipProps={{ placement: 'topRight' }}
          handleStyle={{
            transform: 'translate(250%, -50%) rotate(90deg)',
            width: 20,
            height: 20,
            borderRadius: 0,
            borderBottom: 'none',
          }}
          vertical
          styles={{
            rail: {
              width: 32,
              borderRadius: 0,
            },
            track: {
              width: 32,
              borderRadius: 0,
            },
          }}
        />
      </div>
    </div>
  );
};
