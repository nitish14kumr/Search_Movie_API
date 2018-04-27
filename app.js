var express = require("express");
var app = express();
var request = require("request");

app.set("view engine", "ejs");

// apikey=a898d0ed
// apikey=thewdb

app.get("/", (req, res)=>{
    res.render("search");
});

app.get("/results", (req, res)=>{
    var searchTerm = req.query.searchTerm;
    var url = 'http://omdbapi.com/?apikey=thewdb&s=' + searchTerm;
    request(url, (error, response, body)=>{
        if(!error && response.statusCode == 200){
            var data = JSON.parse(body);
            res.render('results', {data: data});
        }
    });
});

app.get("/movie", (req, res)=>{
    var id = req.query.id;
    var url = 'http://omdbapi.com/?apikey=thewdb&plot=full&i=' + id;
    request(url, (error, response, body)=>{
        if(!error && response.statusCode == 200){
            var data = JSON.parse(body);
            // res.send(data);
            res.render('movie', {data: data});
        }
    });
});

app.listen(process.env.PORT, process.env.IP, ()=>{
    console.log("App Started.");
});