var fs   = require('fs');
var path = require('path');

exports.getStructSync =  getStructSync = function(path) {
  var struct = {
    path: process.cwd()+'/'+path, 
    dirs: {},
    files: {}
  };
  var files = fs.readdirSync(path);
  for (index in files) {
    var r = path+'/'+files[index];
    var fp = process.cwd()+'/'+path+'/'+files[index];
    var s = fs.statSync(fp);
    
    if (typeof s == 'undefined') 
      continue;      

    if (s.isDirectory()) 
      struct.dirs[r] =  getStructSync(r); 
    else 
      struct.files[r] = r;
  }
  return struct;
}

