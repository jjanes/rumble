var fs = require('fs'); // require fs node module

// all hooks will be done with 
var rumble = new function() {
  var debug = 1;
  var bundles = {};
  var self = this;
  var f;            // temp var for storing file data
  var object;       // var to store object
  this.loaded = false; 

  // bundle base class
  var bundleBase = function(bundle) {
    var initialize = function() {

    }
    this.test = function() { console.log('wtf'); }
    this.parent = function() { }
    
    // actually extend the object
    // interate through every public prop/meth of the target object and attach it to this.
    for (index in bundle.bundle) { this[index] = bundle.bundle[index]; }
  
  }
   
  // bundle object, all bundle operations with be handled with this object
  var bundle = function(args) {
     // initialize function for bundle.. 
    this.initialize = function() {
      if (typeof object.bundle.initialize == 'function') {  // 
        if (debug){ 
          console.log("Initializing bundle : "+bundle);
        }
        object.bundle.initialize.apply(new bundleBase(object));
      }
    }
  
    if (typeof args.bundle == 'undefined') {  throw new Error("Need to pass bundle as argument"); }
    var bundle = args.bundle; 
    if (debug) { console.log("creating bundle object: "+bundle); }
    
    var f = bundle.split('/');
    f.push(f[f.length-1]+'.js'); 
    
    f = f.join('/');
    
    if (!fs.existsSync(f)) {  throw  new Error("Cannont find: "+f); }
    
    var object  = require('../'+f);
 
    if (typeof object.bundle == 'function') {
      // bundle returns as a function let invoke it.
      if (debug) console.log("object.bundle function found");
      object.bundle = new object.bundle;
    } else if (typeof object.bundle != 'object' && typeof object.bundle != "function") {
      if (debug) { console.log(" >>>>> could not initialize: "+bundle+ ", typeof: "+typeof(object.bundle)); }
      return false;
    }
     
    
    if (debug) {
        console.log(JSON.stringify(object.bundle));
    }
     
  
    if (typeof object.bundle.events  == 'object') {
      
    
    }
    this.loaded = true;


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
        var b = new bundle({ bundle: _bundle, name: index });  
        if (b.loaded)  { 
            bundles[index] = b;
        } else
            else console.log('did not load ' + index);
        }
      } 
    }
  }
  
  loadBundles();

  for (index in bundles) {
    //debug::
    if (debug) { console.log(' ... initializing bundle: ' + index); }
    //::debug
    bundles[index].initialize();
    //debug::
    if (debug) { console.log(" >>> finished initializing: "+index); }
    //::debug

  }

}



// maybe someday millions of people will look at this code (8/4/12)
