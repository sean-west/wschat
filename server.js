var WebSocketServer = require('ws').Server;
var wss = new WebSocketServer({port: 3000});

var connections = [];

wss.on('connection', function(ws) {
  ws.on('message', function(message) {
    console.log(message);
    connections.forEach(function(elem) {
      if (elem !== ws) {
        elem.send(message);
      }
    })
  });

  connections.push(ws);
});

process.stdin.on('data', function (data) {
  var msg = data.toString().trim();

  connections.forEach(function(elem) {
    elem.send(msg);
  })
});
