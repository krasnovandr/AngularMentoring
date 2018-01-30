import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, mergeMap, withLatestFrom } from 'rxjs/operators';

import { PagerOptions } from '../models/courses';
import { CoursesService } from '../services/courses.service';
import {
    CoursesActionTypes,
    DeleteCourse,
    DeleteCourseFailed,
    GetCourses,
    GetCoursesFailed,
    GetCoursesSuccess,
    GetAuthorsSuccess,
    GetAuthorsSuccessFailed,
} from './courses.actions';
import { AppState, MainState } from './courses.model';
import { AuthorsService } from '../services/authors.service';

@Injectable()
export class CoursesEffects {
    constructor(
        private router: Router,
        private actions: Actions,
        private coursesService: CoursesService,
        private authorsService: AuthorsService,
        private store: Store<MainState>) { }

    @Effect()
    getCourses: Observable<Action> =
        this.actions.ofType(CoursesActionTypes.GET_COURSES, CoursesActionTypes.PAGE_CHANGED, CoursesActionTypes.SEARCH_TRIGGERED)
            .pipe(withLatestFrom(this.store),
            mergeMap(([action, state]) => {
                const pager = state.mainStore.coursesList && state.mainStore.coursesList.data.length === 1
                    ? PagerOptions.getDefaultOptions()
                    : state.mainStore.pager;
                return this.coursesService.getList(pager, state.mainStore.filter)
                    .pipe(
                    map((data) => new GetCoursesSuccess(data)),
                    catchError(e => of(new GetCoursesFailed())
                    ));
            }));

    @Effect()
    deleteCourse: Observable<Action> =
        this.actions.ofType(CoursesActionTypes.DELETE_COURSE)
            .pipe(withLatestFrom(this.store),
            mergeMap(([action, state]) => {
                const deleteAction = <DeleteCourse>action;
                debugger;
                return this.coursesService.removeCourse(deleteAction.courseId)
                    .pipe(
                    map((data) => new GetCourses()),
                    catchError(e => of(new DeleteCourseFailed())
                    ));
            }));


    @Effect()
    addCourse: Observable<Action> =
        this.actions.ofType(CoursesActionTypes.DELETE_COURSE)
            .pipe(withLatestFrom(this.store),
            mergeMap(([action, state]) => {
                const deleteAction = <DeleteCourse>action;
                return this.coursesService.removeCourse(deleteAction.courseId)
                    .pipe(
                    map((data) => new GetCourses()),
                    catchError(e => of(new DeleteCourseFailed())
                    ));
            }));

    @Effect()
    getAuthors: Observable<Action> =
        this.actions.ofType(CoursesActionTypes.GET_AUTHORS)
            .pipe(withLatestFrom(this.store),
            mergeMap(([action, state]) => {
                return this.authorsService.getAuthors()
                    .pipe(
                    map((data) => new GetAuthorsSuccess(data)),
                    catchError(e => of(new GetAuthorsSuccessFailed())
                    ));
            }));
}

