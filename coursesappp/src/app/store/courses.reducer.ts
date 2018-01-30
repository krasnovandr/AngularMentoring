import { CourseModel, AppState } from './courses.model';
import { PagerOptions } from '../models/courses';
import { CoursesActions, CoursesActionTypes } from './courses.actions';

export type Action = CoursesActions;

const newState = (state, newData) => {
    return Object.assign({}, state, newData);
};

export const defaultCoursesState: AppState = {
    authors: [],
    user: null,
    course: null,
    courses: {
        model: null,
        filter: null,
        pager: PagerOptions.getDefaultOptions()
    }
};

export function coursesReducer(state: AppState = defaultCoursesState, action: Action) {
    switch (action.type) {
        case CoursesActionTypes.GET_COURSES:
            return state;
        case CoursesActionTypes.GET_COURSES_SUCCESS:
            return newState(state, { model: action.courses });
        case CoursesActionTypes.PAGE_CHANGED:
            return newState(state, { pager: action.pagerOptions, filter: null });
        case CoursesActionTypes.SEARCH_TRIGGERED:
            return newState(state, { pager: PagerOptions.getDefaultOptions(), filter: action.filterOptions });
        case CoursesActionTypes.GET_AUTHORS_SUCCESS:
            return newState(state, { authors: action.authors });
        default:
            return state;
    }
}

