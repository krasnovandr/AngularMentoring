import { FilterPipe } from './filter.pipe';
import { Course } from '../models/courses';
import { stubbedCourses } from './stubbed.data';


describe('FilterPipe', () => {
    let filterPipe: FilterPipe;
    beforeEach(() => {
        filterPipe = new FilterPipe();
    });

    it('create an instance', () => {
        expect(filterPipe).toBeTruthy();
    });
    it('should filter correctly by title', () => {
        expect(filterPipe.transform(stubbedCourses, 'first').length).toEqual(3);
    });
    it('should filter correctly by title', () => {
        expect(filterPipe.transform(stubbedCourses, 'firstA').length).toEqual(1);
    });
    it('should filter correctly by title', () => {
        expect(filterPipe.transform(stubbedCourses, 'second').length).toEqual(1);
    });
});
