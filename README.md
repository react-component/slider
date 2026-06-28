<div align="center">
  <h1>@rc-component/slider</h1>
  <p><sub><img alt="Ant Design" height="14" src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg" style="vertical-align: -0.125em;" /> Part of the Ant Design ecosystem.</sub></p>
  <p>🎚️ Accessible React slider for single values, ranges, marks, and editable handles.</p>

  <p>
    <a href="https://npmjs.org/package/@rc-component/slider"><img alt="NPM version" src="https://img.shields.io/npm/v/@rc-component/slider.svg?style=flat-square"></a>
    <a href="https://npmjs.org/package/@rc-component/slider"><img alt="npm downloads" src="https://img.shields.io/npm/dm/@rc-component/slider.svg?style=flat-square"></a>
    <a href="https://github.com/react-component/slider/actions/workflows/react-component-ci.yml"><img alt="build status" src="https://github.com/react-component/slider/actions/workflows/react-component-ci.yml/badge.svg"></a>
    <a href="https://app.codecov.io/gh/react-component/slider"><img alt="Codecov" src="https://img.shields.io/codecov/c/github/react-component/slider/master.svg?style=flat-square"></a>
    <a href="https://bundlephobia.com/package/@rc-component/slider"><img alt="bundle size" src="https://img.shields.io/bundlephobia/minzip/@rc-component/slider?style=flat-square"></a>
    <a href="https://github.com/umijs/dumi"><img alt="dumi" src="https://img.shields.io/badge/docs%20by-dumi-blue?style=flat-square"></a>
  </p>
</div>

<p align="center">English | <a href="./README.zh-CN.md">简体中文</a></p>


## Highlights

- Supports single-value and range sliders with one shared component.
- Provides marks, dots, keyboard interaction, reverse and vertical layouts.
- Supports editable range handles and draggable tracks through `range` config.
- Exposes semantic `classNames` and `styles` slots for tracks, rail, and handles.

## Install

```bash
npm install @rc-component/slider
```

## Usage

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

## Examples

Run the local dumi site:

```bash
npm install
npm start
```

Then open `http://localhost:8000`.

## API

### Slider

| Name | Type | Default | Description |
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

| Name             | Type    | Default | Description                              |
| ---------------- | ------- | ------- | ---------------------------------------- |
| `draggableTrack` | boolean | false   | Allow dragging the selected range track. |
| `editable`       | boolean | false   | Allow adding or removing range handles.  |
| `maxCount`       | number  | -       | Maximum handle count when editable.      |
| `minCount`       | number  | -       | Minimum handle count when editable.      |

### Ref

| Name    | Type         | Description       |
| ------- | ------------ | ----------------- |
| `blur`  | `() => void` | Blur the slider.  |
| `focus` | `() => void` | Focus the slider. |

## Development

```bash
npm install
npm start
npm test
npm run tsc
npm run compile
npm run build
```

The dumi site runs at `http://localhost:8000` by default.

## Release

```bash
npm run prepublishOnly
```

The release flow is handled by `@rc-component/np` through the `rc-np` command after the package build.

## License

@rc-component/slider is released under the [MIT](./LICENSE) license.
