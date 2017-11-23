import { Component, OnInit } from '@angular/core';
import { Course } from '../courses';
import { CoursesService } from '../courses.service';


@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  public courses: Course[] = [];
  constructor(private coursesService: CoursesService) { }

  ngOnInit() {
    this.courses = this.coursesService.getCourses();
  }

}
