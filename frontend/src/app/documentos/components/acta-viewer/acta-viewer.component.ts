import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-acta-viewer',
  standalone: true,
  imports: [],
  template: `<p>acta-viewer works!</p>`,
  styles: [`
    :host {
      display: block;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActaViewerComponent { }
