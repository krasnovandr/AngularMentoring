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
