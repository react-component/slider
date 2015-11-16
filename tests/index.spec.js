
var expect = require('expect.js');
var Slider = require('../index.js');
var React = require('react');
var ReactDOM = require('react-dom');
var TestUtils = require('react-addons-test-utils');
var Simulate = TestUtils.Simulate;
var $ = require('jquery');
require('../assets/index.less');

if (typeof initMochaPhantomJS === 'function') {
  initMochaPhantomJS()
}

describe('rc-slider', function () {
  this.timeout(5000);
  var div = document.createElement('div');
  document.body.appendChild(div);

  afterEach(function () {
    ReactDOM.unmountComponentAtNode(div);
  });

  it('should render a simple slider with value correctly!', function () {
    var slider = ReactDOM.render(
      <Slider className='rc-slider' defaultValue={40}/>,
      div
    );
    var node = $(div);
    expect(node.find('.rc-slider').length).to.be(1);
    expect(node.find('.rc-slider-handle').length).to.be(1);
    expect(node.find('.rc-slider-track').length).to.be(1);
    expect(slider.state.upperBound).to.be(40);
    var trackWidth = node.find('.rc-slider-track')[0].style.width;
    expect(trackWidth).to.eql(node.find('.rc-slider-handle')[0].style.left);
  });

  it('should render a slider with correct numbers of step!', function () {
    var slider = ReactDOM.render(
      <Slider className='rc-slider' step={20}/>,
      div
    );
    var node = $(div);
    expect(node.find('.rc-slider').length).to.be(1);
    expect(node.find('.rc-slider-handle').length).to.be(1);
    expect(node.find('.rc-slider-track').length).to.be(1);
    expect(slider.state.upperBound).to.be(0);

    var sliderWithDots = ReactDOM.render(
      <Slider className='rc-slider' step={20} dots/>,
      div
    );
    var node1 = $(div);
    expect(node1.find('.rc-slider-dot').length).to.be(6);
  });

  it('should render a slider with marks correctly!', function () {
    var slider = ReactDOM.render(
      <Slider marks={["一","二","三","四","五"]} defaultIndex={3} />,
      div
    );
    var node = $(div);
    expect(node.find('.rc-slider').length).to.be(1);
    expect(node.find('.rc-slider-handle').length).to.be(1);
    expect(node.find('.rc-slider-track').length).to.be(1);
    expect(node.find('.rc-slider-dot').length).to.be(slider.props.marks.length);
    expect(node.find('.rc-slider-mark').length).to.be(1);
    expect(node.find('.rc-slider-mark-text').length).to.be(slider.props.marks.length);
    expect(slider.getIndex(slider.state.upperBound)).to.be(3);
  });

  // it('should mouseDown works!', function (done) {
  //   var slider = ReactDOM.render(
  //     <Slider marks={["一","二","三","四","五"]} />,
  //     div
  //   );
  //   var selectedStep = slider.refs.step3.getDOMNode();

  //   Simulate.mouseDown(selectedStep);

  //   setTimeout( function() {
  //     expect(slider.state.active).to.be('active');
  //     done();
  //   }, 200);
  // });

});
