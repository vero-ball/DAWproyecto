import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private usuario: 'socio' | 'directivo' | 'webmaster' = 'socio';
  private apiUrl = 'http://localhost:5000/api/auth'; // Cambia se é necesario

  constructor(private http: HttpClient) { }

  login(dni: string, password: string) {
    return this.http.post('http://localhost:5000/api/auth/login', { dni, password });
  }

  logout() {
    localStorage.removeItem('token');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

}
