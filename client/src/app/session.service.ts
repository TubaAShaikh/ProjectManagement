import { Injectable } from '@angular/core';
import { User, Project, Task } from './types/types';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  public currentProject:Project;
  public currentuser:User;
  public currenttask:Task;

  public loggedinuser:User;
  public usermode;
  public title='Home';
  public loggedin=false;

  constructor() { }
}
