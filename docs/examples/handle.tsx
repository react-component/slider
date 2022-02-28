import React from 'react';
import Slider from 'rc-slider';
import '../../assets/index.less';
import TooltipSlider, { handleRender } from './components/TooltipSlider';

const wrapperStyle = { width: 400, margin: 50 };

export default () => (
  <div>
    <div style={wrapperStyle}>
      <p>Slider with custom handle</p>
      <Slider min={0} max={20} defaultValue={3} handleRender={handleRender} />
    </div>
    <div style={wrapperStyle}>
      <p>Reversed Slider with custom handle</p>
      <Slider min={0} max={20} reverse defaultValue={3} handleRender={handleRender} />
    </div>
    <div style={wrapperStyle}>
      <p>Slider with fixed values</p>
      <Slider min={20} defaultValue={20} marks={{ 20: 20, 40: 40, 100: 100 }} step={null} />
    </div>
    <div style={wrapperStyle}>
      <p>Range with custom tooltip</p>
      <TooltipSlider
        range
        min={0}
        max={20}
        defaultValue={[3, 10]}
        tipFormatter={(value) => `${value}!`}
      />
    </div>
  </div>
);
