import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';

import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { Course, FilterOptions, PagerOptions } from '../../models/courses';
import { CoursesService } from '../../services/courses.service';
import { SpinnerService } from '../../services/spinner.service';
import { CourseModel, AppState } from '../../store/courses.model';
import { Store, select } from '@ngrx/store';
import { GetCourses, PageChanged, SearchTriggered, DeleteCourse } from '../../store/courses.actions';
import { first } from 'rxjs/operators';

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
    private store: Store<AppState>) { }

  ngOnInit() {
    this.store.select(store => store.courses).subscribe(value => {
      if (value.model) {
        this.courses = value.model.data;
        this.totalItems = value.model.totalCount;
      }
    });

    this.store.dispatch(new GetCourses());
  }

  onDeleteEvent(course: Course) {
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
