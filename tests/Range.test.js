/* eslint-disable max-len, no-undef */
import React from 'react';
import { render, mount } from 'enzyme';
import { renderToJson } from 'enzyme-to-json';
import Range from '../src/Range';
import createSliderWithTooltip from '../src/createSliderWithTooltip';

const RangeWithTooltip = createSliderWithTooltip(Range);

describe('Range', () => {
  it('should render Range with correct DOM structure', () => {
    const wrapper = render(<Range />);
    expect(renderToJson(wrapper)).toMatchSnapshot();
  });

  it('should render Multi-Range with correct DOM structure', () => {
    const wrapper = render(<Range count={3} />);
    expect(renderToJson(wrapper)).toMatchSnapshot();
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
    expect(trackStyle.visibility).toMatch('visible');
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
    expect(track1Style.visibility).toMatch('visible');

    const track2Style = wrapper.find('.rc-slider-track > .rc-slider-track').at(1).props().style;
    expect(track2Style.left).toMatch('25%');
    expect(track2Style.width).toMatch('25%');
    expect(track2Style.visibility).toMatch('visible');

    const track3Style = wrapper.find('.rc-slider-track > .rc-slider-track').at(2).props().style;
    expect(track3Style.left).toMatch('50%');
    expect(track3Style.width).toMatch('25%');
    expect(track3Style.visibility).toMatch('visible');
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
});
