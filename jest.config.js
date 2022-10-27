module.exports = {
  setupFiles: ['./tests/setup.js'],
  snapshotSerializers: [require.resolve('enzyme-to-json/serializer')],
};
