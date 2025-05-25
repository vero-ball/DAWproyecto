import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-actas-ls',
  standalone: true,
  imports: [],
  templateUrl: './actas-ls.component.html',
  styles: [`
    :host {
      display: block;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActasLsComponent { }
