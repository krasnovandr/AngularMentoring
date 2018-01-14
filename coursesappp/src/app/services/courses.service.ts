import { Injectable } from '@angular/core';
import { Course, CourseBackendModel, PagerOptions, CourseResponse, FilterOptions } from '../models/courses';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import { Subject } from 'rxjs/Subject';
import { HttpClient } from '@angular/common/http';
import { RequestOptions, RequestMethod } from '@angular/http';
import { environment } from '../../environments/environment';
import { Request } from '@angular/http/src/static_request';
import { HttpParams } from '@angular/common/http';
@Injectable()
export class CoursesService {
  constructor(private http: HttpClient) {
  }

  public getList(pagerOptions?: PagerOptions, filterOptions?: FilterOptions) {
    const coursesUrl = 'courses';
    const params = this.buildParams(pagerOptions, filterOptions);

    return this.http.get<CourseResponse>(`${environment.apiEndpoints.apiUrl}/${coursesUrl}`, { params: params });
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
    const options = new PagerOptions(1, 25);

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
