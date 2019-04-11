import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Constants } from '../Constants';
import { Router } from '@angular/router';
import { SessionService } from '../session.service';
import { Options } from 'ng5-slider';
import { fade, slide } from '../animations';


@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css'],
  animations:[
    fade,
    slide
  ]
})
export class AdminHomeComponent implements OnInit {
  Admin = {};
  projectList=[];

  value: number = 100;
  options: Options = {
    floor: 0,
    ceil: 200
  };

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
    this.session.title = 'Home';
  }
  onManageUser() {
    this.router.navigateByUrl('/userlist');

  }
  onManageProject() {
    this.router.navigateByUrl('/ProjectList');
  }
  onClick() {
    this.router.navigateByUrl('/ProjectList');
  }
  onClick1() {
    this.router.navigateByUrl('/userdetails');
  }
}
