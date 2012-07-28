var fs = require('fs'); // require fs node module


var rumble = new function() {
  var _bundles = {};
  
  // bundle object, all bundle operations with be handled with this object
  var bundle = function(bundle) {
    var _bundle = bundle;
    
    var f = bundle.split('/');
    f.push(f[f.length-1]+'.js');
    f = f.join('/');
    console.log(f); 
    if (!fs.existsSync(f)) {
        throw "Cannont find: "+f;
    }

    console.log(JSON.stringify(f));

    
    
    //  var f = bundle+'.js';
  
    
    
    var object  = require('../'+f);



  }

  var loadBundles = function() {
    var bundles = new function()  {
      eval(fs.readFileSync('bundles.js','utf8'));
      return bundles;
    }

    for (index in bundles) { 
      var _bundle = bundles[index];
      _bundles[index] = new bundle(_bundle);  
    }


    fs.readdir('bundles', function(err, list) {
      for (index in list) {
        var item  = list[index];
        var f     = 'bundles/'+item+'/'+item+'.js';
       



        if (!fs.existsSync(f)) {
          console.log('could not find init file for: '+item);
        } else {
          //var d = fs.readFileSync(f, 'utf8');
          //console.log(d);
        
      


        /*  
          fs.readFileSync(f, 'utf8', function(err,data){
            console.log('wtfabc');
            if (err) {
              console.log('error: ' + err);
            } else {
              console.log('++ ' + data); 
            }
          });
          console.log('wtf123');
        }

        */
        }
      }
    });

  }


  console.log('>>> ');
  loadBundles();

  console.log('end ');
}

