import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { of } from 'rxjs/observable/of';
import { Subscription } from 'rxjs/Subscription';

import { Course, FilterOptions, PagerOptions } from '../../models/courses';
import { SpinnerService } from '../../services/spinner.service';
import { DeleteCourse, GetCourses, PageChanged, SearchTriggered } from '../../store/courses.actions';
import { MainState } from '../../store/courses.model';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  public courses: Course[] = [];
  private subscription: Subscription;
  currentPage = 1;
  totalCount = 0;

  constructor(
    private store: Store<MainState>
  ) { }

  ngOnInit() {
    this.store.select(stor => stor.mainStore.coursesList).subscribe(st => {
      if (st) {
        this.courses = st.data;
        this.totalCount = st.totalCount;
      }
    });

    this.store.select(stor => stor.mainStore.pager).subscribe(value => {
      if (value) {
        this.currentPage = value.pageIndex;
      }
    });

    this.store.dispatch(new GetCourses());
  }

  public onDeleteEvent(course: Course) {
    this.store.dispatch(new DeleteCourse(course.id));

    console.log(
      `course ${course.id} with name ${course.title} marked as deleted`
    );
  }

  public onSearch(courseName: string) {
    this.store.dispatch(new SearchTriggered(this.getFilterOptions(courseName)));
  }

  private getFilterOptions(query?: string): FilterOptions {
    const filetrOption = new FilterOptions();
    filetrOption.courseName = query;

    return filetrOption;
  }

  public onScrollEvent() {
    if (this.courses.length < this.totalCount) {
      return of(
        this.store.dispatch(
          new PageChanged(new PagerOptions(++this.currentPage))
        )
      );
    }
  }
}
