import type React from 'react';

export type Direction = 'rtl' | 'ltr' | 'ttb' | 'btt';

export type OnStartMove = (e: React.MouseEvent | React.TouchEvent, valueIndex: number) => void;

export type AriaValueFormat = (value: number) => string;
