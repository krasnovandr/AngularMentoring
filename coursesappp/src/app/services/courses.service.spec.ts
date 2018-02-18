import { TestBed, inject, async, tick, fakeAsync } from '@angular/core/testing';

import { CoursesService } from './courses.service';
import { HttpClientModule, HttpParams } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { stubbedCourses, stubbedDtoCourses } from '../pipes/stubbed.data';
import { PagerOptions, CourseResponseDto, CourseListModel, Course } from '../models/courses';
describe('CoursesService', () => {
    let coursesService: CoursesService;
    let httpTestController: HttpTestingController;
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [CoursesService]
        });

        coursesService = TestBed.get(CoursesService);
        httpTestController = TestBed.get(HttpTestingController);
    });
    afterEach(() => {
        httpTestController.verify();
    });

    it('should return correct get courses response', () => {
        const pagerOptions: PagerOptions = new PagerOptions(1);
        coursesService.getList(pagerOptions).subscribe((courses: CourseListModel) => {
            courses.data.forEach((course, index) => {
                expect(courses.data[index].id).toEqual(stubbedDtoCourses[index].id);
            });
            expect(courses.totalCount).toEqual(response.totalCount);
        });

        const coursesUrl = `${coursesService.baseUrl}/${coursesService.coursesUrl}`;
        const req = httpTestController.expectOne(request => request.url === coursesUrl);
        expect(req.request.method).toBe('GET');
        expect(req.request.params.get('pageIndex')).toEqual(pagerOptions.pageIndex.toString());
        expect(req.request.params.get('itemsPerPage')).toEqual(pagerOptions.itemsPerPage.toString());

        const response: CourseResponseDto = new CourseResponseDto();
        response.data = stubbedDtoCourses;
        response.totalCount = stubbedDtoCourses.length;
        req.flush(response);

    });
    it('should delete course', () => {
        const courseId = stubbedDtoCourses[0].id;
        coursesService.removeCourse(courseId).subscribe(_ => { });

        const req = httpTestController.expectOne(`${coursesService.baseUrl}/${coursesService.coursesUrl}/${courseId}`);
        expect(req.request.method).toBe('DELETE');
        req.flush(null, { status: 200, statusText: 'Ok' });

    });
    it('should retrieve course by id', () => {
        const courseId = stubbedDtoCourses[0].id;
        coursesService.getCourse(courseId).subscribe((course) => {
            expect(course.id).toEqual(courseId);
        });

        const req = httpTestController.expectOne(`${coursesService.baseUrl}/${coursesService.coursesUrl}/${courseId}`);
        expect(req.request.method).toBe('GET');
        req.flush(stubbedDtoCourses[0]);
    });
});
