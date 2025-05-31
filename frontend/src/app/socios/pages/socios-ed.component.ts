import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Socio } from '../models/socios.model';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SociosService } from '../services/socios.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-socios-ed',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './socios-ed.component.html',
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SociosEdComponent implements OnInit {

  public titulo = 'Novo Socio';
  public socio!: Socio; // Inicializa como un array vacío
  public cargando = false;
  public formEditarSocio!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private sociosService: SociosService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.formEditarSocio = this.fb.group({
      // _id: [null], // Para el caso de edición
      nome: [''],
      apelidos: [''],
      numeroSocio: [null],
      dni: [''],
      enderezo: [''],
      telefono: [''],
      email: [''],
      dataAlta: [''],
      dataBaixa: [''],
      motivoBaixa: [''],
      // reciboNumero: [''],
      // ano: [null],
      // cota: [null],
      // dataCobro: [''],
    });
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      if(paramMap.has('id') && paramMap.get('id') !== null) {
        this.titulo = 'Editar Socio';
      } else {
        this.titulo = 'Novo Socio';
      }
      const id = paramMap.get('id');
      console.log('🔄 Parámetro id recibido:', id);
      // Cargar el socio si existe el id
      if (id) {
        this.sociosService.getSocioById(id).subscribe(socio => {
          this.socio = socio;
          this.formEditarSocio.patchValue({
            nome: socio.nome,
            apelidos: socio.apelidos,
            numeroSocio: socio.numeroSocio,
            dni: socio.dni,
            enderezo: socio.enderezo,
            telefono: socio.telefono,
            email: socio.email,
            dataAlta: socio.dataAlta,
            dataBaixa: socio.dataBaixa,
            motivoBaixa: socio.motivoBaixa,
            // reciboNumero: socio.reciboNumero,
            // ano: socio.ano,
            // cota: socio.cota,
            // dataCobro: socio.dataCobro,
          });
          console.log('🔄 Socio cargado:', this.socio);
        });
      } else {
        this.socio = {
          nome: '',
          apelidos: '',
          numeroSocio: 0,
          dni: '',
          enderezo: '',
          telefono: '',
          email: '',
          dataAlta: new Date().toISOString().split('T')[0], // Fecha actual
        };
        // console.log('🔄 Nuevo socio inicializado:', this.socio);
      }
    });
  }

  gardarSocio() {
    console.log('🔄 Guardando socio:', this.socio);
    // Lógica para guardar el socio
    if (this.formEditarSocio.valid) {
      const socioData: Socio = this.formEditarSocio.value;
      console.log('🔄 Datos del socio a guardar:', socioData);
      this.cargando = true;

      if (this.socio._id) {
        // Editar un socio existente
        this.sociosService.actualizaSocio(String(this.socio._id), socioData).subscribe({
          next: () => {
            console.log('✅ Socio actualizado correctamente');
            this.toastr.success('Socio actualizado correctamente', 'Éxito');
            this.router.navigate(['/socios']);
          },
          error: (err) => {
            console.error('❌ Error actualizando socio:', err);
            this.toastr.error('Error actualizando socio', 'Error');
            this.cargando = false;
          }
        });
      } else {
        // Crear un nuevo socio
        this.sociosService.createSocio(socioData).subscribe({
          next: () => {
            console.log('✅ Socio creado correctamente');
            this.toastr.success('Socio creado correctamente', 'Éxito');
            this.router.navigate(['/socios']);
          },
          error: (err) => {
            console.error('❌ Error creando socio:', err);
            this.toastr.error('Error creando socio', 'Error');
            this.cargando = false;
          }
        });
      }
    } else {
      console.warn('⚠️ Formulario inválido, no se guardará el socio');
    }
  }
}
