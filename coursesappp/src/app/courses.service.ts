import { Injectable } from '@angular/core';
import { Course } from './courses';

@Injectable()
export class CoursesService {
  commonDescription = 'Lorem Ipsum is simply dummy text of the printing and typesetting industry';

  constructor() { }

  getCourses(): Course[] {

    const courses: Course[] = [
      { id: 11, title: 'Course 1', description: this.commonDescription, duration: Date.now(), creationDate: Date.now() },
      { id: 12, title: 'Course 2', description: this.commonDescription, duration: Date.now(), creationDate: Date.now() },
      { id: 13, title: 'Course 3', description: this.commonDescription, duration: Date.now(), creationDate: Date.now() },
      { id: 14, title: 'Course 4', description: this.commonDescription, duration: Date.now(), creationDate: Date.now() },
    ];

    return courses;
  }
}
