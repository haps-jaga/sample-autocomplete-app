import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchComponent } from './components/employee/search/search.component';
import { AddComponent } from './components/employee/add/add.component';


const routes: Routes = [
  {
    path: "",
    redirectTo: "/search",
    pathMatch: "full",
  },
  {
    path: "search",
    component: SearchComponent,
  },
  {
    path: "add",
    component: AddComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
