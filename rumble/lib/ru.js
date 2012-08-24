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

exports.getAllFiles =  getAllFiles = function(path) {
  var _files = []; 
  var files = fs.readdirSync(path);
  for (index in files) {
    var r = path+'/'+files[index];
    var s = fs.statSync(r);
    if (typeof s == 'undefined') continue;      
    if (s.isDirectory()) {
      var _f =  getAllFiles(r); 
      for (var index in _f) { 
        _files.push(_f[index]);
      }
    } else { 
        _files.push(r);
    }
  }
  return _files;
}

