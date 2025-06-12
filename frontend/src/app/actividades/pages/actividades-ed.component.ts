import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Actividade } from '../models/actividade.model';
import { ActividadesService } from '../services/actividades.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { Socio } from 'src/app/socios/models/socio.model';
import { SociosService } from 'src/app/socios/services/socios.service';
import { CommonModule } from '@angular/common';
import { InscricionsService } from 'src/app/inscricions/services/inscricions.service';

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
    private inscricionsService: InscricionsService,
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
            participantes: actividade.participantes?.map((s: any) => s._id) ?? [],
          });
          this.participantes = actividade.participantes ? [...actividade.participantes] : [];
          this.cdr.markForCheck();
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

  cargarInscritos() {
    if (this.actividade && this.actividade._id) {
      this.inscricionsService.getInscritosPorActividade(this.actividade._id).subscribe(inscritos => {
        this.participantes = inscritos;
        this.cdr.markForCheck();
        console.log('🔄 Inscritos cargados:', inscritos);
      });
    }
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
      const actividadeData: any = {
        ...this.formEditarActividade.value,
        participantes: this.participantes.map(p => p._id) // só IDs de socios
      };
      this.cargando = true;

      if (this.actividade && this.actividade._id) {
        this.actividadesService.actualizaActividad(this.actividade._id, actividadeData).subscribe({
          next: (actividadeActualizada) => {
            this.cargando = false;
            this.router.navigate(['/actividades']);
          },
          error: (err) => {
            console.error('❌ Erro actualizando actividade:', err);
            this.cargando = false;
          }
        });
      } else {
        this.actividadesService.createActividad(actividadeData).subscribe({
          next: (novaActividade) => {
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

  // Crea as inscricións para os socios seleccionados
  crearInscricions(actividadeId: string, sociosIds: string[]) {
    if (sociosIds.length === 0) {
      this.cargando = false;
      this.router.navigate(['/actividades']);
      return;
    }
    let creadas = 0;
    sociosIds.forEach(socioId => {
      this.inscricionsService.crearInscricion(socioId, actividadeId).subscribe({
        next: () => {
          creadas++;
          if (creadas === sociosIds.length) {
            this.cargando = false;
            this.router.navigate(['/actividades']);
          }
        },
        error: (err) => {
          console.error('❌ Erro creando inscrición:', err);
          this.cargando = false;
        }
      });
    });
  }
}
