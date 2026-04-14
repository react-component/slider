/* eslint react/no-multi-comp: 0, no-console: 0 */
import Slider from '@rc-component/slider';
import React, { useState } from 'react';
import '../../assets/index.less';

const style: React.CSSProperties = {
  width: 400,
  margin: 50,
};

const BasicDisabledHandle = () => {
  const [value, setValue] = useState<number[]>([0, 30, 60, 100]);
  const [disabled, setDisabled] = useState([true, false, false, true]);

  return (
    <div>
      <Slider range value={value} onChange={(v) => setValue(v as number[])} disabled={disabled} />
      <div style={{ marginTop: 16 }}>
        {value.map((val, index) => (
          <label key={index} style={{ marginRight: 16 }}>
            <input
              type="checkbox"
              checked={disabled[index]}
              onChange={() => {
                const newDisabled = [...disabled];
                newDisabled[index] = !newDisabled[index];
                setDisabled(newDisabled);
              }}
            />
            Handle {index + 1} ({val}) {disabled[index] ? 'Disabled' : 'Enabled'}
          </label>
        ))}
      </div>
    </div>
  );
};

const DisabledHandleAsBoundary = () => {
  const [value, setValue] = useState<number[]>([10, 50, 90]);

  return (
    <div>
      <Slider range value={value} onChange={(v) => setValue(v as number[])} disabled={[false, true, false]} />
      <p style={{ marginTop: 8, color: '#999' }}>
        Middle handle (50) is disabled and acts as a boundary.
        First handle cannot go beyond 50, third handle cannot go below 50.
        Disabled handle has gray border and not-allowed cursor.
      </p>
    </div>
  );
};

const MultipleDisabledBoundaries = () => {
  const [value, setValue] = useState<number[]>([10, 30, 50, 70, 90]);

  return (
    <div>
      <Slider range value={value} onChange={(v) => setValue(v as number[])} disabled={[true, false, true, false, true]} />
      <p style={{ marginTop: 8, color: '#999' }}>
        Handles at 10, 50, 90 are disabled.
        Handle at 30 can only move between 10-50, handle at 70 can only move between 50-90.
      </p>
    </div>
  );
};

export default () => (
  <div>
    <div style={style}>
      <h3>Basic Disabled Handle</h3>
      <p>Toggle checkboxes to disable/enable specific handles</p>
      <BasicDisabledHandle />
    </div>

    <div style={style}>
      <h3>Disabled Handle as Boundary</h3>
      <DisabledHandleAsBoundary />
    </div>

    <div style={style}>
      <h3>Multiple Disabled Boundaries</h3>
      <MultipleDisabledBoundaries />
    </div>
  </div>
);
