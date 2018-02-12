import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Injector,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl } from '@angular/forms';

import { BaseModalService } from '../../../../shared-components/base-modal/base-modal.service';
import { CourseComponent } from '../../../course/course.component';

@Component({
  selector: 'app-toolbox',
  templateUrl: './toolbox.component.html',
  styleUrls: ['./toolbox.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToolboxComponent implements OnInit {
  searchBar: FormControl = new FormControl('', []);

  @Output() onSearch: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private baseModalService: BaseModalService,
    private injector: Injector
  ) {
    this.searchBar = new FormControl('', []);
  }

  ngOnInit() {
    this.searchBar.valueChanges.subscribe(value => {
      if (value === '') {
        this.onSearch.emit('');
      }
    });
  }

  search(courseName: string) {
    if (courseName !== '') {
      this.onSearch.emit(courseName.toLocaleLowerCase());
    }
  }
  openAddCourse() {
    this.baseModalService.open(CourseComponent, {
      modalInjector: this.injector
    });
  }
}
