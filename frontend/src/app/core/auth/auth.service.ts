import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private usuario: 'socio' | 'directivo' | 'webmaster' = 'socio';

  constructor() { }

  getRol(): 'socio' | 'directivo' | 'webmaster' {
    return this.usuario;
  }

  setRol(rol: 'socio' | 'directivo' | 'webmaster'): void {
    this.usuario = rol;
  }

}
