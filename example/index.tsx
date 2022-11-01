import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Range, Slider } from '../src';

const App = () => {
  return (
    <div>
      <Range />
      <Slider />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
