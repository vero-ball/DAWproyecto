import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-calendario',
  standalone: true,
  imports: [],
  templateUrl: './calendario.component.html',
  styles: [`
    :host {
      display: block;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarioComponent { }
