import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Constants } from '../Constants';
import { Router } from '@angular/router';
import { SessionService } from '../session.service';


@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.css']
})
export class EditProjectComponent implements OnInit
{

  memberList = [];
  project: any = [];

  //Task=[];
  constructor(private http: Http, private router: Router, private session: SessionService)
  {

    this.project = session.currentProject;
    if (!this.project.hasOwnProperty('active'))
    {
      this.project.active = true;
    }

    //  this.memberList.push({name:'a',project:'S',position:'1'});
    //  this.memberList.push({name:'b',project:'P',position:'2'});


    //  this.Project.push({name:'a',status:'S',manager:'1',team:'2'});
    //  this.Project.push({name:'b',status:'P',manager:'2',team:'2'});

    //
    //this.Task.push({TaskName:'a',status:'S',TeamLeader:'y',TeamMember:'w'});
    // this.Task.push({TaskName:'b',status:'P',TeamLeader:'y',TeamMember:'p'});
    //

  }

  ngOnInit()
  {
  }

  ontaskClick(task: any)
  {
    this.session.currenttask = task;
    this.router.navigateByUrl('/edittask');
  }

  onBack()
  {
    this.router.navigateByUrl('/ProjectList');
  }

  onTaskAdd()
  {
    this.session.currenttask = null;
    this.router.navigateByUrl('/task');
  }
  onProjectEdit()
  {
    this.router.navigateByUrl('/project');
  }
  onManagerAdd()
  {
    this.router.navigateByUrl('/register');
  }

  onRemove($event, task: any)
  {
    $event.stopPropagation();
    if (confirm('delete task ?'))
    {
      let m = {};

      m['projectid'] = this.session.currentProject._id;
      m['taskid'] = task._id;
      this.http.post(Constants.BASE_URL + 'task/deletetask', m).subscribe(res =>
      {
        //splice
        console.log(res);


        //for (let i = 0; i < this.task.length; i++) {
        //if (this.task[i]['_id'] === id) {
        // this.task.splice(i, 1);
        //}
        //}
      });
      event.stopPropagation();
      alert("Task has been deleted!")
    }
    //onMemberAdd(){
    //this.router.navigateByUrl('/register');
    //}

  }

 onEnable()
  {
    this.project.active = true;
    this.http.post(Constants.BASE_URL + 'project/updateproject', this.project).subscribe((res) =>
    {
      console.log(res);
      let result = res.json();
      // if (result['status'] === 'success')
      // {
      //   alert('Project Updated Successfully');
      // }
      // else
      // {
      //   alert(result['message']);
      // }
    });
  }

  onDisable()
  {
    this.project.active = false;
    this.http.post(Constants.BASE_URL + 'project/updateproject', this.project).subscribe((res) =>
    {
      console.log(res);
      let result = res.json();
      if (result['status'] === 'success')
      {
        //alert('Project Updated Successfully');
                      
      }
      else
      {
        //alert(result['message']);
      }
    });
  }

}
