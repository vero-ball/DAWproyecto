import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { Socio } from '../models/socios.model';
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
    return this.api.get<Socio>(`${this.endpoint}/${id}`);
  }

  createSocio(socio: Socio): Observable<Socio> {
    return this.api.post<Socio>(this.endpoint, socio);
  }

  updateSocio(id: string, socio: Socio): Observable<Socio> {
    return this.api.put<Socio>(`${this.endpoint}/${id}`, socio);
  }

  deleteSocio(id: string): Observable<any> {
    return this.api.delete(`${this.endpoint}/${id}`);
  }

}
