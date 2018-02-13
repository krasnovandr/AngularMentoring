import { Action } from '@ngrx/store';

import { AuthorDto } from '../models/author';
import { CourseListModel, FilterOptions, PagerOptions } from '../models/courses';
import { SignInResponse, UserInfo } from '../models/user';

export enum CoursesActionTypes {
  GET_COURSES = 'GET_COURSES',
  GET_COURSES_SUCCESS = 'GET_COURSES_SUCCESS',
  GET_COURSES_FAILED = 'GET_COURSES_FAILED',
  PAGE_CHANGED = 'PAGE_CHANGED',
  SEARCH_TRIGGERED = 'SEARCH_TRIGGERED',
  SEARCH_SUCCESS = 'SEARCH_SUCCESS',
  SEARCH_FAILED = 'SEARCH_FAILED',
  EDIT_COURSE = 'EDIT_COURSE',
  EDIT_COURSE_SUCCESS = 'EDIT_COURSE_SUCCESS',
  EDIT_COURSE_FAILED = 'EDIT_COURSE_FAILED',
  DELETE_COURSE = 'DELETE_COURSE',
  DELETE_COURSE_SUCCESS = 'DELETE_COURSE_SUCCESS',
  DELETE_COURSE_FAILED = 'DELETE_COURSE_FAILED',
  ADD_COURSE = 'ADD_COURSE',
  ADD_COURSE_FAILED = 'ADD_COURSE_FAILED',
  ADD_COURSE_SUCCESS = 'ADD_COURSE_SUCCESS',
  GET_AUTHORS = 'GET_AUTHORS',
  GET_AUTHORS_SUCCESS = 'GET_AUTHORS_SUCCESS',
  GET_AUTHORS_FAILED = 'GET_AUTHORS_FAILED',
  GET_SINGLE_COURSE = 'GET_SINGLE_COURSE',
  GET_SINGLE_COURSE_SUCCESS = 'GET_SINGLE_COURSE_SUCCESS',
  LOGIN = 'LOGIN',
  LOGIN_SUCCESS = 'LOGIN_SUCCESS',
  LOGIN_FAILED = 'LOGIN_FAILED',
  LOGOUT = 'LOGOUT',
  GET_USER_INFO = 'GET_USER_INFO',
  GET_USER_INFO_SUCCESS = 'GET_USER_INFO_SUCCESS',
  GET_USER_INFO_FAILED = 'GET_USER_INFO_FAILED',
  EMPTY_ACTION = 'EMPTY_ACTION',
  REFRESH_COURSES = 'REFRESH_COURSES',
  REFRESH_COURSES_SUCCESS = 'REFRESH_COURSES_SUCCESS',
  REFRESH_COURSES_FAILED = 'REFRESH_COURSES_FAILED'
}

export class Logout implements Action {
  readonly type = CoursesActionTypes.LOGOUT;

  constructor() { }
}

export class RefreshCourses implements Action {
  readonly type = CoursesActionTypes.REFRESH_COURSES;

  constructor() { }
}

export class RefreshCoursesSuccess implements Action {
  readonly type = CoursesActionTypes.REFRESH_COURSES_SUCCESS;

  constructor(public courses: CourseListModel) { }
}

export class RefreshCoursesFailed implements Action {
  readonly type = CoursesActionTypes.REFRESH_COURSES_FAILED;

  constructor() { }
}
export class GetUserInfo implements Action {
  readonly type = CoursesActionTypes.GET_USER_INFO;

  constructor(public token: string) { }
}

export class GetUserInfoSuccess implements Action {
  readonly type = CoursesActionTypes.GET_USER_INFO_SUCCESS;

  constructor(public userInfo: UserInfo) { }
}

export class GetUserInfoFailed implements Action {
  readonly type = CoursesActionTypes.GET_USER_INFO_FAILED;

  constructor() { }
}

export class Login implements Action {
  readonly type = CoursesActionTypes.LOGIN;

  constructor(public name: string, public password: string) { }
}

export class LoginSuccess implements Action {
  readonly type = CoursesActionTypes.LOGIN_SUCCESS;

  constructor(public result: SignInResponse) { }
}

export class LoginFailed implements Action {
  readonly type = CoursesActionTypes.LOGIN_FAILED;

  constructor() { }
}
export class GetCourses implements Action {
  readonly type = CoursesActionTypes.GET_COURSES;

  constructor(public pagerOptions?, public filterOptions?) { }
}

export class GetCoursesSuccess implements Action {
  readonly type = CoursesActionTypes.GET_COURSES_SUCCESS;

  constructor(public courses: CourseListModel) { }
}

export class GetCoursesFailed implements Action {
  readonly type = CoursesActionTypes.GET_COURSES_FAILED;

  constructor() { }
}

export class PageChanged implements Action {
  readonly type = CoursesActionTypes.PAGE_CHANGED;

  constructor(public pagerOptions: PagerOptions) { }
}

export class SearchTriggered implements Action {
  readonly type = CoursesActionTypes.SEARCH_TRIGGERED;

  constructor(public filterOptions?: FilterOptions) { }
}

export class SearchSuccess implements Action {
  readonly type = CoursesActionTypes.SEARCH_SUCCESS;

  constructor(public courses: CourseListModel) { }
}

export class SearchFailed implements Action {
  readonly type = CoursesActionTypes.SEARCH_FAILED;

  constructor() { }
}

export class AddCourse implements Action {
  readonly type = CoursesActionTypes.ADD_COURSE;

  constructor(public courseDto) { }
}

export class AddCourseFailed implements Action {
  readonly type = CoursesActionTypes.ADD_COURSE_FAILED;

  constructor() { }
}

export class AddCourseSuccess implements Action {
  readonly type = CoursesActionTypes.ADD_COURSE_SUCCESS;

  constructor(public course) { }
}

export class DeleteCourse implements Action {
  readonly type = CoursesActionTypes.DELETE_COURSE;

  constructor(public courseId: number) { }
}

export class EditCourse implements Action {
  readonly type = CoursesActionTypes.EDIT_COURSE;

  constructor(public courseDto) { }
}

export class EditCourseFailed implements Action {
  readonly type = CoursesActionTypes.EDIT_COURSE_FAILED;

  constructor() { }
}

export class EditCourseSuccess implements Action {
  readonly type = CoursesActionTypes.EDIT_COURSE_SUCCESS;

  constructor(public course) { }
}

export class DeleteCourseSuccess implements Action {
  readonly type = CoursesActionTypes.DELETE_COURSE_SUCCESS;

  constructor(public courseId: number) { }
}

export class DeleteCourseFailed implements Action {
  readonly type = CoursesActionTypes.DELETE_COURSE_FAILED;

  constructor() { }
}

export class GetAuthors implements Action {
  readonly type = CoursesActionTypes.GET_AUTHORS;

  constructor() { }
}

export class GetAuthorsSuccess implements Action {
  readonly type = CoursesActionTypes.GET_AUTHORS_SUCCESS;

  constructor(public authors: AuthorDto[]) { }
}
export class GetAuthorsSuccessFailed implements Action {
  readonly type = CoursesActionTypes.GET_AUTHORS_FAILED;

  constructor() { }
}

export class EmptyAction implements Action {
  readonly type = CoursesActionTypes.EMPTY_ACTION;

  constructor() { }
}

export type CoursesActions =
  | GetCourses
  | GetCoursesSuccess
  | GetCoursesFailed
  | PageChanged
  | SearchTriggered
  | SearchSuccess
  | SearchFailed
  | AddCourse
  | AddCourseFailed
  | AddCourseSuccess
  | DeleteCourse
  | DeleteCourseSuccess
  | DeleteCourseFailed
  | GetAuthors
  | GetAuthorsSuccess
  | GetAuthorsSuccessFailed
  | Login
  | LoginFailed
  | LoginSuccess
  | GetUserInfo
  | GetUserInfoFailed
  | GetUserInfoSuccess
  | Logout
  | EditCourseFailed
  | EditCourseSuccess
  | EditCourse
  | RefreshCourses
  | RefreshCoursesFailed
  | RefreshCoursesSuccess
  | EmptyAction;
