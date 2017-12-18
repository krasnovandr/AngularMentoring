import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { CoursesService } from '../../services/courses.service';
import { Course } from '../../models/courses';
import { FilterPipe } from '../../pipes/filter.pipe';


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
    this.courses = this.coursesService.getList();
    this.initialCourses = this.courses.concat();
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
