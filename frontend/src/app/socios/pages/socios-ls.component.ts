import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Socio } from '../models/socios.model';
import { SociosService } from '../services/socios.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-socios-ls',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './socios-ls.component.html',
  styles: [`
    :host {
      display: block;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SociosLsComponent implements OnInit {

  public titulo = 'Listado de Socios';
  public socios: Socio[] = [];
  public cargando = false;

  constructor(
    private sociosService: SociosService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.cargarSocios();
  }

  cargarSocios() {
    console.log('🔄 Iniciando carga de socios...');
    this.cargando = true;

    this.sociosService.getSocios().subscribe({
      next: (data) => {
        console.log('✅ Datos recibidos no componente:', data);
        console.log('📊 Tipo:', typeof data);
        console.log('📊 É array?', Array.isArray(data));
        console.log('📊 Lonxitude:', data?.length);

        this.socios = data;
        this.cargando = false;

        // ← CRÍTICO: Notificar a Angular que os datos cambiaron
        this.cdr.detectChanges();

        console.log('🎯 Variable socios actualizada:', this.socios);
      },
      error: (err) => {
        console.error('❌ Erro cargando socios:', err);
        this.cargando = false;
        this.cdr.detectChanges();
      }
    });
  }

}
