import {
  Component,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  OnInit,
  Injector
} from "@angular/core";
import {
  Course,
  FilterOptions,
  PagerOptions
} from "../../../../models/courses";
import { FilterPipe } from "../../../../pipes/filter.pipe";
import { FormControl } from "@angular/forms";
import { Observable } from "rxjs/Observable";
import { CoursesService } from "../../../../services/courses.service";
import { Store } from "@ngrx/store";
import { AppState } from "../../../../store/courses.model";
import { distinctUntilChanged } from "rxjs/operators";
import { skipUntil } from "rxjs/operators/skipUntil";
import { first } from "rxjs/operators/first";
import { asTextData } from "@angular/core/src/view";
import { BaseModalBodyLoaderService } from "../../../../shared-components/base-modal/base-modal-body-loader.service";
import { BaseModalService } from "../../../../shared-components/base-modal/base-modal.service";
import { CourseComponent } from "../../../course/course.component";

@Component({
  selector: "app-toolbox",
  templateUrl: "./toolbox.component.html",
  styleUrls: ["./toolbox.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToolboxComponent implements OnInit {
  searchBar: FormControl = new FormControl("", []);

  @Output() onSearch: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private cd: ChangeDetectorRef,
    private baseModalService: BaseModalService,
    private injector: Injector
  ) {
    this.searchBar = new FormControl("", []);
  }

  ngOnInit() {
    this.searchBar.valueChanges.subscribe(value => {
      if (value === "") {
        this.onSearch.emit("");
      }
    });
  }

  search(courseName: string) {
    this.onSearch.emit(courseName.toLocaleLowerCase());
  }
  openAddCourse() {
    this.baseModalService.open(CourseComponent, {
      modalInjector: this.injector
    });
  }
}
