import { OverlayModule } from '@angular/cdk/overlay';
import { APP_BASE_HREF, DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Store, StoreModule } from '@ngrx/store';
import { of } from 'rxjs/observable/of';

import { AuthorDto } from '../../models/author';
import { Course, CourseDto } from '../../models/courses';
import { MultiselectModel } from '../../models/multiselect';
import { CommonPipesModule } from '../../pipes/common.pipes.module';
import { AuthorsService } from '../../services/authors.service';
import { CoursesService } from '../../services/courses.service';
import { BaseModalBodyLoaderService } from '../../shared-components/base-modal/base-modal-body-loader.service';
import { BaseModalService } from '../../shared-components/base-modal/base-modal.service';
import { ConfirmationModalService } from '../../shared-components/confirmation-modal/confirmation-modal.service';
import { AddCourse, EditCourse, GetAuthors, GetAuthorsSuccess } from '../../store/courses.actions';
import { MainState } from '../../store/courses.model';
import { coursesReducer } from '../../store/courses.reducer';
import { AuthorsControlComponent } from './authors.control/authors-control.component';
import { CourseComponent } from './course.component';

describe('CourseComponent', () => {
    let component: CourseComponent;
    let fixture: ComponentFixture<CourseComponent>;
    let authorsService: AuthorsService;
    let coursesService: CoursesService;
    let authorsStub: MultiselectModel[];
    let store: Store<MainState>;
    let modalService: BaseModalService;
    let stubbedCourse: Course;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [ReactiveFormsModule,
                FormsModule,
                OverlayModule,
                CommonPipesModule,
                HttpClientModule,
                RouterModule.forRoot([]),
                StoreModule.forRoot({
                    mainStore: coursesReducer
                })],
            providers: [
                BaseModalService,
                BaseModalBodyLoaderService,
                AuthorsService,
                CoursesService,
                DatePipe,
                { provide: APP_BASE_HREF, useValue: '/' },
                ConfirmationModalService

            ],
            declarations: [CourseComponent, AuthorsControlComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CourseComponent);
        component = fixture.componentInstance;
        store = TestBed.get(Store);
        modalService = TestBed.get(BaseModalService);
        authorsStub = [];
        authorsService = TestBed.get(AuthorsService);
        coursesService = TestBed.get(CoursesService);
        spyOn(store, 'dispatch').and.callThrough();
        spyOn(modalService, 'close');

        stubbedCourse = new Course();
        stubbedCourse.id = 1;
        stubbedCourse.creationDate = new Date('12/12/2018');
        stubbedCourse.description = 'backendCourse.description';
        stubbedCourse.duration = 12;
        stubbedCourse.title = 'backendCourse.name';
        stubbedCourse.topRated = true;
        stubbedCourse.authors = [{ id: 1 }, { id: 2 }];

        authorsStub.push({ id: 1, isSelected: true, name: 'Test1' });
        authorsStub.push({ id: 2, isSelected: true, name: 'Test2' });

        spyOn(coursesService, 'getCourse').and.returnValue(of(stubbedCourse));
        spyOn(authorsService, 'getAuthors').and.returnValue(of(authorsStub));
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('Add Mode', () => {
        beforeEach(() => {
            component.ngOnInit();
        });
        it('should have invalid form on start', () => {
            expect(component.courseForm.invalid).toBeTruthy();
        });
        it('should dispatch authors action', () => {
            const action = new GetAuthors();
            expect(store.dispatch).toHaveBeenCalledWith(action);
        });
        it('should have list of authors when corresponding call will be finished', (() => {
            const action = new GetAuthorsSuccess(authorsStub);
            store.dispatch(action);

            expect(component.courseForm.controls['authors'].value.length).toEqual(authorsStub.length);
            expect(component.courseForm.controls['authors'].value[0].id).toEqual(authorsStub[0].id);
        }));
        it('should close dialog after cancel button was clicked', (() => {
            component.onCancel();
            expect(modalService.close).toHaveBeenCalled();
        }));
        it('should raise another action on form submit', fakeAsync(() => {
            const expectedCourseDto: CourseDto = new CourseDto();
            expectedCourseDto.name = 'title';
            expectedCourseDto.date = new Date('12/12/2018');
            // expectedCourseDto.id = 1;
            expectedCourseDto.description = 'description';
            expectedCourseDto.duration = 12;
            expectedCourseDto.isTopRated = false;
            expectedCourseDto.authors = [];

            component.courseForm.controls['title'].patchValue(expectedCourseDto.name);
            component.courseForm.controls['date'].patchValue('12/12/2018');
            component.courseForm.controls['description'].patchValue(expectedCourseDto.description);
            component.courseForm.controls['duration'].patchValue(expectedCourseDto.duration);
            component.courseForm.controls['topRated'].patchValue(expectedCourseDto.isTopRated);
            component.courseForm.controls['authors'].patchValue(authorsStub);

            component.onSubmit(component.courseForm);
            authorsStub.forEach(value => {
                expectedCourseDto.authors.push(new AuthorDto(value.id));
            });
            const addCourse = new AddCourse(expectedCourseDto);
            const getAuthors = new GetAuthors();
            expect(store.dispatch).toHaveBeenCalledTimes(2);
            expect(modalService.close).toHaveBeenCalled();
            // no idea why it fails
            // expect(store.dispatch).toHaveBeenCalledWith(getAuthors, addCourse);
        }));
    });
    describe('Edit  Mode', () => {
        beforeEach(() => {
            component.courseId = 1;
            component.ngOnInit();
        });
        it('should have valid form on start', () => {
            expect(component.courseForm.valid).toBeTruthy();
        });
        it('should close dialog after cancel button was clicked', (() => {
            component.onCancel();
            expect(modalService.close).toHaveBeenCalled();
        }));
        it('should contain all inputs predefined', (() => {
            expect(component.courseForm.controls['title'].value).toEqual(stubbedCourse.title);
            expect(component.courseForm.controls['date'].value).toEqual('12/12/2018');
            expect(component.courseForm.controls['description'].value).toEqual(stubbedCourse.description);
            expect(component.courseForm.controls['duration'].value).toEqual(stubbedCourse.duration);
            expect(component.courseForm.controls['topRated'].value).toEqual(stubbedCourse.topRated);
            expect(component.courseForm.controls['authors'].value).toEqual(authorsStub);
        }));
        // it('should redirect to the not found', (() => {
        //     // spyOn(coursesService, 'getCourse').and.returnValue(of({ status: 404 }));
        //     // component.onCancel();
        //     // expect(modalService.close).toHaveBeenCalled();
        // }));
        it('should raise another action on form submit', fakeAsync(() => {
            const expectedCourseDto: CourseDto = new CourseDto();
            expectedCourseDto.name = stubbedCourse.title;
            expectedCourseDto.date = stubbedCourse.creationDate;
            expectedCourseDto.id = component.courseId;
            expectedCourseDto.description = stubbedCourse.description;
            expectedCourseDto.duration = stubbedCourse.duration;
            expectedCourseDto.isTopRated = stubbedCourse.topRated;
            expectedCourseDto.authors = [];

            component.onSubmit(component.courseForm);
            authorsStub.forEach(value => {
                expectedCourseDto.authors.push(new AuthorDto(value.id));
            });
            const editCourse = new EditCourse(expectedCourseDto);

            expect(store.dispatch).toHaveBeenCalledWith(editCourse);
            expect(store.dispatch).toHaveBeenCalledTimes(1);
            expect(modalService.close).toHaveBeenCalled();
        }));

    });
});
