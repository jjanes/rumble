var fs = require('fs'); // require fs node module


var rumble = new function() {
  var bundles = {};
  var self = this;

  this.emit = function() {

  }



  // bundle object, all bundle operations with be handled with this object
  var bundle = function(args) {
    if (typeof args.bundle == 'undefined') throw "Need to pass bundle as argument";
    
    var bundle = args.bundle; 
    
    var f = bundle.split('/');
    f.push(f[f.length-1]+'.js'); f = f.join('/');
    
    if (!fs.existsSync(f)) { 
      throw "Cannont find: "+f; 
    }
    
    var object  = require('../'+f);
  
    if (typeof object.bundle == 'function') {
      // object.initialize(self);

    } else if (typeof object.bundle == 'object') {

    }
  





  }

  var loadBundles = function() {
    var _bundles = new function()  {
      eval(fs.readFileSync('bundles.js','utf8'));
      if (typeof bundles != 'object') throw "Need to set bundles hash table";
      return bundles;
    }


    for (index in _bundles) { 
      var _bundle = _bundles[index];
      if (typeof bundles[index] == 'undefined') {
        bundles[index] = new bundle({ bundle: _bundle, name: index });  
      } 
    }



  }






  loadBundles();

}

