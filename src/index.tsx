import Slider, { SliderProps } from './Slider';
import Range, { RangeProps } from './Range';
import Handle, { HandleProps } from './Handle';
import createSliderWithTooltip from './createSliderWithTooltip';

Slider.Range = Range;
Slider.Handle = Handle;
Slider.createSliderWithTooltip = createSliderWithTooltip;
export default Slider;
export { SliderProps, Range, RangeProps, Handle, HandleProps, createSliderWithTooltip };
