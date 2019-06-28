const half_char = require("../config/half_char.js")

var get_show_len = (str) => {
  var strlen = 0;
  for (i of str) {
    if (half_char.indexOf(i) == -1){
      strlen += 3;
    }
    else {
      strlen += 1;
    }
  }
  return strlen;
}

module.exports = get_show_len
