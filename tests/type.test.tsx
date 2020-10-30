import React from 'react';
import Slider, { createSliderWithTooltip, Range, Handle } from '../src';
import { SliderProps } from '../src/Slider';
import { RangeProps } from '../src/Range';
import { HandleProps } from '../src/Handle';
import { ComponentWrapperProps } from '../src/createSliderWithTooltip';

describe('Slider.Typescript', () => {
  const sliderProps: SliderProps = {
    value: 1,
    defaultValue: 1,
    min: 0,
    max: 2,
    step: 0.5,
    prefixCls: 'rc-slider',
    onChange: (val: number) => val,
    onBeforeChange: (val: number) => val,
    onAfterChange: (val: number) => val,
    vertical: true,
    included: true,
    disabled: false,
    reverse: false,
    minimumTrackStyle: {},
    trackStyle: {
      borderRadius: '2px',
    },
    handleStyle: {},
    tabIndex: 1,
    ariaLabelForHandle: 'ariaLabelForHandle',
    ariaLabelledByForHandle: 'ariaLabelledByForHandle',
    ariaValueTextFormatterForHandle: 'ariaValueTextFormatterForHandle',
    startPoint: 1,
    handle(props) {
      return <span {...props} />;
    },
    className: 'class',
    marks: { 0: 'mark1', 1: { style: { color: '#fff' }, label: 'label' } },
    dots: true,
    maximumTrackStyle: { color: '#fff' },
    style: { color: '#fff' },
    railStyle: { color: '#fff' },
    dotStyle: { color: '#fff' },
    activeDotStyle: { color: '#fff' },
  };

  const rangeProps: RangeProps = {
    value: [1, 2],
    defaultValue: [1, 2],
    count: 1,
    min: 0,
    max: 2,
    allowCross: false,
    pushable: true,
    onChange: (val: number[]) => val,
    onBeforeChange: (val: number[]) => val,
    onAfterChange: (val: number[]) => val,
    reverse: false,
    vertical: true,
    marks: {
      0: {
        label: '0%',
        style: {
          color: '#fff',
        },
      },
      0.5: <span />,
    },
    step: 0.5,
    threshold: 100,
    prefixCls: 'rc-slider',
    included: true,
    disabled: false,
    trackStyle: [
      {
        borderRadius: '2px',
      },
    ],
    handleStyle: [{}],
    ariaLabelGroupForHandles: 'ariaLabelGroupForHandles',
    ariaLabelledByGroupForHandles: ['ariaLabelledByGroupForHandles'],
    ariaValueTextFormatterGroupForHandles: ['ariaValueTextFormatterGroupForHandles'],
    handle(props) {
      return <span {...props} />;
    },
    className: 'class',
    dots: true,
    maximumTrackStyle: { color: '#fff' },
    style: { color: '#fff' },
    railStyle: { color: '#fff' },
    dotStyle: { color: '#fff' },
    activeDotStyle: { color: '#fff' },
  };

  const handleProps: HandleProps = {
    prefixCls: 'rc-slider',
    className: 'rc-slider-handle',
    vertical: true,
    reverse: false,
    offset: 2,
    style: {
      width: '2px',
    },
    disabled: false,
    min: 0,
    max: 2,
    value: 1,
    tabIndex: 0,
    ariaLabel: 'ariaLabel',
    ariaLabelledBy: 'ariaLabelledBy',
    ariaValueTextFormatter: (val: number) => String(val),
    onMouseEnter: e => e,
    onMouseLeave: e => e,
  };

  const withTooltipProps: ComponentWrapperProps = {
    tipFormatter: (val: number) => `tip: ${val}`,
    tipProps: {
      prefixCls: 'rc-slider-tooltip',
      overlay: 'overlay',
      placement: 'top',
      visible: true,
    },
    getTooltipContainer: () => document.body,
  };

  it('Slider', () => {
    const slider = <Slider {...sliderProps} />;
    expect(slider).toBeTruthy();
  });

  it('Range', () => {
    const range = <Slider.Range {...rangeProps} />;
    expect(range).toBeTruthy();
  });

  it('Handle', () => {
    const handle = <Slider.Handle {...handleProps} />;
    expect(handle).toBeTruthy();
  });

  it('createSliderWithTooltip', () => {
    const TooltipSlider = createSliderWithTooltip(Slider);
    const TooltipRangle = createSliderWithTooltip(Range);
    const TooltipHandle = createSliderWithTooltip(Handle);
    const slider = <TooltipSlider {...withTooltipProps} {...sliderProps} />;
    const range = <TooltipRangle {...withTooltipProps} {...rangeProps} />;
    const handle = <TooltipHandle {...withTooltipProps} {...handleProps} />;
    expect(slider).toBeTruthy();
    expect(range).toBeTruthy();
    expect(handle).toBeTruthy();
  });
});
