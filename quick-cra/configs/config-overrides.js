const { override, addWebpackAlias, addDecoratorsLegacy, disableEsLint, useBabelRc } = require('customize-cra');
const path = require('path')

module.exports = override(
  addWebpackAlias({
    "@": path.resolve(__dirname, 'src')
  }),
  addDecoratorsLegacy(),
  disableEsLint(),
  useBabelRc(),
);
