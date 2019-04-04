let dataBase = require('node-json-db');
let videoDB = new dataBase("videoDB", true, false);
let express = require('express');
let path = require("path")
let app = express();

app.use(express.urlencoded());
app.use(express.json());

app.use(express.static(path.join(__dirname, "/public")));
app.use(express.static(path.join(__dirname, "/build")));

app.post('/api/videos', function (req, res) {
    videoDB.push(('/videos[]'), req.body)
    res.send(videoDB.getData("videoDB/videos"))
    console.log(req.body)
});

app.delete('/api/videos', function (req, res) {
    videoDB.delete("videoDB/videos[" + req.body.index + "]")
    res.send(videoDB.getData("videoDB/videos"))
});

app.get('/api/videos', function (req, res) {
    res.send(videoDB.getData("videoDB/videos"));
});

app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname + '/../build/index.html'));
});

app.listen(4000,);