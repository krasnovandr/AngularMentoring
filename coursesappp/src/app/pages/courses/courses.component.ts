import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CoursesService } from '../../services/courses.service';
import { Course, CourseBackendModel, PagerOptions } from '../../models/courses';
import { FilterPipe } from '../../pipes/filter.pipe';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';
import { SpinnerService } from '../../services/spinner.service';
@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoursesComponent implements OnInit {
  public courses: Course[] = [];
  public initialCourses: Course[] = [];
  constructor(
    private coursesService: CoursesService,
    private filterPipe: FilterPipe,
    private cd: ChangeDetectorRef,
    private spinner: SpinnerService) { }

  ngOnInit() {
    this.coursesService.coursesObservable.map((courses) => {
      return courses.data.map((backendCourse) =>
        this.mapCourseEntity(backendCourse)
      );
    }).subscribe((x) => {
      this.courses = x;
      this.initialCourses = this.courses.concat();
      this.cd.markForCheck();
      console.log('Next: ' + x);
    },
      (err) => console.log('Error: ' + err),
      () => {
        console.log('Completed');
      });
  }

  private mapCourseEntity(backendCourse: CourseBackendModel) {
    const result = new Course();
    result.id = backendCourse.id;
    result.creationDate = backendCourse.date;
    result.description = backendCourse.description;
    result.duration = backendCourse.duration;
    result.title = backendCourse.name;
    result.topRated = backendCourse.isTopRated;
    return result;
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
}
