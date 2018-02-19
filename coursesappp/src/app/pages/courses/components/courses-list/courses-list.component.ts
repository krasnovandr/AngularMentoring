import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { of } from 'rxjs/observable/of';

import { Course } from '../../../../models/courses';
import { MainState } from '../../../../store/courses.model';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.css']
})
export class CoursesListComponent {
  @Input() public courses: Course[];
  @Output() onDeleteEvent: EventEmitter<Course> = new EventEmitter<Course>();
  @Output() onScrollEvent: EventEmitter<any> = new EventEmitter<any>();

  scrollCallback: any;
  constructor() {
    this.scrollCallback = this.onScroll.bind(this);
  }

  onDelete(course: Course) {
    this.onDeleteEvent.emit(course);
  }
  onScroll() {
    this.onScrollEvent.emit();
    return of();
  }
}
