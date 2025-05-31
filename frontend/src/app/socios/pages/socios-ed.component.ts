import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Socio } from '../models/socios.model';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SociosService } from '../services/socios.service';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-socios-ed',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,

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
    private router: Router
  ) {
    this.formEditarSocio = this.fb.group({
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
    this.activatedRoute.params.subscribe(params => {
      const id = params['id'];
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
      }
    });
  }

  gardarSocio() {
    console.log('🔄 Guardando socio:', this.socio);
    // Lógica para guardar el socio
  }
}
