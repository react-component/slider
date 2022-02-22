import * as React from 'react';
import Mark from './Mark';

interface MarkObj {
  style?: React.CSSProperties;
  label?: React.ReactNode;
}

interface InternalMarkObj extends MarkObj {
  value: number;
}

export interface MarksProps {
  prefixCls: string;
  marks?: Record<number, React.ReactNode | MarkObj>;
}

export default function Marks(props: MarksProps) {
  const { prefixCls, marks } = props;

  const markPrefixCls = `${prefixCls}-mark`;

  const markList = React.useMemo<InternalMarkObj[]>(() => {
    const keys = Object.keys(marks || {});

    return keys
      .map((key) => {
        const mark = marks[key];
        const markObj: InternalMarkObj = {
          value: Number(key),
        };

        if (
          mark &&
          typeof mark === 'object' &&
          !React.isValidElement(mark) &&
          ('label' in mark || 'style' in mark)
        ) {
          markObj.style = mark.style;
          markObj.label = mark.label;
        } else {
          markObj.label = mark;
        }

        return markObj;
      })
      .sort((a, b) => a.value - b.value);
  }, [marks]);

  console.log(marks, markList);

  // Not render mark if empty
  if (!markList.length) {
    return null;
  }

  return (
    <div className={markPrefixCls}>
      {markList.map(({ value, style, label }) => (
        <Mark key={value} prefixCls={markPrefixCls} style={style} value={value}>
          {label}
        </Mark>
      ))}
    </div>
  );
}
