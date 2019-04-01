/* eslint-disable max-len, no-undef, react/no-string-refs */
import React from 'react';
import { render, mount } from 'enzyme';
import keyCode from 'rc-util/lib/KeyCode';
import Range from '../src/Range';
import createSliderWithTooltip from '../src/createSliderWithTooltip';

const RangeWithTooltip = createSliderWithTooltip(Range);

describe('Range', () => {
  it('should render Range with correct DOM structure', () => {
    const wrapper = render(<Range />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render Multi-Range with correct DOM structure', () => {
    const wrapper = render(<Range count={3} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render Range with value correctly', () => {
    const wrapper = mount(<Range value={[0, 50]} />);
    expect(wrapper.state('bounds')[0]).toBe(0);
    expect(wrapper.state('bounds')[1]).toBe(50);
    expect(wrapper.find('.rc-slider-handle > .rc-slider-handle').at(0).props().style.left).toMatch('0%');
    expect(wrapper.find('.rc-slider-handle > .rc-slider-handle').at(1).props().style.left).toMatch('50%');

    const trackStyle = wrapper.find('.rc-slider-track > .rc-slider-track').at(0).props().style;
    expect(trackStyle.left).toMatch('0%');
    expect(trackStyle.width).toMatch('50%');
  });

  it('should render Range with tabIndex correctly', () => {
    const wrapper = mount(<Range tabIndex={[1, 2]} />);
    expect(wrapper.find('.rc-slider-handle > .rc-slider-handle').at(0).props().tabIndex).toEqual(1);
    expect(wrapper.find('.rc-slider-handle > .rc-slider-handle').at(1).props().tabIndex).toEqual(2);
  });

  it('should render Range without tabIndex (equal null) correctly', () => {
    const wrapper = mount(<Range tabIndex={[null, null]} />);
    const firstHandle = wrapper.find('.rc-slider-handle > .rc-slider-handle').at(0).getDOMNode();
    const secondHandle = wrapper.find('.rc-slider-handle > .rc-slider-handle').at(1).getDOMNode();
    expect(firstHandle.hasAttribute('tabIndex')).toEqual(false);
    expect(secondHandle.hasAttribute('tabIndex')).toEqual(false);
  });

  it('it should trigger onAfterChange when key pressed', () => {
    const onAfterChange = jest.fn();
    const wrapper = mount(<Range defaultValue={[20, 50]} onAfterChange={onAfterChange} />);

    const secondHandle = wrapper.find('.rc-slider-handle > .rc-slider-handle').at(1);
    wrapper.simulate('focus');
    secondHandle.simulate('keyDown', { keyCode: keyCode.RIGHT });

    expect(onAfterChange).toBeCalled();
  });

  it('should render Multi-Range with value correctly', () => {
    const wrapper = mount(<Range count={3} value={[0, 25, 50, 75]} />);
    expect(wrapper.state('bounds')[0]).toBe(0);
    expect(wrapper.state('bounds')[1]).toBe(25);
    expect(wrapper.state('bounds')[2]).toBe(50);
    expect(wrapper.state('bounds')[3]).toBe(75);
    expect(wrapper.find('.rc-slider-handle > .rc-slider-handle').at(0).props().style.left).toMatch('0%');
    expect(wrapper.find('.rc-slider-handle > .rc-slider-handle').at(1).props().style.left).toMatch('25%');
    expect(wrapper.find('.rc-slider-handle > .rc-slider-handle').at(2).props().style.left).toMatch('50%');
    expect(wrapper.find('.rc-slider-handle > .rc-slider-handle').at(3).props().style.left).toMatch('75%');

    const track1Style = wrapper.find('.rc-slider-track > .rc-slider-track').at(0).props().style;
    expect(track1Style.left).toMatch('0%');
    expect(track1Style.width).toMatch('25%');

    const track2Style = wrapper.find('.rc-slider-track > .rc-slider-track').at(1).props().style;
    expect(track2Style.left).toMatch('25%');
    expect(track2Style.width).toMatch('25%');

    const track3Style = wrapper.find('.rc-slider-track > .rc-slider-track').at(2).props().style;
    expect(track3Style.left).toMatch('50%');
    expect(track3Style.width).toMatch('25%');
  });

  it('should update Range correctly in controllered model', () => {
    class TestParent extends React.Component { // eslint-disable-line
      state = {
        value: [2, 4, 6],
      }
      getSlider() {
        return this.refs.slider;
      }
      render() {
        return <Range ref="slider" value={this.state.value}/>;
      }
    }
    const wrapper = mount(<TestParent/>);

    expect(wrapper.instance().getSlider().state.bounds.length).toBe(3);
    expect(wrapper.find('.rc-slider-handle > .rc-slider-handle').length).toBe(3);
    wrapper.setState({ value: [2, 4] });
    expect(wrapper.instance().getSlider().state.bounds.length).toBe(2);
    expect(wrapper.find('.rc-slider-handle > .rc-slider-handle').length).toBe(2);
  });

  it('should only update bounds that are out of range', () => {
    const props = { min: 0, max: 10000, value: [0.01, 10000], onChange: jest.fn() };
    const range = mount(<Range {...props} step={0.1} />);
    range.setProps({ min: 0, max: 500 });

    expect(props.onChange).toHaveBeenCalledWith([0.01, 500]);
  });

  it('should only update bounds if they are out of range', () => {
    const props = { min: 0, max: 10000, value: [0.01, 10000], onChange: jest.fn() };
    const range = mount(<Range {...props} />);
    range.setProps({ min: 0, max: 500, value: [0.01, 466] });

    expect(props.onChange).toHaveBeenCalledTimes(0);
  });

  // https://github.com/react-component/slider/pull/256
  it('should handle mutli handle mouseEnter correctly', () => {
    const wrapper = mount(<RangeWithTooltip min={0} max={1000} defaultValue={[50, 55]} />);
    wrapper.find('.rc-slider-handle').at(1).simulate('mouseEnter');
    expect(wrapper.state().visibles[0]).toBe(true);
    wrapper.find('.rc-slider-handle').at(3).simulate('mouseEnter');
    expect(wrapper.state().visibles[1]).toBe(true);
    wrapper.find('.rc-slider-handle').at(1).simulate('mouseLeave');
    expect(wrapper.state().visibles[0]).toBe(false);
    wrapper.find('.rc-slider-handle').at(3).simulate('mouseLeave');
    expect(wrapper.state().visibles[1]).toBe(false);
  });

  it('should keep pushable when not allowCross and setState', () => {
    class CustomizedRange extends React.Component { // eslint-disable-line
      constructor(props) {
        super(props);
        this.state = {
          value: [20, 40],
        };
      }
      getSlider() {
        return this.refs.slider;
      }
      render() {
        return <Range ref="slider" allowCross={false} value={this.state.value} pushable={10} />;
      }
    }
    const wrapper = mount(<CustomizedRange />);
    expect(wrapper.instance().getSlider().state.bounds[0]).toBe(20);
    expect(wrapper.instance().getSlider().state.bounds[1]).toBe(40);
    wrapper.setState({ value: [30, 40] });
    expect(wrapper.instance().getSlider().state.bounds[0]).toBe(30);
    expect(wrapper.instance().getSlider().state.bounds[1]).toBe(40);
    wrapper.setState({ value: [35, 40] });
    expect(wrapper.instance().getSlider().state.bounds[0]).toBe(30);
    expect(wrapper.instance().getSlider().state.bounds[1]).toBe(40);
    wrapper.setState({ value: [30, 30] });
    expect(wrapper.instance().getSlider().state.bounds[0]).toBe(30);
    expect(wrapper.instance().getSlider().state.bounds[1]).toBe(40);
  });

  it('should keep pushable with pushable s defalutValue when not allowCross and setState', () => {
    class CustomizedRange extends React.Component { // eslint-disable-line
      constructor(props) {
        super(props);
        this.state = {
          value: [20, 40],
        };
        this.onChange = this.onChange.bind(this);
      }
      onChange(value) {
        this.setState({
          value,
        });
      }
      getSlider() {
        return this.refs.slider;
      }
      render() {
        return <Range ref="slider" allowCross={false} value={this.state.value} pushable onChange={this.onChange} />;
      }
    }
    const map = {};
    document.addEventListener = jest.fn().mockImplementation((event, cb) => {
      map[event] = cb;
    });

    const mockRect = (wrapper) => {
      wrapper.instance().getSlider().sliderRef.getBoundingClientRect = () => ({
        left: 0,
        width: 100,
      });
    };

    const container = document.createElement('div');
    document.body.appendChild(container);

    const wrapper = mount(<CustomizedRange />, { attachTo: container });
    mockRect(wrapper);

    expect(wrapper.instance().getSlider().state.bounds[0]).toBe(20);
    expect(wrapper.instance().getSlider().state.bounds[1]).toBe(40);

    wrapper.find('.rc-slider').simulate('mouseDown', { button: 0, pageX: 0, pageY: 0 });
    map.mousemove({ type: 'mousemove', pageX: 30, pageY: 0 });
    map.mouseup({ type: 'mouseup', pageX: 30, pageY: 0 });

    expect(wrapper.instance().getSlider().state.bounds[0]).toBe(30);
    expect(wrapper.instance().getSlider().state.bounds[1]).toBe(40);

    wrapper.find('.rc-slider').simulate('mouseDown', { button: 0, pageX: 0, pageY: 0 });
    map.mousemove({ type: 'mousemove', pageX: 50, pageY: 0 });
    map.mouseup({ type: 'mouseup', pageX: 50, pageY: 0 });
    expect(wrapper.instance().getSlider().state.bounds[0]).toBe(39);
    expect(wrapper.instance().getSlider().state.bounds[1]).toBe(40);
  });

  describe('focus & blur', () => {
    let container;

    beforeEach(() => {
      container = document.createElement('div');
      document.body.appendChild(container);
    });

    afterEach(() => {
      document.body.removeChild(container);
    });

    const mockRect = (wrapper) => {
      wrapper.instance().sliderRef.getBoundingClientRect = () => ({
        left: 10,
        width: 100,
      });
    };

    it('focus()', () => {
      const handleFocus = jest.fn();
      const wrapper = mount(
        <Range min={0} max={20} onFocus={handleFocus} />,
        { attachTo: container }
      );
      mockRect(wrapper);
      wrapper.instance().focus();
      expect(handleFocus).toBeCalled();
    });

    it('blur', () => {
      const handleBlur = jest.fn();
      const wrapper = mount(
        <Range min={0} max={20} onBlur={handleBlur} />,
        { attachTo: container }
      );
      mockRect(wrapper);
      wrapper.instance().focus();
      wrapper.instance().blur();
      expect(handleBlur).toBeCalled();
    });
  });
});
