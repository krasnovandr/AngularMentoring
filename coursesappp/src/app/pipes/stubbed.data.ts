import { Course, CourseDto } from '../models/courses';

export const stubbedCourses: Course[] = [{
    title: 'first',
    id: 1,
    authors: null,
    creationDate: new Date('12/12/2001'),
    description: 'Course',
    topRated: false,
    duration: 12
},
{
    title: 'firstA',
    id: 3,
    authors: null,
    creationDate: new Date('12/12/2000'),
    description: 'Course',
    topRated: false,
    duration: 12
},
{
    title: 'firstB',
    id: 2,
    authors: null,
    creationDate: new Date('12/12/2002'),
    description: 'Course',
    topRated: false,
    duration: 12
},
{
    title: 'second',
    id: 4,
    authors: null,
    creationDate: new Date('12/12/2003'),
    description: 'Course',
    topRated: false,
    duration: 12
}];


export const stubbedDtoCourses: CourseDto[] = [{
    name: 'first',
    id: 1,
    authors: null,
    date: new Date('12/12/2001'),
    description: 'Course',
    isTopRated: false,
    duration: 12,

},
{
    name: 'firstA',
    id: 3,
    authors: null,
    date: new Date('12/12/2000'),
    description: 'Course',
    isTopRated: false,
    duration: 12
},
{
    name: 'firstB',
    id: 2,
    authors: null,
    date: new Date('12/12/2002'),
    description: 'Course',
    isTopRated: false,
    duration: 12
},
{
    name: 'second',
    id: 4,
    authors: null,
    date: new Date('12/12/2003'),
    description: 'Course',
    isTopRated: false,
    duration: 12
}];

