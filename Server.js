let dataBase = require('node-json-db');

const videoDB = new dataBase("videoDB", true, true);

let express = require('express');
let path = require("path");
let app = express();

app.use(express.urlencoded());
app.use(express.json());

app.use(express.static(path.join(__dirname, "/build")));

app.post('/api/videos', function (req, res) {
    videoDB.push(('/videos[]'), req.body);
    res.send(videoDB.getData("/videos"));
});

app.delete('/api/videos', function (req, res) {
    videoDB.delete("/videos[" + req.body.index + "]");
    res.send(videoDB.getData("/videos"))
});

app.get('/api/videos', function (req, res) {
    console.log(videoDB.getData("/"));
    res.send(videoDB.getData("/videos"));
});

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname + '/build/index.html'));
});

app.listen(8080, () => {
    console.log("Server listening on", 8080)
});