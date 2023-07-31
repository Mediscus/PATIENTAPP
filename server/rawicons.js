var fs = require("fs");

function rawicons(fileName) {
  var dir = "app/api/icons/";
  var mycontent = fs.readFileSync(dir + fileName.src, "utf8");
  return mycontent.toString();
}

module.exports = rawicons;
