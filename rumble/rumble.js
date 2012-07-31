var fs = require('fs'); // require fs node module


var rumble = new function() {
  var bundles = {};
  var self = this;
  var f;            // temp var for storing file data
  var object;       // var to store object

  // bundle object, all bundle operations with be handled with this object
  var bundle = function(args) {
    if (typeof args.bundle == 'undefined') { 
      throw new Error("Need to pass bundle as argument");
    }

    var bundle = args.bundle; 
    console.log("creating bundle object: "+bundle);
    
    var f = bundle.split('/');
    f.push(f[f.length-1]+'.js'); f = f.join('/');
    
    if (!fs.existsSync(f)) { 
      throw  new Error("Cannont find: "+f); 
    }
    
    var object  = require('../'+f);
  
    if (typeof object.bundle == 'function') {
      // object.initialize(self);
      // var object =  
      console.log(JSON.stringify(object.bundle.apply()));
      console.log('wtf1');
    } else if (typeof object.bundle == 'object') {
      console.log('wtf2');
    }  
    
    if (typeof object.bundle != 'object') {
      // will want to throw and eror here at some point 
      console.log('wtf');
      return;
    }
    console.log(typeof object.bundle);
    object.rumble = self;
    
    object.test = function() {
      console.log('test');
    }
   
    if (typeof object.bundle.initialize == 'function') {
        object.bundle.initialize.call();
    }
  
  }

  var loadBundles = function() {
    var _bundles = new function()  {
      eval(fs.readFileSync('bundles.js','utf8'));
      if (typeof bundles != 'object') {
        throw new Erorr("Need to set bundles hash table");
      } 
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

