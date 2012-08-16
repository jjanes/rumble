var controllers = {};
var self; 
exports.bundle = { 
  initialize: function() {
      self = this;
      this.emit('routes.loaded', function() {
          
      }); 
  },
  events: {
    wait_for: {

    },    
    hooks: {
      'framework.loaded': function(sender) {
        sender. 
        console.log('great');

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

