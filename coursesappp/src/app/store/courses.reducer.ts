import { CourseListModel, PagerOptions } from '../models/courses';
import { AuthorizationTokenService } from '../services/authToken.service';
import { CoursesActions, CoursesActionTypes } from './courses.actions';
import { AppState } from './courses.model';

export type Action = CoursesActions;

const newState = (state, newData) => {
  return Object.assign({}, state, newData);
};

export const defaultCoursesState: AppState = {
  authors: null,
  userInfo: null,
  userToken: new AuthorizationTokenService().getAuthorizationToken(),
  course: null,
  coursesList: new CourseListModel(),
  filter: null,
  pager: PagerOptions.getDefaultOptions()
};

export function coursesReducer(
  state: AppState = defaultCoursesState,
  action: Action
) {
  switch (action.type) {
    case CoursesActionTypes.GET_COURSES:
      return state;
    case CoursesActionTypes.GET_COURSES_SUCCESS:
      return newState(state, {
        coursesList: {
          data: state.coursesList.data.concat(action.courses.data),
          totalCount: action.courses.totalCount
        }
      });

    case CoursesActionTypes.PAGE_CHANGED:
      return newState(state, { pager: action.pagerOptions, filter: null });
    case CoursesActionTypes.SEARCH_TRIGGERED:
      return newState(state, {
        pager: PagerOptions.getDefaultOptions(),
        filter: action.filterOptions
      });
    case CoursesActionTypes.SEARCH_SUCCESS:
      return newState(state, { coursesList: action.courses });
    case CoursesActionTypes.DELETE_COURSE_SUCCESS:
      return newState(state, {
        coursesList: {
          data: state.coursesList.data.filter(v => v.id !== action.courseId),
          totalCount: state.coursesList.totalCount
        }
      });
    case CoursesActionTypes.GET_AUTHORS_SUCCESS:
      return newState(state, { authors: action.authors });
    case CoursesActionTypes.DELETE_COURSE_SUCCESS:
      return newState(state, {
        coursesList: {
          data: state.coursesList.data.filter(v => v.id !== action.courseId),
          totalCount: state.coursesList.totalCount
        }
      });

    case CoursesActionTypes.LOGIN_SUCCESS:
      return newState(state, { userToken: action.result.token });
    case CoursesActionTypes.GET_USER_INFO_SUCCESS:
      return newState(state, { userInfo: action.userInfo });
    case CoursesActionTypes.ADD_COURSE_SUCCESS:
      return newState(state, {
        coursesList: {
          data: state.coursesList.data.concat(action.course),
          totalCount: state.coursesList.totalCount
        }
      });
    case CoursesActionTypes.EDIT_COURSE_SUCCESS:
      const index = state.coursesList.data.map(value => value.id).indexOf(action.course.id);
      return newState(state, {
        coursesList: {
          data: [
            ...state.coursesList.data.slice(0, index),
            Object.assign({}, state.coursesList.data[index], action.course),
            ...state.coursesList.data.slice(index + 1)
          ],
          totalCount: state.coursesList.totalCount
        }
      });
    case CoursesActionTypes.LOGOUT:
      return newState(state, { userInfo: null, userToken: null });
    default:
      return state;
  }
}
