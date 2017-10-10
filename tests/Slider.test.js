/* eslint-disable max-len, no-undef */
import React from 'react';
import { render, mount } from 'enzyme';
import { renderToJson } from 'enzyme-to-json';
import keyCode from 'rc-util/lib/KeyCode';
import Slider from '../src/Slider';

describe('Slider', () => {
  it('should render Slider with correct DOM structure', () => {
    const wrapper = render(<Slider />);
    expect(renderToJson(wrapper)).toMatchSnapshot();
  });

  it('should render Slider with value correctly', () => {
    const wrapper = mount(<Slider value={50} />);
    expect(wrapper.state('value')).toBe(50);
    expect(wrapper.find('.rc-slider-handle').at(1).props().style.left).toMatch('50%');

    const trackStyle = wrapper.find('.rc-slider-track').at(1).props().style;
    expect(trackStyle.left).toMatch('0%');
    expect(trackStyle.width).toMatch('50%');
    expect(trackStyle.visibility).toMatch('visible');
  });

  it('increments the value when key "up" was pressed', () => {
    const wrapper = mount(<Slider defaultValue={50} />);
    const handler = wrapper.find('.rc-slider-handle').at(1);

    wrapper.simulate('focus');
    handler.simulate('keyDown', { keyCode: keyCode.UP });

    expect(wrapper.state('value')).toBe(51);
  });

  it('increments the value when key "right" was pressed', () => {
    const wrapper = mount(<Slider defaultValue={50} />);
    const handler = wrapper.find('.rc-slider-handle').at(1);

    wrapper.simulate('focus');
    handler.simulate('keyDown', { keyCode: keyCode.RIGHT });

    expect(wrapper.state('value')).toBe(51);
  });

  it('increases the value when key "page up" was pressed, by a factor 2', () => {
    const wrapper = mount(<Slider defaultValue={50} />);
    const handler = wrapper.find('.rc-slider-handle').at(1);

    wrapper.simulate('focus');
    handler.simulate('keyDown', { keyCode: keyCode.PAGE_UP });

    expect(wrapper.state('value')).toBe(52);
  });

  it('decreases the value when key "down" was pressed', () => {
    const wrapper = mount(<Slider defaultValue={50} />);
    const handler = wrapper.find('.rc-slider-handle').at(1);

    wrapper.simulate('focus');
    handler.simulate('keyDown', { keyCode: keyCode.DOWN });

    expect(wrapper.state('value')).toBe(49);
  });

  it('decreases the value when key "left" was pressed', () => {
    const wrapper = mount(<Slider defaultValue={50} />);
    const handler = wrapper.find('.rc-slider-handle').at(1);

    wrapper.simulate('focus');
    handler.simulate('keyDown', { keyCode: keyCode.LEFT });

    expect(wrapper.state('value')).toBe(49);
  });

  it('decreases the value when key "page down" was pressed, by a factor 2', () => {
    const wrapper = mount(<Slider defaultValue={50} />);
    const handler = wrapper.find('.rc-slider-handle').at(1);

    wrapper.simulate('focus');
    handler.simulate('keyDown', { keyCode: keyCode.PAGE_DOWN });

    expect(wrapper.state('value')).toBe(48);
  });

  it('sets the value to minimum when key "home" was pressed', () => {
    const wrapper = mount(<Slider defaultValue={50} />);
    const handler = wrapper.find('.rc-slider-handle').at(1);

    wrapper.simulate('focus');
    handler.simulate('keyDown', { keyCode: keyCode.HOME });

    expect(wrapper.state('value')).toBe(0);
  });

  it('sets the value to maximum when the key "end" was pressed', () => {
    const wrapper = mount(<Slider defaultValue={50} />);
    const handler = wrapper.find('.rc-slider-handle').at(1);

    wrapper.simulate('focus');
    handler.simulate('keyDown', { keyCode: keyCode.END });

    expect(wrapper.state('value')).toBe(100);
  });
});
