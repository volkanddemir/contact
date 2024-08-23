import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './models/user';
import { v4 as uuidv4 } from 'uuid';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private url: string = 'https://localhost:44397/api/User';

  constructor(private http: HttpClient) {}

  // Tüm kullanıcıları getir
  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.url);
  }

  // Yeni kullanıcı ekle
  addUser(user: User): Observable<User> {
    user.guid = uuidv4(); // Benzersiz ID oluştur
    return this.http.post<User>(this.url, user);
  }

  updateUser(userId: string, user: User): Observable<User> {
    return this.http.put<User>(`${this.url}/${userId}`, user);
  }
  
  // Kullanıcıyı sil
  deleteUser(userId: string): Observable<void> {
    return this.http.delete<void>(`${this.url}/${userId}`);
  }
  
  // Kullanıcıyı ID ile bulma
  getUserById(userId: string): Observable<User> {
    return this.http.get<User>(`${this.url}/${userId}`);
  }  
}