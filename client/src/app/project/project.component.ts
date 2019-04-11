import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Constants } from '../Constants';
import { Router } from '@angular/router';
import { Project, User } from '../types/types';
import { SessionService } from '../session.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css'],
})
export class ProjectComponent implements OnInit {

  project: Project = new Project();
  users: User[] = [];

  constructor(private http: Http, private router: Router, private session: SessionService) {

    this.project.name = '';

    // this.project['projectid'] = '';
    // this.project['name'] = '';
    // this.project['projectmanagerid'] = '';
    // this.project['description'] = '';
    // this.project['dateassigned'] = '';
    // this.project['duedate'] = '';
    // this.project['customerdetails'] = '';
    // this.project['status'] = '';

    if(this.session.currentProject)
    {
      this.project=this.session.currentProject;
      this.project['projectmanager']=this.project['projectmanager']+"_"+this.project['projectmanagername'];
    }

    this.http.get(Constants.BASE_URL + 'users/getallusers').subscribe(res => {
      let result = res.json();
      this.users = result['users']; //Object.assign(new User(), result['users']);
    });
  }

  ngOnInit() {

  }
  onUpdate() {
    this.http.post(Constants.BASE_URL + 'project/updateproject', this.project).subscribe((res) => {
      console.log(res);
      let result = res.json();
      if (result['status'] === 'success') {
        alert('Project Updated Successfully');
      
      }
      else {
        alert(result['message']);
      }
    });


  }
  onCreate(){
    let i=this.project['projectmanager'].indexOf('_');
    let id=this.project['projectmanager'].substring(0,i);
    let name=this.project['projectmanager'].substring(i+1);

    this.project['projectmanager']=id;
    this.project['projectmanagername']=name;


    this.http.post(Constants.BASE_URL + 'project/addproject', this.project).subscribe((res) => {
      console.log(res);
      let result = res.json();
      if (result['status'] === 'success') {
        alert('Project Created Successfully');
        this.router.navigateByUrl('/ProjectList');
      }
      else {
        alert(result['message']);
      }
    });


  }
}
