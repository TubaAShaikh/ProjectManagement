import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Constants } from '../Constants';
import { Router } from '@angular/router';
import { SessionService } from '../session.service';
import { fade, slide } from '../animations';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css'],
  animations:[
    fade,
    slide
  ]
})
export class UserlistComponent implements OnInit {

  userlist = [];
  constructor(private http: Http, private router: Router, private session: SessionService) {


    this.http.get(Constants.BASE_URL + 'users/getallusers').subscribe((res) => {
      let result = res.json();
      console.log(result);
      console.log(result['status']);
      if (result && (result['status'] === 'success')) {
        this.userlist = result['users'];
      }

    });
  }
  ngOnInit() {
    this.session.title = 'Users';
  }
  onNewuser() {

    this.session.currentuser=null;
    this.router.navigateByUrl('/register');
  }

  onuserClick(user: any) {

    this.session.currentuser = user;
    this.router.navigateByUrl('/userdetails');

  }

  onEdit(event,user: any) {
    this.session.currentuser = user;
    this.router.navigateByUrl('/register');
    event.stopPropagation();

  }
  onDelete(event, user: any) {
    if (confirm('delete user ?')) {
      let id = user["_id"];

      this.http.get(Constants.BASE_URL + 'user/deleteuser?id=' + id).subscribe(res => {
        //splice
        console.log(res);
      });


      for (let i = 0; i < this.userlist.length; i++) {
        if (this.userlist[i]['_id'] === id) {
          this.userlist.splice(i, 1);
        }
      }
    }
    event.stopPropagation();


  }

}
