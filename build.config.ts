import { defineBuildConfig } from 'unbuild';

export default defineBuildConfig({
  entries: [
    { input: './src/nodesera', name: 'index' },
    { input: './src/types/', outDir: './dist/types' }
  ],
  outDir: 'dist',
  rollup: {
    emitCJS: true
  }
});
