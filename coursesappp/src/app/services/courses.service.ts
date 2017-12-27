import { Injectable } from '@angular/core';
import { Course, CourseBackendModel } from '../models/courses';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import { Subject, BehaviorSubject } from 'rxjs';
@Injectable()
export class CoursesService {
  private commonDescription = `Lorem Ipsum is simply dummy text of the printing and typesetting industry.
  Lorem Ipsum has been the industry s standard dummy text ever since the 1500s,
  when an unknown printer took a galley of type and scrambled it to make a type specimen book.
  It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
  It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
   and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`;


  private courses: CourseBackendModel[] = [
    {
      courseId: 11,
      courseTitle: 'Course 1',
      courseDescription: this.commonDescription,
      courseDuration: 201,
      courseCreationDate: this.getDate(-20),
      courseTopRated: false
    },
    {
      courseId: 12,
      courseTitle: 'Course 32',
      courseDescription: this.commonDescription,
      courseDuration: 32,
      courseCreationDate: this.getDate(0),
      courseTopRated: true
    },
    {
      courseId: 13,
      courseTitle: 'Course 3',
      courseDescription: this.commonDescription,
      courseDuration: 1233,
      courseCreationDate: this.getDate(-4),
      courseTopRated: true
    },
    {
      courseId: 14,
      courseTitle: 'Test Course',
      courseDescription: this.commonDescription,
      courseDuration: 1233,
      courseCreationDate: this.getDate(10),
      courseTopRated: false
    },
    {
      courseId: 15,
      courseTitle: 'Super Course',
      courseDescription: this.commonDescription,
      courseDuration: 123,
      courseCreationDate: this.getDate(12),
      courseTopRated: false
    },
    {
      courseId: 15,
      courseTitle: 'Mega Course',
      courseDescription: this.commonDescription,
      courseDuration: 223333,
      courseCreationDate: this.getDate(-123),
      courseTopRated: false
    }
  ];

  public coursesObservable = new BehaviorSubject<CourseBackendModel[]>(this.courses);
  constructor() {
  }


  private getDate(days: number = 0): Date {
    const date = new Date();
    date.setDate(date.getDate() + days);
    return date;
  }

  public getList(): Observable<CourseBackendModel[]> {
    return this.coursesObservable;
  }

  public createCourse(newCourse: CourseBackendModel): void {
    this.courses.push(newCourse);
    this.coursesObservable.next(this.courses);
  }

  public getById(id: number): Observable<CourseBackendModel> {
    return Observable.of(this.courses.find(item => item.courseId === id));
  }

  public updateCourse(course: CourseBackendModel): void {
    const elementIndex = this.courses.findIndex(item => item.courseId === course.courseId);
    if (elementIndex > -1) {
      this.courses[elementIndex] = course;
      this.coursesObservable.next(this.courses);
    }

  }

  public removeCourse(id: number): void {
    const elementIndex = this.courses.findIndex(item => item.courseId === id);
    if (elementIndex > -1) {
      this.courses.splice(elementIndex, 1);
      this.coursesObservable.next(this.courses);
    }
  }
}
