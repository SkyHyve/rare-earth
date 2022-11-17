import babel from '@rollup/plugin-babel';
import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';
import React from 'react';

import pkg from './package.json' assert { type: "json" };

const INPUT_FILE_PATH = 'src/js/rare-earth.js';
const OUTPUT_NAME = 'RareEarth';

const GLOBALS = {
  react: 'React',
  'prop-types': 'PropTypes',
};

const PLUGINS = [
  replace({
    preventAssignment: true,
    'process.env.NODE_ENV': JSON.stringify('production'),
  }),
  commonjs({
    include: 'node_modules/**',
  }),
  babel({
    babelrc: true,
    babelHelpers: 'bundled',
    exclude: 'node_modules/**',
    presets: ['@babel/preset-react'],
  }),
  nodeResolve({
    browser: true,
    resolveOnly: [
      /^(?!react$)/,
      /^(?!react-dom$)/,
      /^(?!prop-types)/,
    ],
  }),
];

const EXTERNAL = [
  'react',
  'prop-types',
];

// https://github.com/rollup/plugins/tree/master/packages/babel#babelhelpers
const CJS_AND_ES_EXTERNALS = EXTERNAL.concat(/@babel\/runtime/);

const OUTPUT_DATA = [
  {
    file: pkg.browser,
    format: 'umd',
  },
  {
    file: pkg.main,
    format: 'cjs',
  },
  {
    file: pkg.module,
    format: 'es',
  },
];

const config = OUTPUT_DATA.map(({ file, format }) => ({
  input: INPUT_FILE_PATH,
  output: {
    file,
    format,
    name: OUTPUT_NAME,
    globals: GLOBALS,
  },
  external: ['cjs', 'es'].includes(format) ? CJS_AND_ES_EXTERNALS : EXTERNAL,
  plugins: PLUGINS,
}));

export default config;