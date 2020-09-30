/// <reference types="react" />
import { SliderProps } from './Slider';
import Range from './Range';
import Handle from './Handle';
import createSliderWithTooltip from './createSliderWithTooltip';
interface CompoundedComponent extends React.ComponentClass<SliderProps> {
    Range: typeof Range;
    Handle: typeof Handle;
    createSliderWithTooltip: typeof createSliderWithTooltip;
}
declare const InternalSlider: CompoundedComponent;
export default InternalSlider;
export { Range, Handle, createSliderWithTooltip };
