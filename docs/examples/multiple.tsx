/* eslint react/no-multi-comp: 0, no-console: 0 */
import Slider from 'rc-slider';
import React from 'react';
import '../../assets/index.less';

const style = { width: 400, margin: 50 };

function log(value) {
  console.log(value);
}

export default () => (
  <div>
    <div style={style}>
      <Slider
        range
        defaultValue={[0, 10, 30]}
        onChange={log}
        styles={{
          tracks: {
            background: `linear-gradient(to right, blue, red)`,
          },
          track: {
            background: 'transparent',
          },
        }}
      />
    </div>
  </div>
);
