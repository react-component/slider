/* eslint-disable max-len, no-undef */
import React from 'react';
import { render, mount } from 'enzyme';
import { renderToJson } from 'enzyme-to-json';
import Slider from '../../src';
const { Range } = Slider;

describe('marks', () => {
  it('should render marks correctly when `marks` is not an empty object', () => {
    const marks = { 0: '0', 30: '30', 100: '100' };

    const sliderWrapper = mount(<Slider value={30} marks={marks} />);
    expect(sliderWrapper.find('.rc-slider-mark-text').length).toBe(3);
    expect(sliderWrapper.find('.rc-slider-mark-text').at(0).instance().innerHTML).toBe('0');
    expect(sliderWrapper.find('.rc-slider-mark-text').at(1).instance().innerHTML).toBe('30');
    expect(sliderWrapper.find('.rc-slider-mark-text').at(2).instance().innerHTML).toBe('100');

    const rangeWrapper = mount(<Range value={[0, 30]} marks={marks} />);
    expect(rangeWrapper.find('.rc-slider-mark-text').length).toBe(3);
    expect(rangeWrapper.find('.rc-slider-mark-text').at(0).instance().innerHTML).toBe('0');
    expect(rangeWrapper.find('.rc-slider-mark-text').at(1).instance().innerHTML).toBe('30');
    expect(rangeWrapper.find('.rc-slider-mark-text').at(2).instance().innerHTML).toBe('100');
  });

  it('should position mark correctly when slider is horizontal', () => {
    const marks = { 0: '0', 30: '30', 100: '100' };
    const rangeWrapper = render(<Range value={[0, 30]} marks={marks} />);
    expect(renderToJson(rangeWrapper)).toMatchSnapshot();
  });

  it('should handle different markFontSize', () => {
    const marks = { 0: 'zero', 30: '30', 100: '100' };
    const rangeWrapper = render(<Range value={[0, 30]} marks={marks} markFontSize={15} />);
    expect(renderToJson(rangeWrapper)).toMatchSnapshot();
  });

  it('should position mark correctly when slider is vertical', () => {
    const marks = { 0: '0', 30: '30', 100: '100' };
    const rangeWrapper = render(<Range value={[0, 30]} marks={marks} vertical />);
    expect(renderToJson(rangeWrapper)).toMatchSnapshot();
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
