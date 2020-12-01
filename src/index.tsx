import Slider, { SliderProps } from './Slider';
import Range, { RangeProps } from './Range';
import Handle, { HandleProps } from './Handle';
import createSliderWithTooltip from './createSliderWithTooltip';
import SliderTooltip from './common/SliderTooltip';

interface CompoundedComponent extends React.ComponentClass<SliderProps> {
  Range: typeof Range;
  Handle: typeof Handle;
  createSliderWithTooltip: typeof createSliderWithTooltip;
}

const InternalSlider = (Slider as unknown) as CompoundedComponent;

InternalSlider.Range = Range;
InternalSlider.Handle = Handle;
InternalSlider.createSliderWithTooltip = createSliderWithTooltip;
export default InternalSlider;
export {
  SliderProps,
  Range,
  RangeProps,
  Handle,
  HandleProps,
  createSliderWithTooltip,
  SliderTooltip,
};
