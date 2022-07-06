/* eslint-disable max-len, no-undef */
import React from 'react';
import { render, fireEvent, createEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { spyElementPrototypes } from 'rc-util/lib/test/domHook';
import KeyCode from 'rc-util/lib/KeyCode';
import Slider, { Range, createSliderWithTooltip } from '../src';

// const setWidth = (object, width) => {
//   // https://github.com/tmpvar/jsdom/commit/0cdb2efcc69b6672dc2928644fc0172df5521176
//   Object.defineProperty(object, 'getBoundingClientRect', {
//     value: () => ({
//       width,
//       // Let all other values retain the JSDom default of `0`.
//       bottom: 0,
//       height: 0,
//       left: 0,
//       right: 0,
//       top: 0,
//     }),
//     enumerable: true,
//     configurable: true,
//   });
// };

describe('Common', () => {
  beforeAll(() => {
    spyElementPrototypes(HTMLElement, {
      getBoundingClientRect: () => ({
        width: 100,
        height: 100,
      }),
    });
  });

  it('should render vertical Slider/Range, when `vertical` is true', () => {
    const { container: container1 } = render(<Slider vertical />);
    expect(container1.getElementsByClassName('rc-slider-vertical')).toHaveLength(1);

    const { container: container2 } = render(<Slider range vertical />);
    expect(container2.getElementsByClassName('rc-slider-vertical')).toHaveLength(1);
  });

  it('should render dots correctly when `dots=true`', () => {
    const { container: container1 } = render(<Slider value={50} step={10} dots />);
    expect(container1.getElementsByClassName('rc-slider-dot')).toHaveLength(11);
    expect(container1.getElementsByClassName('rc-slider-dot-active')).toHaveLength(6);

    const { container: container2 } = render(<Slider range value={[20, 50]} step={10} dots />);
    expect(container2.getElementsByClassName('rc-slider-dot')).toHaveLength(11);
    expect(container2.getElementsByClassName('rc-slider-dot-active')).toHaveLength(4);
  });

  it('should render normally when `dots=true` and `step=null`', () => {
    const { container } = render(<Slider step={null} dots />);
    expect(() => container).not.toThrowError();
  });

  it('should render dots correctly when dotStyle is dynamic`', () => {
    const { container: container1 } = render(
      <Slider value={50} step={10} dots dotStyle={(dotValue) => ({ width: `${dotValue}px` })} />,
    );
    expect(container1.getElementsByClassName('rc-slider-dot')[1]).toHaveStyle(
      'left: 10%; transform: translateX(-50%); width: 10px',
    );
    expect(container1.getElementsByClassName('rc-slider-dot')[2]).toHaveStyle(
      'left: 20%; transform: translateX(-50%); width: 20px',
    );

    const { container: container2 } = render(
      <Slider
        range
        value={[20, 50]}
        step={10}
        dots
        activeDotStyle={(dotValue) => ({ width: `${dotValue}px` })}
      />,
    );
    expect(container2.getElementsByClassName('rc-slider-dot-active')[1]).toHaveStyle(
      'left: 30%; transform: translateX(-50%); width: 30px',
    );
    expect(container2.getElementsByClassName('rc-slider-dot-active')[2]).toHaveStyle(
      'left: 40%; transform: translateX(-50%); width: 40px',
    );
  });

  it('should not set value greater than `max` or smaller `min`', () => {
    const { container: container1 } = render(<Slider value={0} min={10} />);
    expect(
      container1.getElementsByClassName('rc-slider-handle')[0].getAttribute('aria-valuenow'),
    ).toBe('10');

    const { container: container2 } = render(<Slider value={100} max={90} />);
    expect(
      container2.getElementsByClassName('rc-slider-handle')[0].getAttribute('aria-valuenow'),
    ).toBe('90');

    const { container: container3 } = render(<Slider range value={[0, 100]} min={10} max={90} />);
    expect(
      container3.getElementsByClassName('rc-slider-handle')[0].getAttribute('aria-valuenow'),
    ).toBe('10');
    expect(
      container3.getElementsByClassName('rc-slider-handle')[1].getAttribute('aria-valuenow'),
    ).toBe('90');
  });

  it('should not set values when sending invalid numbers', () => {
    const { container: container1 } = render(<Slider value={0} min={Math.min()} />);
    expect(
      container1.getElementsByClassName('rc-slider-handle')[0].getAttribute('aria-valuenow'),
    ).toBe('0');

    const { container: container2 } = render(<Slider value={100} max={Math.max()} />);
    expect(
      container2.getElementsByClassName('rc-slider-handle')[0].getAttribute('aria-valuenow'),
    ).toBe('100');

    const { container: container3 } = render(
      <Slider range value={[0, 100]} min={Math.min()} max={Math.max()} />,
    );
    expect(
      container3.getElementsByClassName('rc-slider-handle')[0].getAttribute('aria-valuenow'),
    ).toBe('0');
    expect(
      container3.getElementsByClassName('rc-slider-handle')[1].getAttribute('aria-valuenow'),
    ).toBe('100');
  });

  it('should update value when it is out of range', () => {
    const sliderOnChange = jest.fn();
    const { container: container1, rerender: rerender1 } = render(
      <Slider onChange={sliderOnChange} />,
    );
    rerender1(<Slider onChange={sliderOnChange} min={10} />);
    expect(
      container1.getElementsByClassName('rc-slider-handle')[0].getAttribute('aria-valuenow'),
    ).toBe('10');

    const rangeOnChange = jest.fn();
    const { container: container2, rerender: rerender2 } = render(
      <Slider range onChange={rangeOnChange} />,
    );
    rerender2(<Slider range onChange={rangeOnChange} min={10} />);
    expect(
      container2.getElementsByClassName('rc-slider-handle')[0].getAttribute('aria-valuenow'),
    ).toBe('10');
  });

  it('should not trigger onChange when no min and max', () => {
    const sliderOnChange = jest.fn();
    const { container: container1, rerender: rerender1 } = render(
      <Slider onChange={sliderOnChange} />,
    );
    rerender1(<Slider onChange={sliderOnChange} value={100} />);
    expect(
      container1.getElementsByClassName('rc-slider-handle')[0].getAttribute('aria-valuenow'),
    ).toBe('100');
    expect(sliderOnChange).not.toHaveBeenCalled();

    const rangeOnChange = jest.fn();
    const { container: container2, rerender: rerender2 } = render(
      <Slider range onChange={rangeOnChange} />,
    );
    rerender2(<Slider range onChange={rangeOnChange} value={[0, 200]} />);
    expect(
      container2.getElementsByClassName('rc-slider-handle')[0].getAttribute('aria-valuenow'),
    ).toBe('0');
    expect(
      container2.getElementsByClassName('rc-slider-handle')[1].getAttribute('aria-valuenow'),
    ).toBe('100');
    expect(rangeOnChange).not.toHaveBeenCalled();
  });

  it('should not trigger onChange when value is out of range', () => {
    const sliderOnChange = jest.fn();
    const { container: container1, rerender: rerender1 } = render(
      <Slider value={9} max={10} onChange={sliderOnChange} />,
    );
    rerender1(<Slider value={11} max={10} onChange={sliderOnChange} />);
    expect(
      container1.getElementsByClassName('rc-slider-handle')[0].getAttribute('aria-valuenow'),
    ).toBe('10');
    expect(sliderOnChange).not.toHaveBeenCalled();

    const rangeOnChange = jest.fn();
    const { container: container2, rerender: rerender2 } = render(
      <Slider range max={10} onChange={rangeOnChange} />,
    );
    rerender2(<Slider range max={10} onChange={rangeOnChange} value={[0, 100]} />);
    expect(
      container2.getElementsByClassName('rc-slider-handle')[0].getAttribute('aria-valuenow'),
    ).toBe('0');
    expect(
      container2.getElementsByClassName('rc-slider-handle')[1].getAttribute('aria-valuenow'),
    ).toBe('10');
    expect(rangeOnChange).not.toHaveBeenCalled();
  });

  it('should not call onChange when value is the same', () => {
    const handler = jest.fn();

    const { container: container1 } = render(<Slider onChange={handler} />);
    const handle1 = container1.getElementsByClassName('rc-slider-handle')[0];
    fireEvent.mouseDown(handle1);
    fireEvent.mouseMove(handle1);
    fireEvent.mouseUp(handle1);

    const { container: container2 } = render(<Slider range onChange={handler} />);
    const handle2 = container2.getElementsByClassName('rc-slider-handle')[1];
    fireEvent.mouseDown(handle2);
    fireEvent.mouseMove(handle2);
    fireEvent.mouseUp(handle2);

    expect(handler).not.toHaveBeenCalled();
  });

  // TODO: should update the following test cases for it should test API instead implementation
  // it('should set `dragOffset` to correct value when the left handle is clicked off-center', () => {
  //   const { container } = render(<Slider />);
  //   setWidth(wrapper.instance().sliderRef, 100);
  //   const leftHandle = wrapper
  //     .find('.rc-slider-handle')
  //     .at(1)
  //     .instance();
  //   wrapper.simulate('mousedown', {
  //     type: 'mousedown',
  //     target: leftHandle,
  //     pageX: 5,
  //     button: 0,
  //     stopPropagation() {},
  //     preventDefault() {},
  //   });
  //   expect(wrapper.instance().dragOffset).toBe(5);
  // });

  // it('should respect `dragOffset` while dragging the handle via MouseEvents', () => {
  //   const { container } = render(<Slider />);
  //   setWidth(wrapper.instance().sliderRef, 100);
  //   const leftHandle = wrapper
  //     .find('.rc-slider-handle')
  //     .at(1)
  //     .instance();
  //   wrapper.simulate('mousedown', {
  //     type: 'mousedown',
  //     target: leftHandle,
  //     pageX: 5,
  //     button: 0,
  //     stopPropagation() {},
  //     preventDefault() {},
  //   });
  //   expect(wrapper.instance().dragOffset).toBe(5);
  //   wrapper.instance().onMouseMove({
  //     // to propagation
  //     type: 'mousemove',
  //     target: leftHandle,
  //     pageX: 14,
  //     button: 0,
  //     stopPropagation() {},
  //     preventDefault() {},
  //   });
  //   expect(wrapper.instance().getValue()).toBe(9);
  // });

  it('should not go to right direction when mouse go to the left', () => {
    const { container } = render(<Slider />);
    const leftHandle = container.getElementsByClassName('rc-slider-handle')[0];

    const mouseDown = createEvent.mouseDown(leftHandle);
    mouseDown.pageX = 5;

    expect(container.getElementsByClassName('rc-slider-handle')[0]).toHaveAttribute(
      'aria-valuenow',
      '0',
    );

    const mouseMove = createEvent.mouseMove(leftHandle);
    mouseMove.pageX = 0;

    expect(container.getElementsByClassName('rc-slider-handle')[0]).toHaveAttribute(
      'aria-valuenow',
      '0',
    );
  });

  it('should call onAfterChange when clicked on mark label', () => {
    const labelId = 'to-be-clicked';
    const marks = {
      0: 'some other label',
      100: <span id={labelId}>some label</span>,
    };

    const sliderOnChange = jest.fn();
    const sliderOnAfterChange = jest.fn();
    const { container } = render(
      <Slider
        value={0}
        marks={marks}
        onChange={sliderOnChange}
        onAfterChange={sliderOnAfterChange}
      />,
    );
    const sliderHandleWrapper = container.querySelector(`#${labelId}`);
    fireEvent.mouseDown(sliderHandleWrapper);
    fireEvent.mouseUp(sliderHandleWrapper);
    fireEvent.click(sliderHandleWrapper);
    expect(sliderOnChange).toHaveBeenCalled();
    expect(sliderOnAfterChange).toHaveBeenCalled();

    const rangeOnAfterChange = jest.fn();
    const { container: container2 } = render(
      <Slider range value={[0, 1]} marks={marks} onAfterChange={rangeOnAfterChange} />,
    );
    const rangeHandleWrapper = container2.querySelector(`#${labelId}`);
    fireEvent.click(rangeHandleWrapper);
    expect(rangeOnAfterChange).toHaveBeenCalled();
  });

  it('only call onAfterChange once', () => {
    const sliderOnChange = jest.fn();
    const sliderOnAfterChange = jest.fn();
    const { container } = render(
      <Slider value={0} onChange={sliderOnChange} onAfterChange={sliderOnAfterChange} />,
    );

    fireEvent.keyDown(container.getElementsByClassName('rc-slider-handle')[0], {
      keyCode: KeyCode.UP,
    });

    expect(sliderOnChange).toHaveBeenCalled();
    expect(sliderOnAfterChange).toHaveBeenCalled();
    expect(sliderOnAfterChange).toHaveBeenCalledTimes(1);
  });

  // Move to antd instead
  // it('the tooltip should be attach to the container with the id tooltip', () => {
  //   const SliderWithTooltip = createSliderWithTooltip(Slider);
  //   const tooltipPrefixer = {
  //     prefixCls: 'slider-tooltip',
  //   };
  //   const tooltipParent = document.createElement('div');
  //   tooltipParent.setAttribute('id', 'tooltip');
  //   const { container } = render(
  //     <SliderWithTooltip
  //       tipProps={tooltipPrefixer}
  //       getTooltipContainer={() => document.getElementById('tooltip')}
  //     />,
  //   );
  //   expect(wrapper.instance().props.getTooltipContainer).toBeTruthy();
  // });
});
