import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LoginComponent } from './login.component';
import { AuthService } from 'src/app/core/auth/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    LoginComponent
  ],
  templateUrl: './home.component.html',
  styles: [`
    :host {
      display: block;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  constructor(public auth: AuthService) {}
}
