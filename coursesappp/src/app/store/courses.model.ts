import { Course, PagerOptions, FilterOptions, CourseListModel } from '../models/courses';
import { AuthorDto } from '../models/author';
import { UserInfo } from '../models/user';


export class AppState {
    userToken: string;
    userInfo: UserInfo;
    authors: AuthorDto[];
    course: Course;
    coursesList: CourseListModel;
    pager: PagerOptions;
    filter: FilterOptions;
}
export interface MainState {
    mainStore: AppState;
}


