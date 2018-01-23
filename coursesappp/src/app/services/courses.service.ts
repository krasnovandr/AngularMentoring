import 'rxjs/add/observable/from';

import { HttpClient } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { environment } from '../../environments/environment';
import { Course, CourseDto, CourseListModel, CourseResponseDto, FilterOptions, PagerOptions } from '../models/courses';

@Injectable()
export class CoursesService {
  private coursesUrl = 'courses';
  constructor(private http: HttpClient) {
  }

  public createCourse(course: CourseDto) {
    return this.http.post<CourseDto>(`${environment.apiEndpoints.apiUrl}/${this.coursesUrl}`, course)
      .map((courseDto) => this.mapCourseEntity(courseDto));
  }

  public updateCourse(course: CourseDto) {
    return this.http.put<CourseDto>(`${environment.apiEndpoints.apiUrl}/${this.coursesUrl}/${course.id}`, course)
      .map((courseDto) => this.mapCourseEntity(courseDto));
  }

  public getList(pagerOptions?: PagerOptions, filterOptions?: FilterOptions) {

    const params = this.buildParams(pagerOptions, filterOptions);

    return this.http.get<CourseResponseDto>(`${environment.apiEndpoints.apiUrl}/${this.coursesUrl}`, { params: params })
      .map((response) => {
        const result = new CourseListModel();
        result.totalCount = response.totalCount;
        result.data = response.data.map((backendCourse) => this.mapCourseEntity(backendCourse));
        return result;
      });
  }

  public getCourse(id: number) {
    return this.http.get<CourseDto>(`${environment.apiEndpoints.apiUrl}/${this.coursesUrl}/${id}`)
      .map((courseDto) => this.mapCourseEntity(courseDto));
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

  public removeCourse(id: number): Observable<Object> {
    const coursesUrl = 'courses';
    return this.http.delete(`${environment.apiEndpoints.apiUrl}/${coursesUrl}/${id}`);
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
