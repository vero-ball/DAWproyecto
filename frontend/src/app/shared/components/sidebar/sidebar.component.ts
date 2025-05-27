import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './sidebar.component.html',
  styles: [`
    :host {
      display: block;
    }
    .sidebar {
      width: 220px;
      height: 100vh;
      overflow-y: auto;

      @media screen and (max-width: 768px) {
        width: 100%;
        height: auto;
        .menu {
          display: none;
        }
        &.is-active .menu {
          display: block;
        }
      }
    }

  `]
})
export class SidebarComponent {
  public isOpen = true;

  toggleSidebar() {
    this.isOpen = !this.isOpen;
  }
}
