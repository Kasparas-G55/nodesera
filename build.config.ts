import { defineBuildConfig } from 'unbuild';

export default defineBuildConfig({
  entries: [
    { input: './src/nodesera', name: 'index' }
  ],
  failOnWarn: true,
  declaration: true,
  outDir: 'dist',
  rollup: {
    emitCJS: true
  }
});
