import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Socio } from '../models/socio.model';
import { SociosService } from '../services/socios.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

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
    private cdr: ChangeDetectorRef,
    private toastr: ToastrService
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

  borrarSocio(socio: Socio) {
    console.log('🗑️ Borrando socio:', socio);
    this.cargando = true;

    this.sociosService.borrarSocio(String(socio._id)!).subscribe({
      next: () => {
        console.log('✅ Socio borrado correctamente');
        this.toastr.success(`Socio ${socio.nome} borrado correctamente`, 'Borrado');
        this.cdr.detectChanges();
        this.cargarSocios();
      },
      error: (err) => {
        console.error('❌ Erro ao borrar socio:', err);
        this.toastr.error(`Erro ao borrar socio ${socio.nome}`, 'Error');
        this.cargando = false;
        this.cdr.detectChanges();
      }
    });
  }

}
