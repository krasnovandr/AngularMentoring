export interface ICourse {
    id: number;
    title: string;
    creationDate: number;
    description: string;
    duration: number;
}
export class Course implements ICourse {
    id: number;
    title: string;
    creationDate: number;
    description: string;
    duration: number;
}
