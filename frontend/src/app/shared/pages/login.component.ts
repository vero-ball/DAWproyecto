import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styles: [`
    :host {
      display: block;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  formLogin: FormGroup;

  constructor(private fb: FormBuilder) {
    this.formLogin = this.fb.group({
      usuario: [''],
      contrasinal: ['']
    });
  }

  login() {
    const { usuario, contrasinal } = this.formLogin.value;
    // Aquí iría a chamada ao backend para autenticar
    console.log('Intentando login:', usuario, contrasinal);
    // Exemplo: this.authService.login(usuario, contrasinal).subscribe(...)
  }
}
