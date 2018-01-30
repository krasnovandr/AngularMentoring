import { Component, Output, EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef, OnInit } from '@angular/core';
import { Course, FilterOptions, PagerOptions } from '../../../../models/courses';
import { FilterPipe } from '../../../../pipes/filter.pipe';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { CoursesService } from '../../../../services/courses.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../store/courses.model';

@Component({
  selector: 'app-toolbox',
  templateUrl: './toolbox.component.html',
  styleUrls: ['./toolbox.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToolboxComponent implements OnInit {
  searchBar: FormControl = new FormControl('', []);

  @Output() onSearch: EventEmitter<any> = new EventEmitter<any>();

  constructor(private cd: ChangeDetectorRef,
    private coursesService: CoursesService,
    private store: Store<AppState>) {
    this.searchBar = new FormControl('', []);

  }

  ngOnInit() {
    this.store.select(store => store.courses).subscribe(value => {
      if (value.filter == null) {
        this.searchBar.reset();
      }
    });
  }

  search(courseName: string) {
    this.onSearch.emit(courseName.toLocaleLowerCase());
  }
}
