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

let uuid = 0;

const NodeWrapper = ({ children }: { children: React.ReactElement }) => {
  const [id] = React.useState(() => {
    uuid += 1;
    return uuid;
  });

  return <div>{React.cloneElement(children, {}, <div>{id}</div>)}</div>;
};

export default () => {
  const [value, setValue] = React.useState([0, 10, 30]);

  return (
    <div>
      <div style={style}>
        <Slider
          range
          // defaultValue={[0, 10, 30]}
          // onChange={log}
          value={value}
          onChange={(nextValue) => {
            console.log('>>>', nextValue);
            setValue(nextValue as any);
          }}
          handleRender={(node) => <NodeWrapper>{node}</NodeWrapper>}
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
