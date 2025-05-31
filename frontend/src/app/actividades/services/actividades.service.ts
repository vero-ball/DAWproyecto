import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { ApiService } from 'src/app/shared/services/api.service';
import { Actividade } from '../models/actividade.model';

@Injectable({
  providedIn: 'root'
})
export class ActividadesService {

  private endpoint = 'actividades';

  constructor(private apiService: ApiService) { }

  getActividades(): Observable<Actividade[]> {
    console.log('🔄 ActividadesService: Chamando getActividades...');
    console.log('🌐 URL:', `http://localhost:5000/api/${this.endpoint}`);

    return this.apiService.get<Actividade[]>(this.endpoint).pipe(
      tap({
        next: (data) => {
          console.log('✅ ActividadesService: Datos recibidos:', data);
          console.log('📊 Tipo de datos:', typeof data);
          console.log('📊 É array?', Array.isArray(data));
          console.log('📊 Lonxitude:', data?.length);
          if (data && data.length > 0) {
            console.log('📋 Primeiro elemento:', data[0]);
          }
        },
        error: (error) => {
          console.error('❌ ActividadesService: Error:', error);
        }
      })
    );
  }

  getActividadById(id: string) {
    return this.apiService.get(`actividades/${id}`);
  }

  createActividad(actividad: any) {
    return this.apiService.post('actividades', actividad);
  }

  updateActividad(id: string, actividad: any) {
    return this.apiService.put(`actividades/${id}`, actividad);
  }

  deleteActividad(id: string) {
    return this.apiService.delete(`actividades/${id}`);
  }

}
