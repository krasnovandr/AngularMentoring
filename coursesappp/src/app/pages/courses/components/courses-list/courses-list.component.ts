import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Course, PagerOptions } from '../../../../models/courses';
import { count } from 'rxjs/operators/count';
import { of } from 'rxjs/observable/of';
import { MainState } from '../../../../store/courses.model';
import { Store } from '@ngrx/store';
import { GetCourses } from '../../../../store/courses.actions';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.css']
})
export class CoursesListComponent implements OnInit {
  @Input() public courses: Course[];
  @Output() onDeleteEvent: EventEmitter<any> = new EventEmitter<any>();

  currentPage: number = 1;
  totalCount: number = 0;
  scrollCallback;
  constructor(private store: Store<MainState>) {
    this.scrollCallback = this.getCourses.bind(this);
  }

  ngOnInit() {
    this.store.select(stor => stor.mainStore).subscribe(value => {
      if (value && value.coursesList) {
        // debugger;
        this.courses = value.coursesList.data;
        this.totalCount = value.coursesList.totalCount;
        this.currentPage++;
      }
    });
    this.store.dispatch(new GetCourses());
  }

  onDelete(course: Course) {
    this.onDeleteEvent.emit(course);
  }

  getCourses() {
    if (this.courses.length < this.totalCount) {
      return of(this.store.dispatch(new GetCourses(new PagerOptions(this.currentPage, 5))));
    }
  }

  // private processData = (news) => {
  //   this.currentPage++;
  //   this.news = this.news.concat(news.json());
  // }

}
