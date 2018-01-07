import { Injectable } from '@angular/core';
import { Course, CourseBackendModel, PagerOptions, CourseResponse } from '../models/courses';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import { Subject, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { RequestOptions, RequestMethod } from '@angular/http';
import { environment } from '../../environments/environment';
import { Request } from '@angular/http/src/static_request';
import { HttpParams } from '@angular/common/http';
@Injectable()
export class CoursesService {
  private commonDescription = `Lorem Ipsum is simply dummy text of the printing and typesetting industry.
  Lorem Ipsum has been the industry s standard dummy text ever since the 1500s,
  when an unknown printer took a galley of type and scrambled it to make a type specimen book.
  It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
  It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
   and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`;


  public coursesObservable = new Subject<CourseBackendModel[]>();
  constructor(private http: HttpClient) {
  }


  private getDate(days: number = 0): Date {
    const date = new Date();
    date.setDate(date.getDate() + days);
    return date;
  }

  public getList(pagerOptions?: PagerOptions): Observable<CourseResponse> {
    const coursesUrl = 'courses';
    let params = new HttpParams();
    params = params.append('start', pagerOptions.pageIndex.toString());
    params = params.append('count', pagerOptions.itemsPerPage.toString());
    return this.http.get<CourseResponse>(`${environment.apiEndpoints.apiUrl}/${coursesUrl}`,
      { params: params }
    );
  }

  // public createCourse(newCourse: CourseBackendModel): void {
  //   // this.courses.push(newCourse);
  //   // this.coursesObservable.next(this.courses);
  // }

  // public getById(id: number): Observable<CourseBackendModel> {
  //   // return Observable.of(this.courses.find(item => item.courseId === id));
  // }

  public updateCourse(course: CourseBackendModel): void {
    // const elementIndex = this.courses.findIndex(item => item.courseId === course.courseId);
    // if (elementIndex > -1) {
    //   this.courses[elementIndex] = course;
    //   this.coursesObservable.next(this.courses);
    // }

  }

  public removeCourse(id: number): void {
    // const elementIndex = this.courses.findIndex(item => item.courseId === id);
    // if (elementIndex > -1) {
    //   this.courses.splice(elementIndex, 1);
    //   this.coursesObservable.next(this.courses);
    // }
  }
}
