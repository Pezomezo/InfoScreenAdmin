import { ConfigureMagicComponent } from './configure-magic/configure-magic.component';
import { GroupListComponent } from './group-list/group-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UrlListComponent } from './url-list/url-list.component';


const routes: Routes = [
  {path: '', component: GroupListComponent},
  {path: 'urls', component: UrlListComponent},
  {path: 'magic/:id', component: ConfigureMagicComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
