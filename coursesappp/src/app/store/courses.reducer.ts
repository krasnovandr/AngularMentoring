import { PagerOptions } from '../models/courses';
import { CoursesActions, CoursesActionTypes } from './courses.actions';
import { AppState } from './courses.model';

export type Action = CoursesActions;

const newState = (state, newData) => {
    return Object.assign({}, state, newData);
};

export const defaultCoursesState: AppState = {
    authors: null,
    course: null,
    coursesList: null,
    filter: null,
    pager: PagerOptions.getDefaultOptions()

};

export function coursesReducer(state: AppState = defaultCoursesState, action: Action) {
    switch (action.type) {
        case CoursesActionTypes.GET_COURSES:
            return state;
        case CoursesActionTypes.GET_COURSES_SUCCESS:
            if (!state.coursesList) {
                return newState(state, { coursesList: action.courses });
            } else {
                return newState(state, {
                    coursesList: {
                        data: state.coursesList.data.concat(action.courses.data),
                        totalCount: action.courses.totalCount
                    },
                });
            }


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

