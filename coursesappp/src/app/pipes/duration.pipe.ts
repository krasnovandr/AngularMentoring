import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'duration'
})
export class DurationPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let result = '';

    const hours = Math.floor(value / 60);
    const minutes = value % 60;

    if (hours && hours > 0) {
      result += `${hours} h `;
    }

    if (minutes) {
      result += `${minutes} min`;
    }

    return result;
  }

}
