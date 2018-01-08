import { Injectable } from '@angular/core';
import { Course, CourseBackendModel, PagerOptions, CourseResponse, FilterOptions } from '../models/courses';
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

  public coursesObservable = new Subject<CourseResponse>();
  constructor(private http: HttpClient) {
  }


  private getDate(days: number = 0): Date {
    const date = new Date();
    date.setDate(date.getDate() + days);
    return date;
  }

  public getList(pagerOptions?: PagerOptions, filterOptions?: FilterOptions) {
    const coursesUrl = 'courses';
    const params = this.buildParams(pagerOptions, filterOptions);

    this.http.get<CourseResponse>(`${environment.apiEndpoints.apiUrl}/${coursesUrl}`, { params: params })
      .subscribe(result => this.coursesObservable.next(result));
  }

  private buildParams(pagerOptions?: PagerOptions, filterOptions?: FilterOptions) {
    let params = new HttpParams();
    if (!pagerOptions) {
      pagerOptions = this.getDefaultPageOptions();
    }

    params = params.append('pageIndex', pagerOptions.pageIndex.toString());
    params = params.append('itemsPerPage', pagerOptions.itemsPerPage.toString());

    if (filterOptions) {
      params = params.append('courseName', filterOptions.courseName);
    }
    return params;
  }


  getDefaultPageOptions(): PagerOptions {
    const options = new PagerOptions();

    options.itemsPerPage = 25;
    options.pageIndex = 1;

    return options;
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

  public removeCourse(id: number): Observable<Object> {
    const coursesUrl = 'courses';
    return this.http.delete(`${environment.apiEndpoints.apiUrl}/${coursesUrl}/${id}`);
  }
}
