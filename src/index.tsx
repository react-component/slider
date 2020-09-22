import Slider, { SliderProps } from './Slider';
import Range from './Range';
import Handle from './Handle';
import createSliderWithTooltip from './createSliderWithTooltip';

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
export { Range, Handle, createSliderWithTooltip };
