/* eslint react/no-multi-comp: 0, no-console: 0 */
import Slider from '@rc-component/slider';
import React, { useState } from 'react';
import '../../assets/index.less';

const style: React.CSSProperties = {
  width: 400,
  margin: 50,
};

// Basic editable with disabled handles
const EditableWithDisabled = () => {
  const [value, setValue] = useState<number[]>([0, 30, 100]);
  const [disabled, setDisabled] = useState<boolean[]>([true, false, true]);

  return (
    <div>
      <Slider
        range={{
          editable: true,
          minCount: 2,
          maxCount: 5,
        }}
        value={value}
        onChange={(v) => setValue(v as number[])}
        disabled={disabled}
        onDisabledChange={setDisabled}
      />
      Slider disabled {JSON.stringify(disabled)}
      <div style={{ marginTop: 16 }}>
        {value.map((val, index) => (
          <label key={index} style={{ marginRight: 16 }}>
            <input
              type="checkbox"
              checked={!!disabled[index]}
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
      <p style={{ marginTop: 8, color: '#999', fontSize: 12 }}>
        Try: Click track to add handle • Drag handle to edge to delete • Toggle checkboxes to disable handles
      </p>
    </div>
  );
};

const BasicDisabledHandle = () => {
  const [value, setValue] = useState<number[]>([0, 30, 60, 100]);
  const [disabled, setDisabled] = useState([true]);

  return (
    <div>
      <Slider range={{ draggableTrack: true }} value={value} onChange={(v) => setValue(v as number[])} disabled={disabled} />
      Slider disabled {JSON.stringify(disabled)}
      <div style={{ marginTop: 16 }}>
        {value.map((val, index) => (
          <label key={index} style={{ marginRight: 16 }}>
            <input
              type="checkbox"
              checked={!!disabled[index]}
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

const SingleSlider = () => {
  const [value1, setValue1] = useState(30);
  const [value2, setValue2] = useState(30);

  return (
    <div>
      <Slider value={value1} onChange={(v) => setValue1(v as number)} disabled />
      <br />
      <Slider value={value2} onChange={(v) => setValue2(v as number)} disabled={false} />
    </div>
  );
}

export default () => (
  <div>
    <div>
      single handle disabled
      <SingleSlider />
    </div>
    <div>

    </div>
    <div style={style}>
      <h3>Disabled Handle + Draggable Track</h3>
      <p>Toggle checkboxes to disable/enable specific handles. Drag the track area to move the range.</p>
      <BasicDisabledHandle />
    </div>

    <div style={style}>
      <h3>Disabled Handle as Boundary</h3>
      <DisabledHandleAsBoundary />
    </div>
    <div>
      <div style={style}>
        <h3>Editable + Disabled Array</h3>
        <p>Toggle checkboxes to enable/disable handles in editable mode</p>
        <EditableWithDisabled />
      </div>
    </div>
  </div>
);
