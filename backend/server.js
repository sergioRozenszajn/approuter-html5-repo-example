/*eslint no-console: 0*/
"use strict";

var express = require('express');
var bodyParser = require('body-parser');

var port = process.env.PORT || 3000;
var app = express();

app.get('/be', function(req,res){
    res.setHeader('Content-Type', 'text/plain');
    res.end("Backend has been reached\n");
});

app.listen(port);

console.log("Server listening on port %d", port);
