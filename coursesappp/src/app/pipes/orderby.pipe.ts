import { Pipe, PipeTransform } from '@angular/core';
import { Course } from '../models/courses';

@Pipe({
  name: 'orderby'
})
export class OrderbyPipe implements PipeTransform {

  transform(courses: Course[], sortField: string, order: string = 'asc'): any {
    if (sortField === 'creationDate') {
      courses.sort((course1, course2) => {
        return order === 'asc' ?
          +new Date(course1.creationDate) - +new Date(course2.creationDate)
          : +new Date(course2.creationDate) - +new Date(course1.creationDate);
      });
    }

    return courses;
  }
}
