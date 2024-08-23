import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: User[] = [];

  constructor(public apiService: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.apiService.getAllUsers().subscribe({
      next: (data) => {
        this.users = data;
      },
      error: (err) => {
        console.error('Kullanıcılar yüklenirken bir hata oluştu:', err);
      }
    });
  }

  editUser(userId: string): void {
    console.log(userId)
    // Kullanıcıyı düzenleme sayfasına yönlendirin
    this.router.navigate(['/register', userId]);
  }

  deleteUser(userId: string): void {
    if (confirm('Bu kullanıcıyı silmek istediğinizden emin misiniz?')) {
      this.apiService.deleteUser(userId).subscribe({
        next: () => {
          console.log('Kullanıcı başarıyla silindi.');
          this.loadUsers(); // Kullanıcıyı sildikten sonra listeyi güncelle
        },
        error: (err) => {
          console.error('Kullanıcı silinirken bir hata oluştu:', err);
        }
      });
    }
  }
}