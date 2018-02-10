import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, mergeMap, withLatestFrom } from 'rxjs/operators';

import { PagerOptions } from '../models/courses';
import { AuthorizationService } from '../services/authorization.service';
import { AuthorsService } from '../services/authors.service';
import { AuthorizationTokenService } from '../services/authToken.service';
import { CoursesService } from '../services/courses.service';
import {
  AddCourse,
  AddCourseFailed,
  AddCourseSuccess,
  CoursesActionTypes,
  DeleteCourse,
  DeleteCourseFailed,
  DeleteCourseSuccess,
  EditCourse,
  EditCourseFailed,
  EditCourseSuccess,
  GetAuthorsSuccess,
  GetAuthorsSuccessFailed,
  GetCourses,
  GetCoursesFailed,
  GetCoursesSuccess,
  GetUserInfo,
  GetUserInfoFailed,
  GetUserInfoSuccess,
  Login,
  LoginFailed,
  LoginSuccess,
  PageChanged,
  SearchFailed,
  SearchSuccess,
} from './courses.actions';
import { MainState } from './courses.model';

@Injectable()
export class CoursesEffects {
  constructor(
    private router: Router,
    private actions: Actions,
    private coursesService: CoursesService,
    private authorsService: AuthorsService,
    private authorizationService: AuthorizationService,
    private tokenService: AuthorizationTokenService,
    private store: Store<MainState>
  ) { }

  @Effect()
  getCourses: Observable<Action> = this.actions
    .ofType(CoursesActionTypes.GET_COURSES, CoursesActionTypes.PAGE_CHANGED)
    .pipe(
      withLatestFrom(this.store),
      mergeMap(([action, state]) => {
        const getCourses = <GetCourses>action;
        return this.coursesService
          .getList(state.mainStore.pager, state.mainStore.filter)
          .pipe(
            map(data => new GetCoursesSuccess(data)),
            catchError(e => of(new GetCoursesFailed()))
          );
      })
    );

  @Effect()
  deleteCourse: Observable<Action> = this.actions
    .ofType(CoursesActionTypes.DELETE_COURSE)
    .pipe(
      withLatestFrom(this.store),
      mergeMap(([action, state]) => {
        const deleteAction = <DeleteCourse>action;
        return this.coursesService
          .removeCourse(deleteAction.courseId)
          .pipe(
            map(data => new DeleteCourseSuccess(deleteAction.courseId)),
            catchError(e => of(new DeleteCourseFailed()))
          );
      })
    );

  @Effect()
  addCourse: Observable<Action> = this.actions
    .ofType(CoursesActionTypes.ADD_COURSE)
    .pipe(
      withLatestFrom(this.store),
      mergeMap(([action, state]) => {
        const addAction = <AddCourse>action;
        return this.coursesService
          .createCourse(addAction.courseDto)
          .pipe(
            map(data => new AddCourseSuccess(data)),
            catchError(e => of(new AddCourseFailed()))
          );
      })
    );

  @Effect()
  editCourse: Observable<Action> = this.actions
    .ofType(CoursesActionTypes.EDIT_COURSE)
    .pipe(
      withLatestFrom(this.store),
      mergeMap(([action, state]) => {
        const addAction = <EditCourse>action;
        return this.coursesService
          .updateCourse(addAction.courseDto)
          .pipe(
            map(data => new EditCourseSuccess(data)),
            catchError(e => of(new EditCourseFailed()))
          );
      })
    );

  @Effect({ dispatch: false })
  addCourseSuccess: Observable<Action> = this.actions
    .ofType(CoursesActionTypes.ADD_COURSE_SUCCESS)
    .pipe(
      withLatestFrom(this.store),
      mergeMap(([action, state]) => {
        return of(new PageChanged(PagerOptions.getDefaultOptions()));
      })
    );

  @Effect()
  getAuthors: Observable<Action> = this.actions
    .ofType(CoursesActionTypes.GET_AUTHORS)
    .pipe(
      withLatestFrom(this.store),
      mergeMap(([action, state]) => {
        return this.authorsService
          .getAuthors()
          .pipe(
            map(data => new GetAuthorsSuccess(data)),
            catchError(e => of(new GetAuthorsSuccessFailed()))
          );
      })
    );

  @Effect()
  search: Observable<Action> = this.actions
    .ofType(CoursesActionTypes.SEARCH_TRIGGERED)
    .pipe(
      withLatestFrom(this.store),
      mergeMap(([action, state]) => {
        return this.coursesService
          .getList(state.mainStore.pager, state.mainStore.filter)
          .pipe(
            map(data => new SearchSuccess(data)),
            catchError(e => of(new SearchFailed()))
          );
      })
    );

  @Effect()
  login: Observable<Action> = this.actions
    .ofType(CoursesActionTypes.LOGIN)
    .pipe(
      withLatestFrom(this.store),
      mergeMap(([action, state]) => {
        const login = <Login>action;
        return this.authorizationService
          .login(login.name, login.password)
          .pipe(
            map(data => new LoginSuccess(data)),
            catchError(e => of(new LoginFailed()))
          );
      })
    );

  @Effect({ dispatch: false })
  loginSuccess: Observable<Action> = this.actions
    .ofType(CoursesActionTypes.LOGIN_SUCCESS)
    .pipe(
      withLatestFrom(this.store),
      mergeMap(([action, state]) => {
        this.tokenService.setAuthorizationToken(state.mainStore.userToken);
        this.router.navigate(['/courses']);
        return of();
      })
    );

  @Effect()
  getUserInfo: Observable<Action> = this.actions
    .ofType(CoursesActionTypes.GET_USER_INFO)
    .pipe(
      withLatestFrom(this.store),
      mergeMap(([action, state]) => {
        const userInfo = <GetUserInfo>action;
        return this.authorizationService
          .getUserInfo()
          .pipe(
            map(data => new GetUserInfoSuccess(data)),
            catchError(e => of(new GetUserInfoFailed()))
          );
      })
    );

  @Effect({ dispatch: false })
  logout: Observable<Action> = this.actions
    .ofType(CoursesActionTypes.LOGOUT)
    .pipe(
      withLatestFrom(this.store),
      mergeMap(([action, state]) => {
        this.authorizationService.logout();
        this.router.navigate(['/login']);
        return of();
      })
    );
}
