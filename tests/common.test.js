/* eslint-disable max-len, no-undef */
import React from 'react';
import { mount } from 'enzyme';
import Slider from '..';
const { Range } = Slider;

describe('createSlider', () => {
  it('should render vertical Slider/Range, when `vertical` is true', () => {
    const sliderWrapper = mount(<Slider vertical />);
    expect(sliderWrapper.find('.rc-slider-vertical').length).toBe(1);

    const rangeWrapper = mount(<Range vertical />);
    expect(rangeWrapper.find('.rc-slider-vertical').length).toBe(1);
  });

  it('should render dots correctly when `dots=true`', () => {
    const sliderWrapper = mount(<Slider value={50} step={10} dots />);
    expect(sliderWrapper.find('.rc-slider-dot').length).toBe(11);
    expect(sliderWrapper.find('.rc-slider-dot-active').length).toBe(6);

    const rangeWrapper = mount(<Range value={[20, 50]} step={10} dots />);
    expect(rangeWrapper.find('.rc-slider-dot').length).toBe(11);
    expect(rangeWrapper.find('.rc-slider-dot-active').length).toBe(4);
  });

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

  it('should not set value greater than `max` or smaller `min`', () => {
    const sliderWithMinWrapper = mount(<Slider value={0} min={10} />);
    expect(sliderWithMinWrapper.state('value')).toBe(10);

    const sliderWithMaxWrapper = mount(<Slider value={100} max={90} />);
    expect(sliderWithMaxWrapper.state('value')).toBe(90);

    const rangeWrapper = mount(<Range value={[0, 100]} min={10} max={90} />);
    expect(rangeWrapper.state('bounds')[0]).toBe(10);
    expect(rangeWrapper.state('bounds')[1]).toBe(90);
  });

  it('should update value when it is out of range', () => {
    const sliderOnChange = jest.fn();
    const sliderWrapper = mount(<Slider onChange={sliderOnChange} />);
    sliderWrapper.setProps({ min: 10 });
    expect(sliderWrapper.state('value')).toBe(10);
    expect(sliderOnChange).toHaveBeenCalledWith(10);

    const rangeOnChange = jest.fn();
    const rangeWrapper = mount(<Range onChange={rangeOnChange} />);
    rangeWrapper.setProps({ min: 10 });
    expect(rangeWrapper.state('bounds')).toEqual([10, 10]);
    expect(rangeOnChange).toHaveBeenCalledWith([10, 10]);
  });

  it('should not call onChange when value is the same', () => {
    const handler = jest.fn();

    const sliderWrapper = mount(<Slider onChange={handler}/>);
    const sliderHandleWrapper = sliderWrapper.find('.rc-slider-handle');
    sliderHandleWrapper.simulate('mousedown');
    sliderHandleWrapper.simulate('mousemove');
    sliderHandleWrapper.simulate('mouseup');

    const rangeWrapper = mount(<Range onChange={handler}/>);
    const rangeHandleWrapper = rangeWrapper.find('.rc-slider-handle-1');
    rangeHandleWrapper.simulate('mousedown');
    rangeHandleWrapper.simulate('mousemove');
    rangeHandleWrapper.simulate('mouseup');

    expect(handler).not.toHaveBeenCalled();
  });


  // TODO: should update the following test cases for it should test API instead implementation
  it('should set `dragOffset` to correct value when the left handle is clicked off-center', () => {
    const wrapper = mount(<Slider />);
    wrapper.node.sliderRef.clientWidth = 100; // jsdom doesn't provide clientWidth
    const leftHandle = wrapper.find('.rc-slider-handle').get(0);
    wrapper.simulate('mousedown', {
      type: 'mousedown',
      target: leftHandle,
      pageX: 5, button: 0,
      stopPropagation() {},
      preventDefault() {},
    });
    expect(wrapper.node.dragOffset).toBe(5);
  });

  it('should respect `dragOffset` while dragging the handle via MouseEvents', () => {
    const wrapper = mount(<Slider />);
    wrapper.node.sliderRef.clientWidth = 100; // jsdom doesn't provide clientWidth
    const leftHandle = wrapper.find('.rc-slider-handle').get(0);
    wrapper.simulate('mousedown', {
      type: 'mousedown',
      target: leftHandle,
      pageX: 5, button: 0,
      stopPropagation() {},
      preventDefault() {},
    });
    expect(wrapper.node.dragOffset).toBe(5);
    wrapper.node.onMouseMove({ // to propagation
      type: 'mousemove',
      target: leftHandle,
      pageX: 14, button: 0,
      stopPropagation() {},
      preventDefault() {},
    });
    expect(wrapper.node.getValue()).toBe(9);
  });

  it('should not go to right direction when mouse go to the left', () => {
    const wrapper = mount(<Slider />);
    wrapper.node.sliderRef.clientWidth = 100; // jsdom doesn't provide clientWidth
    const leftHandle = wrapper.find('.rc-slider-handle').get(0);
    wrapper.simulate('mousedown', {
      type: 'mousedown',
      target: leftHandle,
      pageX: 5, button: 0,
      stopPropagation() {},
      preventDefault() {},
    });
    expect(wrapper.node.getValue()).toBe(0); // zero on start
    wrapper.node.onMouseMove({ // to propagation
      type: 'mousemove',
      target: leftHandle,
      pageX: 0, button: 0,
      stopPropagation() {},
      preventDefault() {},
    });
    expect(wrapper.node.getValue()).toBe(0); // still zero
  });

  it('should set `dragOffset` to 0 when the MouseEvent target isn\'t a handle', () => {
    const wrapper = mount(<Slider />);
    wrapper.node.sliderRef.clientWidth = 100; // jsdom doesn't provide clientWidth
    const sliderTrack = wrapper.find('.rc-slider-track').get(0);
    wrapper.simulate('mousedown', {
      type: 'mousedown',
      target: sliderTrack,
      pageX: 5, button: 0,
      stopPropagation() {},
      preventDefault() {},
    });
    expect(wrapper.node.dragOffset).toBe(0);
  });

  it('should set `dragOffset` to correct value when the left handle is touched off-center', () => {
    const wrapper = mount(<Slider />);
    wrapper.node.sliderRef.clientWidth = 100; // jsdom doesn't provide clientWidth
    const leftHandle = wrapper.find('.rc-slider-handle').get(0);
    wrapper.simulate('touchstart', {
      type: 'touchstart',
      target: leftHandle,
      touches: [{ pageX: 5 }],
      stopPropagation() {},
      preventDefault() {},
    });
    expect(wrapper.node.dragOffset).toBe(5);
  });

  it('should respect `dragOffset` while dragging the handle via TouchEvents', () => {
    const wrapper = mount(<Slider />);
    wrapper.node.sliderRef.clientWidth = 100; // jsdom doesn't provide clientWidth
    const leftHandle = wrapper.find('.rc-slider-handle').get(0);
    wrapper.simulate('touchstart', {
      type: 'touchstart',
      target: leftHandle,
      touches: [{ pageX: 5 }],
      stopPropagation() {},
      preventDefault() {},
    });
    expect(wrapper.node.dragOffset).toBe(5);
    wrapper.node.onTouchMove({ // to propagation
      type: 'touchmove',
      target: leftHandle,
      touches: [{ pageX: 14 }],
      stopPropagation() {},
      preventDefault() {},
    });
    expect(wrapper.node.getValue()).toBe(9);
  });

  it('should set `dragOffset` to 0 when the TouchEvent target isn\'t a handle', () => {
    const wrapper = mount(<Slider />);
    wrapper.node.sliderRef.clientWidth = 100; // jsdom doesn't provide clientWidth
    const sliderTrack = wrapper.find('.rc-slider-track').get(0);
    wrapper.simulate('touchstart', {
      type: 'touchstart',
      target: sliderTrack,
      touches: [{ pageX: 5 }],
      stopPropagation() {},
      preventDefault() {},
    });
    expect(wrapper.node.dragOffset).toBe(0);
  });

  it('Should remove event listeners if unmounted during drag', () => {
    const wrapper = mount(<Slider />);
    wrapper.node.sliderRef.clientWidth = 100; // jsdom doesn't provide clientWidth
    const sliderTrack = wrapper.find('.rc-slider-track').get(0);
    wrapper.simulate('touchstart', {
      type: 'touchstart',
      target: sliderTrack,
      touches: [{ pageX: 5 }],
      stopPropagation() {},
      preventDefault() {},
    });
    expect(wrapper.getNode().onTouchUpListener).toBeTruthy();
    wrapper.getNode().onTouchUpListener.remove = jest.fn();
    wrapper.unmount();
    expect(wrapper.getNode().onTouchUpListener.remove).toHaveBeenCalled();
  });
});
