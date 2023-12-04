import typescript from '@rollup/plugin-typescript'
import commonjs from '@rollup/plugin-commonjs'
import terser from '@rollup/plugin-terser'
import serve from 'rollup-plugin-serve'
// import html from '@rollup/plugin-html'
import { nodeResolve } from '@rollup/plugin-node-resolve'

/**
 * @type {import('rollup').RollupOptions}
 */
export default {
  input: 'src/index.ts',
  // external: ['howler'],
  output: {
    file: 'output/index.js',
    format: 'cjs'
  },
  plugins: [
    typescript(),
    commonjs(),
    nodeResolve(),
    // terser(),
    serve({
      historyApiFallback: '/public/index.html',
      port: 4000,
      contentBase: ['public', 'output', 'assets'],
      onListening: function (server) {
        const address = server.address()
        const host = address.address === '::' ? 'localhost' : address.address
        // by using a bound function, we can access options as `this`
        const protocol = this.https ? 'https' : 'http'
        console.log(`Server listening at ${protocol}://${host}:${address.port}/`)
      }
    })
  ]
}
