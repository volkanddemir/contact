import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  users: any[] = [];
  private storageKey = 'users';

  constructor() {
    this.users = JSON.parse(localStorage.getItem(this.storageKey) || '[]');
  }

  addUser(user: any): void {
    this.users.push(user);
    this.saveUsers();
  }

  deleteUser(userId: number): void {
    this.users = this.users.filter(user => user.id !== userId);
    this.saveUsers();
  }

  updateUser(updatedUser: any): void {
    const index = this.users.findIndex(user => user.id === updatedUser.id);
    if (index !== -1) {
      this.users[index] = updatedUser;
      this.saveUsers();
    }
  }

  private saveUsers(): void {
    localStorage.setItem(this.storageKey, JSON.stringify(this.users));
  }
}

