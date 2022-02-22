import * as React from 'react';
import classNames from 'classnames';
import { getDirectionStyle } from '../util';
import SliderContext from '../context';

export interface DotProps {
  prefixCls: string;
  value: number;
}

export default function Dot(props: DotProps) {
  const { prefixCls, value } = props;
  const { min, max, direction } = React.useContext(SliderContext);

  const dotClassName = `${prefixCls}-dot`;

  // ============================ Offset ============================
  const positionStyle = getDirectionStyle(direction, value, min, max);

  return <span className={classNames(dotClassName)} style={positionStyle} />;
}
