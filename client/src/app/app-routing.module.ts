import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegComponent } from './reg/reg.component';
import { LoginComponent } from './login/login.component';
import { ProjectComponent } from './project/project.component';
import { TaskComponent } from './task/task.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { ProjectListComponent } from './project-list/project-list.component';
import { UserHomeComponent } from './user-home/user-home.component';
import { ProjectHomeComponent } from './project-home/project-home.component';
import { EditProjectComponent } from './edit-project/edit-project.component';
import { UserlistComponent } from './userlist/userlist.component';
import { UserdetailsComponent } from './userdetails/userdetails.component';
import { EdittaskComponent } from './edittask/edittask.component';

const routes: Routes = [

  { path: 'register', component: RegComponent },
  { path: 'login', component: LoginComponent },
  { path: 'task', component: TaskComponent },
  { path: 'project', component: ProjectComponent },
  { path: 'AdminHome', component: AdminHomeComponent },
  { path: 'ProjectList', component: ProjectListComponent }, 
  { path: 'EditProject', component: EditProjectComponent },
  { path: 'UserHome', component: UserHomeComponent },
  { path: 'ProjectHome', component: ProjectHomeComponent },
  {path:'userlist', component: UserlistComponent},
  {path:'userdetails',component:UserdetailsComponent},
  {path:'edittask',component:EdittaskComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
