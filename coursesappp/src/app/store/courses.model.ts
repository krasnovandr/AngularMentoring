import { Course, PagerOptions, FilterOptions, CourseListModel } from '../models/courses';
import { AuthorDto } from '../models/author';


export interface AppState {
    courses: CourseModel;
    user: CourseModel;
    authors: AuthorDto[];
    course: Course;
}


export interface CourseModel {
    model: CourseListModel;
    pager: PagerOptions;
    filter: FilterOptions;
}
