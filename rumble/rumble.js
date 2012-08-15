var fs = require('fs'); // require fs node module
// check directory structure 
var cwd = process.cwd();
var ru  = require(cwd+'/rumble/lib/ru.js');

// all hooks will be done with 
var rumble = new function() {
  var debug = 1;
  var bundles = {};
  var self = this;
  var f;            // temp var for storing file data
  var object;       // var to store object
  this.loaded = false;
  var $hooks = {};
  var _hook = function(event) {
    if (typeof $hooks[event] == 'object') {
      var index;
      for (index in $hooks[event]) {
        var v =  $hooks[event][index].hook; 
        if (typeof(v) == "function") { v.call(); }
      }
    }
  }

  // bundle base class
  var bundleBase = function(bundle) {
    var _self = this;
    var index;
    var initialize = function() {
    }
    this.test   = function() { 
      console.log('wtf'); 
    }
    this.parent = function() { 
    
    }

    // actually extend the object
    // interate through every public prop/meth of the target object and attach it to this.
    for (index in bundle.bundle) this[index] = bundle.bundle[index]; 
  
    if (typeof this.events == 'object') {
      
      if (typeof this.events.wait_for == 'object') {

      }

      if (typeof this.events.hooks == 'object') {
        var index;
        for (index in this.events.hooks) { 
          if (typeof(this.events.hooks[index])=="function") { 
            if (typeof $hooks[index] == 'undefined') {
              $hooks[index] = [];
            }
            $hooks[index].push(_self);
          }
        }

      }    
      if (typeof this.events.detech == 'object') {
        var index;
        for (index in this.events.detech) {
          
        }
      }
    }

    // emit function 
    this.emit = function(event) { 
      console.log('emited');
      _hook(event);

    }
    this.hook = function(hook) {
      var t = _self.events.hooks;
      console.log(typeof(t) + ' @@@ ' + JSON.stringify(t));
      if (typeof _self.events.hooks[hook] == 'function') { 
      console.log('CAPTIAN HOOOKZZZZZZZZZZZZZZZ');
        _self.events.hooks[hook].call();
      }
    }
  }
  // end of bundle base clase
 


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
    
    // return all files and directories in the bundle
    this.getStruct = function() {
      return struct;
    }

    if (typeof args.bundle == 'undefined') {  
      throw new Error("Need to pass bundle as argument"); 
    }

    var bundle = args.bundle; 
   
    if (debug) { 
      console.log("creating bundle object: "+bundle); 
    }
    
    var dir = bundle;
    var struct = ru.getStructSync(bundle); 
    
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
      if (debug) { 
        console.log(" >>>>> could not initialize: "+bundle+ ", typeof: "+typeof(object.bundle)); 
      }
      return false;
    }

    if (debug) {
        console.log(JSON.stringify(object.bundle));
    }
     
  
    if (typeof object.bundle.events  == 'object') {
      
    
    }
    
    this.hook = function() {

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
      var index;
      var _bundle = _bundles[index];
      if (typeof bundles[index] == 'undefined') {
        var b = new bundle({ bundle: _bundle, name: index });  
        if (b.loaded)  { 
            bundles[index] = b;
        } else {
            console.log('did not load ' + index);
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
