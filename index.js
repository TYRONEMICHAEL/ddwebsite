var util = require('util');
var express = require("express");
var cacheManifest = require('connect-cache-manifest');
var app = express();
var port = 5000;
var version = 1;

// cache manifest middleware
app.use(cacheManifest({
  manifestPath: '/application.manifest',
  cdn: [
  	'http://yui.yahooapis.com/pure/0.5.0/pure-min.css',
  	'http://yui.yahooapis.com/pure/0.5.0/grids-responsive-min.css',
  	'http://maps.google.com/maps/api/js?sensor=true'
  ],
  files: [{
  	dir: __dirname + '/public/',
  	prefix: '/',
  	ignore: function (x) {
  		return /\.DS_Store$/.test(x);
  	}
  }],
  networks: ['*']
}));

app.use(express.static(__dirname + '/public'));

app.listen(port);

console.log(util.format('Site running on => http://localhost:%s', port));