import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Constants } from '../Constants';
import { Router } from '@angular/router';
import { SessionService } from '../session.service';



@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],

})
export class TaskComponent implements OnInit {
  task = {};
  isediting=false;
  file:any;
  constructor(private http: Http, private router: Router, private session: SessionService) {
    if (session.currenttask) {
      this.task=session.currenttask;
      this.isediting=true;
    }
    else {
      this.task['taskid'] = '';
      this.task['name'] = '';
      this.task['description'] = '';
      this.task['teamid'] = '';
      this.task['dateassigned'] = '';
      this.task['duedate'] = '';
      this.task['status'] = '';
    }
  }

  ngOnInit() {
  }
  onUpdate() {
    this.task['projectid'] = this.session.currentProject._id;
    this.http.post(Constants.BASE_URL + 'task/addtask', this.task).subscribe((res) => {
      console.log(res);
      let result = res.json();
      if (result['status'] === 'success') {
        alert('task created successfully');
         this.router.navigateByUrl('/ProjectList');
      }
      else {
        alert(result['message']);
      }
    });
  }
  oncreate(){
    
  }
  onUploadFile(){
    let formdata=new FormData();
    console.log(this.file);
    let f=this.file.nativeElement.files[0];
    if(f)
    {
      console.log(f.size,f.name);
    }
    formdata.append('file',f,f.name);

    this.http.post(Constants.BASE_URL+"task/uploadfile",formdata).subscribe((res)=>{
      console.log(res);
    });
  }
}
