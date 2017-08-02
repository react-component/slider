/* eslint-disable max-len, no-undef */
import React from 'react';
import { mount } from 'enzyme';
import Slider from '../../src';
const { Range } = Slider;

describe('marks', () => {
  it('should render marks correctly when `marks` is not an empty object', () => {
    const marks = { 0: '0', 30: '30', 100: '100' };

    const sliderWrapper = mount(<Slider value={30} marks={marks} />);
    expect(sliderWrapper.find('.rc-slider-mark-text').length).toBe(3);
    expect(sliderWrapper.find('.rc-slider-mark-text').get(0).innerHTML).toBe('0');
    expect(sliderWrapper.find('.rc-slider-mark-text').get(1).innerHTML).toBe('30');
    expect(sliderWrapper.find('.rc-slider-mark-text').get(2).innerHTML).toBe('100');

    const rangeWrapper = mount(<Range value={[0, 30]} marks={marks} />);
    expect(rangeWrapper.find('.rc-slider-mark-text').length).toBe(3);
    expect(rangeWrapper.find('.rc-slider-mark-text').get(0).innerHTML).toBe('0');
    expect(rangeWrapper.find('.rc-slider-mark-text').get(1).innerHTML).toBe('30');
    expect(rangeWrapper.find('.rc-slider-mark-text').get(2).innerHTML).toBe('100');
  });

  it.skip('should select correct value while click on marks', () => {
    const marks = { 0: '0', 30: '30', 100: '100' };

    const sliderWrapper = mount(<Slider marks={marks} />);
    sliderWrapper.node.sliderRef.clientWidth = 100; // jsdom doesn't provide clientWidth
    const sliderMark = sliderWrapper.find('.rc-slider-mark-text').get(1);
    sliderWrapper.simulate('mousedown', {
      type: 'mousedown',
      target: sliderMark,
      pageX: 25, button: 0,
      stopPropagation() {},
      preventDefault() {},
    });
    expect(sliderWrapper.state('value')).toBe(30);

    const rangeWrapper = mount(<Range marks={marks} />);
    rangeWrapper.node.sliderRef.clientWidth = 100; // jsdom doesn't provide clientWidth
    const rangeMark = rangeWrapper.find('.rc-slider-mark-text').get(1);
    rangeWrapper.simulate('mousedown', {
      type: 'mousedown',
      target: rangeMark,
      pageX: 25, button: 0,
      stopPropagation() {},
      preventDefault() {},
    });
    expect(rangeWrapper.state('bounds')).toBe([0, 30]);
  });
});
