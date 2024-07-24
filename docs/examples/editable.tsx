/* eslint react/no-multi-comp: 0, no-console: 0 */
import Slider, { UnstableContext } from 'rc-slider';
import React from 'react';
import '../../assets/index.less';
import type { UnstableContextProps } from '../../src/context';

const style: React.CSSProperties = {
  width: 400,
  margin: 50,
};

export default () => {
  const [value, setValue] = React.useState([0, 50, 80]);

  const onDragStart: UnstableContextProps['onDragStart'] = (info) => {
    const { rawValues } = info;
    console.log('Start:', rawValues);
  };

  const onDragChange: UnstableContextProps['onDragChange'] = (info) => {
    const { rawValues } = info;
    console.log('Move:', rawValues);
  };

  return (
    <div>
      <div style={style}>
        <UnstableContext.Provider value={{ onDragStart, onDragChange }}>
          <Slider
            // range
            range={{
              editable: true,
              minCount: 1,
              maxCount: 4,
            }}
            // track={false}
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
            // handleRender={(ori, handleProps) => {
            //   if (handleProps.index === 0) {
            //     console.log('handleRender', ori, handleProps);
            //   }
            //   return ori;
            // }}
            styles={{
              rail: {
                background: `linear-gradient(to right, blue, red)`,
              },
              track: {
                background: 'orange',
              },
            }}
          />
        </UnstableContext.Provider>
      </div>

      <p>Here is a word that drag should not select it</p>
    </div>
  );
};
