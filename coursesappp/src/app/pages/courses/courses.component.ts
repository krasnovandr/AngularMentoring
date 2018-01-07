import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CoursesService } from '../../services/courses.service';
import { Course, CourseBackendModel, PagerOptions } from '../../models/courses';
import { FilterPipe } from '../../pipes/filter.pipe';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/flatMap';
// import 'rxjs/add/observable/map';

// import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CoursesComponent implements OnInit {
  public courses: Course[] = [];
  public initialCourses: Course[] = [];
  constructor(private coursesService: CoursesService, private filterPipe: FilterPipe) { }

  ngOnInit() {
    let options: PagerOptions = new PagerOptions();
    options.pageIndex = 1;
    options.itemsPerPage = 20;

    this.coursesService.getList(options).map((courses) => {
      return courses.data.map((backendCourse) => {
        const result = new Course();
        result.id = backendCourse.id;
        result.creationDate = backendCourse.date;
        result.description = backendCourse.description;
        result.duration = backendCourse.courseDuration;
        result.title = backendCourse.name;
        result.topRated = backendCourse.isTopRated;

        return result;
      });
    }).subscribe((x) => {
      debugger;
      this.courses = x;
      this.initialCourses = this.courses.concat();
      console.log('Next: ' + x);
    },
      (err) => console.log('Error: ' + err),
      () => {
        console.log('Completed');
      });
  }

  onDelete(course: Course) {
    this.coursesService.removeCourse(course.id);
    console.log(`course ${course.id} with name ${course.title} marked as deleted`);
  }

  onSearch(name: string) {
    if (!name || name === '') {
      this.courses = this.initialCourses;
      return;
    }
    this.courses = this.filterPipe.transform(this.initialCourses, name);
  }
}
