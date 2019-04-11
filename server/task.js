let mongo = require('mongodb');

let database = require('./database');


module.exports = function (app, db) {
    app.get('/task/getalltask', (req, res) => {
        db.collection('task').find({}).toArray((err, result) => {
            if (err) {
                res.send("error");
            }
            else {
                res.send(result);
            }
        });
    });
    app.post('/task/addtask', (req, res) => {
        console.log('received request');
        // console.log(req);
        let task = req.body;
        let projectid = task.projectid;
//        console.log(task);
        //validate task
        // db.collection('task').findOne({ _id: new mongo.ObjectId(id) }, (err, task) => {
        //     console.log(task);
        //     res.send(task);
        // });

        let project = {};
        //retrive project
        db.collection('project').findOne({ _id: new mongo.ObjectId(projectid),active :true }, (err, project) => {
//            console.log(project);

            if (!project.tasks) {
                project.tasks = [];
            }
            if (task._id) {
                for (let i = 0; i < project.tasks.length; i++) {
                    let t = project.tasks[i];
                    console.log("comparing", t["_id"], task._id);
                    if (('' + t["_id"]) === ('' + task._id)) {
                        console.log("task updated");
                        project.tasks[i] = task;
                        break;
                    }
                }
            }
            else {
                task["_id"] = new mongo.ObjectId();
                project.tasks.push(task);
            }
            //update project

            db.collection('project').updateOne({ _id: new mongo.ObjectId(projectid) }, { $set: project }, (err, result) => {
                if (err) {
                    console.log(err);
                    res.send({ status: "error", message: 'Error while adding task' });
                }
                else {
                    res.send({ status: 'success' });
                }
            });


        });


        //add task to project


        //let task = { taskid: 1, taskname: 'pms' };

        // db.collection('task').insertOne(task, (err, result) => {
        //     if (err) {
        //         res.send({status:'error', message:'Error creating object'});
        //     }
        //     else {
        //         res.send({status:'success'});
        //     }
        // });

        // res.send(task);
    });

    app.get('/task/gettask', (req, res) => {
        let id = req.query['id'];
        console.log('task gettask ', id);

        db.collection('task').findOne({ _id: new mongo.ObjectId(id) }, (err, task) => {
            console.log(task);
            res.send(task);
        });
    });

    app.post('/task/updatetask', (req, res) => {
        //modify project
        let task = req.body;
        console.log(task);
        console.log(task._id);

        let taskid = task._id;

        delete task['_id'];

        db.collection('task').updateOne({ _id: new mongo.ObjectId(taskid) }, { $set: task }, (err, result) => {
            if (err) {
                console.log(err);
                res.send("error");
            }
            else {
                for (let member of task.members) {
                    let notification = { type: 'TASKUPDATED', userid:member, task:task, read: false, date: new Date() };
                    database.addnotification(db, notification, null);
                }
                res.send(task);
            }
        });

    });


    app.post('/task/deletetask', (req, res) => {

        let task = req.body;
        let projectid = task.projectid;
        let taskid = task.taskid;

        console.log('deleting task', task);

        let project = {};
        //retrive project
        db.collection('project').findOne({ _id: new mongo.ObjectId(projectid) ,active:true}, (err, project) => {
            console.log(project);

            if (!project.tasks) {
                project.tasks = [];
            }

            //update project
            taskid = new mongo.ObjectId(taskid);
            let foundtask = null;
            for (let i = 0; i < project.tasks.length; i++) {
                console.log(task['_id']);
                if (('' + project.tasks[i]['_id']) === ('' + taskid)) {
                    project.tasks.splice(i, 1);
                    break;
                }
            }
            console.log(taskid, foundtask);

            db.collection('project').updateOne({ _id: new mongo.ObjectId(projectid) }, { $set: project }, (err, result) => {
                if (err) {
                    console.log(err);
                    res.send("error");
                }
                else {
                    res.send(project);
                }
            });
        });

    });



    //    app.get('/task/deletetask', (req, res) => {

    //delete user

    //      let task = req.body;
    //    let projectid = task.projectid;
    //  let taskid = task.taskid;


    //console.log('deleting task',task);

    //db.collection('task').deleteOne({ _id: new mongo.ObjectId(id) }, (err, result) => {
    //  if (err) {
    //    res.send("error");
    //}
    //else {
    //  res.send("success");
    //}
    //});

    //});

    app.post('/task/addmember', (req, res) => {

        let member = req.body;
        let projectid = member.projectid;
        let taskid = member.taskid;
        let userids = member.userids;

        let project = {};
        //retrive project
        db.collection('project').findOne({ _id: new mongo.ObjectId(projectid),active:true }, (err, project) => {
//            console.log(project);

            if (!project.tasks) {
                project.tasks = [];
            }
            //update project
            taskid = new mongo.ObjectId(taskid);
            let foundtask = null;
            for (let task of project.tasks) {
                console.log(task['_id']);
                if (('' + task['_id']) === ('' + taskid)) {
                    foundtask = task;
                    break;
                }
            }
            console.log(taskid, foundtask);
            if (foundtask) {
                if (!foundtask.members) {
                    foundtask.members = [];
                }

                for (let userid of userids) {
                    foundtask.members.push(userid);

                    let notification = { type: 'TASKASSIGNMENT', userid: userid, task: foundtask, read: false, date: new Date() };
                    database.addnotification(db, notification, null);
                }

            }

            db.collection('project').updateOne({ _id: new mongo.ObjectId(projectid) }, { $set: project }, (err, result) => {
                if (err) {
                    console.log(err);
                    res.send("error");
                }
                else {
                    res.send(project);
                }
            });
        });

    });


    app.post('/task/deletemember', (req, res) => {

        let member = req.body;
        let projectid = member.projectid;
        let taskid = member.taskid;
        let userid = member.userid;

        console.log('deleting member', member);

        let project = {};
        //retrive project
        db.collection('project').findOne({ _id: new mongo.ObjectId(projectid),active:true }, (err, project) => {
            console.log(project);

            if (!project.tasks) {
                project.tasks = [];
            }
            //update project
            taskid = new mongo.ObjectId(taskid);
            let foundtask = null;
            for (let task of project.tasks) {
                console.log(task['_id']);
                if (('' + task['_id']) === ('' + taskid)) {
                    foundtask = task;
                    break;
                }
            }
            console.log(taskid, foundtask);
            if (foundtask) {
                if (!foundtask.members) {
                    foundtask.members = [];
                }

                for (let i = 0; i < foundtask.members.length; i++) {
                    if (('' + foundtask.members[i]['_id']) === ('' + userid)) {
                        foundtask.members.splice(i, 1);
                        break;
                    }
                }
            }

            db.collection('project').updateOne({ _id: new mongo.ObjectId(projectid) }, { $set: project }, (err, result) => {
                if (err) {
                    console.log(err);
                    res.send("error");
                }
                else {
                    res.send(project);
                }
            });
        });

    });

    app.get('/task/getfiles', (req, res) => {
        let taskid = req.query['taskid'];

        db.collection('files').find({ taskid: taskid }).toArray().then((result) => {
            res.send(result);
        });
    });

    app.post('/task/uploadfile', (req, res) => {
        let taskid = req.body['taskid'];
        let filename = req.body['filename'];
        console.log('req.files', req.files);
        //add entry to file collection
        db.collection('files').insertOne({ filename: filename, taskid: taskid }, (err, result) => {

            if (err) {
                res.send({ status: "error" });
            }
            else {
                console.log(result);
                req.files.file.mv('files/' + result.insertedId);

                res.send({ status: 'success' });

            }
        });
        //db.collection('files').insertOne(file ,toArray((err, result) => {

        //  if (err) {
        //    res.send({ status: "error" });
        //}
        //else {

        //  res.send({ status: 'success' });
        //res._id


        //}
        //});

    });

    app.get('/download', function (req, res) {
        let id = req.query['id'];
        console.log(id);
        db.collection('files').findOne({ _id: new mongo.ObjectID(id) }, (err, result) => {
            console.log(err, result);
            let filename = result.filename;
            res.setHeader('Content-Disposition', 'Attachment; filename="' + filename + '"');
            res.sendFile('/BEProject/server/files/' + id);
        });

    });

};