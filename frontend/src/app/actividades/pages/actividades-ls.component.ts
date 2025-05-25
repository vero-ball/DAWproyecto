import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-actividades-ls',
  standalone: true,
  imports: [],
  templateUrl: './actividades-ls.component.html',
  styles: [`
    :host {
      display: block;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActividadesLsComponent { }
