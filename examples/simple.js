'use strict';

require('rc-slider/assets/index.less');

var React = require('react');
var ReactDOM = require('react-dom');
var Slider = require('rc-slider');
var style = {width:400,margin:50};

var log = console.log.bind(console);

function percentFormatter(v) {
  return v + " %";
}

ReactDOM.render(
  <div>
    <div style={style}>
      <p>基础滑块</p>
      <Slider onChange={log} tipTransitionName='rc-slider-tooltip-zoom-down' />
    </div>
    <div style={style}>
      <p>基础滑块，step=20</p>
      <Slider step={20} />
    </div>
    <div style={style}>
      <p>基础滑块，step=20 带圆点</p>
      <Slider dots step={20} />
    </div>
    <div style={style}>
      <p>双滑块</p>
      <Slider range min={10} max={90} defaultValue={[0, 30]} onChange={log} />
    </div>
    <div style={style}>
      <p>双滑块，step=20 </p>
      <Slider range dots step={20} defaultValue={[0, 30]} onAfterChange={log} included={false} />
    </div>
    <div style={style}>
      <p>分段式滑块（包含关系）</p>
      <Slider marks={["状态1","状态2","状态3","状态4"]} defaultIndex={1} />
    </div>
    <div style={style}>
      <p>分段式滑块（并列关系）</p>
      <Slider marks={["状态1","状态2","状态3","状态4"]} included={false} defaultIndex={1} />
    </div>
    <div style={style}>
      <p>基础滑块</p>
      <Slider onChange={log} tipFormatter={percentFormatter} tipTransitionName='rc-slider-tooltip-zoom-down' />
    </div>
  </div>
  , document.getElementById('__react-content'));
