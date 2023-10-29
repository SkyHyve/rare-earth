import alias from '@rollup/plugin-alias';
import resolve from '@rollup/plugin-node-resolve'
import json from '@rollup/plugin-json'
import { babel } from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';

export default [
    {
        input: 'src/server.js',
        output: {
            file: 'build/server.js',
            format: 'cjs',
        },
        watch: {
          include: 'src/**/**/*'
        },
        plugins: [
          replace({
            'process.env.NODE_ENV': JSON.stringify('production'),
            __buildDate__: () => JSON.stringify(new Date()),
            __buildVersion: 15
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
        ],
    },
    {
        input: 'src/client.js',
        output: {
            file: 'public/client.js',
            format: 'es',
            name: 'client',
            globals: {
              'node_modules/react-icons/lib/esm/iconBase.js': 'reactIconThis'
            }
        },
        plugins: [
          replace({
            'process.env.NODE_ENV': JSON.stringify('production'),
            __buildDate__: () => JSON.stringify(new Date()),
            __buildVersion: 15
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
        ],
    },
]
