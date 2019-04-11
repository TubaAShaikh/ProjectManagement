import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Constants } from '../Constants';
import { Router } from '@angular/router';
import { SessionService } from '../session.service';

@Component({
  selector: 'app-reg',
  templateUrl: './reg.component.html',
  styleUrls: ['./reg.component.css']
})
export class RegComponent implements OnInit
{

  user = {};
  userid = null;

  constructor(private http: Http, private router: Router, private session: SessionService)
  {

    this.user['username'] = '';
    this.user['password'] = '';
    this.user['name'] = '';
    this.user['email'] = '';
    this.user['contact'] = '';
    this.user['address'] = '';
    this.user['city'] = '';
    this.user['state'] = '';
    this.user['qualification'] = '';
    this.user['domain'] = '';
    this.user['platform'] = '';
    this.user['username'] = '';
    this.user['password'] = '';
    this.user['role'] = 'USER';

    if (this.session.currentuser)
    {
      this.user = this.session.currentuser;
      this.userid = this.user['_id'];
    }

  }

  ngOnInit()
  {
  }

  onRegister()
  {
    if (this.userid)
    {
      this.user['_id'] = this.userid;
    }
    this.http.post(Constants.BASE_URL + 'users/adduser', this.user).subscribe((res) =>
    {
      console.log(res);
      let result = res.json();
      if (result['status'] === 'success')
      {
        if (this.userid)
        {
          alert('User updated successfully');
        }
        else
        {
          alert('User registerd successfully');
        }
        this.router.navigateByUrl('/userlist');
      }
      else
      {
        alert(result['message']);
      }
    });
  }
  onUpdate()
  {


  }
}
