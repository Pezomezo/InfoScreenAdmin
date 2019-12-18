import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './helpers/auth.guard';
import { MagicComponent } from './magic/magic.component';

import { GroupListComponent } from './group-list/group-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UrlListComponent } from './url-list/url-list.component';
import { LoginComponent } from './login/login.component';


const routes: Routes = [
  {path: '', component: GroupListComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'urls', component: UrlListComponent, canActivate: [AuthGuard]},
  {path: 'magic/:id', component: MagicComponent, canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
