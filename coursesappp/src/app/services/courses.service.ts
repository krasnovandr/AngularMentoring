import 'rxjs/add/observable/from';
// import 'rxjs/operator/map';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { environment } from '../../environments/environment';
import { Course, CourseDto, CourseListModel, CourseResponseDto, FilterOptions, PagerOptions } from '../models/courses';
@Injectable()
export class CoursesService {
  public baseUrl = environment.apiEndpoints.apiUrl;
  public coursesUrl = 'courses';
  constructor(private http: HttpClient) {
  }

  public createCourse(course: CourseDto) {
    return this.http.post(`${this.baseUrl}/${this.coursesUrl}`, course)
      .pipe(map((courseDto: CourseDto) => this.mapCourseEntity(courseDto)));
  }

  public updateCourse(course: CourseDto) {
    return this.http.put(`${this.baseUrl}/${this.coursesUrl}/${course.id}`, course)
      .pipe(map((courseDto: CourseDto) => this.mapCourseEntity(courseDto)));
  }

  public getList(pagerOptions?: PagerOptions, filterOptions?: FilterOptions): Observable<CourseListModel> {
    const params = this.buildParams(pagerOptions, filterOptions);

    return this.http.get(`${this.baseUrl}/${this.coursesUrl}`, { params: params })
      .pipe(map((response: CourseResponseDto) => {
        const result = new CourseListModel();
        result.totalCount = response.totalCount;
        result.data = response.data.map((backendCourse) => this.mapCourseEntity(backendCourse));
        return result;
      }));
  }

  public getCourse(id: number) {
    return this.http.get(`${this.baseUrl}/${this.coursesUrl}/${id}`)
      .pipe(map((courseDto: CourseDto) => this.mapCourseEntity(courseDto)));
  }


  private buildParams(pagerOptions?: PagerOptions, filterOptions?: FilterOptions) {
    let params = new HttpParams();
    if (!pagerOptions) {
      pagerOptions = PagerOptions.getDefaultOptions();
    }

    params = params.append('pageIndex', pagerOptions.pageIndex.toString());
    params = params.append('itemsPerPage', pagerOptions.itemsPerPage.toString());

    if (filterOptions) {
      params = params.append('courseName', filterOptions.courseName);
    }
    return params;
  }

  public removeCourse(id: number): Observable<Object> {
    const coursesUrl = 'courses';
    return this.http.delete(`${this.baseUrl}/${coursesUrl}/${id}`);
  }

  private mapCourseEntity(backendCourse: CourseDto): Course {
    const result = new Course();
    result.id = backendCourse.id;
    result.creationDate = backendCourse.date;
    result.description = backendCourse.description;
    result.duration = backendCourse.duration;
    result.title = backendCourse.name;
    result.topRated = backendCourse.isTopRated;
    result.authors = backendCourse.authors;
    return result;
  }
}
