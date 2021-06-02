clearInterval()/*eslint no-console: 0*/
"use strict";

var express = require('express');
var bodyParser = require('body-parser');
var jwtDecode  = require('jwt-decode');

var port = process.env.PORT || 3000;
var app = express();

app.get('/be', function(req,res){
    console.log("====Req headers ",req.headers);
    let token = req.headers['authorization'];
    let decodedToken = jwtDecode(token);
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(decodedToken));
});

app.listen(port);

console.log("Server listening on port %d", port);
