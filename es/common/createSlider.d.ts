import React from 'react';
import { GenericSliderProps, GenericSliderState, GenericSlider } from '../interface';
export default function createSlider<Props extends GenericSliderProps, State extends GenericSliderState>(Component: GenericSlider<Props, State>): React.ComponentClass<Props, State>;
