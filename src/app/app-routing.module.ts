import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './components/user-list/user-list.component';
import { RegisterComponent } from './components/register/register.component';

const routes: Routes = [
  { path: 'user-list', component: UserListComponent },
  { path: 'register', component: RegisterComponent },  // Yeni kullanıcı ekleme rotası
  { path: 'register/:userId', component: RegisterComponent },  // Kullanıcı düzenleme rotası (userId parametresi ile)
  { path: '', redirectTo: '/register', pathMatch: 'full' } // Varsayılan rota
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
