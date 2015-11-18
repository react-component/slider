import React from 'react';
import { classSet } from 'rc-util';

const Steps = ({prefixCls, points, dots, included, lowerBound, upperBound, max, min}) => {
  const range = max - min;
  const elements = points.filter((point) => typeof point === 'string' || dots).map(parseFloat)
          .map((point) => {
            const offset = (point - min) / range * 100 + '%';
            const style = { left: offset };

            const isActived = (!included && point === upperBound) ||
                    (included && point <= upperBound && point >= lowerBound);
            const pointClassName = classSet({
              [prefixCls + '-dot']: true,
              [prefixCls + '-dot-active']: isActived,
            });

            return <span className={pointClassName} style={style} key={point} />;
          });

  return <div className={prefixCls + '-step'}>{elements}</div>;
};

export default Steps;
