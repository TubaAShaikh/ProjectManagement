import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegComponent } from './reg/reg.component';
import { ProjectComponent } from './project/project.component';
import { TaskComponent } from './task/task.component';
import { FileComponent } from './file/file.component';
import { MenuComponent } from './menu/menu.component';
import { PmComponent } from './pm/pm.component';
import { HttpModule } from '@angular/http';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { UserHomeComponent } from './user-home/user-home.component';
import { ProjectHomeComponent } from './project-home/project-home.component';
import { ManageProjectMemberComponent } from './manage-project-member/manage-project-member.component';
import { ManageProjectTaskComponent } from './manage-project-task/manage-project-task.component';
import { EditProjectComponent } from './edit-project/edit-project.component';
import { SessionService } from './session.service';
import { UserlistComponent } from './userlist/userlist.component';
import { UserdetailsComponent } from './userdetails/userdetails.component';
import { EdittaskComponent } from './edittask/edittask.component';

import { MatProgressBar } from '@angular/material';
import { SidemenuComponent } from './sidemenu/sidemenu.component';
import { TopmenuComponent } from './topmenu/topmenu.component';

import {Ng5SliderModule} from 'ng5-slider';
import { from } from 'rxjs';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegComponent,
    ProjectComponent,
    TaskComponent,
    FileComponent,
    MenuComponent,
    PmComponent,
    AdminHomeComponent,
    ProjectListComponent,
    EditProjectComponent,
    UserHomeComponent,
    ProjectHomeComponent,
    ManageProjectMemberComponent,
    ManageProjectTaskComponent,
    UserlistComponent,
    UserdetailsComponent,
    EdittaskComponent,    
    MatProgressBar, SidemenuComponent, TopmenuComponent  
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpModule,
    Ng5SliderModule,
    BrowserAnimationsModule
  ],
  providers: [SessionService],
  bootstrap: [AppComponent]
})
export class AppModule { }
