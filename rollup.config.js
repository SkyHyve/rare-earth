import replace from '@rollup/plugin-replace';
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { babel } from '@rollup/plugin-babel';
import React from 'react';

export default {
  input: 'src/js/rare-earth.js',
  output: {
    file: 'dist/bundle.js',
    format: 'es'
  },
  plugins: [
    replace({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
    nodeResolve({browser: true, extensions: ['.js']}),
    commonjs({
      include: 'node_modules/**',
      namedExports: {
        'react': Object.keys(React),
      }
    }),
    babel({
      babelrc: true,
      babelHelpers: 'bundled',
      presets: ['@babel/preset-react'],
    }),
  ],
};