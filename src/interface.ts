export type Direction = 'rtl' | 'ltr' | 'ttb' | 'btt';

export type OnStartMove = (e: React.MouseEvent, valueIndex: number) => void;

export type AriaValueFormat = (value: number) => string;
