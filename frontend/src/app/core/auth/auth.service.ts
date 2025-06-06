import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { ApiService } from 'src/app/shared/services/api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private usuario: 'socio' | 'directivo' | 'webmaster' = 'socio';
  private apiUrl = 'http://localhost:5000/api/auth'; // Cambia se é necesario

  constructor(private apiService: ApiService) { }

  login(dni: string, password: string) {
    return this.apiService.post('auth/login', { dni, password })
      .pipe(
        tap((response: any) => {
          localStorage.setItem('loginToken', response.loginToken);
        })
      );
  }

  logout() {
    localStorage.removeItem('loginToken');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('loginToken');
  }

}
