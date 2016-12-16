/* eslint-disable max-len */
/* eslint-env mocha */
const expect = require('expect.js');
const React = require('react');
const ReactDOM = require('react-dom');
const ReactTestUtils = require('react-addons-test-utils');
const Slider = require('../src/Slider');

function createSliderWrapperComponent() {
  return class SliderWrapper extends React.Component {
    render() {
      return (
        <div style={{ position: `absolute`, width: `100px`, height: `10px` }}>
          <Slider ref="slider"/>
        </div>
      );
    }
  };
}

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

  it('should render a Slider with value correctly', () => {
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

  it('should render dots correctly when `dots=true`', () => {
    const slider = ReactDOM.render(<Slider value={50} step={10} dots />, div);
    expect(ReactTestUtils.scryRenderedDOMComponentsWithClass(slider, 'rc-slider-dot').length).to.be(11);
    expect(ReactTestUtils.scryRenderedDOMComponentsWithClass(slider, 'rc-slider-dot-active').length).to.be(6);
  });

  it('should render marks correctly when `marks` is not an empty object', () => {
    const marks = { 0: '0', 30: '30', 100: '100' };

    const slider = ReactDOM.render(<Slider value={30} marks={marks} />, div);
    expect(ReactTestUtils.scryRenderedDOMComponentsWithClass(slider, 'rc-slider-mark-text').length).to.be(3);
    expect(ReactTestUtils.scryRenderedDOMComponentsWithClass(slider, 'rc-slider-mark-text')[0].innerHTML).to.be('0');
    expect(ReactTestUtils.scryRenderedDOMComponentsWithClass(slider, 'rc-slider-mark-text')[1].innerHTML).to.be('30');
    expect(ReactTestUtils.scryRenderedDOMComponentsWithClass(slider, 'rc-slider-mark-text')[2].innerHTML).to.be('100');
  });

  it('should not set value greater than `max` or smaller `min`', () => {
    const sliderWithMin = ReactDOM.render(<Slider value={0} min={10} />, div);
    expect(sliderWithMin.state.bounds[1]).to.be(10);
    ReactDOM.unmountComponentAtNode(div);

    const sliderWithMax = ReactDOM.render(<Slider value={100} max={90} />, div);
    expect(sliderWithMax.state.bounds[1]).to.be(90);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('should set `dragOffset` to correct value when the left handle is clicked off-center', () => {
    const slider = ReactDOM.render(<Slider />, div);
    const leftHandle = ReactTestUtils.scryRenderedDOMComponentsWithClass(slider, 'rc-slider-handle')[0];
    slider.onMouseDown({
      type: 'mousedown',
      target: leftHandle,
      pageX: 5, button: 0,
      stopPropagation() {},
      preventDefault() {},
    });
    expect(slider.dragOffset).to.be(5);
  });

  it('should respect `dragOffset` while dragging the handle via MouseEvents', () => {
    const SliderWrapper = createSliderWrapperComponent();
    const slider = ReactDOM.render(<SliderWrapper/>, div).refs.slider;
    const leftHandle = ReactTestUtils.scryRenderedDOMComponentsWithClass(slider, 'rc-slider-handle')[0];
    slider.onMouseDown({
      type: 'mousedown',
      target: leftHandle,
      pageX: 5, button: 0,
      stopPropagation() {},
      preventDefault() {},
    });
    expect(slider.dragOffset).to.be(5);
    slider.onMouseMove({
      type: 'mousemove',
      target: leftHandle,
      pageX: 14, button: 0,
      stopPropagation() {},
      preventDefault() {},
    });
    expect(slider.getValue()).to.be(9);
  });

  it('should set `dragOffset` to 0 when the MouseEvent target isn\'t a handle', () => {
    const slider = ReactDOM.render(<Slider />, div);
    const sliderTrack = ReactTestUtils.scryRenderedDOMComponentsWithClass(slider, 'rc-slider-track')[0];
    slider.onMouseDown({
      type: 'mousedown',
      target: sliderTrack,
      pageX: 5, button: 0,
      stopPropagation() {},
      preventDefault() {},
    });
    expect(slider.dragOffset).to.be(0);
  });

  it('should set `dragOffset` to correct value when the left handle is touched off-center', () => {
    const slider = ReactDOM.render(<Slider />, div);
    const leftHandle = ReactTestUtils.scryRenderedDOMComponentsWithClass(slider, 'rc-slider-handle')[0];
    slider.onTouchStart({
      type: 'touchstart',
      target: leftHandle,
      touches: [{ pageX: 5 }],
      stopPropagation() {},
      preventDefault() {},
    });
    expect(slider.dragOffset).to.be(5);
  });

  it('should respect `dragOffset` while dragging the handle via TouchEvents', () => {
    const SliderWrapper = createSliderWrapperComponent();
    const slider = ReactDOM.render(<SliderWrapper/>, div).refs.slider;
    const leftHandle = ReactTestUtils.scryRenderedDOMComponentsWithClass(slider, 'rc-slider-handle')[0];
    slider.onTouchStart({
      type: 'touchstart',
      target: leftHandle,
      touches: [{ pageX: 5 }],
      stopPropagation() {},
      preventDefault() {},
    });
    expect(slider.dragOffset).to.be(5);
    slider.onTouchMove({
      type: 'touchmove',
      target: leftHandle,
      touches: [{ pageX: 14 }],
      stopPropagation() {},
      preventDefault() {},
    });
    expect(slider.getValue()).to.be(9);
  });

  it('should set `dragOffset` to 0 when the TouchEvent target isn\'t a handle', () => {
    const slider = ReactDOM.render(<Slider />, div);
    const sliderTrack = ReactTestUtils.scryRenderedDOMComponentsWithClass(slider, 'rc-slider-track')[0];
    slider.onTouchStart({
      type: 'touchstart',
      target: sliderTrack,
      touches: [{ pageX: 5 }],
      stopPropagation() {},
      preventDefault() {},
    });
    expect(slider.dragOffset).to.be(0);
  });
});
