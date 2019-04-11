let user=require('./user');
let project=require('./project');
let task=require('./task');
let file=require('./file');
let notifications=require('./notifications');
module.exports=function(app,db)
{
    user(app,db);
    project(app,db);
    task(app,db);
    file(app,db);
    notifications(app,db);
}