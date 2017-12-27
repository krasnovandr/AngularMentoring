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

export class CourseBackendModel {
    courseId: number;
    courseTitle: string;
    courseCreationDate: Date;
    courseDescription: string;
    courseDuration: number;
    courseTopRated: boolean;
}

