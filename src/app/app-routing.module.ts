import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersListComponent } from './components/users-list/users-list.component';
import { UserDataComponent } from './components/user-data/user-data.component';
import { LoaderComponent } from './components/loader/loader.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: UsersListComponent },
  { path: 'userData/:id', component: UserDataComponent },
  { path: 'loader', component: LoaderComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
