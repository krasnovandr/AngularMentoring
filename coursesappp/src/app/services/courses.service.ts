import { Injectable } from '@angular/core';
import { Course } from '../courses';

@Injectable()
export class CoursesService {
  commonDescription = 'Lorem Ipsum is simply dummy text of the printing and typesetting industry';
  courses: Course[] = [
    { id: 11, title: 'Course 1', description: this.commonDescription, duration: Date.now(), creationDate: Date.now() },
    { id: 12, title: 'Course 2', description: this.commonDescription, duration: Date.now(), creationDate: Date.now() },
    { id: 13, title: 'Course 3', description: this.commonDescription, duration: Date.now(), creationDate: Date.now() },
    { id: 14, title: 'Course 4', description: this.commonDescription, duration: Date.now(), creationDate: Date.now() }
  ];
  constructor() {
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



  // Get list
  // Create course
  // Get item by id
  // Update item
  // Remove item

