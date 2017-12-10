import { Component, Output, EventEmitter } from '@angular/core';
import { Course } from '../../../../models/courses';
import { FilterPipe } from '../../../../pipes/filter.pipe';

@Component({
  selector: 'app-toolbox',
  templateUrl: './toolbox.component.html',
  styleUrls: ['./toolbox.component.css']
})
export class ToolboxComponent {

  @Output() onSearch: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  search(courseName: string) {
    this.onSearch.emit(courseName);
  }
}
