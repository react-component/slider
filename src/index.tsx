import Slider, { SliderProps } from './Slider';
import Range from './Range';
import Handle from './Handle';
import createSliderWithTooltip from './createSliderWithTooltip';
import SliderTooltip from './common/SliderTooltip';

interface CompoundedComponent extends React.ComponentClass<SliderProps> {
  Range: typeof Range;
  Handle: typeof Handle;
  SliderTooltip: typeof SliderTooltip;
  createSliderWithTooltip: typeof createSliderWithTooltip;
}

const InternalSlider = (Slider as unknown) as CompoundedComponent;

InternalSlider.Range = Range;
InternalSlider.Handle = Handle;
InternalSlider.createSliderWithTooltip = createSliderWithTooltip;
InternalSlider.SliderTooltip = SliderTooltip;
export default InternalSlider;
export { Range, Handle, createSliderWithTooltip };
