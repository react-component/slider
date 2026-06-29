<div align="center">
  <h1>@rc-component/slider</h1>
  <p><sub><a href="https://ant.design"><img alt="Ant Design" height="14" src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg" style="vertical-align: -0.125em;" /></a> Ant Design 生态的一部分。</sub></p>
  <p>🎚️ React 滑动输入组件，支持范围、刻度、提示和键盘交互。</p>

  <p>
    <a href="https://npmjs.org/package/@rc-component/slider"><img alt="NPM version" src="https://img.shields.io/npm/v/@rc-component/slider.svg?style=flat-square"></a>
    <a href="https://npmjs.org/package/@rc-component/slider"><img alt="npm downloads" src="https://img.shields.io/npm/dm/@rc-component/slider.svg?style=flat-square"></a>
    <a href="https://github.com/react-component/slider/actions/workflows/react-component-ci.yml"><img alt="build status" src="https://github.com/react-component/slider/actions/workflows/react-component-ci.yml/badge.svg"></a>
    <a href="https://app.codecov.io/gh/react-component/slider"><img alt="Codecov" src="https://img.shields.io/codecov/c/github/react-component/slider/master.svg?style=flat-square"></a>
    <a href="https://bundlephobia.com/package/@rc-component/slider"><img alt="bundle size" src="https://img.shields.io/bundlephobia/minzip/@rc-component/slider?style=flat-square"></a>
    <a href="https://github.com/umijs/dumi"><img alt="dumi" src="https://img.shields.io/badge/docs%20by-dumi-blue?style=flat-square"></a>
  </p>
</div>

<p align="center"><a href="./README.md">English</a> | 简体中文</p>

## 特性

- 通过一个共享组件支持单值和范围滑块。
- 提供标记、点、键盘交互、反向和垂直布局。
- 通过 `range` 配置支持可编辑范围手柄和可拖动轨道。
- 引入用于轨道、导轨和手柄的语义 `classNames` 和 `styles` 插槽。

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

在线预览：https://slider.react-component.vercel.app/

## 示例

运行本地 dumi 站点：

```bash
npm install
npm start
```

然后打开 `http://localhost:8000`。

## API

### Slider

| 名称 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `activeDotStyle` | React.CSSProperties \| `(dotValue: number) => React.CSSProperties` | - | 激活点的样式。 |
| `activeHandleRender` | `HandlesProps['handleRender']` | - | 活动句柄的渲染函数。 |
| `allowCross` | boolean | true | 允许手柄在范围模式下交叉。 |
| `ariaLabelForHandle` | string \| string[] | - | `aria-label` for handle elements. |
| `ariaLabelledByForHandle` | string \| string[] | - | `aria-labelledby` for handle elements. |
| `ariaRequired` | boolean | - | 句柄元素的 `aria-required`。 |
| `ariaValueTextFormatterForHandle` | `((value: number) => string) \| ((value: number) => string)[]` | - | `aria-valuetext` 格式化函数。 |
| `autoFocus` | boolean | - | 挂载后自动聚焦滑块。 |
| `className` | string | - | 附加 className。 |
| `classNames` | `Partial<Record<'tracks' \| 'track' \| 'rail' \| 'handle', string>>` | - | 内部插槽的语义化 className。 |
| `count` | number | - | 已废弃。请使用 `range.minCount` 或 `range.maxCount`。 |
| `defaultValue` | number \| number[] | - | 初始值。 |
| `disabled` | boolean \| boolean[] | false | 禁用全部滑块或指定滑块。 |
| `dots` | boolean | false | 在每个有效步骤位置显示点。 |
| `dotStyle` | React.CSSProperties \| `(dotValue: number) => React.CSSProperties` | - | 点的样式。 |
| `handleRender` | `HandlesProps['handleRender']` | - | 自定义句柄渲染器。 |
| `handleStyle` | React.CSSProperties \| React.CSSProperties[] | - | 已废弃。请使用 `styles.handle`。 |
| `id` | string | - | 根 ID。 |
| `included` | boolean | true | 轨道是否渲染为连续的选定间隔。 |
| `keyboard` | boolean | true | 启用键盘交互。 |
| `marks` | `Record<string \| number, ReactNode \| MarkObj>` | - | 滑块刻度标记。 |
| `max` | number | 100 | 最大值。 |
| `min` | number | 0 | 最小值。 |
| `onAfterChange` | `(value) => void` | - | 已废弃。请使用 `onChangeComplete`。 |
| `onBeforeChange` | `(value) => void` | - | 已废弃。请使用 `onChange`。 |
| `onBlur` | `(event) => void` | - | 模糊处理程序。 |
| `onChange` | `(value) => void` | - | 当值改变时触发。 |
| `onChangeComplete` | `(value) => void` | - | 交互完成时触发。 |
| `onFocus` | `(event) => void` | - | 焦点处理程序。 |
| `prefixCls` | string | `'rc-slider'` | className 前缀。 |
| `pushable` | boolean \| number | false | 范围模式下推动相邻滑块。 |
| `railStyle` | React.CSSProperties | - | 已废弃。请使用 `styles.rail`。 |
| `range` | boolean \| RangeConfig | false | 启用范围模式或配置可编辑范围行为。 |
| `reverse` | boolean | false | 以相反方向渲染。 |
| `startPoint` | number | `min` | 单值轨迹的起点。 |
| `step` | number \| null | 1 | 步长。使用 `null` 时以标记作为步进。 |
| `style` | React.CSSProperties | - | 根样式。 |
| `styles` | `Partial<Record<'tracks' \| 'track' \| 'rail' \| 'handle', React.CSSProperties>>` | - | 内部插槽的语义化样式。 |
| `tabIndex` | number \| number[] | 0 | 滑块的 tabIndex。 |
| `track` | boolean | - | 是否渲染轨道元素。 |
| `trackStyle` | React.CSSProperties \| React.CSSProperties[] | - | 已废弃。请使用 `styles.track`。 |
| `value` | number \| number[] | - | 受控值。 |
| `vertical` | boolean | false | 垂直渲染。 |

### RangeConfig

| 名称             | 类型    | 默认值 | 说明                     |
| ---------------- | ------- | ------ | ------------------------ |
| `draggableTrack` | boolean | false  | 允许拖动选定的范围轨道。 |
| `editable`       | boolean | false  | 允许添加或删除范围手柄。 |
| `maxCount`       | number  | -      | 可编辑时的最大句柄数。   |
| `minCount`       | number  | -      | 可编辑时的最小句柄数。   |

### Ref

| 名称    | 类型         | 说明       |
| ------- | ------------ | ---------- |
| `blur`  | `() => void` | 模糊滑块。 |
| `focus` | `() => void` | 聚焦滑块。 |

## 本地开发

```bash
npm install
npm start
npm test
npm run tsc
npm run compile
npm run build
```

dumi 站点默认运行在 `http://localhost:8000`。

## 发布

```bash
npm run prepublishOnly
```

包构建完成后，发布流程由 `@rc-component/np` 通过 `rc-np` 命令处理。

## 许可证

@rc-component/slider 基于 [MIT](./LICENSE) 许可证发布。
