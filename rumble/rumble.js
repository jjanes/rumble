var fs = require('fs'); // require fs node module


var rumble = new function() {
  var _bundles = {};
  var _path    = null;
  var self     = this; 
  
  // bundle object, all bundle operations with be handled with this object
  var bundle = function(bundle, name) {
    var $this;
    var _bundle = name; var object;
    if (typeof _bundles[name] != 'undefined') 
      throw new "bundle "+name+" already exists.";

    var register = function(bundle) {
      if (typeof bundle != 'string') throw "Invalid parameter passed as bundle name. requires string. "+typeof(bundle)+" passed.";
      var f = bundle.split('/'); f.push(f[f.length-1]+'.js');f = f.join('/');
       
      if (!fs.existsSync(f)) throw "Cannont find: "+f;
      var object  = require('../'+f);
      _bundles[name] = $this;
    }

    register(bundle); 
  
    var initialize = function() {


    }

    initialize();

 

    
    //  var f = bundle+'.js';
  
    
    



  }

  var loadBundles = function() {
    var bundles = new function()  {
      eval(fs.readFileSync('bundles.js','utf8'));
      return bundles;
    }

    for (index in bundles) { 
      var _bundle = bundles[index];
      _bundles[index] = new bundle(_bundle, index);  
    }
    console.log(JSON.stringify(_bundles));
  }


  console.log('>>> ');
  loadBundles();

  console.log('end ');
}

