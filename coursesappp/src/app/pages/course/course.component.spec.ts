import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseComponent } from './course.component';
import { BaseModalService } from '../../shared-components/base-modal/base-modal.service';
import { BaseModalBodyLoaderService } from '../../shared-components/base-modal/base-modal-body-loader.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { OverlayModule } from '@angular/cdk/overlay';
import { DatePipe } from '@angular/common';
import { AuthorsService } from '../../services/authors.service';
import { MultiselectModel } from '../../models/multiselect';

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
    let spy: any;
    beforeEach(async(() => {
        const authorsResult: MultiselectModel[] = [];
        authorsResult.push({ id: 1, isSelected: false, name: '' });

        spy = spyOn(authorsService, 'getAuthors')
            .and.returnValue(Promise.resolve({ authorsResult }));

        TestBed.configureTestingModule({
            imports: [ReactiveFormsModule, FormsModule, OverlayModule],
            providers: [
                BaseModalService,
                BaseModalBodyLoaderService,
                DatePipe,
                { provide: AuthorsService, useValue: userServiceStub }
            ],
            declarations: [CourseComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CourseComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
