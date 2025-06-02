import { Pipe, type PipeTransform } from '@angular/core';

@Pipe({
  name: 'DateEs',
  standalone: true,
})
export class DateEsPipe implements PipeTransform {

  transform(value: string | Date): string {
    if (!value) return '';
    const d = typeof value === 'string' ? new Date(value) : value;
    return d.toLocaleDateString('es-ES', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  }

}
