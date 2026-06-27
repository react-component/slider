<div align="center">
  <h1>@rc-component/slider</h1>
  <p><sub>Ant Design 生态的一部分。</sub></p>
  <p>🎚️ React 滑动输入组件，支持范围、刻度、提示和键盘交互。</p>

  <p>
    <a href="https://www.npmjs.com/package/@rc-component/slider"><img src="https://img.shields.io/npm/v/@rc-component/slider.svg?style=flat-square" alt="npm version" /></a>
    <a href="https://www.npmjs.com/package/@rc-component/slider"><img src="https://img.shields.io/npm/dm/@rc-component/slider.svg?style=flat-square" alt="npm downloads" /></a>
    <a href="https://github.com/react-component/slider/actions"><img src="https://github.com/react-component/slider/actions/workflows/react-component-ci.yml/badge.svg" alt="CI" /></a>
    <a href="https://codecov.io/gh/react-component/slider"><img src="https://img.shields.io/codecov/c/github/react-component/slider/master.svg?style=flat-square" alt="Codecov" /></a>
    <a href="https://bundlephobia.com/package/@rc-component/slider"><img src="https://badgen.net/bundlephobia/minzip/@rc-component/slider" alt="bundle size" /></a>
    <a href="https://github.com/umijs/dumi"><img src="https://img.shields.io/badge/docs%20by-dumi-blue?style=flat-square" alt="dumi" /></a>
  </p>
</div>

<p align="center"><a href="./README.md">English</a> | 简体中文</p>


## 特性

- 支持 single-value and range sliders with one shared component.
- 提供 marks, dots, keyboard interaction, reverse and vertical layouts.
- 支持 editable range handles and draggable tracks through `range` config.
- 暴露 semantic `classNames` and `styles` slots for tracks, rail, and handles.

## 安装

```bash
npm install @rc-component/slider
```

## 使用

```tsx pure
import Slider from '@rc-component/slider';
import '@rc-component/slider/assets/index.css';

export default () => <Slider defaultValue={30} />;
```

```tsx pure
import Slider from '@rc-component/slider';
import '@rc-component/slider/assets/index.css';

export default () => (
  <Slider
    range={{ draggableTrack: true }}
    marks={{ 0: '0', 50: '50', 100: '100' }}
    defaultValue={[20, 60]}
  />
);
```

Online preview: https://slider.react-component.vercel.app/

## API

### Slider

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `activeDotStyle` | React.CSSProperties \| `(dotValue: number) => React.CSSProperties` | - | Style for active dots. |
| `activeHandleRender` | `HandlesProps['handleRender']` | - | Render function for the active handle. |
| `allowCross` | boolean | true | Allow handles to cross in range mode. |
| `ariaLabelForHandle` | string \| string[] | - | `aria-label` for handle elements. |
| `ariaLabelledByForHandle` | string \| string[] | - | `aria-labelledby` for handle elements. |
| `ariaRequired` | boolean | - | `aria-required` for handle elements. |
| `ariaValueTextFormatterForHandle` | `((value: number) => string) \| ((value: number) => string)[]` | - | Formatter for `aria-valuetext`. |
| `autoFocus` | boolean | - | Focus the slider on mount. |
| `className` | string | - | Additional class name. |
| `classNames` | `Partial<Record<'tracks' \| 'track' \| 'rail' \| 'handle', string>>` | - | Semantic class names for internal slots. |
| `count` | number | - | Deprecated. Use `range.minCount` or `range.maxCount`. |
| `defaultValue` | number \| number[] | - | Initial value. |
| `disabled` | boolean \| boolean[] | false | Disable all handles or specific handles. |
| `dots` | boolean | false | Show dots at each valid step position. |
| `dotStyle` | React.CSSProperties \| `(dotValue: number) => React.CSSProperties` | - | Style for dots. |
| `handleRender` | `HandlesProps['handleRender']` | - | Custom handle renderer. |
| `handleStyle` | React.CSSProperties \| React.CSSProperties[] | - | Deprecated. Use `styles.handle`. |
| `id` | string | - | Root id. |
| `included` | boolean | true | Whether the track is rendered as a continuous selected interval. |
| `keyboard` | boolean | true | Enable keyboard interaction. |
| `marks` | `Record<string \| number, ReactNode \| MarkObj>` | - | Slider marks. |
| `max` | number | 100 | Maximum value. |
| `min` | number | 0 | Minimum value. |
| `onAfterChange` | `(value) => void` | - | Deprecated. Use `onChangeComplete`. |
| `onBeforeChange` | `(value) => void` | - | Deprecated. Use `onChange`. |
| `onBlur` | `(event) => void` | - | Blur handler. |
| `onChange` | `(value) => void` | - | Triggered while value changes. |
| `onChangeComplete` | `(value) => void` | - | Triggered when interaction completes. |
| `onFocus` | `(event) => void` | - | Focus handler. |
| `prefixCls` | string | `'rc-slider'` | Prefix class name. |
| `pushable` | boolean \| number | false | Push adjacent handles in range mode. |
| `railStyle` | React.CSSProperties | - | Deprecated. Use `styles.rail`. |
| `range` | boolean \| RangeConfig | false | Enable range mode or configure editable range behavior. |
| `reverse` | boolean | false | Render in reverse direction. |
| `startPoint` | number | `min` | Start point for a single-value track. |
| `step` | number \| null | 1 | Step size. Use `null` to use marks as steps. |
| `style` | React.CSSProperties | - | Root style. |
| `styles` | `Partial<Record<'tracks' \| 'track' \| 'rail' \| 'handle', React.CSSProperties>>` | - | Semantic styles for internal slots. |
| `tabIndex` | number \| number[] | 0 | Handle tab index. |
| `track` | boolean | - | Whether to render track elements. |
| `trackStyle` | React.CSSProperties \| React.CSSProperties[] | - | Deprecated. Use `styles.track`. |
| `value` | number \| number[] | - | Controlled value. |
| `vertical` | boolean | false | Render vertically. |

### RangeConfig

| 名称             | 类型    | 默认值 | 说明                              |
| ---------------- | ------- | ------- | ---------------------------------------- |
| `draggableTrack` | boolean | false   | Allow dragging the selected range track. |
| `editable`       | boolean | false   | Allow adding or removing range handles.  |
| `maxCount`       | number  | -       | Maximum handle count when editable.      |
| `minCount`       | number  | -       | Minimum handle count when editable.      |

### Ref

| 名称    | 类型         | 说明       |
| ------- | ------------ | ----------------- |
| `blur`  | `() => void` | Blur the slider.  |
| `focus` | `() => void` | Focus the slider. |

## 本地开发

```bash
npm install
npm start
npm test
npm run tsc
npm run compile
npm run build
```

## 发布

```bash
npm run prepublishOnly
```

The release flow is handled by `@rc-component/np` through the `rc-np` command after the package build.

## 许可证

@rc-component/slider is released under the [MIT](./LICENSE) license.
