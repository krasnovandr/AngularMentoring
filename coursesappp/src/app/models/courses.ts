import { AuthorDto } from './author';

export class Course {
    id: number;
    title: string;
    creationDate: Date;
    description: string;
    duration: number;
    topRated: boolean;
    authors: AuthorDto[];
}

export class CourseListModel {
    data: Course[];
    totalCount: number;
}

export class PagerOptions {
    pageIndex: number;
    itemsPerPage: number;

    constructor(pageIndex, itemsPerPage) {
        this.itemsPerPage = itemsPerPage;
        this.pageIndex = pageIndex;
    }
}

export class FilterOptions {
    courseName: string;
}

export class CourseDto {
    id?: number;
    name: string;
    date: Date;
    description: string;
    duration: number;
    isTopRated: boolean;
    authors: AuthorDto[];
}

export class CourseResponseDto {
    data: CourseDto[];
    totalCount: number;
}
