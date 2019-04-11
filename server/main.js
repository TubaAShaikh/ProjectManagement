let routes = require('./routes');
let express = require('express');
let bodyParser = require('body-parser');
let MongoClient = require('mongodb').MongoClient;
let cors = require('cors');
let fileUpload = require('express-fileupload');

console.log('Starting server');

let app = express()
app.use(bodyParser.json());
app.use(cors());
app.use(fileUpload({ limits: { fileSize: 50 * 1024 * 1024 } }));
//let db = {};

MongoClient.connect('mongodb://localhost:27017/pms', (err, db) => {

    if (err) {
        console.log(err);
    }
    else {
        let dbo = db.db('pms');
        routes(app, dbo);
        app.listen(8000, () => { console.log('server started'); });
    }

});


