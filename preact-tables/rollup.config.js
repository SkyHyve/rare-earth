import alias from '@rollup/plugin-alias';
import resolve from '@rollup/plugin-node-resolve'
import json from '@rollup/plugin-json'
import babel from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';

import pkg from './package.json' assert { type: "json" };

const INPUT_FILE_PATH = 'src/Table.jsx';
const OUTPUT_NAME = 'RareEarth';

const PLUGINS = [
  replace({
    'process.env.NODE_ENV': JSON.stringify('production'),
  }),
  alias({
    entries: [
      { find: 'react', replacement: 'preact/compat' },
      { find: 'react-dom/test-utils', replacement: 'preact/test-utils' },
      { find: 'react-dom', replacement: 'preact/compat' },
      { find: 'react/jsx-runtime', replacement: 'preact/jsx-runtime' }
    ]
  }),
  resolve(),
  json(),
  babel({
    exclude: 'node_modules/**',
    babelHelpers: 'bundled',
    plugins: [
      [
        '@babel/plugin-transform-react-jsx',
        {
          pragma: 'h',
          pragmaFrag: 'Fragment'
        }
      ]
    ]
  }),
  commonjs(),
];

const EXTERNAL = [
  'preact',
  'preact/hooks',
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
      'node_modules/react-icons/lib/esm/iconBase.js': 'reactIconThis'
    }
  },
  external: ['cjs', 'es'].includes(format) ? CJS_AND_ES_EXTERNALS : EXTERNAL,
  plugins: PLUGINS,
}));

export default config;
