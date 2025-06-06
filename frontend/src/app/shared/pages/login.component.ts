import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';

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
  erro: string | null = null;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {
    this.formLogin = this.fb.group({
      dni: [''],
      password: ['']
    });
  }

  login() {
    const { dni, password } = this.formLogin.value;
    this.erro = null;
    this.auth.login(dni, password).subscribe({
      next: () => {
        this.router.navigate(['/']); // Redirixe ao inicio ou onde queiras
      },
      error: (err) => {
        this.erro = 'Usuario ou contrasinal incorrectos';
        console.error(err);
      }
    });
  }
}
