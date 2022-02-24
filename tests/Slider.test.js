import React from 'react';
import { render, mount } from 'enzyme';
import keyCode from 'rc-util/lib/KeyCode';
import Slider from '../src/Slider';

describe('Slider', () => {
  it('should render Slider with correct DOM structure', () => {
    const wrapper = render(<Slider />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should render Slider with value correctly', () => {
    const wrapper = mount(<Slider value={50} />);
    expect(wrapper.find('.rc-slider-handle').first().props().style.left).toMatch('50%');

    const trackStyle = wrapper.find('.rc-slider-track').first().props().style;
    expect(trackStyle.left).toMatch('0%');
    expect(trackStyle.width).toMatch('50%');
  });

  it('should render Slider correctly where value > startPoint', () => {
    const wrapper = mount(<Slider value={50} startPoint={20} />);
    expect(wrapper.find('.rc-slider-handle').first().props().style.left).toMatch('50%');

    const trackStyle = wrapper.find('.rc-slider-track').first().props().style;
    expect(trackStyle.left).toMatch('20%');
    expect(trackStyle.width).toMatch('30%');
  });

  it('should render Slider correctly where value < startPoint', () => {
    const wrapper = mount(<Slider value={40} startPoint={60} />);
    expect(wrapper.find('.rc-slider-handle').first().props().style.left).toMatch('40%');

    const trackStyle = wrapper.find('.rc-slider-track').first().props().style;
    expect(trackStyle.left).toMatch('40%');
    expect(trackStyle.width).toMatch('20%');
  });

  it('should render reverse Slider with value correctly', () => {
    const wrapper = mount(<Slider value={50} reverse />);
    expect(wrapper.find('.rc-slider-handle').first().props().style.right).toMatch('50%');

    const trackStyle = wrapper.find('.rc-slider-track').first().props().style;
    expect(trackStyle.right).toMatch('0%');
    expect(trackStyle.width).toMatch('50%');
  });

  it('should render reverse Slider correctly where value > startPoint', () => {
    const wrapper = mount(<Slider value={50} startPoint={20} reverse />);
    expect(wrapper.find('.rc-slider-handle').first().props().style.right).toMatch('50%');

    const trackStyle = wrapper.find('.rc-slider-track').first().props().style;
    expect(trackStyle.right).toMatch('20%');
    expect(trackStyle.width).toMatch('30%');
  });

  it('should render reverse Slider correctly where value < startPoint', () => {
    const wrapper = mount(<Slider value={30} startPoint={50} reverse />);
    expect(wrapper.find('.rc-slider-handle').first().props().style.right).toMatch('30%');

    const trackStyle = wrapper.find('.rc-slider-track').first().props().style;
    expect(trackStyle.right).toMatch('30%');
    expect(trackStyle.width).toMatch('20%');
  });

  it('should render reverse Slider with marks correctly', () => {
    const marks = { 5: '5', 6: '6', 7: '7', 8: '8', 9: '9', 10: '10' };
    const wrapper = mount(<Slider value={0} marks={marks} min={5} max={10} reverse />);
    expect(wrapper.find('.rc-slider-mark-text').first().props().style.right).toMatch('0%');
  });

  it('should render Slider without handle if value is null', () => {
    const wrapper = render(<Slider value={null} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should allow tabIndex to be set on Handle via Slider', () => {
    const wrapper = mount(<Slider tabIndex={1} />);
    expect(wrapper.find('.rc-slider-handle').first().props().tabIndex).toEqual(1);
  });

  it('should allow tabIndex to be set on Handle via Slider and be equal null', () => {
    const wrapper = mount(<Slider tabIndex={null} />);
    const handle = wrapper.find('.rc-slider-handle').first().getDOMNode();
    expect(handle.hasAttribute('tabIndex')).toEqual(false);
  });

  it('increases the value when key "up" is pressed', () => {
    const onChange = jest.fn();
    const wrapper = mount(<Slider defaultValue={50} onChange={onChange} />);
    const handler = wrapper.find('.rc-slider-handle').first();

    wrapper.simulate('focus');
    handler.simulate('keyDown', { keyCode: keyCode.UP });

    expect(onChange).toHaveBeenCalledWith(51);
  });

  it('decreases the value for reverse-vertical when key "up" is pressed', () => {
    const onChange = jest.fn();
    const wrapper = mount(<Slider defaultValue={50} onChange={onChange} reverse vertical />);
    const handler = wrapper.find('.rc-slider-handle').first();

    wrapper.simulate('focus');
    handler.simulate('keyDown', { keyCode: keyCode.UP });

    expect(onChange).toHaveBeenCalledWith(49);
  });

  it('increases the value when key "right" is pressed', () => {
    const onChange = jest.fn();
    const wrapper = mount(<Slider defaultValue={50} onChange={onChange} />);
    const handler = wrapper.find('.rc-slider-handle').first();

    wrapper.simulate('focus');
    handler.simulate('keyDown', { keyCode: keyCode.RIGHT });

    expect(onChange).toHaveBeenCalledWith(51);
  });

  it('it should trigger onAfterChange when key pressed', () => {
    const onAfterChange = jest.fn();
    const wrapper = mount(<Slider defaultValue={50} onAfterChange={onAfterChange} />);
    const handler = wrapper.find('.rc-slider-handle').first();

    wrapper.simulate('focus');
    handler.simulate('keyDown', { keyCode: keyCode.RIGHT });

    expect(onAfterChange).toBeCalled();
  });

  it('decreases the value for reverse-horizontal when key "right" is pressed', () => {
    const onChange = jest.fn();
    const wrapper = mount(<Slider defaultValue={50} reverse onChange={onChange} />);
    const handler = wrapper.find('.rc-slider-handle').first();

    wrapper.simulate('focus');
    handler.simulate('keyDown', { keyCode: keyCode.RIGHT });

    expect(onChange).toHaveBeenCalledWith(49);
  });

  it('increases the value when key "page up" is pressed, by a factor 2', () => {
    const onChange = jest.fn();
    const wrapper = mount(<Slider defaultValue={50} onChange={onChange} />);
    const handler = wrapper.find('.rc-slider-handle').first();

    wrapper.simulate('focus');
    handler.simulate('keyDown', { keyCode: keyCode.PAGE_UP });

    expect(onChange).toHaveBeenCalledWith(52);
  });

  it('decreases the value when key "down" is pressed', () => {
    const onChange = jest.fn();
    const wrapper = mount(<Slider defaultValue={50} onChange={onChange} />);
    const handler = wrapper.find('.rc-slider-handle').first();

    wrapper.simulate('focus');
    handler.simulate('keyDown', { keyCode: keyCode.DOWN });

    expect(onChange).toHaveBeenCalledWith(49);
  });

  it('decreases the value when key "left" is pressed', () => {
    const onChange = jest.fn();
    const wrapper = mount(<Slider defaultValue={50} onChange={onChange} />);
    const handler = wrapper.find('.rc-slider-handle').first();

    wrapper.simulate('focus');
    handler.simulate('keyDown', { keyCode: keyCode.LEFT });

    expect(onChange).toHaveBeenCalledWith(49);
  });

  it('it should work fine when arrow key is pressed', () => {
    const onChange = jest.fn();
    const wrapper = mount(<Slider range defaultValue={[20, 50]} onChange={onChange} />);
    const handler = wrapper.find('.rc-slider-handle').last();

    handler.simulate('keyDown', { keyCode: keyCode.LEFT });
    expect(onChange).toHaveBeenCalledWith([20, 49]);
    handler.simulate('keyDown', { keyCode: keyCode.RIGHT });
    expect(onChange).toHaveBeenCalledWith([20, 50]);
    handler.simulate('keyDown', { keyCode: keyCode.UP });
    expect(onChange).toHaveBeenCalledWith([20, 51]);
    handler.simulate('keyDown', { keyCode: keyCode.DOWN });
    expect(onChange).toHaveBeenCalledWith([20, 50]);
  });

  it('decreases the value when key "page down" is pressed, by a factor 2', () => {
    const onChange = jest.fn();
    const wrapper = mount(<Slider defaultValue={50} onChange={onChange} />);
    const handler = wrapper.find('.rc-slider-handle').first();

    wrapper.simulate('focus');
    handler.simulate('keyDown', { keyCode: keyCode.PAGE_DOWN });

    expect(onChange).toHaveBeenCalledWith(48);
  });

  it('sets the value to minimum when key "home" is pressed', () => {
    const onChange = jest.fn();
    const wrapper = mount(<Slider defaultValue={50} onChange={onChange} />);
    const handler = wrapper.find('.rc-slider-handle').first();

    wrapper.simulate('focus');
    handler.simulate('keyDown', { keyCode: keyCode.HOME });

    expect(onChange).toHaveBeenCalledWith(0);
  });

  it('sets the value to maximum when the key "end" is pressed', () => {
    const onChange = jest.fn();
    const wrapper = mount(<Slider defaultValue={50} onChange={onChange} />);
    const handler = wrapper.find('.rc-slider-handle').first();

    wrapper.simulate('focus');
    handler.simulate('keyDown', { keyCode: keyCode.END });

    expect(onChange).toHaveBeenCalledWith(100);
  });

  describe('when component has fixed values', () => {
    it('increases the value when key "up" is pressed', () => {
      const onChange = jest.fn();
      const wrapper = mount(
        <Slider
          min={20}
          defaultValue={40}
          marks={{ 20: 20, 40: 40, 100: 100 }}
          step={null}
          onChange={onChange}
        />,
      );
      const handler = wrapper.find('.rc-slider-handle').first();

      wrapper.simulate('focus');
      handler.simulate('keyDown', { keyCode: keyCode.UP });

      expect(onChange).toHaveBeenCalledWith(100);
    });

    it('increases the value when key "right" is pressed', () => {
      const onChange = jest.fn();
      const wrapper = mount(
        <Slider
          min={20}
          defaultValue={40}
          marks={{ 20: 20, 40: 40, 100: 100 }}
          step={null}
          onChange={onChange}
        />,
      );
      const handler = wrapper.find('.rc-slider-handle').first();

      wrapper.simulate('focus');
      handler.simulate('keyDown', { keyCode: keyCode.RIGHT });

      expect(onChange).toHaveBeenCalledWith(100);
    });

    it('decreases the value when key "down" is pressed', () => {
      const onChange = jest.fn();
      const wrapper = mount(
        <Slider
          min={20}
          defaultValue={40}
          marks={{ 20: 20, 40: 40, 100: 100 }}
          step={null}
          onChange={onChange}
        />,
      );
      const handler = wrapper.find('.rc-slider-handle').first();

      wrapper.simulate('focus');
      handler.simulate('keyDown', { keyCode: keyCode.DOWN });

      expect(onChange).toHaveBeenCalledWith(20);
    });

    it('decreases the value when key "left" is pressed', () => {
      const onChange = jest.fn();
      const wrapper = mount(
        <Slider
          min={20}
          defaultValue={40}
          marks={{ 20: 20, 40: 40, 100: 100 }}
          step={null}
          onChange={onChange}
        />,
      );
      const handler = wrapper.find('.rc-slider-handle').first();

      wrapper.simulate('focus');
      handler.simulate('keyDown', { keyCode: keyCode.LEFT });

      expect(onChange).toHaveBeenCalledWith(20);
    });

    it('sets the value to minimum when key "home" is pressed', () => {
      const onChange = jest.fn();
      const wrapper = mount(
        <Slider
          min={20}
          defaultValue={100}
          marks={{ 20: 20, 40: 40, 100: 100 }}
          step={null}
          onChange={onChange}
        />,
      );
      const handler = wrapper.find('.rc-slider-handle').first();

      wrapper.simulate('focus');
      handler.simulate('keyDown', { keyCode: keyCode.HOME });

      expect(onChange).toHaveBeenCalledWith(20);
    });

    it('sets the value to maximum when the key "end" is pressed', () => {
      const onChange = jest.fn();
      const wrapper = mount(
        <Slider
          min={20}
          defaultValue={20}
          marks={{ 20: 20, 40: 40, 100: 100 }}
          step={null}
          onChange={onChange}
        />,
      );
      const handler = wrapper.find('.rc-slider-handle').first();

      wrapper.simulate('focus');
      handler.simulate('keyDown', { keyCode: keyCode.END });

      expect(onChange).toHaveBeenCalledWith(100);
    });
  });

  it('keyboard mix with step & marks', () => {
    const onChange = jest.fn();

    // [0], 3, 7, 10
    const wrapper = mount(
      <Slider
        min={0}
        max={10}
        step={10}
        defaultValue={0}
        marks={{ 3: 3, 7: 7 }}
        onChange={onChange}
      />,
    );
    const handler = wrapper.find('.rc-slider-handle').first();

    // 0, [3], 7, 10
    handler.simulate('keyDown', { keyCode: keyCode.UP });
    expect(onChange).toHaveBeenCalledWith(3);

    // 0, 3, [7], 10
    onChange.mockReset();
    handler.simulate('keyDown', { keyCode: keyCode.UP });
    expect(onChange).toHaveBeenCalledWith(7);

    // 0, 3, 7, [10]
    onChange.mockReset();
    handler.simulate('keyDown', { keyCode: keyCode.UP });
    expect(onChange).toHaveBeenCalledWith(10);

    // 0, 3, 7, [10]
    onChange.mockReset();
    handler.simulate('keyDown', { keyCode: keyCode.UP });
    expect(onChange).not.toHaveBeenCalled();

    // 0, 3, [7], 10
    onChange.mockReset();
    handler.simulate('keyDown', { keyCode: keyCode.DOWN });
    expect(onChange).toHaveBeenCalledWith(7);

    // 0, [3], 7, 10
    onChange.mockReset();
    handler.simulate('keyDown', { keyCode: keyCode.DOWN });
    expect(onChange).toHaveBeenCalledWith(3);

    // [0], 3, 7, 10
    onChange.mockReset();
    handler.simulate('keyDown', { keyCode: keyCode.DOWN });
    expect(onChange).toHaveBeenCalledWith(0);

    // [0], 3, 7, 10
    onChange.mockReset();
    handler.simulate('keyDown', { keyCode: keyCode.DOWN });
    expect(onChange).not.toHaveBeenCalled();
  });

  it('sets aria-label on the handle', () => {
    const wrapper = mount(<Slider ariaLabelForHandle="Some Label" />);
    expect(wrapper.find('.rc-slider-handle').first().prop('aria-label')).toEqual('Some Label');
  });

  it('sets aria-labelledby on the handle', () => {
    const wrapper = mount(<Slider ariaLabelledByForHandle="some_id" />);
    expect(wrapper.find('.rc-slider-handle').first().prop('aria-labelledby')).toEqual('some_id');
  });

  it('sets aria-valuetext on the handle', () => {
    const wrapper = mount(
      <Slider
        min={0}
        max={5}
        defaultValue={3}
        ariaValueTextFormatterForHandle={(value) => `${value} of something`}
      />,
    );
    const handle = wrapper.find('.rc-slider-handle').first();

    expect(handle.prop('aria-valuetext')).toEqual('3 of something');

    wrapper.simulate('focus');
    handle.simulate('keyDown', { keyCode: keyCode.RIGHT });

    expect(wrapper.find('.rc-slider-handle').first().props()['aria-valuetext']).toEqual(
      '4 of something',
    );
  });

  describe('focus & blur', () => {
    it('focus()', () => {
      const handleFocus = jest.fn();
      const wrapper = mount(<Slider min={0} max={10} defaultValue={0} onFocus={handleFocus} />, {
        attachTo: document.body,
      });
      wrapper.find('.rc-slider-handle').instance().focus();
      expect(handleFocus).toBeCalled();

      wrapper.unmount();
    });

    it('blur', () => {
      const handleBlur = jest.fn();
      const wrapper = mount(<Slider min={0} max={10} defaultValue={0} onBlur={handleBlur} />, {
        attachTo: document.body,
      });
      wrapper.find('.rc-slider-handle').instance().focus();
      wrapper.find('.rc-slider-handle').instance().blur();
      expect(handleBlur).toBeCalled();

      wrapper.unmount();
    });
  });

  it('should not be out of range when value is null', () => {
    const wrapper = mount(<Slider value={null} min={1} max={10} />);
    expect(wrapper.exists('Track')).toBeFalsy();

    wrapper.setProps({ value: 0 });
    expect(wrapper.exists('Track')).toBeTruthy();
  });
});
