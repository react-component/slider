/* eslint react/no-multi-comp: 0, no-console: 0 */
import Slider from 'rc-slider';
import React from 'react';
import '../../assets/index.less';

const style: React.CSSProperties = {
  width: 400,
  margin: 50,
};

function log(value) {
  console.log(value);
}

const NodeWrapper = ({ children }: { children: React.ReactElement }) => {
  return <div>{React.cloneElement(children, {}, <div>TOOLTIP</div>)}</div>;
};

export default () => {
  const [value, setValue] = React.useState([0, 50, 80]);

  return (
    <div>
      <div style={style}>
        <Slider
          range
          // defaultValue={[0, 10, 30]}
          // onChange={log}
          min={0}
          max={100}
          value={value}
          onChange={(nextValue) => {
            // console.log('>>>', nextValue);
            // setValue(nextValue as any);
          }}
          activeHandleRender={(node) => <NodeWrapper>{node}</NodeWrapper>}
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
};
