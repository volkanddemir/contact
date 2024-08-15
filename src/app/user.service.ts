import {Injectable} from '@angular/core';
import {v4} from 'uuid';

export class User {
  id: string;
  surname: string;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  users: User[] = [];
  private storageKey = 'users';

  constructor() {
    this.users = JSON.parse(localStorage.getItem(this.storageKey) || '[]');
  }

  addUser(user: User): void {
    user.id = v4();
    this.users.push(user);
    this.saveUsers();
  }

  deleteUser(userId: string): void {
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
