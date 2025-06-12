import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from 'src/app/shared/services/api.service';
import { Inscricion } from '../models/inscricion.model';

@Injectable({
  providedIn: 'root'
})
export class InscricionsService {

  private endpoint = 'inscricions';

  constructor(private apiService: ApiService) {}

  crearInscricion(socioId: string, actividadeId: string): Observable<Inscricion> {
    return this.apiService.post<Inscricion>(this.endpoint, { socio: socioId, actividade: actividadeId });
  }

  getInscritosPorActividade(actividadeId: string): Observable<Inscricion[]> {
    return this.apiService.get<Inscricion[]>(`${this.endpoint}/actividade/${actividadeId}`);
  }

  borrarInscricion(inscricionId: string): Observable<any> {
    return this.apiService.delete(`${this.endpoint}/${inscricionId}`);
  }

}
