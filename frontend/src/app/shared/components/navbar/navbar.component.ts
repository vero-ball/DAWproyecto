import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './navbar.component.html',
  styles: [`
    :host {
      display: block;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {
  constructor(private auth: AuthService, private router: Router) {}

  isLoggedIn(): boolean {
    return this.auth.isLoggedIn();
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
