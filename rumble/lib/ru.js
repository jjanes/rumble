var fs   = require('fs');
var path = require('path');
exports.getStructSync = function(path) {
  var files = fs.readdirSync(path);
  console.log('abc ' + JSON.stringify(files));
  for (index in files) {
    var f = process.cwd()+'/'+path+'/'+files[index];
    var s = fs.statSync(f);
    if (typeof s == 'undefined') continue;
    if (s.isDirectory()) {
      console.log('directory; ' + f);
    } else {
      console.log('file: ' + f);
    }
  
  }
}
