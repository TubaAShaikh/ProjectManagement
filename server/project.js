let mongo = require('mongodb');

let database = require('./database');

module.exports = function (app, db) {
    app.get('/project/getallproject', (req, res) => {
        db.collection('project').find({}).toArray((err, result) => {
            if (err) {
                res.send({ status: "error" });
            }
            else {
                res.send({ status: 'success', projects: result });
            }
        });
    });

    app.post('/project/addproject', (req, res) => {
        //console.log('received request');
        // console.log(req);
        let project = req.body;
        project.active=true;
        //console.log(project);
        //validate project

        //let project = { projectid: 1, projectname: 'pms' };

        if (project._id) {
            let id = project._id;
            delete project['_id'];

            db.collection('project').updateOne({ _id: new mongo.ObjectId(id) }, { $set: project }, (err, result) => {
                if (err) {
                    res.send({ status: 'error', message: 'Error creating object' });
                }
                else {

                    db.collection('project').findOne({ _id: new mongo.ObjectId(id)}, (err, dbproject) => {
                        let notification = { type: 'PROJECTUPDATED', userid: project.projectmanager, project: project, read: false, date: new Date() };
                        database.addnotification(db, notification, null);

                        for (let task of (project.tasks || [])) {
                            for (let member of task.members) {
                                let notification = { type: 'PROJECTUPDATED', userid: member, project: project, read: false, date: new Date() };
                                database.addnotification(db, notification, null);
                            }
                        }
                    });
                    res.send({ status: 'success' });
                }
            });
        }
        else {
            db.collection('project').insertOne(project, (err, result) => {
                if (err) {
                    res.send({ status: 'error', message: 'Error creating object' });
                }
                else {
                    let notification = { type: 'PROJECTCREATED', userid: project.projectmanager, project: project, read: false, date: new Date() };
                    database.addnotification(db, notification, null);
                    res.send({ status: 'success' });
                }
            });
        }

        // res.send(project);
    });

    app.get('/project/getproject', (req, res) => {
        let id = req.query['id'];
        console.log('project getproject ', id);

        db.collection('project').findOne({ _id: new mongo.ObjectId(id)}, (err, project) => {
            //console.log(project);
          
            res.send(project);
        });
    });

    app.post('/project/updateproject', (req, res) => {
        //modify project
        let project = req.body;
        //console.log(project);
        //console.log(project._id);

        let projectid = project._id;

        delete project['_id'];

        db.collection('project').updateOne({ _id: new mongo.ObjectId(projectid) }, { $set: project }, (err, result) => {
            if (err) {
                console.log(err);
                res.send("error");
            }
            else {
                database.getUser(db, project.projectmanager, (user) => {
                    let notification = { type: 'PROJECTUPDATED', userid: project.projectmanager, email:user.email, project: project, read: false, date: new Date() };
                    database.addnotification(db, notification, null);
                });


                db.collection('project').findOne({ _id: new mongo.ObjectId(projectid)}, { $set: project }, (err, result) => {
                    for (let task of project.tasks) {
                        for (let member of task.members) {
                            // let notification = { type: 'PROJECTUPDATED', userid: member, project: project, read: false, date: new Date() };
                            // database.addnotification(db, notification, null);

                            database.getUser(db, member, (user) => {
                                let notification = { type: 'PROJECTUPDATED', userid: member, email:user.email, project: project, read: false, date: new Date() };
                                database.addnotification(db, notification, null);
                            });
            
                        }
                    }

                    res.send(project);
                });
            }
        });

    });

    app.get('/project/deleteproject', (req, res) => {

        //delete user
        let id = req.query['id'];
        console.log('deleting project', id);

        db.collection('project').deleteOne({ _id: new mongo.ObjectId(id) }, (err, result) => {
            console.log(err, result);
            if (err) {
                res.send({ status: "error" });
            }
            else {
                res.send({ status: "success" });
            }
        });

    });

};