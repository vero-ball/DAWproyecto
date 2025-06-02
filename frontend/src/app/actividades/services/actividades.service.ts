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

  getActividadeById(id: string): Observable<Actividade> {
    console.log('🔄 ActividadesService: Chamando getActividadById...');
    console.log('🌐 URL:', `http://localhost:5000/api/${this.endpoint}/${id}`);

    return this.apiService.get<Actividade>(`${this.endpoint}/${id}`).pipe(
      tap({
        next: (data) => {
          console.log('✅ ActividadesService: Actividade recibida:', data);
        },
        error: (error) => {
          console.error('❌ ActividadesService: Error en getActividadById:', error);
        }
      })
    );
  }

  createActividad(actividade: Actividade): Observable<Actividade> {
    console.log('🆕 ActividadesService: Chamando createActividad...');
    console.log('🌐 URL:', `http://localhost:5000/api/${this.endpoint}`);
    console.log('📦 Datos enviados:', actividade);

    return this.apiService.post<Actividade>(this.endpoint, actividade).pipe(
      tap({
        next: (data) => {
          console.log('✅ ActividadesService: Actividade creada:', data);
        },
        error: (error) => {
          console.error('❌ ActividadesService: Error en createActividad:', error);
        }
      })
    );
  }

  actualizaActividad(id: string, actividade: Actividade): Observable<Actividade> {
    console.log('✏️ ActividadesService: Chamando updateActividad...');
    console.log('🌐 URL:', `http://localhost:5000/api/${this.endpoint}/${id}`);
    console.log('📦 Datos enviados:', actividade);

    return this.apiService.put<Actividade>(`${this.endpoint}/${id}`, actividade).pipe(
      tap({
        next: (data) => {
          console.log('✅ ActividadesService: Actividade actualizada:', data);
        },
        error: (error) => {
          console.error('❌ ActividadesService: Error en updateActividad:', error);
        }
      })
    );
  }

  deleteActividad(id: string): Observable<any> {
    console.log('🗑️ ActividadesService: Chamando deleteActividad...');
    console.log('🌐 URL:', `http://localhost:5000/api/${this.endpoint}/${id}`);

    return this.apiService.delete(`${this.endpoint}/${id}`).pipe(
      tap({
        next: (data) => {
          console.log('✅ ActividadesService: Actividade borrada:', data);
        },
        error: (error) => {
          console.error('❌ ActividadesService: Error en deleteActividad:', error);
        }
      })
    );
  }

}
