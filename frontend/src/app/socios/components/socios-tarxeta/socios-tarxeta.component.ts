import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'app-socios-tarxeta',
    standalone: true,
    imports: [],
    templateUrl: './socios-tarxeta.component.html',
    styles: `
    :host {
      display: block;
    }
  `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SociosTarxetaComponent { }
