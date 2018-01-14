import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Course } from '../../../../models/courses';
import { count } from 'rxjs/operators/count';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.css']
})
export class CoursesListComponent implements OnInit {
  @Input() public courses: Course[];
  @Output() onDeleteEvent: EventEmitter<any> = new EventEmitter<any>();
  constructor() { }

  ngOnInit() {
  }

  onDelete(course: Course) {
    this.onDeleteEvent.emit(course);
  }
}
