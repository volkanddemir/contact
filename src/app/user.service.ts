import {Injectable} from '@angular/core';

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
    localStorage.setItem(this.storageKey, JSON.stringify(this.users));
  }
}
