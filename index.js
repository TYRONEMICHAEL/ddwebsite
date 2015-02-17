var util = require('util');
var express = require("express");
var app = express();
var port = 5000;

app.use(express.static(__dirname + '/public'));

app.listen(port);

console.log(util.format('Site running on => http://localhost:%s', port));