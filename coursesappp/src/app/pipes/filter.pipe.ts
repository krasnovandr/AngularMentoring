import { Pipe, PipeTransform } from '@angular/core';
import { Course } from '../models/courses';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {

  transform(courses: Course[], title: string): any {
    return courses.filter(value =>
      value.title.toLocaleLowerCase().indexOf(title.toLocaleLowerCase()) !== -1);
  }
}
