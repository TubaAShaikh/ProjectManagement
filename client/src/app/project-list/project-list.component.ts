import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Constants } from '../Constants';
import { Router } from '@angular/router';
import { SessionService } from '../session.service';
import { Project } from '../types/types';
import { fade, slide } from '../animations';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css'],
  animations:[
    fade,slide
  ]
})
export class ProjectListComponent implements OnInit {

  projectList: Project[]=[];

  constructor(private http: Http, private router: Router, private session: SessionService) {
    //  this.projectList.push({name:'a',status:'S',manager:'1',ProjectID:'1',Name:'pms',Documents:'a',CustomerDetails:'b',Status:'p',tasks:[{name:'task1'}],members:[{name:'member1',position:'PM'},{name:'member2',position:'TL'}],Manager:[{ID:'2'}]});
    //  this.projectList.push({name:'b',status:'P',manager:'2'});
    //  this.projectList.push({name:'c',status:'C',manager:'3'});
    //  this.projectList.push({name:'d',status:'Post',manager:'4'});

    this.http.get(Constants.BASE_URL + 'project/getallproject').subscribe((res) => {
      let result = res.json();
      console.log(result);
      console.log(result['status']);
      if (result && (result['status'] === 'success')) {
        this.projectList = result['projects'];
      }
    });

  }

  ngOnInit() {
    this.session.title='Projects';
  }
  onNewProject() {
    // this.http.post(Constants.BASE_URL + 'project/addproject', this.pl).subscribe((res) => {
    //   console.log(res);
    //   let result = res.json();
    //   if (result['status'] === 'success') {
    //     alert('User registerd successfully');
    this.session.currentProject=null;
    this.router.navigateByUrl('/project');
    //   }
    //   else {
    //     alert(result['message']);
    //   }
    // });


  }
  onEdit(p:any) {
    this.session.currentProject=p;
    this.router.navigateByUrl('/project');
  }

  onProjectClick(project: any) {
    this.session.currentProject = project;
    this.router.navigateByUrl('/EditProject');
  }

  onDelete(event, project: any) {
    if (confirm('delete project ?')) {
      let id = project["_id"];

      this.http.get(Constants.BASE_URL + 'project/deleteproject?id=' + id).subscribe(res => {
        //splice
        console.log(res);
      });


      for (let i = 0; i < this.projectList.length; i++) {
        if (this.projectList[i]['_id'] === id) {
          this.projectList.splice(i, 1);
        }
      }
    }
    event.stopPropagation();
  }
}
