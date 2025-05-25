import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-socios-ls',
  standalone: true,
  imports: [],
  templateUrl: './socios-ls.component.html',
  styles: [`
    :host {
      display: block;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SociosLsComponent { }
