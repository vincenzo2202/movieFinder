import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // private apiUrl = 'https://tu-api.com/api'; // Cambia esta URL a la de tu backend
  // private apiUrl = 'http://127.0.0.1:8000'; // Cambia esta URL a la de tu backend
  private apiUrl = 'https://674d7e99635bad45618b9296.mockapi.io'; // Cambia esta URL a la de tu backend
  // 

  constructor(private http: HttpClient) { }

  register(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  login(loginData: { username: string; password: string }): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.apiUrl}/login`, loginData, { headers });
  }
}
