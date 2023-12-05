import typescript from '@rollup/plugin-typescript'
import commonjs from '@rollup/plugin-commonjs'
// import terser from '@rollup/plugin-terser's
import { nodeResolve } from '@rollup/plugin-node-resolve'

/**
 * @type {import('rollup').RollupOptions}
 */
export default {
  input: 'src/index.ts',
  output: {
    file: 'output/index.js',
    format: 'es',
    name: 'Soundbeam'
  },
  plugins: [
    typescript(),
    commonjs(),
    // terser(),
    nodeResolve()
  ]
}
