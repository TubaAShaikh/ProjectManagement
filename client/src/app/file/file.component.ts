import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Constants } from '../Constants';
import { Router } from '@angular/router';
import { SessionService } from '../session.service';

@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.css']
})
export class FileComponent implements OnInit {
user={}
  constructor(private http: Http, private router: Router, private session: SessionService) { }

  ngOnInit() {
  }

}
