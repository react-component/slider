/* eslint react/no-multi-comp: 0, no-console: 0 */
import Slider from 'rc-slider';
import React from 'react';
import '../../assets/index.less';

const style: React.CSSProperties = {
  width: 400,
  margin: 50,
};

export default () => {
  const [value, setValue] = React.useState([0, 50, 80]);

  return (
    <div>
      <div style={style}>
        <Slider
          // range
          range={{
            editable: true,
          }}
          track={false}
          min={0}
          max={100}
          value={value}
          // defaultValue={null}
          onChange={(nextValue) => {
            console.error('Change:', nextValue);
            setValue(nextValue as any);
          }}
          onChangeComplete={(nextValue) => {
            console.log('Complete', nextValue);
          }}
          styles={{
            rail: {
              background: `linear-gradient(to right, blue, red)`,
            },
          }}
        />
      </div>
    </div>
  );
};
