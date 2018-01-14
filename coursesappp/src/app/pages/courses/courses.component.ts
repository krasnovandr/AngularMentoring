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
  private subscription: Subscription;

  constructor(
    private coursesService: CoursesService,
    private cd: ChangeDetectorRef,
    private spinner: SpinnerService) { }

  ngOnInit() {
    this.getData();
  }

  onDelete(course: Course) {
    const spinnerRef = this.spinner.start();

    this.coursesService.removeCourse(course.id).subscribe((res) => {
      this.coursesService.getList();
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

  private getData(pagerOptions?: PagerOptions, filterOptions?: FilterOptions) {
    if (!pagerOptions) {
      pagerOptions = this.getDefaultPageOptions();
    }

    this.coursesService.getList(pagerOptions, filterOptions)
      .subscribe((coursesFromBackend) => {
        this.courses = coursesFromBackend;
        this.cd.markForCheck();
        console.log('Next: ' + coursesFromBackend);
      }, (err) => console.log('Error: ' + err), () => {
        console.log('Completed');
      });
  }

  private getDefaultPageOptions(): PagerOptions {
    const pagingOption = new PagerOptions();
    pagingOption.pageIndex = 1;
    pagingOption.itemsPerPage = 5;

    return pagingOption;
  }

  private getFilterOptions(query?: string): FilterOptions {
    const filetrOption = new FilterOptions();
    filetrOption.courseName = query;

    return filetrOption;
  }
}
