var express = require('express');
var app = express();


app.use(express.static(__dirname + '/public'));

app.get("public/index.html", function(req, res){
})
var server = app.listen(8080);