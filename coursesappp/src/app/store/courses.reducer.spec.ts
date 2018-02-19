import { CourseListModel } from '../models/courses';
import { stubbedCourses } from '../pipes/stubbed.data';
import { GetCourses, RefreshCoursesSuccess } from './courses.actions';
import { coursesReducer, defaultCoursesState } from './courses.reducer';

const newState = (state, newData) => {
    return Object.assign({}, state, newData);
};

describe('Courses reducer', () => {
    it('should handle GET_COURSES', () => {
        expect(coursesReducer(defaultCoursesState, new GetCourses())).toEqual(defaultCoursesState);
    });
    it('should handle REFRESH_COURSES_SUCCESS', () => {
        let courseList = new CourseListModel();
        courseList.data = stubbedCourses;
        courseList.totalCount = stubbedCourses.length;

        const actualState = newState(defaultCoursesState, {
            coursesList: courseList,
        });

        stubbedCourses.push(stubbedCourses[0]);;
        let updatedCourseList = { data: stubbedCourses, totalCount: stubbedCourses.length };

        const expectedState = newState(actualState, {
            coursesList: updatedCourseList
        });

        let resultState = coursesReducer(actualState, new RefreshCoursesSuccess(updatedCourseList));

        expect(resultState).toEqual(expectedState);
    });
});
