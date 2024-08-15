import { Component } from '@angular/core';
import { UserService } from 'src/app/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent {

  constructor(protected userService: UserService, private router: Router) { }

  // Düzenleme işlemi
  editUser(userId: string): void {
    // ID'yi router'a gönder ve register sayfasına yönlendir
    this.router.navigate(['/register', userId]);
  }

  // Kullanıcı silme işlemi
  deleteUser(userId: string): void {
    if (confirm('Bu kullanıcıyı silmek istediğinize emin misiniz?')) {
      this.userService.deleteUser(userId);
    }
  }
}

