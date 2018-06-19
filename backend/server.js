const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const db = require('./config/db');
const port = '8000';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cors());

MongoClient.connect(db.url, (err, database) => {
    if (err) return console.log(err);
    require('./routes')(app, database.db('notes'));
    app.listen(port, function (error) {
        if (error) {
            console.log('Error:' + error.name + '\n');
        } else console.log('Listening port ' + port + '\n');
    });
});

module.exports = app;



