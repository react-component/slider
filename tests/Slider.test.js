/* eslint-disable max-len, no-undef */
import React from 'react';
import { render, mount } from 'enzyme';
import { renderToJson } from 'enzyme-to-json';
import Slider from '../src/Slider';

describe('Slider', () => {
  it('should render Slider with correct DOM structure', () => {
    const wrapper = render(<Slider />);
    expect(renderToJson(wrapper)).toMatchSnapshot();
  });

  it('should render Slider with default value correctly', () => {
    const wrapper = mount(<Slider defaultValue={50} />);
    expect(wrapper.state('value')).toBe(50);
    expect(wrapper.find('.rc-slider-handle').get(0).style.cssText).toMatch(/left: 50%;/);

    const trackStyle = wrapper.find('.rc-slider-track').get(0).style.cssText;
    expect(trackStyle).toMatch(/left: 0%;/);
    expect(trackStyle).toMatch(/width: 50%;/);
    expect(trackStyle).toMatch(/visibility: visible;/);
  });

  it('should render Slider with value correctly', () => {
    const wrapper = mount(<Slider value={50} />);
    expect(wrapper.state('value')).toBe(50);
    expect(wrapper.find('.rc-slider-handle').get(0).style.cssText).toMatch(/left: 50%;/);

    const trackStyle = wrapper.find('.rc-slider-track').get(0).style.cssText;
    expect(trackStyle).toMatch(/left: 0%;/);
    expect(trackStyle).toMatch(/width: 50%;/);
    expect(trackStyle).toMatch(/visibility: visible;/);
  });

  it('should render a vertical slider, when `vertical` is true', () => {
    const wrapper = mount(<Slider vertical />);
    expect(wrapper.find('.rc-slider-vertical').length).toBe(1);
  });
});
