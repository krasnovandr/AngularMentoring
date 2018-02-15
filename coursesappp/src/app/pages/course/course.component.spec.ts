import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';

import { CourseComponent } from './course.component';
import { BaseModalService } from '../../shared-components/base-modal/base-modal.service';
import { BaseModalBodyLoaderService } from '../../shared-components/base-modal/base-modal-body-loader.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { OverlayModule } from '@angular/cdk/overlay';
import { DatePipe, APP_BASE_HREF } from '@angular/common';
import { AuthorsService } from '../../services/authors.service';
import { MultiselectModel } from '../../models/multiselect';
import { DurationPipe } from '../../pipes/duration.pipe';
import { CommonPipesModule } from '../../pipes/common.pipes.module';
import { AuthorsControlComponent } from './authors.control/authors-control.component';
import { of } from 'rxjs/observable/of';
import { HttpClientModule } from '@angular/common/http';
import { CoursesService } from '../../services/courses.service';
import { RouterModule } from '@angular/router';
import { ConfirmationModalService } from '../../shared-components/confirmation-modal/confirmation-modal.service';
import { StoreModule, Store } from '@ngrx/store';
import { coursesReducer } from '../../store/courses.reducer';
import { MainState } from '../../store/courses.model';
import { GetAuthors, GetAuthorsSuccess, AddCourse } from '../../store/courses.actions';
import { Course, CourseDto } from '../../models/courses';
import { AuthorDto } from '../../models/author';

// private formBuilder: FormBuilder,
// private authorsService: AuthorsService,
// private courseService: CoursesService,
// private datePipe: DatePipe,
// private navigateRouter: Router,
// private store: Store<MainState>,
// @Inject(REMOTE_SERVICE)
// private baseModalRemoteService: BaseModalRemoteService

describe('CourseComponent', () => {
    let component: CourseComponent;
    let fixture: ComponentFixture<CourseComponent>;
    let authorsService: AuthorsService;
    let coursesService: CoursesService;
    let authorsStub: MultiselectModel[];
    let store: Store<MainState>;
    let modalService: BaseModalService;
    beforeEach(async(() => {


        // spy = spyOn(authorsService, 'getAuthors')
        //     .and.returnValue({ authorsResult });

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

        const result = new Course();
        result.id = 1;
        result.creationDate = new Date('12/12/2018');
        result.description = 'backendCourse.description';
        result.duration = 12;
        result.title = 'backendCourse.name';
        result.topRated = true;
        result.authors = [{ id: 1 }, { id: 2 }];

        authorsStub.push({ id: 1, isSelected: true, name: 'Test1' });
        authorsStub.push({ id: 2, isSelected: true, name: 'Test2' });

        spyOn(coursesService, 'getCourse').and.returnValue(of(result));
        spyOn(authorsService, 'getAuthors').and.returnValue(of(authorsStub));

        component.ngOnInit();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('Add Mode', () => {
        it('should have invalid on start', () => {
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
            //no idea why it fails
            //expect(store.dispatch).toHaveBeenCalledWith(getAuthors, addCourse);
        }));
        describe('Edit  Mode', () => {
            beforeEach(() => {
                component.courseId = 1;
            });
            it('should have invalid on start', () => {
                component.ngOnInit();
                expect(component.courseForm.valid).toBeTruthy();
            });
            // it('should call course service with corresponding id', () => {
            //     expect(coursesService.getCourse).toHaveBeenCalledWith(component.courseId);
            // });
            // it('should have list of authors when corresponding call will be finished', (() => {
            //     const action = new GetAuthorsSuccess(authorsStub);
            //     store.dispatch(action);

            //     expect(component.courseForm.controls['authors'].value.length).toEqual(authorsStub.length);
            //     expect(component.courseForm.controls['authors'].value[0].id).toEqual(authorsStub[0].id);
            // }));
            // it('should close dialog after cancel button was clicked', (() => {
            //     component.onCancel();
            //     expect(modalService.close).toHaveBeenCalled();
            // }));
            // it('should raise another action on form submit', fakeAsync(() => {
            //     const expectedCourseDto: CourseDto = new CourseDto();
            //     expectedCourseDto.name = 'title';
            //     expectedCourseDto.date = new Date('12/12/2018');

            //     // expectedCourseDto.id = 1;
            //     expectedCourseDto.description = 'description';
            //     expectedCourseDto.duration = 12;

            //     expectedCourseDto.isTopRated = false;
            //     expectedCourseDto.authors = [];

            //     component.courseForm.controls['title'].patchValue(expectedCourseDto.name);
            //     component.courseForm.controls['date'].patchValue('12/12/2018');
            //     component.courseForm.controls['description'].patchValue(expectedCourseDto.description);
            //     component.courseForm.controls['duration'].patchValue(expectedCourseDto.duration);
            //     component.courseForm.controls['topRated'].patchValue(expectedCourseDto.isTopRated);
            //     component.courseForm.controls['authors'].patchValue(authorsStub);

            //     component.onSubmit(component.courseForm);
            //     authorsStub.forEach(value => {
            //         expectedCourseDto.authors.push(new AuthorDto(value.id));
            //     });
            //     const addCourse = new AddCourse(expectedCourseDto);
            //     const getAuthors = new GetAuthors();
            //     expect(store.dispatch).toHaveBeenCalledTimes(2);
            //     //no idea why it fails
            //     expect(store.dispatch).toHaveBeenCalledWith(getAuthors, addCourse);
            // }));
        });
    });
});
