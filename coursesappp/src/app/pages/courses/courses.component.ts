import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';

import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';

import { Course, FilterOptions, PagerOptions, CourseListModel } from '../../models/courses';
import { CoursesService } from '../../services/courses.service';
import { SpinnerService } from '../../services/spinner.service';
import { DeleteCourse, GetCourses, PageChanged, SearchTriggered } from '../../store/courses.actions';
import { AppState, MainState } from '../../store/courses.model';
import { distinctUntilKeyChanged, pluck } from 'rxjs/operators';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css'],
})
export class CoursesComponent implements OnInit {
  public courses: Course[] = [];
  public defaulPagerOptions: PagerOptions = PagerOptions.getDefaultOptions();

  private subscription: Subscription;
  public totalItems: number;

  constructor(
    private coursesService: CoursesService,
    private cd: ChangeDetectorRef,
    private spinner: SpinnerService,
    private store: Store<MainState>) { }

  ngOnInit() {
    this.store.select(m => m.mainStore.coursesList)
      .subscribe((value: CourseListModel) => {
        if (value) {
          this.courses = value.data;
          this.totalItems = value.totalCount;
        }
      });

    this.store.dispatch(new GetCourses());
  }

  onDeleteEvent(course: Course) {
    debugger;
     this.store.dispatch(new DeleteCourse(course.id));
    // const spinnerRef = this.spinner.start();
    // this.coursesService.removeCourse(course.id).subscribe((res) => {
    //   // this.getData();
    //   spinnerRef.close();
    //   this.cd.markForCheck();
    // },
    //   (err) => {
    //     console.log(err);
    //     spinnerRef.close();
    //   });
    console.log(`course ${course.id} with name ${course.title} marked as deleted`);
  }

  onSearch(courseName: string) {
     this.store.dispatch(new SearchTriggered(this.getFilterOptions(courseName)));
  }
  onPageChanged(newPageOptions: PagerOptions) {
     this.store.dispatch(new PageChanged(newPageOptions));
  }

  private getFilterOptions(query?: string): FilterOptions {
    const filetrOption = new FilterOptions();
    filetrOption.courseName = query;

    return filetrOption;
  }
}
