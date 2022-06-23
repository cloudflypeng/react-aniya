import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.jsx'],
  treeshake: true,
  format: ['cjs', 'esm'],
})