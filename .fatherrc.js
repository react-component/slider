export default {
  cjs: 'babel',
  esm: { type: 'babel', importLibToEs: true },
  preCommit: {
    eslint: true,
    prettier: true,
  },
};
