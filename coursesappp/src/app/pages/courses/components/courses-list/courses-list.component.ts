import { Component, OnInit, Input } from '@angular/core';
import { Course } from '../../../../models/courses';

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.css']
})
export class CoursesListComponent implements OnInit {
  @Input() public courses: Course[];

  constructor() { }

  ngOnInit() {
  }

}
