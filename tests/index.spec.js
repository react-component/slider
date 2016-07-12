const expect = require('expect.js');
const React = require('react');
const ReactDOM = require('react-dom');
const ReactTestUtils = require('react-addons-test-utils');
const Slider = require('..');

require('../assets/index.less');

describe('rc-slider', function test() {
  this.timeout(5000);
  const div = document.createElement('div');
  document.body.appendChild(div);

  afterEach(() => {
    ReactDOM.unmountComponentAtNode(div);
  });

  it('should render a Slider with correct DOM structure', () => {
    const slider = ReactDOM.render(<Slider />, div);
    expect(ReactTestUtils.scryRenderedDOMComponentsWithClass(slider, 'rc-slider').length).to.be(1);
    expect(ReactTestUtils.scryRenderedDOMComponentsWithClass(slider, 'rc-slider-handle').length).to.be(1);
    expect(ReactTestUtils.scryRenderedDOMComponentsWithClass(slider, 'rc-slider-track').length).to.be(1);
  });

  it('should render a Slider with default value correctly', () => {
    const sliderWithDefaultValue = ReactDOM.render(<Slider defaultValue={50} />, div);
    expect(sliderWithDefaultValue.state.upperBound).to.be(50);
    expect(ReactTestUtils
           .scryRenderedDOMComponentsWithClass(sliderWithDefaultValue, 'rc-slider-handle')[0]
           .style.cssText)
      .to.match(/left: 50%;/);

    const trackStyle = ReactTestUtils
            .scryRenderedDOMComponentsWithClass(sliderWithDefaultValue, 'rc-slider-track')[0]
            .style.cssText;
    expect(trackStyle).to.match(/left: 0%;/);
    expect(trackStyle).to.match(/width: 50%;/);
    expect(trackStyle).to.match(/visibility: visible;/);
  });

  it('should render a Slider with value corrently', () => {
    const sliderWithValue = ReactDOM.render(<Slider value={50} />, div);
    expect(sliderWithValue.state.upperBound).to.be(50);
    expect(ReactTestUtils
           .scryRenderedDOMComponentsWithClass(sliderWithValue, 'rc-slider-handle')[0]
           .style.cssText)
      .to.match(/left: 50%;/);

    const trackStyle = ReactTestUtils
            .scryRenderedDOMComponentsWithClass(sliderWithValue, 'rc-slider-track')[0]
            .style.cssText;
    expect(trackStyle).to.match(/left: 0%;/);
    expect(trackStyle).to.match(/width: 50%;/);
    expect(trackStyle).to.match(/visibility: visible;/);
  });

  it('should render a Range with correct DOM structure', () => {
    const range = ReactDOM.render(<Slider range />, div);
    expect(ReactTestUtils.scryRenderedDOMComponentsWithClass(range, 'rc-slider').length).to.be(1);
    expect(ReactTestUtils.scryRenderedDOMComponentsWithClass(range, 'rc-slider-handle').length).to.be(2);
    expect(ReactTestUtils.scryRenderedDOMComponentsWithClass(range, 'rc-slider-track').length).to.be(1);
  });

  it('should render a Range with default value correctly', () => {
    const rangeWithDefaultValue = ReactDOM.render(<Slider range defaultValue={[0, 50]} />, div);
    expect(rangeWithDefaultValue.state.lowerBound).to.be(0);
    expect(rangeWithDefaultValue.state.upperBound).to.be(50);
    expect(ReactTestUtils
           .scryRenderedDOMComponentsWithClass(rangeWithDefaultValue, 'rc-slider-handle')[0]
           .style.cssText)
      .to.match(/left: 50%;/);
    expect(ReactTestUtils
           .scryRenderedDOMComponentsWithClass(rangeWithDefaultValue, 'rc-slider-handle')[1]
           .style.cssText)
      .to.match(/left: 0%;/);

    const trackStyle = ReactTestUtils
            .scryRenderedDOMComponentsWithClass(rangeWithDefaultValue, 'rc-slider-track')[0]
            .style.cssText;
    expect(trackStyle).to.match(/left: 0%;/);
    expect(trackStyle).to.match(/width: 50%;/);
    expect(trackStyle).to.match(/visibility: visible;/);
  });

  it('should render a Range with value correctly', () => {
    const rangeWithValue = ReactDOM.render(<Slider range value={[50, 100]} />, div);
    expect(rangeWithValue.state.lowerBound).to.be(50);
    expect(rangeWithValue.state.upperBound).to.be(100);
    expect(ReactTestUtils
           .scryRenderedDOMComponentsWithClass(rangeWithValue, 'rc-slider-handle')[0]
           .style.cssText)
      .to.match(/left: 100%;/);
    expect(ReactTestUtils
           .scryRenderedDOMComponentsWithClass(rangeWithValue, 'rc-slider-handle')[1]
           .style.cssText)
      .to.match(/left: 50%;/);

    const trackStyle = ReactTestUtils
            .scryRenderedDOMComponentsWithClass(rangeWithValue, 'rc-slider-track')[0]
            .style.cssText;
    expect(trackStyle).to.match(/left: 50%;/);
    expect(trackStyle).to.match(/width: 50%;/);
    expect(trackStyle).to.match(/visibility: visible;/);
  });

  it('should render dots correctly when `dots=true`', () => {
    const slider = ReactDOM.render(<Slider value={50} step={10} dots />, div);
    expect(ReactTestUtils.scryRenderedDOMComponentsWithClass(slider, 'rc-slider-dot').length).to.be(11);
    expect(ReactTestUtils.scryRenderedDOMComponentsWithClass(slider, 'rc-slider-dot-active').length).to.be(6);

    const range = ReactDOM.render(<Slider range value={[20, 50]} step={10} dots />, div);
    expect(ReactTestUtils.scryRenderedDOMComponentsWithClass(range, 'rc-slider-dot').length).to.be(11);
    expect(ReactTestUtils.scryRenderedDOMComponentsWithClass(range, 'rc-slider-dot-active').length).to.be(4);
  });

  it('should render marks correctly when `marks` is not an empty object', () => {
    const marks = {0: '0', 30: '30', 100: '100'};

    const slider = ReactDOM.render(<Slider value={30} marks={marks} />, div);
    expect(ReactTestUtils.scryRenderedDOMComponentsWithClass(slider, 'rc-slider-mark-text').length).to.be(3);
    expect(ReactTestUtils.scryRenderedDOMComponentsWithClass(slider, 'rc-slider-mark-text')[0].innerHTML).to.be('0');
    expect(ReactTestUtils.scryRenderedDOMComponentsWithClass(slider, 'rc-slider-mark-text')[1].innerHTML).to.be('30');
    expect(ReactTestUtils.scryRenderedDOMComponentsWithClass(slider, 'rc-slider-mark-text')[2].innerHTML).to.be('100');

    const range = ReactDOM.render(<Slider range value={[0, 30]} marks={marks} />, div);
    expect(ReactTestUtils.scryRenderedDOMComponentsWithClass(range, 'rc-slider-mark-text').length).to.be(3);
  });

  it('should not set value greater than `max` or smaller `min`', () => {
    const sliderWithMin = ReactDOM.render(<Slider value={0} min={10} />, div);
    expect(sliderWithMin.state.upperBound).to.be(10);
    ReactDOM.unmountComponentAtNode(div);

    const sliderWithMax = ReactDOM.render(<Slider value={100} max={90} />, div);
    expect(sliderWithMax.state.upperBound).to.be(90);
    ReactDOM.unmountComponentAtNode(div);

    const range = ReactDOM.render(<Slider range value={[0, 100]} min={10} max={90} />, div);
    expect(range.state.lowerBound).to.be(10);
    expect(range.state.upperBound).to.be(90);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('should render a vertical slider, when `vertical` is true', () => {
    const slider = ReactDOM.render(<Slider vertical />, div);
    expect(ReactTestUtils.scryRenderedDOMComponentsWithClass(slider, 'rc-slider-vertical').length).to.be(1);
  });

  it('should render a customized track component when `trackComponent` is provided', () => {
    const slider = ReactDOM.render(<Slider trackComponent={({className}) => <div className={className} style={{backgroundColor: 'red'}} />} />, div);
    expect(ReactTestUtils.scryRenderedDOMComponentsWithClass(slider, 'rc-slider-track').length).to.be(1);
    expect(ReactTestUtils
           .scryRenderedDOMComponentsWithClass(slider, 'rc-slider-track')[0]
           .style.cssText)
      .to.match(/background-color: red;/);
  });

  it('should render a customized steps component when `stepsComponent` is provided', () => {
    const slider = ReactDOM.render(<Slider stepsComponent={({prefixCls}) => <div className={prefixCls + '-step'} style={{backgroundColor: 'red'}} />} />, div);
    expect(ReactTestUtils.scryRenderedDOMComponentsWithClass(slider, 'rc-slider-step').length).to.be(1);
    expect(ReactTestUtils
           .scryRenderedDOMComponentsWithClass(slider, 'rc-slider-step')[0]
           .style.cssText)
      .to.match(/background-color: red;/);
  });
});
