/* eslint-disable max-len, no-undef */
import React from 'react';
import { render, mount } from 'enzyme';
import { renderToJson } from 'enzyme-to-json';
import Range from '../src/Range';

describe('Range', () => {
  it('should render Range with correct DOM structure', () => {
    const wrapper = render(<Range />);
    expect(renderToJson(wrapper)).toMatchSnapshot();
  });

  it('should render Multi-Range with correct DOM structure', () => {
    const wrapper = render(<Range range={3} />);
    expect(renderToJson(wrapper)).toMatchSnapshot();
  });

  it('should render Range with default value correctly', () => {
    const wrapper = mount(<Range defaultValue={[0, 50]} />);
    expect(wrapper.state('bounds')[0]).toBe(0);
    expect(wrapper.state('bounds')[1]).toBe(50);
    expect(wrapper.find('.rc-slider-handle').get(0).style.cssText).toMatch(/left: 0%;/);
    expect(wrapper.find('.rc-slider-handle').get(1).style.cssText).toMatch(/left: 50%;/);

    const trackStyle = wrapper.find('.rc-slider-track').get(0).style.cssText;
    expect(trackStyle).toMatch(/left: 0%;/);
    expect(trackStyle).toMatch(/width: 50%;/);
    expect(trackStyle).toMatch(/visibility: visible;/);
  });

  it('should render Multi-Range with default value correctly', () => {
    const wrapper = mount(<Range range={3} defaultValue={[0, 25, 50, 75]} />);
    expect(wrapper.state('bounds')[0]).toBe(0);
    expect(wrapper.state('bounds')[1]).toBe(25);
    expect(wrapper.state('bounds')[2]).toBe(50);
    expect(wrapper.state('bounds')[3]).toBe(75);
    expect(wrapper.find('.rc-slider-handle').get(0).style.cssText).toMatch(/left: 0%;/);
    expect(wrapper.find('.rc-slider-handle').get(1).style.cssText).toMatch(/left: 25%;/);
    expect(wrapper.find('.rc-slider-handle').get(2).style.cssText).toMatch(/left: 50%;/);
    expect(wrapper.find('.rc-slider-handle').get(3).style.cssText).toMatch(/left: 75%;/);

    const track1Style = wrapper.find('.rc-slider-track').get(0).style.cssText;
    expect(track1Style).toMatch(/left: 0%;/);
    expect(track1Style).toMatch(/width: 25%;/);
    expect(track1Style).toMatch(/visibility: visible;/);

    const track2Style = wrapper.find('.rc-slider-track').get(1).style.cssText;
    expect(track2Style).toMatch(/left: 25%;/);
    expect(track2Style).toMatch(/width: 25%;/);
    expect(track2Style).toMatch(/visibility: visible;/);

    const track3Style = wrapper.find('.rc-slider-track').get(2).style.cssText;
    expect(track3Style).toMatch(/left: 50%;/);
    expect(track3Style).toMatch(/width: 25%;/);
    expect(track3Style).toMatch(/visibility: visible;/);
  });

  it('should render Range with value correctly', () => {
    const wrapper = mount(<Range value={[50, 100]} />);
    expect(wrapper.state('bounds')[0]).toBe(50);
    expect(wrapper.state('bounds')[1]).toBe(100);
    expect(wrapper.find('.rc-slider-handle').get(0).style.cssText).toMatch(/left: 50%;/);
    expect(wrapper.find('.rc-slider-handle').get(1).style.cssText).toMatch(/left: 100%;/);

    const trackStyle = wrapper.find('.rc-slider-track').get(0).style.cssText;
    expect(trackStyle).toMatch(/left: 50%;/);
    expect(trackStyle).toMatch(/width: 50%;/);
    expect(trackStyle).toMatch(/visibility: visible;/);
  });
});
