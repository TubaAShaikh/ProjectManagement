let mongo = require('mongodb');
let express = require('express');
module.exports = function (app, db) {

    app.post('/file/addfile', (req, res) => {
        db.collection('files').insertOne({filename }, (err, result) => {
         
            if (err) {
                res.send({ status: "error" });
            }
            else {
                res.send({ status: 'success' });
                express.redirect('back');
            }
        });
    });


    app.get('/file/getfile', (req, res) => {
        db.collection('files').FindOne({ _id: new mongo.ObjectId(id) }, (err, result) => {
         console.log(err,result);
            if (err) {
                res.send({ status: "error" });
            }
            else {
                res.send({ status: 'succes'});

            }
        });
    });

    app.post('/files/Deletefile', (req, res) => {
        db.collection('files').deleteOne(file, (err, result) => {
            console.log(err,result);
            if (err) {
                res.send({ status: "error" });
            }
            else {
                res.send({ status: 'success' });

            }
        });
    });




}


