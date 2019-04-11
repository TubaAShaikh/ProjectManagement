import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { Constants } from '../Constants';
import { SessionService } from '../session.service';
import { fade, slide } from '../animations';

@Component({
  selector: 'app-userdetails',
  templateUrl: './userdetails.component.html',
  styleUrls: ['./userdetails.component.css'],
  animations:[
    fade,
    slide
  ]
})
export class UserdetailsComponent implements OnInit {
 
  public user={};
  task=[];
  project=[];
  
  constructor(private http: Http, private router: Router, private session:SessionService) { 
    this.user=session.currentuser;
    this.http.get(Constants.BASE_URL +'user/getproject?id='+this.user['_id']).subscribe((res) =>{
      let result=res.json();
      this.project = result;
      console.log("projects:",this.project,this.project.length);
  


    });
 
  }
  ngOnInit() {
  }
  onBack(){
    this.router.navigateByUrl('/userlist');
  }
  onpdEdit(){
    this.router.navigateByUrl('/register');
  }
  onprojectEdit(){
    this.router.navigateByUrl('/project');
  }
  ontaskAdd(){
    this.router.navigateByUrl('/task');
  }

  isMember(members,_id):boolean
  {
    console.log(members,_id,members.indexOf(_id));
    if(members.indexOf(_id)>=0) return true;
    return false;
  }
}
