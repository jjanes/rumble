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
  var $detect =  {}; 

  // bundle base class
  var bundleBase = function(bundle) {
    var _self = this;
    var index;
    var initialize = function() {
    }

    // actually extend the object
    // interate through every public prop/meth of the target object and attach it to this.
    for (var index in bundle.bundle) {
      this[index] = bundle.bundle[index]; 
      console.log('add func/methd ' + index);
    }
     // emit function 
    this.emit = function(event, args, callback) {
      if (debug) { console.log('emitted event: ' + event); }
      var i = 0;
    
      if (typeof $hooks[event] === 'object') {
        for (var index in $hooks[event]) {
          if (debug) { console.log('attemping to hook ' + event + ' on ' + index); }
          var f = $hooks[event][index].hook; 
          if (typeof(f) === "function") f(event, args, _self); 
          // some day we might want to add an else here  
          i++;
        }
      }
      if (typeof(callback) == 'function') {
        callback.call({ total: i });
      }

    }
    
    this.hook = function(hook, args, caller) {
      if (debug) { console.log('captian hoookkkkkzzzz, arrrrrrrrrrrrrrrr ' +  typeof(_self.events.hooks[hook]) ); } 
      var t = _self.events.hooks;
      if (typeof(_self.events.hooks[hook]) === "undefined") return false;

      var f = _self.events.hooks[hook]; if (typeof f === 'function') f(args,caller);
    }
 
    // setup events 
    if (typeof this.events == 'object') {
      if (typeof this.events.wait_for == 'object') {

      }

      if (typeof this.events.hooks==="object") {
        for (var index in this.events.hooks) { 
          if (typeof this.events.hooks[index]==="function") {
            if (typeof $hooks[index]==="undefined") $hooks[index] = [];
            $hooks[index].push(this);
          }
        }
      }    
      if (typeof this.events.detect==="object") {
        for (var index in this.events.detect) {
          if (typeof $detect[index]==="undefined") $detect[index] = []; 
          if (debug) { console.log('detecting ' + index); }
          $detect[index].push(this);
        }
      }
    } else {
      this.events = {
        detect: {}
      }
    }
 }
  // end of bundle base clase
 


  // bundle object, all bundle operations with be handled with this object
  var bundle = function(args) {
     // initialize function for bundle.. 
    this.initialize = function() {
      object.bundle.initialize.call(object.bundle);
      if (typeof object.bundle.initialize==='function') {  // 
        if (debug)  console.log("Initializing bundle : "+bundle);
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
    console.log(JSON.stringify(struct));
    
    var f = bundle.split('/'); f.push(f[f.length-1]+'.js'); f = f.join('/');
    
    if (!fs.existsSync(f)) {  throw  new Error("Cannont find: "+f); }
    
    var object  = require('../'+f);
 
    if (typeof object.bundle == 'function') {
      // bundle returns as a function let invoke it.
      object.bundle = new bundleBase(new object.bundle);
    } else if (typeof object.bundle != 'object' && typeof object.bundle != "function") {
      if (debug) { 
        console.log(" >>>>> could not initialize: "+bundle+ ", typeof: "+typeof(object.bundle)); 
      }
      return false;
    } else {
      object.bundle = new bundleBase(object); 
    }

    if (debug) { console.log(JSON.stringify(object.bundle)); }
     
  
    if (typeof object.bundle.events==="object") {
      
    
    }
    
    // object.bundle.apply(new bundleBase(object));
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
    for (var index in _bundles) {
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

  for (var index in bundles) {

    //debug::
    if (debug) { console.log(' ... initializing bundle: ' + index); }
    //::debug
    bundles[index].initialize();
    //debug::
    if (debug) { console.log(" >>> finished initializing: "+index); }
    //::debug

  }


  // bundle file detection gotta love this feature
  for (var match in $detect) { 
    var caller = $detect[match];
    if (debug) console.log('>>> detecting file: ' + match);
  
  }



}



// maybe someday millions of people will look at this code (8/4/12)
