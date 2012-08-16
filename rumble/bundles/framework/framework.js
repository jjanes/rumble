var controllers = {};
var self; 
exports.bundle = { 
  initialize: function() {
      self = this;
      this.emit('framework.loaded', function() {
          
      }); 
  },
  events: {
    wait_for: {

    },    
    hooks: {
      'framework.loaded': function() {
         
      }

    },    
    detect: {
    '@bundles/*/controller/*': function(match) {
        var bundlename = match[0];
          var controller = match[1];
         

      }
    }
          
  }
}

