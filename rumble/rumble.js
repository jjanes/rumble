var fs = require('fs');
var rumble = new function() {


  
  var loadBundles = function() {
    fs.readdir('bundles', function(err, list) {
      for (index in list) {
        var item = list[index];
        var f ='bundles/'+item+'/'+item+'.js';
        console.log(f); 
        
        if (!fs.existsSync(f)) {
          console.log('could not find init file for: '+item);
        } else {
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
      }
    });

  }


  console.log('>>> ');
  loadBundles();

  console.log('end ');
}

