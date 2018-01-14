export interface ICourse {
    id: number;
    title: string;
    creationDate: Date;
    description: string;
    duration: number;
}
export class Course implements ICourse {
    id: number;
    title: string;
    creationDate: Date;
    description: string;
    duration: number;
    topRated: boolean;
}

export class CourseResponse {
    data: CourseBackendModel[];
    totalCount: number;
}

export class CourseBackendModel {
    id: number;
    name: string;
    date: Date;
    description: string;
    duration: number;
    isTopRated: boolean;
    authors: CourseAuthor[];
}

export class CourseAuthor {
    id: number;
    firstName: string;
    lastName: string;
}

export class PagerOptions {
    pageIndex: number;
    itemsPerPage: number;
}

export class FilterOptions {
    courseName: string;
}