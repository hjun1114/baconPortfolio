var express = require("express");
var app = express();
var server = require("http").createServer(app);

app.use('/app', express.static(__dirname + '/client')); 
app.use('/', express.static("public")); // for asset files - use public directory
app.set("view engine", "ejs");

app.get("/", function(req, res){
  res.render("landing");
});

app.get("/markets", function(req, res){
  res.render("markets");
});

app.get("/app", function(req, res){
  res.render("client/index"); 
});

server.listen(process.env.PORT || 3000, function(){
  console.log("Server has started");
});
