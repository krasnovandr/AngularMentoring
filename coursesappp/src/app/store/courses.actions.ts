import { Action } from '@ngrx/store';

import { AuthorDto } from '../models/author';
import { CourseListModel, FilterOptions, PagerOptions } from '../models/courses';

export enum CoursesActionTypes {
    GET_COURSES = 'GET_COURSES',
    GET_COURSES_SUCCESS = 'GET_COURSES_SUCCESS',
    GET_COURSES_FAILED = 'GET_COURSES_FAILED',
    PAGE_CHANGED = 'PAGE_CHANGED',
    SEARCH_TRIGGERED = 'SEARCH_TRIGGERED',
    EDIT_COURSE = 'EDIT_COURSE',
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
    GET_SINGLE_COURSE_FAILED = 'GET_SINGLE_COURSE_FAILED',
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


export class AddCourse implements Action {
    readonly type = CoursesActionTypes.ADD_COURSE;

    constructor() { }
}

export class AddCourseFailed implements Action {
    readonly type = CoursesActionTypes.ADD_COURSE_FAILED;

    constructor() { }
}

export class AddCourseSuccess implements Action {
    readonly type = CoursesActionTypes.ADD_COURSE_SUCCESS;

    constructor() { }
}

export class DeleteCourse implements Action {
    readonly type = CoursesActionTypes.DELETE_COURSE;

    constructor(public courseId: number) { }
}

export class EditCourse implements Action {
    readonly type = CoursesActionTypes.EDIT_COURSE;

    constructor() { }
}

export class DeleteCourseSuccess implements Action {
    readonly type = CoursesActionTypes.DELETE_COURSE_SUCCESS;

    constructor() { }
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

export type CoursesActions =
    GetCourses
    | GetCoursesSuccess
    | GetCoursesFailed
    | PageChanged
    | SearchTriggered
    | AddCourse
    | AddCourseFailed
    | AddCourseSuccess
    | DeleteCourse
    | DeleteCourseSuccess
    | DeleteCourseFailed
    | GetAuthors
    | GetAuthorsSuccess
    | GetAuthorsSuccessFailed
    | EditCourse;
