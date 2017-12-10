import { Injectable } from '@angular/core';
import { Course } from '../models/courses';

@Injectable()
export class CoursesService {
  private commonDescription = `Lorem Ipsum is simply dummy text of the printing and typesetting industry.
  Lorem Ipsum has been the industry s standard dummy text ever since the 1500s,
  when an unknown printer took a galley of type and scrambled it to make a type specimen book.
  It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
  It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
   and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`;

  courses: Course[] = [
    {
      id: 11,
      title: 'Course 1',
      description: this.commonDescription,
      duration: 201,
      creationDate: this.getDate(-20),
      topRated: false
    },
    {
      id: 12,
      title: 'Course 32',
      description: this.commonDescription,
      duration: 32,
      creationDate: this.getDate(0),
      topRated: true
    },
    {
      id: 13,
      title: 'Course 3',
      description: this.commonDescription,
      duration: 1233,
      creationDate: this.getDate(-4),
      topRated: true
    },
    {
      id: 14,
      title: 'Test Course',
      description: this.commonDescription,
      duration: 23,
      creationDate: this.getDate(10),
      topRated: false
    },
    {
      id: 15,
      title: 'Super Course',
      description: this.commonDescription,
      duration: 123,
      creationDate: this.getDate(12),
      topRated: false
    },
    {
      id: 15,
      title: 'Mega Course',
      description: this.commonDescription,
      duration: 223333,
      creationDate: this.getDate(-123),
      topRated: false
    }
  ];
  constructor() {
  }


  private getDate(days: number = 0): Date {
    const date = new Date();
    date.setDate(date.getDate() + days);
    return date;
  }

  getList(): Course[] {
    return this.courses;
  }

  createCourse(newCourse: Course): void {
    this.courses.push(newCourse);
  }

  getById(id: number): Course {
    return this.courses.find(item => item.id === id);
  }

  updateCourse(course: Course): void {
    const elementIndex = this.courses.findIndex(item => item.id === course.id);
    if (elementIndex > -1) {
      this.courses[elementIndex] = course;
    }
  }

  removeCourse(id: number): void {
    const elementIndex = this.courses.findIndex(item => item.id === id);
    if (elementIndex > -1) {
      this.courses.splice(elementIndex, 1);
    }
  }
}
