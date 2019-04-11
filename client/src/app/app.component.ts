import { Component } from '@angular/core';
import { SessionService } from './session.service';
import { Http } from '@angular/http';
import { Constants } from './Constants';
import { Router } from '@angular/router';

  import { from } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'client';

  user = [];
  constructor(private http: Http, private router: Router, private session: SessionService) {

    // this.user['username'] = '';
    // this.user['password'] = '';
  }

  ngOnInit() {
  }

  // onlogin() {
  //   this.http.get(Constants.BASE_URL + `users/login?username=${this.user['username']}&password=${this.user['password']}`).subscribe((res) => {
  //     console.log(res);
  //     let result = res.json();
  //     if (result['status'] === 'success') {
        
  //       // alert('Welcome');
  //       this.session.loggedin=true;
  //       this.router.navigateByUrl('/AdminHome');
  //     }
  //     else {
  //       alert(result['message']);
  //     }
  //   });
  // }

 

}
