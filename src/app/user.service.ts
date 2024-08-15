import { Injectable } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';

export class User {
  id: string;
  surname: string;
  name: string;
  email: string;
  phoneNumber: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  users: User[] = [];
  private storageKey = 'users';

  constructor() {
    // LocalStorage'dan kullanıcıları yükle
    this.users = JSON.parse(localStorage.getItem(this.storageKey) || '[]');
  }

  // Kullanıcı ekleme
  addUser(user: User): void {
    user.id = uuidv4(); // Benzersiz ID oluştur
    this.users.push(user);
    this.saveUsers();
  }

  // Kullanıcı güncelleme
  updateUser(updatedUser: User): void {
    const index = this.users.findIndex(user => user.id === updatedUser.id);
    if (index !== -1) {
      this.users[index] = updatedUser;
      this.saveUsers();
    }
  }

  // Kullanıcı silme
  deleteUser(userId: string): void {
    this.users = this.users.filter(user => user.id !== userId);
    this.saveUsers();
  }

  // Kullanıcıyı ID ile bulma
  getUserById(userId: string): User | undefined {
    return this.users.find(user => user.id === userId);
  }

  // LocalStorage'a kullanıcıları kaydetme
  private saveUsers(): void {
    localStorage.setItem(this.storageKey, JSON.stringify(this.users));
  }
}
