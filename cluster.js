// A test script for the cluster module, stolen from the node.js docs.

var cluster = require('cluster');

var http = require('http');
var numCPUs = require('os').cpus().length;

if (cluster.isMaster) {
  // Fork workers.
  for (var i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('death', function (worker) {
    console.log('worker ' + worker.pid + ' died');
  });
} 
else {
  // Worker processes have a http server.
  http.Server(function (req, res) {
    res.writeHead(200);
    res.end("hello, I am a worker.\n");
  }).listen(8000);
}
