import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Actividade } from '../models/actividade.model';
import { ActividadesService } from '../services/actividades.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Socio } from 'src/app/socios/models/socio.model';
import { SociosService } from 'src/app/socios/services/socios.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-actividades-ed',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './actividades-ed.component.html',
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActividadesEdComponent implements OnInit {

  public titulo = 'Nova Actividade';
  public actividade!: Actividade; // Inicializa como un obxecto vacío
  public cargando = false;
  public formEditarActividade!: FormGroup; // Aquí poderías inicializar un FormGroup se necesitas formularios reactivos

  public socios: Socio[] = []; // Array para almacenar os socios, se necesario
  public selectedSocios: Socio[] = []; // Array para almacenar os socios seleccionados
  public novoNonSocio = { nome: '', apelidos: '' };
  public participantes: any[] = [];

  constructor(
    private actividadesService: ActividadesService,
    private sociosService: SociosService,
    private cdr: ChangeDetectorRef, // Inxecta ChangeDetectorRef se necesitas notificar cambios manualmente
    private fb: FormBuilder, // Inyecta FormBuilder se necesitas formularios reactivos
    private activatedRoute: ActivatedRoute, // Inyecta ActivatedRoute para acceder aos parámetros da ruta
    private router: Router
  ) {
    this.formEditarActividade = this.fb.group({
      nome: [''],
      descricion: [''],
      data: [''],
      lugar: [''],
      sociosSeleccionados: [[]], // novo control para selección múltiple
      participantes: [],
    });
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      if (paramMap.has('id') && paramMap.get('id') !== null) {
        this.titulo = 'Editar Actividade';
      } else {
        this.titulo = 'Nova Actividade';
      }
      const id = paramMap.get('id');
      console.log('🔄 Parámetro id recibido:', id);
      if (id) {
        this.actividadesService.getActividadeById(id).subscribe(actividade => {
          this.actividade = actividade;
          this.formEditarActividade.patchValue({
            nome: actividade.nome,
            descricion: actividade.descricion,
            data: actividade.data ? new Date(actividade.data).toISOString().split('T')[0] : '',
            lugar: actividade.lugar,
            participantes: actividade.participantes ?? [],
          });
          // Engade esta liña para sincronizar a lista visual:
          this.participantes = actividade.participantes ? [...actividade.participantes] : [];
          this.cdr.markForCheck();
          console.log('🔄 Actividade cargada:', this.actividade);
        });
      } else {
        this.actividade = {
          _id: '', // Valor por defecto para _id
          nome: '',
          descricion: '',
          data: new Date(),
          lugar: '',
          participantes: [], // Inicializa como un array vacío
        };
        // console.log('🔄 Nova actividade inicializada:', this.actividade);
      }
    });
    this.sociosService.getSocios().subscribe(socios => {
      this.socios = socios;
      this.cdr.markForCheck(); // Se usas ChangeDetectionStrategy.OnPush
      console.log('Socios cargados:', this.socios);
    });
    // Se editas, carga tamén os participantes existentes en this.participantes
  }

  engadirSociosSeleccionados() {
    const seleccionadosIds = this.formEditarActividade.get('sociosSeleccionados')?.value || [];
    for (const id of seleccionadosIds) {
      const socio = this.socios.find(s => s._id === id);
      if (socio && !this.participantes.find(p => p._id === socio._id)) {
        this.participantes.push({ ...socio, eSocio: true });
      }
    }
    // Limpa a selección do select
    this.formEditarActividade.get('sociosSeleccionados')?.setValue([]);
  }

  engadirNonSocio(nome: string, apelidos: string) {
    if (nome && apelidos) {
      this.participantes.push({ nome, apelidos, eSocio: false });
    }
  }

  eliminarParticipante(index: number) {
    this.participantes.splice(index, 1);
  }

  gardarActividade() {
    if (this.formEditarActividade.valid) {
      const actividadeData: Actividade = this.formEditarActividade.value;
      // Transforma participantes ao formato esperado polo backend
      actividadeData.participantes = this.participantes.map(p => {
        if (p.eSocio) {
          return { socio: p._id, eSocio: true };
        } else {
          return { nome: p.nome, apelidos: p.apelidos, eSocio: false };
        }
      });
      this.cargando = true;

      // Se existe _id, actualizar; se non, crear nova actividade
      if (this.actividade && this.actividade._id) {
        // Actualizar actividade existente
        this.actividadesService.actualizaActividad(this.actividade._id, actividadeData).subscribe({
          next: () => {
            this.cargando = false;
            this.router.navigate(['/actividades']);
          },
          error: (err) => {
            console.error('❌ Erro actualizando actividade:', err);
            this.cargando = false;
          }
        });
      } else {
        // Crear nova actividade
        this.actividadesService.createActividad(actividadeData).subscribe({
          next: () => {
            this.cargando = false;
            this.router.navigate(['/actividades']);
          },
          error: (err) => {
            console.error('❌ Erro creando actividade:', err);
            this.cargando = false;
          }
        });
      }
    } else {
      console.warn('⚠️ Formulario inválido, non se gardará a actividade');
    }
  }

}
