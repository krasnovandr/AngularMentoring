import { Course, PagerOptions, FilterOptions, CourseListModel } from '../models/courses';
import { AuthorDto } from '../models/author';


export class AppState{
    user: CourseModel;
    authors: AuthorDto[];
    course: Course;
    courses: CourseModel;
}
export interface MainState {
    mainStore: AppState;
}


export interface CourseModel {
    model: CourseListModel;
    pager: PagerOptions;
    filter: FilterOptions;
}
