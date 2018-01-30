import { Component, Output, EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef, OnInit } from '@angular/core';
import { Course, FilterOptions, PagerOptions } from '../../../../models/courses';
import { FilterPipe } from '../../../../pipes/filter.pipe';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { CoursesService } from '../../../../services/courses.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../store/courses.model';
import { distinctUntilChanged } from 'rxjs/operators';
import { skipUntil } from 'rxjs/operators/skipUntil';
import { first } from 'rxjs/operators/first';

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
    // this.store.select(store => store.courses).pipe(distinctUntilChanged(), first(val => val != null)).subscribe(value => {
    //   if (value == null) {
    //     this.searchBar.reset();
    //   }
    // });
  }

  search(courseName: string) {
    this.onSearch.emit(courseName.toLocaleLowerCase());
  }
}
