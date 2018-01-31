import { Course, PagerOptions, FilterOptions, CourseListModel } from '../models/courses';
import { AuthorDto } from '../models/author';


export class AppState {
    // user: CourseModel;
    authors: AuthorDto[];
     course: Course;
    coursesList: CourseListModel;
    pager: PagerOptions;
    filter: FilterOptions;
}
export interface MainState {
    mainStore: AppState;
}


