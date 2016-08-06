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
    expect(sliderWithDefaultValue.state.bounds[1]).to.be(50);
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
    expect(sliderWithValue.state.bounds[1]).to.be(50);
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

  it('should render a Multi-Range with correct DOM structure', () => {
    const multiRange = ReactDOM.render(<Slider range={3} />, div);
    expect(ReactTestUtils.scryRenderedDOMComponentsWithClass(multiRange, 'rc-slider').length).to.be(1);

    expect(ReactTestUtils.scryRenderedDOMComponentsWithClass(multiRange, 'rc-slider-handle').length).to.be(4);
    expect(ReactTestUtils.scryRenderedDOMComponentsWithClass(multiRange, 'rc-slider-handle-1').length).to.be(1);
    expect(ReactTestUtils.scryRenderedDOMComponentsWithClass(multiRange, 'rc-slider-handle-2').length).to.be(1);
    expect(ReactTestUtils.scryRenderedDOMComponentsWithClass(multiRange, 'rc-slider-handle-3').length).to.be(1);
    expect(ReactTestUtils.scryRenderedDOMComponentsWithClass(multiRange, 'rc-slider-handle-4').length).to.be(1);

    expect(ReactTestUtils.scryRenderedDOMComponentsWithClass(multiRange, 'rc-slider-track').length).to.be(3);
    expect(ReactTestUtils.scryRenderedDOMComponentsWithClass(multiRange, 'rc-slider-track-1').length).to.be(1);
    expect(ReactTestUtils.scryRenderedDOMComponentsWithClass(multiRange, 'rc-slider-track-2').length).to.be(1);
    expect(ReactTestUtils.scryRenderedDOMComponentsWithClass(multiRange, 'rc-slider-track-3').length).to.be(1);
  });

  it('should render a Range with default value correctly', () => {
    const rangeWithDefaultValue = ReactDOM.render(<Slider range defaultValue={[0, 50]} />, div);
    expect(rangeWithDefaultValue.state.bounds[0]).to.be(0);
    expect(rangeWithDefaultValue.state.bounds[1]).to.be(50);
    expect(ReactTestUtils
      .scryRenderedDOMComponentsWithClass(rangeWithDefaultValue, 'rc-slider-handle')[0]
      .style.cssText)
      .to.match(/left: 0%;/);
    expect(ReactTestUtils
      .scryRenderedDOMComponentsWithClass(rangeWithDefaultValue, 'rc-slider-handle')[1]
      .style.cssText)
      .to.match(/left: 50%;/);

    const trackStyle = ReactTestUtils
      .scryRenderedDOMComponentsWithClass(rangeWithDefaultValue, 'rc-slider-track')[0]
      .style.cssText;
    expect(trackStyle).to.match(/left: 0%;/);
    expect(trackStyle).to.match(/width: 50%;/);
    expect(trackStyle).to.match(/visibility: visible;/);
  });

  it('should render a Multi-Range with default value correctly', () => {
    const multiRangeWithDefaultValue = ReactDOM.render(<Slider range={3} defaultValue={[0, 25, 50, 75]} />, div);
    expect(multiRangeWithDefaultValue.state.bounds[0]).to.be(0);
    expect(multiRangeWithDefaultValue.state.bounds[1]).to.be(25);
    expect(multiRangeWithDefaultValue.state.bounds[2]).to.be(50);
    expect(multiRangeWithDefaultValue.state.bounds[3]).to.be(75);
    expect(ReactTestUtils
      .scryRenderedDOMComponentsWithClass(multiRangeWithDefaultValue, 'rc-slider-handle')[0]
      .style.cssText)
      .to.match(/left: 0%;/);
    expect(ReactTestUtils
      .scryRenderedDOMComponentsWithClass(multiRangeWithDefaultValue, 'rc-slider-handle')[1]
      .style.cssText)
      .to.match(/left: 25%;/);
    expect(ReactTestUtils
      .scryRenderedDOMComponentsWithClass(multiRangeWithDefaultValue, 'rc-slider-handle')[2]
      .style.cssText)
      .to.match(/left: 50%;/);
    expect(ReactTestUtils
      .scryRenderedDOMComponentsWithClass(multiRangeWithDefaultValue, 'rc-slider-handle')[3]
      .style.cssText)
      .to.match(/left: 75%;/);

    const track1Style = ReactTestUtils
      .scryRenderedDOMComponentsWithClass(multiRangeWithDefaultValue, 'rc-slider-track-1')[0]
      .style.cssText;
    expect(track1Style).to.match(/left: 0%;/);
    expect(track1Style).to.match(/width: 25%;/);
    expect(track1Style).to.match(/visibility: visible;/);

    const track2Style = ReactTestUtils
      .scryRenderedDOMComponentsWithClass(multiRangeWithDefaultValue, 'rc-slider-track-2')[0]
      .style.cssText;
    expect(track2Style).to.match(/left: 25%;/);
    expect(track2Style).to.match(/width: 25%;/);
    expect(track2Style).to.match(/visibility: visible;/);

    const track3Style = ReactTestUtils
      .scryRenderedDOMComponentsWithClass(multiRangeWithDefaultValue, 'rc-slider-track-3')[0]
      .style.cssText;
    expect(track3Style).to.match(/left: 50%;/);
    expect(track3Style).to.match(/width: 25%;/);
    expect(track3Style).to.match(/visibility: visible;/);
  });

  it('should render a Range with value correctly', () => {
    const rangeWithValue = ReactDOM.render(<Slider range value={[50, 100]} />, div);
    expect(rangeWithValue.state.bounds[0]).to.be(50);
    expect(rangeWithValue.state.bounds[1]).to.be(100);
    expect(ReactTestUtils
           .scryRenderedDOMComponentsWithClass(rangeWithValue, 'rc-slider-handle')[0]
           .style.cssText)
      .to.match(/left: 50%;/);
    expect(ReactTestUtils
           .scryRenderedDOMComponentsWithClass(rangeWithValue, 'rc-slider-handle')[1]
           .style.cssText)
      .to.match(/left: 100%;/);

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
    expect(sliderWithMin.state.bounds[1]).to.be(10);
    ReactDOM.unmountComponentAtNode(div);

    const sliderWithMax = ReactDOM.render(<Slider value={100} max={90} />, div);
    expect(sliderWithMax.state.bounds[1]).to.be(90);
    ReactDOM.unmountComponentAtNode(div);

    const range = ReactDOM.render(<Slider range value={[0, 100]} min={10} max={90} />, div);
    expect(range.state.bounds[0]).to.be(10);
    expect(range.state.bounds[1]).to.be(90);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('should render a vertical slider, when `vertical` is true', () => {
    const slider = ReactDOM.render(<Slider vertical />, div);
    expect(ReactTestUtils.scryRenderedDOMComponentsWithClass(slider, 'rc-slider-vertical').length).to.be(1);
  });
});
