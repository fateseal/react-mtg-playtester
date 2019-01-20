import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import external from 'rollup-plugin-peer-deps-external';
import builtins from 'rollup-plugin-node-builtins';
import resolve from 'rollup-plugin-node-resolve';
import replace from 'rollup-plugin-replace';
import { uglify } from 'rollup-plugin-uglify';

import pkg from './package.json';

const config = {
  input: 'src/index.js',
  output: [
    {
      file: pkg.module,
      format: 'es',
      sourcemap: true
    }
  ],
  plugins: [
    external(),
    builtins(),
    babel({
      exclude: 'node_modules/**'
    }),
    resolve(),
    commonjs({
      namedExports: {
        'node_modules/react-is/index.js': ['isValidElementType']
      }
    })
  ]
};

if (process.env.NODE_ENV === 'production') {
  config.output.push({
    file: pkg.main,
    format: 'cjs',
    sourcemap: true
  });

  config.plugins.push(
    replace({
      'process.env.NODE_ENV': JSON.stringify('production')
    })
  );

  config.plugins.push(uglify());
}

export default config;
