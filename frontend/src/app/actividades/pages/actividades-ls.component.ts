import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Actividade } from '../models/actividade.model';
import { ActividadesService } from '../services/actividades.service';

@Component({
  selector: 'app-actividades-ls',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink
  ],
  templateUrl: './actividades-ls.component.html',
  styles: [`
    :host {
      display: block;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActividadesLsComponent {
  public titulo = 'Listado de Actividades';
  public actividades: Actividade[] = []; // Inicializa como un array vacío
  public cargando = false;

  constructor(
    private actividadesService: ActividadesService,
    private cdr: ChangeDetectorRef, // Inyecta ChangeDetectorRef si necesitas notificar cambios manualmente
  ) {
    // Aquí podrías cargar las actividades desde un servicio si fuera necesario
  }

  ngOnInit(): void {
    this.cargarActividades();
  }

  cargarActividades() {
    console.log('🔄 Iniciando carga de actividades...');
    this.cargando = true;

    this.actividadesService.getActividades().subscribe({
      next: (data) => {
        console.log('✅ Datos recibidos no componente:', data);
        console.log('📊 Tipo:', typeof data);
        console.log('📊 É array?', Array.isArray(data));
        console.log('📊 Lonxitude:', data?.length);

        this.actividades = data;
        this.cargando = false;

        this.cdr.detectChanges(); // ← CRÍTICO: Notificar a Angular que os datos cambiaron

        console.log('🎯 Variable actividades actualizada:', this.actividades);
      },
      error: (err) => {
        console.error('❌ Erro cargando actividades:', err);
        this.cargando = false;
      }
    });
    console.log('🔄 Carga de actividades finalizada.');
  }

  borrarActividade(actividade: Actividade) {}
}
