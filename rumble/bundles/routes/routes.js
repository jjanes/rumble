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

