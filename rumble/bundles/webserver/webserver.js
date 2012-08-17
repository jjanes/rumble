var http = require('http');

var controllers = {};
var self;
var _server;

exports.bundle = { 
  initialize: function() {
      self = this;
      _server = http.createServer(this.request).listen(3050);
      self.emit('webserver.loaded', function() {
          
      }); 
  },
  request: function(request, response) {
    self.emit('webserver.request', { req: request, res: response  }, function() { 
    
    });
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.end("Hello World\n");
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

