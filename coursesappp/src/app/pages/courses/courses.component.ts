import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CoursesService } from '../../services/courses.service';
import { Course, CourseBackendModel, PagerOptions, FilterOptions } from '../../models/courses';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import { SpinnerService } from '../../services/spinner.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoursesComponent implements OnInit {
  public courses: Course[] = [];
  public defaulPagerOptions = this.getDefaultPageOptions();

  private subscription: Subscription;
  private totalItems: number;

  constructor(
    private coursesService: CoursesService,
    private cd: ChangeDetectorRef,
    private spinner: SpinnerService) { }

  ngOnInit() {
    this.getData();
  }

  onDeleteEvent(course: Course) {
    const spinnerRef = this.spinner.start();

    this.coursesService.removeCourse(course.id).subscribe((res) => {
      this.getData();
      spinnerRef.close();
      this.cd.markForCheck();
    },
      (err) => {
        console.log(err);
        spinnerRef.close();
      });
    console.log(`course ${course.id} with name ${course.title} marked as deleted`);
  }

  onSearch(courseName: string) {
    this.getData(null, this.getFilterOptions(courseName));
  }
  onPageChanged(newPageOptions: PagerOptions) {
    this.getData(newPageOptions, null);
  }

  private getData(pagerOptions?: PagerOptions, filterOptions?: FilterOptions) {
    if (!pagerOptions) {
      pagerOptions = this.getDefaultPageOptions();
    }
    this.coursesService.getList(pagerOptions, filterOptions)
      .map((response) => {
        return response.data.map((backendCourse) => {
          this.totalItems = response.totalCount;
          return this.mapCourseEntity(backendCourse);
        });
      }).subscribe((coursesFromBackend) => {
        this.courses = coursesFromBackend;
        this.cd.markForCheck();
        console.log('Next: ' + coursesFromBackend);
      }, (err) => console.log('Error: ' + err), () => {
        console.log('Completed');
      });
  }

  private mapCourseEntity(backendCourse: CourseBackendModel): Course {
    const result = new Course();
    result.id = backendCourse.id;
    result.creationDate = backendCourse.date;
    result.description = backendCourse.description;
    result.duration = backendCourse.duration;
    result.title = backendCourse.name;
    result.topRated = backendCourse.isTopRated;
    return result;
  }

  private getDefaultPageOptions(): PagerOptions {
    const pagingOption = new PagerOptions(1, 5);

    return pagingOption;
  }

  private getFilterOptions(query?: string): FilterOptions {
    const filetrOption = new FilterOptions();
    filetrOption.courseName = query;

    return filetrOption;
  }
}
