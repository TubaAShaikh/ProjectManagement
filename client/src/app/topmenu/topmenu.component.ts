import { Component, OnInit, Input } from '@angular/core';
import { SessionService } from '../session.service';
import { Http } from '@angular/http';
import { Constants } from '../Constants';

@Component({
  selector: 'app-topmenu',
  templateUrl: './topmenu.component.html',
  styleUrls: ['./topmenu.component.css']
})
export class TopmenuComponent implements OnInit
{
  public user = {};
  notifications: any=[];
  constructor(private session: SessionService, private http: Http)
  {
    this.user = this.session.loggedinuser;
  }


  ngOnInit()
  {

    this.http.get(Constants.BASE_URL + 'notifications/getall?userid=' + this.user['_id']).subscribe(res =>
    {

      console.log('notifications',res);

      this.notifications=res.json();

    });

  }


  onClearNotifications()
  {
    this.http.get(Constants.BASE_URL + 'notifications/clearall?userid=' + this.user['_id']).subscribe(res =>
      {
  
        this.notifications=[];
  
      });
  
    }
}
