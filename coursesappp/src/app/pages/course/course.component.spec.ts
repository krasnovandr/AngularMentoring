import { async, ComponentFixture, TestBed } from '@angular/core/testing';

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
import { StoreModule } from '@ngrx/store';
import { coursesReducer } from '../../store/courses.reducer';

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
                } ],
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
        component.ngOnInit();
        fixture.detectChanges();
        // const authorsResult: MultiselectModel[] = [];
        // authorsResult.push({ id: 1, isSelected: false, name: '' });
        // spyOn(authorsService, 'getAuthors').and.returnValue(of(authorsResult));
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
    it('should have valid form', () => {
        expect(component.courseForm.invalid).toBeTruthy();
    });
});
