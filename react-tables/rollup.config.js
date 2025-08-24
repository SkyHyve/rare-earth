import alias from '@rollup/plugin-alias';
import nodeResolve from '@rollup/plugin-node-resolve'
import json from '@rollup/plugin-json'
import babel from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs';
import postcss from 'rollup-plugin-postcss';
import replace from '@rollup/plugin-replace';
import typescript from '@rollup/plugin-typescript';

import pkg from './package.json' assert { type: "json" };

const INPUT_FILE_PATH = 'src/index.ts';
const OUTPUT_NAME = 'RareEarth';

const PLUGINS = [
  postcss({
    extract: 'css/react-tables.css',
    minimize: true,
  }),
  replace({
    'process.env.NODE_ENV': JSON.stringify('production'),
    preventAssignment: true,
  }),
  typescript({
    tsconfig: './tsconfig.json',
    declaration: true,
    declarationDir: './dist',
  }),
  nodeResolve({
    //browser: true,
    resolveOnly: [
      /^(?!react$)/,
      /^(?!react-icons$)/,
      /^(?!react-dom$)/,
      /^(?!prop-types)/,
    ],
  }),
  json(),
  babel({
    babelrc: true,
    babelHelpers: 'bundled',
    exclude: 'node_modules/**',
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
    presets: ['@babel/preset-react', '@babel/preset-typescript'],
  }),
  commonjs({
    include: 'node_modules/**',
  }),
];

const EXTERNAL = [
  'react',
  'react-dom',
  'prop-types',
  'preact',
  'preact/compat',
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
    globals: {
      'prop-types': 'PropTypes',
      react: 'React',
    }
  },
  external: ['cjs', 'es'].includes(format) ? CJS_AND_ES_EXTERNALS : EXTERNAL,
  plugins: PLUGINS,
}));

export default config;
