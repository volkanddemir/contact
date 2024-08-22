import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './models/user';
import { v4 as uuidv4 } from 'uuid';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  url: string = 'https://localhost:7266/api/User';
users: any[];

  constructor(private http: HttpClient) {
  }

  getAllUsers() {
    return this.http.get<User[]>(this.url);
  }
  // Yeni kullanıcı ekle
  addUser(user: User): Observable<User> {
    user.guid = uuidv4(); // Benzersiz ID oluştur
    return this.http.post<User>(this.url, user);
  }

  // Mevcut bir kullanıcıyı güncelle
  updateUser(userId: string, user: User): Observable<User> {
    return this.http.put<User>(`${this.url}/${userId}`, user);
  }

  // Kullanıcıyı sil
  deleteUser(userId: string): Observable<void> {
    return this.http.delete<void>(`${this.url}/${userId}`);
  }
}