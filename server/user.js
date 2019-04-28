let mongo = require('mongodb');

module.exports = function (app, db) {

    app.get('/users/getallusers', (req, res) => {
        db.collection('user').find({}).toArray((err, result) => {
            if (err) {
                res.send({ status: "error" });
            }
            else {
                let count = result.length;
                console.log('count',count);
                for (let user of result) {
                    console.log('handling user',user);
                    db.collection('project').find({ 'tasks.members': { $all: [''+user._id] },active:true }).toArray((err, projectlist) => {
                        count--;
                        let taskcount = 0;
                        for(let p of projectlist)
                        {
                            console.log('\tproject',p);
                            for(let t of p.tasks)
                            {
                                console.log('\t\ttask',t);
                                if(isMember(t.members,''+user._id))taskcount++;
                            }
                        }
                        user['taskcount'] = taskcount;

                        if (count == 0) {
                            res.send({ status: 'success', users: result });
                        }
                    });
                }
            }
        });
    });


    app.post('/users/adduser', (req, res) => {
        console.log('received request');
        // console.log(req);
        let user = req.body;
        console.log(user);
        //validate user
        //db.collection('user').find({username:user.username,email:user.email}),function(err,user){
            //if(err){
                //console.log('signup error');
                //return done(err);
            //}
            //if(user.length!=0){
                //if(user[0].username){
                  //  console.log('username already exists!,username:'+username);
                //}else{
                  //  console.log('email already exists!,email:'+email);
                //}
                //var err=new Error();
                //err.status=310;
                //return done(err);
            //}
        //}
        

        //let user = { userid: 1, username: 'abcd' };

        if (user._id) {
            let id = user._id;
            delete user['_id'];
            db.collection('user').updateOne({ _id: new mongo.ObjectId(id) }, { $set: user }, (err, result) => {
                if (err) {
                    console.log(err.message);
                    res.send({ status: 'error', message: 'Error creating object' });
                }
                else {
                    res.send({ status: 'success' });
                }
            });
        }
        else {
            db.collection('user').insertOne(user, (err, result) => {
                if (err) {
                    res.send({ status: 'error', message: 'Error creating object' });
                }
                else {
                    res.send({ status: 'success' });
                }
            });
        }

        // res.send(user);
    });

    app.get('/user/getuser', (req, res) => {
        let id = req.query['id'];
        console.log('user getuser ', id);

        db.collection('user').findOne({ _id: new mongo.ObjectId(id) }, (err, user) => {
            console.log(user);
            res.send(user);
        });
    });

    app.post('/user/updateuser', (req, res) => {
        //modify user
        let user = req.body;
        console.log(user);
        console.log(user._id);

        let userid = user._id;

        delete user['_id'];

        db.collection('user').updateOne({ _id: new mongo.ObjectId(userid) }, { $set: user }, (err, result) => {
            if (err) {
                console.log(err);
                res.send("error");
            }
            else {
                res.send(user);
            }
        });

    });

    app.get('/user/deleteuser', (req, res) => {

        //delete user
        let id = req.query['id'];
        console.log('deleting user', id);

        db.collection('user').deleteOne({ _id: new mongo.ObjectId(id) }, (err, result) => {
            if (err) {
                res.send("error");
            }
            else {
                res.send("success");
            }
        });
    });

    app.get('/users/login', (req, res) => {


        let username = req.query['username'];
        let password = req.query['password'];

        if (!username || !password) {
            res.send({ status: 'error', message: 'username or password missing' });
            return;
        }

        db.collection('user').findOne({ username: username, password: password }, (err, result) => {
            if (err) {
                res.send({ status: 'error', message: 'Error creating object' });
            }
            else {
                console.log(result);
                if (result && result['username'] === username && result['password'] === password) {
                    res.send({ status: 'success', user: result });
                }
                else {
                    res.send({ status: 'error', message: 'Incorrect username or password' });
                }
            }
        });

    });

    app.get('/user/gettask', (req, res) => {
        let id = req.query['id'];
        // console.log('user gettask ', id);

        db.collection('task').find({ members: { $elemMatch: { $eq: mongo.ObjectId(id) } } }).toArray((error, list) => {
            console.log('error', error);
            console.log('list', list);
        });
    });

    app.get('/user/getproject', (req, res) => { //wrong
        let id = req.query['id'];
        console.log('user getproject ', id);

        db.collection('project').find({ 'tasks.members': { $all: [id] } , active:true}).toArray((err, projectlist) => {
            console.log(projectlist);
            res.send(JSON.stringify(projectlist));
        });
    });

    app.get('/user/getprojectbymanager', (req, res) => {
        let id = req.query['id'];
        console.log('user getproject ', id);

        db.collection('project').find({ 'projectmanager': id ,active:true}).toArray((err, projectlist) => {
            console.log(projectlist);
            res.send(JSON.stringify(projectlist));
        });
    });


  
};

function isMember(members,_id)
{
    if(!members || !_id) return false;
  console.log(members,_id,members.indexOf(_id));
  if(members.indexOf(_id)>=0) return true;
  return false;
}
