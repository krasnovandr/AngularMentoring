import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Course } from '../courses';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css']
})
export class CourseDetailComponent implements OnInit {
  @Input() course: Course;
  @Output() onDelete: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }

  deleteCourse(course: Course) {
    alert(course.title);
    this.onDelete.emit(course);
  }

}
