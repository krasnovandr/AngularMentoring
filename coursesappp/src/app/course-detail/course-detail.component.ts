import { Component, OnInit, Input } from '@angular/core';
import { Course } from '../courses';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css']
})
export class CourseDetailComponent implements OnInit {
  @Input() course: Course;
  constructor() { }

  ngOnInit() {
  }

}
