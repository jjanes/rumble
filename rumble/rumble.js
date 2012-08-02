var fs = require('fs'); // require fs node module


var rumble = new function() {
  var debug = 1;
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
      // bundle returns as a function let invoke it.
      if (debug) console.log("object.bundle function found");
      object.bundle = new object.bundle;
    } else if (typeof object.bundle != 'object' && typeof object.bundle != "function") {
      if (debug) {
        console.log(" >>>>> could not initialize: "+bundle+ ", typeof: "+typeof(object.bundle));
      }
      return false;
    }
     
    
    if (debug) {
        console.log(JSON.stringify(object.bundle));
        console.log("typeof "+bundle+".initialize " + typeof(object.bundle.initialize));
    }
    if (typeof object.bundle.initialize == 'function') {
        console.log("Initializing bundle : "+bundle);
        object.bundle.initialize.apply(new function(){
          this.test = function(){ 
            console.log('hooootooooy');
          }


        });
    }
    ///debug::
    if (debug) {
      console.log(" >>> finished initializing: "+bundle);  
    }
    //::debug
  
  }

  var loadBundles = function() {
    var _bundles = new function()  {
      eval(fs.readFileSync('bundles.js','utf8'));
      if (typeof bundles != 'object') {
        throw new Erorr("Need to set bundles hash table");
      } 
      return bundles;
    }

    // interate through each bundle and create the new bundle object 
    for (index in _bundles) { 
      var _bundle = _bundles[index];
      if (typeof bundles[index] == 'undefined') {
        bundles[index] = new bundle({ bundle: _bundle, name: index });  
      } 
    }
  }
  loadBundles();
}

