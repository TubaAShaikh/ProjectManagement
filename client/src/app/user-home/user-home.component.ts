import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Constants } from '../Constants';
import { Router } from '@angular/router';
import { Project, User } from '../types/types';
import { SessionService } from '../session.service';
import { fade, slide } from '../animations';



@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrls: ['./user-home.component.css'],
  animations:[
    fade,
    slide
  ]
})
export class UserHomeComponent implements OnInit {

  projects: Project[] = [];
  manager_projects: Project[] = [];
  user: User;


  constructor(private http: Http, private router: Router, private session: SessionService) {

    //this.Home.push({ProjectName:'a',status:'S',manager:'1',TeamLeader:'ravii',Team:'1'});
    //this.Home.push({ProjectName:'b',status:'P',manager:'2',TeamLeader:'ambya',Team:'2'});

    this.user = session.loggedinuser;

    this.http.get(Constants.BASE_URL + 'user/getproject?id=' + this.user['_id']).subscribe((res) => {
      let result = res.json();
      this.projects = result;
    });

    this.http.get(Constants.BASE_URL + 'user/getprojectbymanager?id=' + this.user['_id']).subscribe((res) => {
      let result = res.json();
      this.manager_projects = result;
    });
  }

  ngOnInit() {
  }
  // onEdit(){
  //   this.router.navigateByUrl('/project');
  // }
  // onView(){
  //   this.router.navigateByUrl('/Task');
  // }
  ontaskClick(task: any, project: any) {
    this.session.currenttask = task;
    this.session.currentProject=project;
    this.router.navigateByUrl('/edittask');
  }
  onProjectClick(project:any) {
    this.session.currentProject=project;
    this.router.navigateByUrl('/EditProject');
  }
 
  isMember(members, _id): boolean {
    console.log('ismember',members, _id);
    if(!members) return false;
    if (members.indexOf(_id) >= 0) return true;
    return false;
  }

}
