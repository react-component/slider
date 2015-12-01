const expect = require('expect.js');
const Slider = require('../index.js');
const React = require('react');
const ReactDOM = require('react-dom');
const $ = require('jquery');
require('../assets/index.less');

describe('rc-slider', function() {
  this.timeout(5000);
  const div = document.createElement('div');
  document.body.appendChild(div);

  afterEach(() => {
    ReactDOM.unmountComponentAtNode(div);
  });

  it('should render a simple slider with value correctly!', () => {
    const slider = ReactDOM.render(
      <Slider className="rc-slider" defaultValue={40}/>,
      div
    );
    const node = $(div);
    expect(node.find('.rc-slider').length).to.be(1);
    expect(node.find('.rc-slider-handle').length).to.be(1);
    expect(node.find('.rc-slider-track').length).to.be(1);
    expect(slider.state.upperBound).to.be(40);
    const trackWidth = node.find('.rc-slider-track')[0].style.width;
    expect(trackWidth).to.eql(node.find('.rc-slider-handle')[0].style.left);
  });

  it('should render a slider with correct numbers of step!', () => {
    const slider = ReactDOM.render(
      <Slider className="rc-slider" step={20}/>,
      div
    );
    const node = $(div);
    expect(node.find('.rc-slider').length).to.be(1);
    expect(node.find('.rc-slider-handle').length).to.be(1);
    expect(node.find('.rc-slider-track').length).to.be(1);
    expect(slider.state.upperBound).to.be(0);

    ReactDOM.render(
      <Slider className="rc-slider" step={20} dots/>,
      div
    );
    const node1 = $(div);
    expect(node1.find('.rc-slider-dot').length).to.be(6);
  });

  it('should render a slider with marks correctly!', () => {
    const slider = ReactDOM.render(
      <Slider marks={{0: '一', 20: '二', 40: '三', 60: '四', 100: '五'}} defaultValue={40} />,
      div
    );
    const node = $(div);
    expect(node.find('.rc-slider').length).to.be(1);
    expect(node.find('.rc-slider-handle').length).to.be(1);
    expect(node.find('.rc-slider-track').length).to.be(1);
    expect(node.find('.rc-slider-dot').length).to.be(Object.keys(slider.props.marks).length);
    expect(node.find('.rc-slider-mark').length).to.be(1);
    expect(node.find('.rc-slider-mark-text').length).to.be(Object.keys(slider.props.marks).length);
    expect(slider.state.upperBound).to.be(40);
  });
});
