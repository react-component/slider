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

  it('should allow tabIndex to be set on Handle via Slider', () => {
    const wrapper = mount(<Slider tabIndex={1} />);
    expect(wrapper.find('.rc-slider-handle').at(1).props().tabIndex).toEqual(1);
  });

  it('increases the value when key "up" is pressed', () => {
    const wrapper = mount(<Slider defaultValue={50} />);
    const handler = wrapper.find('.rc-slider-handle').at(1);

    wrapper.simulate('focus');
    handler.simulate('keyDown', { keyCode: keyCode.UP });

    expect(wrapper.state('value')).toBe(51);
  });

  it('increases the value when key "right" is pressed', () => {
    const wrapper = mount(<Slider defaultValue={50} />);
    const handler = wrapper.find('.rc-slider-handle').at(1);

    wrapper.simulate('focus');
    handler.simulate('keyDown', { keyCode: keyCode.RIGHT });

    expect(wrapper.state('value')).toBe(51);
  });

  it('increases the value when key "page up" is pressed, by a factor 2', () => {
    const wrapper = mount(<Slider defaultValue={50} />);
    const handler = wrapper.find('.rc-slider-handle').at(1);

    wrapper.simulate('focus');
    handler.simulate('keyDown', { keyCode: keyCode.PAGE_UP });

    expect(wrapper.state('value')).toBe(52);
  });

  it('decreases the value when key "down" is pressed', () => {
    const wrapper = mount(<Slider defaultValue={50} />);
    const handler = wrapper.find('.rc-slider-handle').at(1);

    wrapper.simulate('focus');
    handler.simulate('keyDown', { keyCode: keyCode.DOWN });

    expect(wrapper.state('value')).toBe(49);
  });

  it('decreases the value when key "left" is pressed', () => {
    const wrapper = mount(<Slider defaultValue={50} />);
    const handler = wrapper.find('.rc-slider-handle').at(1);

    wrapper.simulate('focus');
    handler.simulate('keyDown', { keyCode: keyCode.LEFT });

    expect(wrapper.state('value')).toBe(49);
  });

  it('decreases the value when key "page down" is pressed, by a factor 2', () => {
    const wrapper = mount(<Slider defaultValue={50} />);
    const handler = wrapper.find('.rc-slider-handle').at(1);

    wrapper.simulate('focus');
    handler.simulate('keyDown', { keyCode: keyCode.PAGE_DOWN });

    expect(wrapper.state('value')).toBe(48);
  });

  it('sets the value to minimum when key "home" is pressed', () => {
    const wrapper = mount(<Slider defaultValue={50} />);
    const handler = wrapper.find('.rc-slider-handle').at(1);

    wrapper.simulate('focus');
    handler.simulate('keyDown', { keyCode: keyCode.HOME });

    expect(wrapper.state('value')).toBe(0);
  });

  it('sets the value to maximum when the key "end" is pressed', () => {
    const wrapper = mount(<Slider defaultValue={50} />);
    const handler = wrapper.find('.rc-slider-handle').at(1);

    wrapper.simulate('focus');
    handler.simulate('keyDown', { keyCode: keyCode.END });

    expect(wrapper.state('value')).toBe(100);
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
        <Slider min={0} max={10} defaultValue={0} onFocus={handleFocus} />,
        { attachTo: container }
      );
      mockRect(wrapper);
      wrapper.instance().focus();
      expect(handleFocus).toBeCalled();
    });

    it('blur', () => {
      const handleBlur = jest.fn();
      const wrapper = mount(
        <Slider min={0} max={10} defaultValue={0} onBlur={handleBlur} />,
        { attachTo: container }
      );
      mockRect(wrapper);
      wrapper.instance().focus();
      wrapper.instance().blur();
      expect(handleBlur).toBeCalled();
    });
  });
});
