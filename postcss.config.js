var autoprefixer = require("autoprefixer"); // eslint-disable-line

module.exports = {
  plugins: [autoprefixer({ overrideBrowserslist: "last 2 versions" })],
};
