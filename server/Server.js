let dataBase = require('node-json-db');
let videoDB = new dataBase("videoDB", true, false);
let express = require('express');
let app = express();

app.use(express.urlencoded());
app.use(express.json());

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

app.listen(4000,);