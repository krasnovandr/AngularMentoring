import { OverlayModule } from '@angular/cdk/overlay';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { ColoredborderDirective } from '../../../../directives/coloredborder.directive';
import { Course } from '../../../../models/courses';
import { CommonPipesModule } from '../../../../pipes/common.pipes.module';
import { BaseModalBodyLoaderService } from '../../../../shared-components/base-modal/base-modal-body-loader.service';
import { BaseModalService } from '../../../../shared-components/base-modal/base-modal.service';
import { ConfirmationModalService } from '../../../../shared-components/confirmation-modal/confirmation-modal.service';
import { CourseDetailComponent } from '../course-detail/course-detail.component';


describe('CourseDetailComponent', () => {
  let component: CourseDetailComponent;
  let fixture: ComponentFixture<CourseDetailComponent>;
  let confrmationModalService: ConfirmationModalService;
  let baseModalService: BaseModalService;
  let stubbedCourse: Course;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CommonPipesModule, OverlayModule],
      providers: [BaseModalBodyLoaderService, BaseModalService, ConfirmationModalService],
      declarations: [CourseDetailComponent, ColoredborderDirective]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseDetailComponent);
    component = fixture.componentInstance;
    confrmationModalService = TestBed.get(ConfirmationModalService);
    baseModalService = TestBed.get(BaseModalService);
    stubbedCourse = new Course();
    stubbedCourse.id = 1;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
  it('should emit delete event when delete button clicked and confirmation modal ok', () => {
    spyOn(confrmationModalService, "open").and.returnValue(new BehaviorSubject<boolean>(true))
    spyOn(component.onDelete, "emit");

    component.deleteCourse(stubbedCourse);

    expect(component.onDelete.emit).toHaveBeenCalledWith(stubbedCourse);
  });
  it('should not emit delete event when delete button clicked and confirmation modal is not ok', () => {
    spyOn(confrmationModalService, "open").and.returnValue(new BehaviorSubject<boolean>(false))
    spyOn(component.onDelete, "emit");

    component.deleteCourse(stubbedCourse);

    expect(component.onDelete.emit).toHaveBeenCalledTimes(0);
  });
  it('should trigger edit page modal when edit button was clicked', () => {
    spyOn(baseModalService, "open");

    component.editCourse(stubbedCourse.id);

    expect(baseModalService.open).toHaveBeenCalledTimes(1);
  });
});