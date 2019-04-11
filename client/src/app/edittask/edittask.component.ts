import { Component, OnInit, ViewChildren, QueryList, ViewChild } from '@angular/core';
import { Http } from '@angular/http';
import { Constants } from '../Constants';
import { Router } from '@angular/router';
import { SessionService } from '../session.service';
import { Options } from 'ng5-slider';

@Component({
  selector: 'app-edittask',
  templateUrl: './edittask.component.html',
  styleUrls: ['./edittask.component.css']
})
export class EdittaskComponent implements OnInit {
  task: any = [];
  membername = '';

  @ViewChild('file')
  file:any;
  

  users = [];

  width;
  newmemberid = [];

  membermap = {};
  value: number = 0;
  options: Options = {
    floor: 0,
    ceil: 100
  };
  files: any;
  baseurl: string;
  project={};

  constructor(private http: Http, private router: Router, private session: SessionService) {
    this.baseurl=Constants.BASE_URL;
    this.http.get(Constants.BASE_URL + 'users/getallusers').subscribe((res) => {
      let result = res.json();
      console.log(result);
      console.log(result['status']);
      if (result && (result['status'] === 'success')) {
        this.users = result['users'];
      }

    });

    this.task = session.currenttask;
    this.project=session.currentProject;
    if (this.task.members) {
      for (let member of this.task.members) {
        this.http.get(Constants.BASE_URL + 'user/getuser?id=' + member).subscribe((res) => {
          let result = res.json();
          // this.users = result['users'];
          this.membermap[member] = result;
        });
      }
    }

    this.http.get(Constants.BASE_URL + 'task/getfiles?taskid='+this.task._id).subscribe((res) => {
      this.files = res.json();
    });

    console.log(this.task);
  }

  onUploadFile()
  {
    let formdata=new FormData();
    console.log(this.file);
    let f=this.file.nativeElement.files[0];
    if(f)
    {
      console.log(f.size,f.name);
    }
    formdata.append('filename',f.name);
    formdata.append('file',f,f.name);
    formdata.append('taskid',this.session.currenttask._id);
    console.log(JSON.stringify(this.session.currenttask._id));

    this.http.post(Constants.BASE_URL+"task/uploadfile",formdata).subscribe((res)=>{
      console.log(res);
    });
  }

  ngOnInit() {
    
  }
  onset(){

   
  }
  ontaskEdit() {
    this.router.navigateByUrl('/task');
  }
  onMemberAdd() {

    let count = 0;
    let members = [];
    for (let u of this.users) {
      if (u.checked) {
        count++;
        console.log(u._id);
        alert('Member Added Successfully');
        members.push(u._id);
      }
    }

    console.log(count, " members are selected");

    //  this.router.navigateByUrl('/');
    let req = {};
    req['userids'] = members;
    req['projectid'] = this.session.currentProject._id;
    req['taskid'] = this.session.currenttask._id;
    this.http.post(Constants.BASE_URL + 'task/addmember', req).subscribe((res) => {
      let result = res.json();
      console.log(result);
    });



  }

  onRemove(member: any) {
    if (confirm('delete member ?')) {
      console.log(member);
      // let userid = member["userid"];
      // let projectid=member["projectid"];
      // let taskid=member["taskid"]
      let m = {};
      m['userid'] = member._id;
      m['projectid'] = this.session.currentProject._id;
      m['taskid'] = this.session.currenttask._id;
      this.http.post(Constants.BASE_URL + 'task/deletemember', m).subscribe(res => {
        //splice
        console.log(res);
      });


      // for (let i = 0; i < this.membername.length; i++) {
      //   if (this.membername[i]['_id'] === userids) {
      //     this.membername.splice(i, 1);
      //   }
      // }
    }
    event.stopPropagation();
  }

}
