import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Actividade } from '../models/actividade.model';
import { ActividadesService } from '../services/actividades.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-actividades-ed',
  standalone: true,
  imports: [
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

  constructor(
    private actividadesService: ActividadesService,
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
            data: actividade.data,
            lugar: actividade.lugar,
            participantes: actividade.participantes ?? [],
          });
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
  }

  gardarActividade() {
    if (this.formEditarActividade.valid) {
      const actividadeData: Actividade = this.formEditarActividade.value;
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
