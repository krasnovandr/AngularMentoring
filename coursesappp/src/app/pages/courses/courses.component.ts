import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../../services/courses.service';
import { Course } from '../../models/courses';


@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  public courses: Course[] = [];
  constructor(private coursesService: CoursesService) { }

  ngOnInit() {
    this.courses = this.coursesService.getList();
  }

  onDelete(course: Course) {
    this.coursesService.removeCourse(course.id);
    console.log(`course ${course.id} with name ${course.title} marked as deleted`);
  }
}
