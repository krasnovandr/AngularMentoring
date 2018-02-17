import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Store, StoreModule } from '@ngrx/store';

import { Course, FilterOptions, PagerOptions } from '../../models/courses';
import { DeleteCourse, GetCourses, SearchTriggered, PageChanged } from '../../store/courses.actions';
import { MainState } from '../../store/courses.model';
import { coursesReducer } from '../../store/courses.reducer';
import { CoursesListComponent } from './components/courses-list/courses-list.component';
import { ToolboxComponent } from './components/toolbox/toolbox.component';
import { CoursesComponent } from './courses.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InfiniteScrollerDirective } from '../../directives/infinitescroll.directive';
import { CommonPipesModule } from '../../pipes/common.pipes.module';
import { CourseDetailComponent } from './components/course-detail/course-detail.component';
import { ColoredborderDirective } from '../../directives/coloredborder.directive';
import { BaseModalService } from '../../shared-components/base-modal/base-modal.service';
import { BaseModalBodyLoaderService } from '../../shared-components/base-modal/base-modal-body-loader.service';
import { OverlayModule } from '@angular/cdk/overlay';

describe('CoursesComponent', () => {
    let component: CoursesComponent;
    let fixture: ComponentFixture<CoursesComponent>;
    let store: Store<MainState>;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                CoursesComponent,
                ToolboxComponent,
                CoursesListComponent,
                InfiniteScrollerDirective,
                CourseDetailComponent,
                ColoredborderDirective
            ],
            imports: [
                OverlayModule,
                FormsModule,
                ReactiveFormsModule,
                CommonPipesModule,
                StoreModule.forRoot({
                    mainStore: coursesReducer
                })],
            providers: [
                BaseModalService,
                BaseModalBodyLoaderService

            ],
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(CoursesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        store = TestBed.get(Store);
        spyOn(store, 'dispatch').and.callThrough();

    });

    it('should create component', () => {
        expect(component).toBeTruthy();
    });
    it('should dispatch get courses  action on init', () => {
        component.ngOnInit();
        const action = new GetCourses();
        expect(store.dispatch).toHaveBeenCalledWith(action);
    });
    it('should dispatch delete action on delete click', () => {
        const course = new Course();
        course.id = 1;
        const deleteAction = new DeleteCourse(course.id);

        component.onDeleteEvent(course);

        expect(store.dispatch).toHaveBeenCalledWith(deleteAction);
    });
    it('should dispatch search action on search button click', () => {
        const searchQuery = 'test';
        const filterOption = new FilterOptions();
        filterOption.courseName = searchQuery;
        const searchAction = new SearchTriggered(filterOption);

        component.onSearch(searchQuery);
        expect(store.dispatch).toHaveBeenCalledWith(searchAction);
    });
    it('should dispatch page changed action on scroll event click', () => {
        component.courses = [];
        component.totalCount = 10;
        let currentPage = component.currentPage;
        const pageChangedAction = new PageChanged(new PagerOptions(++currentPage));

        component.onScrollEvent();
        expect(store.dispatch).toHaveBeenCalledWith(pageChangedAction);
    });
});
