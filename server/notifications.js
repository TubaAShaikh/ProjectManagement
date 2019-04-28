let mongo = require('mongodb');

let database = require('./database');


module.exports = function (app, db) {
    app.get('/notifications/getall', (req, res) => {
        let userid = req.query['userid'];
        console.log('notifications/getall', userid);
        let notificationlist=[];
        db.collection('notifications').find({ userid: userid, read: false }).toArray().then(result => {
            //console.log(result);
            notificationlist.push(...result);
            //
            let now = new Date();
            db.collection('task').find({ members: { $elemMatch: { $eq: mongo.ObjectId(userid) } } }).toArray((error, list) => {
                console.log('error', error);
                console.log('list', list);

                for (let task of list) {
                    //calc duedate-now
                    let d = new Date(task.duedate);
                    let diff = (d - now) / 1000 / 86400;
                    if (diff < 7) {
                        notificationlist.push({ type: 'TASK_DUE', task: task, read: false });
                    }
                    //if less than threshold
                    //add to result
                }

                db.collection('project').find({ 'projectmanager': userid, active:true }).toArray((err, projectlist) => {
                    for (let project of projectlist) {
                        //calc duedate-now
                        //if less than threshold
                        //add to result
                        let d = new Date(project.duedate);
                        let diff = (d - now) / 1000 / 86400;
                        console.log(project.duedate,diff);
                        if (diff < 7) {
                            notificationlist.push({ type: 'PROJECT_DUE', project: project, read: false });
                        }
                    }
                    res.send(notificationlist);

                });

            });


        });
    });
    app.get('/notifications/clearall', (req, res) => {
        let userid = req.query['userid'];
        console.log('notifications/clearall', userid);
        db.collection('notifications').deleteMany({ userid: userid }, (err, result) => {
            console.log(result);
            res.send(result);
        });
    });
};