import typescript from '@rollup/plugin-typescript'
import commonjs from '@rollup/plugin-commonjs'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import terser from '@rollup/plugin-terser'
import analyze from 'rollup-plugin-analyzer'
const lib = require('./package.json')

const namedInput = 'src/index.ts'
const outputFileName = lib.name

function buildConfig({ output }) {
  /**
   * @type {import('rollup').RollupOptions}
   */
  const config = {
    input: namedInput,
    // external: ['howler'],
    output: {
      ...output
    },
    plugins: [
      typescript(),
      commonjs(),
      nodeResolve(),
      terser({
        maxWorkers: 2,
        compress: {
          drop_console: true
        }
      }),
      analyze({
        hideDeps: true,
        summaryOnly: true
      })
    ]
  }

  return config
}

export default async () => {
  const year = new Date().getFullYear()

  const banner = `/*
  * soundbeam v${lib.version}
  * (c) 2023-${year}, Vladyslav S. (@${lib.author})
  * ${lib.license} License 
  */`

  return [
    {
      ...buildConfig({
        output: {
          file: `dist/cjs/${outputFileName}.cjs`,
          format: 'cjs',
          name: 'Soundbeam',
          banner
        }
      })
    },
    {
      ...buildConfig({
        output: {
          file: `dist/esm/${outputFileName}.js`,
          format: 'esm',
          banner
        }
      })
    }
  ]
}
