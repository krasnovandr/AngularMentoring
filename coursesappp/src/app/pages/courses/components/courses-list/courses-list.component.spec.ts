import { CoursesListComponent } from "./courses-list.component";
import { ComponentFixture, TestBed, async } from "@angular/core/testing";
import { Course } from "../../../../models/courses";
import { AppModule } from "../../../../app.module";
import { InfiniteScrollerDirective } from "../../../../directives/infinitescroll.directive";
import { CommonPipesModule } from "../../../../pipes/common.pipes.module";
import { CourseDetailComponent } from "../course-detail/course-detail.component";
import { ColoredborderDirective } from "../../../../directives/coloredborder.directive";


describe('CoursesListComponent', () => {
  let component: CoursesListComponent;
  let fixture: ComponentFixture<CoursesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [CommonPipesModule],
      declarations: [CoursesListComponent, InfiniteScrollerDirective, CourseDetailComponent, ColoredborderDirective]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should emit onDelete event', () => {
    let course = new Course();
    course.id = 1;

    component.onDeleteEvent.subscribe((value: Course) => {
      expect(value.id).toEqual(course.id);
    })

    component.onDelete(course)
  });

  it('should emit onScroll  event', () => {
    spyOn(component.onScrollEvent, 'emit');


    component.onScroll();
    expect(component.onScrollEvent.emit).toHaveBeenCalled();
  });
});