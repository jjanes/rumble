var controllers = {};
var self; 
exports.bundle = { 
  initialize: function() {
      self = this;
      self.emit('routes.loaded', function() {
          
      }); 
  },
  events: {
    wait_for: {

    },    
    hooks: {
      'framework.loaded': function(args, sender) {
        
      },
      'webserver.request': function(args) {
        for (index in args) 
          console.log(' @@@' + index + ' : ' + typeof(args[index]));
        console.log('great');
        console.log( typeof(args.req ) ) 
          console.log( args.req.url ); 
      }
    },    
    detect: {
    '@bundles/*/routes.js': function(match) {
        var bundlename = match[0];
          var controller = match[1];
         

      }
    }
          
  }
}

