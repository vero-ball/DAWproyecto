import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { Socio } from '../models/socio.model';
import { ApiService } from 'src/app/shared/services/api.service';

@Injectable({
  providedIn: 'root'
})
export class SociosService {

  private endpoint = 'socios';

  constructor(private api: ApiService) {}

  getSocios(): Observable<Socio[]> {
    console.log('🔄 SociosService: Chamando getSocios...');
    console.log('🌐 URL:', `http://localhost:5000/api/${this.endpoint}`);

    return this.api.get<Socio[]>(this.endpoint).pipe(
      tap({
        next: (data) => {
          console.log('✅ SociosService: Datos recibidos:', data);
          console.log('📊 Tipo de datos:', typeof data);
          console.log('📊 É array?', Array.isArray(data));
          console.log('📊 Lonxitude:', data?.length);
          if (data && data.length > 0) {
            console.log('📋 Primeiro elemento:', data[0]);
          }
        },
        error: (error) => {
          console.error('❌ SociosService: Error:', error);
        }
      })
    );
  }

  getSocioById(id: string): Observable<Socio> {
    console.log('🔄 SociosService: Chamando getSocioById...');
    console.log('🌐 URL:', `http://localhost:5000/api/${this.endpoint}/${id}`);

    return this.api.get<Socio>(`${this.endpoint}/${id}`).pipe(
      tap({
        next: (data) => {
          console.log('✅ SociosService: Socio recibido:', data);
        },
        error: (error) => {
          console.error('❌ SociosService: Error en getSocioById:', error);
        }
      })
    );
  }

  createSocio(socio: Socio): Observable<Socio> {
    console.log('🆕 SociosService: Chamando createSocio...');
    console.log('🌐 URL:', `http://localhost:5000/api/${this.endpoint}`);
    console.log('📦 Datos enviados:', socio);

    return this.api.post<Socio>(this.endpoint, socio).pipe(
      tap({
        next: (data) => {
          console.log('✅ SociosService: Socio creado:', data);
        },
        error: (error) => {
          console.error('❌ SociosService: Error en createSocio:', error);
        }
      })
    );
  }

  actualizaSocio(id: string, socio: Socio): Observable<Socio> {
    console.log('✏️ SociosService: Chamando updateSocio...');
    console.log('🌐 URL:', `http://localhost:5000/api/${this.endpoint}/${id}`);
    console.log('📦 Datos enviados:', socio);

    return this.api.put<Socio>(`${this.endpoint}/${id}`, socio).pipe(
      tap({
        next: (data) => {
          console.log('✅ SociosService: Socio actualizado:', data);
        },
        error: (error) => {
          console.error('❌ SociosService: Error en updateSocio:', error);
        }
      })
    );
  }

  borrarSocio(id: string): Observable<any> {
    console.log('🗑️ SociosService: Chamando borrarSocio...');
    console.log('🌐 URL:', `http://localhost:5000/api/${this.endpoint}/${id}`);

    return this.api.delete(`${this.endpoint}/${id}`).pipe(
      tap({
        next: (data) => {
          console.log('✅ SociosService: Socio borrado:', data);
        },
        error: (error) => {
          console.error('❌ SociosService: Error en borrarSocio:', error);
        }
      })
    );
  }

}
