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

  editUser(userId: number): void {
    this.router.navigate(['/edit', userId]);
  }

  deleteUser(userId: string): void {
    if (confirm('Bu kullanıcıyı silmek istediğinize emin misiniz?')) {
      this.userService.deleteUser(userId);
    }
  }
}


