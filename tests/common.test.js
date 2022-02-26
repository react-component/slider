/* eslint-disable max-len, no-undef */
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { spyElementPrototypes } from 'rc-util/lib/test/domHook';
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

  it('Should remove event listeners if unrendered during drag', () => {
    const { container, unmount } = render(<Slider />);

    const sliderTrack = container.getElementsByClassName('rc-slider-track')[0];

    fireEvent.touchStart(sliderTrack, {
      type: 'touchstart',
      target: sliderTrack,
      touches: [{ pageX: 5 }],
      stopPropagation() {},
      preventDefault() {},
    });

    //   expect(wrapper.instance().onTouchUpListener).toBeTruthy();
    //   wrapper.instance().onTouchUpListener.remove = jest.fn();
    unmount();
  });

  // // TODO: should update the following test cases for it should test API instead implementation
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

  // it('should not go to right direction when mouse go to the left', () => {
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
  //   expect(wrapper.instance().getValue()).toBe(0); // zero on start
  //   wrapper.instance().onMouseMove({
  //     // to propagation
  //     type: 'mousemove',
  //     target: leftHandle,
  //     pageX: 0,
  //     button: 0,
  //     stopPropagation() {},
  //     preventDefault() {},
  //   });
  //   expect(wrapper.instance().getValue()).toBe(0); // still zero
  // });

  // it("should set `dragOffset` to 0 when the MouseEvent target isn't a handle", () => {
  //   const { container } = render(<Slider />);
  //   setWidth(wrapper.instance().sliderRef, 100);
  //   const sliderTrack = wrapper.find('.rc-slider-track').get(0);
  //   wrapper.simulate('mousedown', {
  //     type: 'mousedown',
  //     target: sliderTrack,
  //     pageX: 5,
  //     button: 0,
  //     stopPropagation() {},
  //     preventDefault() {},
  //   });
  //   expect(wrapper.instance().dragOffset).toBe(0);
  // });

  // it('should set `dragOffset` to correct value when the left handle is touched off-center', () => {
  //   const { container } = render(<Slider />);
  //   setWidth(wrapper.instance().sliderRef, 100);
  //   const leftHandle = wrapper
  //     .find('.rc-slider-handle')
  //     .at(1)
  //     .instance();
  //   wrapper.simulate('touchstart', {
  //     type: 'touchstart',
  //     target: leftHandle,
  //     touches: [{ pageX: 5 }],
  //     stopPropagation() {},
  //     preventDefault() {},
  //   });
  //   expect(wrapper.instance().dragOffset).toBe(5);
  // });

  // it('should respect `dragOffset` while dragging the handle via TouchEvents', () => {
  //   const { container } = render(<Slider />);
  //   setWidth(wrapper.instance().sliderRef, 100);
  //   const leftHandle = wrapper
  //     .find('.rc-slider-handle')
  //     .at(1)
  //     .instance();
  //   wrapper.simulate('touchstart', {
  //     type: 'touchstart',
  //     target: leftHandle,
  //     touches: [{ pageX: 5 }],
  //     stopPropagation() {},
  //     preventDefault() {},
  //   });
  //   expect(wrapper.instance().dragOffset).toBe(5);
  //   wrapper.instance().onTouchMove({
  //     // to propagation
  //     type: 'touchmove',
  //     target: leftHandle,
  //     touches: [{ pageX: 14 }],
  //     stopPropagation() {},
  //     preventDefault() {},
  //   });
  //   expect(wrapper.instance().getValue()).toBe(9);
  // });

  // it("should set `dragOffset` to 0 when the TouchEvent target isn't a handle", () => {
  //   const { container } = render(<Slider />);
  //   setWidth(wrapper.instance().sliderRef, 100);
  //   const sliderTrack = wrapper.find('.rc-slider-track').get(0);
  //   wrapper.simulate('touchstart', {
  //     type: 'touchstart',
  //     target: sliderTrack,
  //     touches: [{ pageX: 5 }],
  //     stopPropagation() {},
  //     preventDefault() {},
  //   });
  //   expect(wrapper.instance().dragOffset).toBe(0);
  // });

  // it('should call onAfterChange when clicked on mark label', () => {
  //   const labelId = 'to-be-clicked';
  //   const marks = {
  //     0: 'some other label',
  //     100: <span id={labelId}>some label</span>,
  //   };

  //   const sliderOnAfterChange = jest.fn();
  //   const sliderWrapper = render(
  //     <Slider value={0} marks={marks} onAfterChange={sliderOnAfterChange} />,
  //   );
  //   const sliderHandleWrapper = sliderWrapper.find(`#${labelId}`).at(0);
  //   sliderHandleWrapper.simulate('mousedown');
  //   sliderHandleWrapper.simulate('mouseup');
  //   expect(sliderOnAfterChange).toHaveBeenCalled();

  //   const rangeOnAfterChange = jest.fn();
  //   const rangeWrapper = render(
  //     <Slider range  value={[0, 1]} marks={marks} onAfterChange={rangeOnAfterChange} />,
  //   );
  //   const rangeHandleWrapper = rangeWrapper.find(`#${labelId}`).at(0);
  //   rangeHandleWrapper.simulate('mousedown');
  //   rangeHandleWrapper.simulate('mouseup');

  //   expect(rangeOnAfterChange).toHaveBeenCalled();
  // });

  // it('only call onAfterChange once', () => {
  //   const sliderOnAfterChange = jest.fn();
  //   const sliderWrapper = render(<Slider value={0} onAfterChange={sliderOnAfterChange} />);

  //   sliderWrapper.instance().onStart();
  //   sliderWrapper.instance().onEnd();
  //   sliderWrapper.instance().onEnd();
  //   expect(sliderOnAfterChange).toHaveBeenCalled();
  //   expect(sliderOnAfterChange).toHaveBeenCalledTimes(1);
  // });

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
