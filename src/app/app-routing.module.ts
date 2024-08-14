import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './components/user-list/user-list.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
  { path: 'user-list', component: UserListComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', redirectTo: '/register', pathMatch: 'full' } // varsayılan rota
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
