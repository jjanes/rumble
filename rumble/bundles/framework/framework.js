var controllers = {};
var self; 
exports.bundle = { 
  initialize: function() {
      self = this;
      this.emit('framework.loaded', function() {
        console.log('WOOOOOOOT SAUCH')
          
      }); 
  },
  events: {
    wait_for: {

    },    
    hooks: {
      'framework.loaded': function() {
         
        %
      }

    },    
    detech: {
      '@bundles/*/controller/*': function(match) {
          var bundlename = match[0];
          var controller = match[1];
         

      }
    }
          
  }
}

