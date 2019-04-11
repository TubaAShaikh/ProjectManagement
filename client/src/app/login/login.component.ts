import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Constants } from '../Constants';
import { Router } from '@angular/router';
import { SessionService } from '../session.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user = [];
  constructor(private http: Http, private router: Router, private session: SessionService) {

    this.user['username'] = '';
    this.user['password'] = '';
  }

  ngOnInit() {
  }

  onlogin() {
    this.http.get(Constants.BASE_URL + `users/login?username=${this.user['username']}&password=${this.user['password']}`).subscribe((res) => {
      console.log(res);
      let result = res.json();
      if (result['status'] === 'success') {
        // alert('Welcome');
        this.session.loggedin = true;
        this.session.loggedinuser = result.user;
        this.session.usermode = this.session.loggedinuser.role || 'USER';

        if (this.session.usermode === 'ADMIN') {
          this.router.navigateByUrl('/AdminHome');
        }
        else {
          this.router.navigateByUrl('/UserHome');
        }
      }
      else {
        alert(result['message']);
      }
    });
  }
  onsignup(){
    this.router.navigateByUrl('/register');


  }
}
