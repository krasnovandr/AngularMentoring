import { DatePipe, Location } from '@angular/common';
import { OnDestroy } from '@angular/core';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';

import { AuthorDto } from '../../models/author';
import { Course, CourseDto } from '../../models/courses';
import { MultiselectModel } from '../../models/multiselect';
import { AuthorsService } from '../../services/authors.service';
import { CoursesService } from '../../services/courses.service';
import { BaseModalRemoteService } from '../../shared-components/base-modal/base-modal-remote.service';
import { REMOTE_SERVICE } from '../../shared-components/base-modal/base-modal.component';
import { ConfirmationModalService } from '../../shared-components/confirmation-modal/confirmation-modal.service';
import { AddCourse, EditCourse, GetAuthors } from '../../store/courses.actions';
import { MainState } from '../../store/courses.model';
import { dateFormatValidator } from '../../validators/date-validator';
import { multiselectRequiredValidator } from '../../validators/multiselect-required-validator';
import { numberFormatValidator } from '../../validators/number-validator';

@Component({
  selector: "app-course",
  templateUrl: "./course.component.html",
  styleUrls: ["./course.component.css"]
})
export class CourseComponent implements OnInit, OnDestroy {
  @Input() courseId?: number;
  public courseForm: FormGroup;
  private courseAuthors: AuthorDto[];

  private courseSubscription: Subscription;

  constructor(
    private location: Location,
    private formBuilder: FormBuilder,
    private authorsService: AuthorsService,
    private router: ActivatedRoute,
    private courseService: CoursesService,
    private datePipe: DatePipe,
    private navigateRouter: Router,
    private confirmationModalService: ConfirmationModalService,
    private store: Store<MainState>,
    @Inject(REMOTE_SERVICE)
    private baseModalRemoteService: BaseModalRemoteService
  ) {}

  ngOnInit() {
    this.courseForm = this.formBuilder.group({
      title: ["", [Validators.maxLength(50), Validators.required]],
      date: ["", [Validators.required, dateFormatValidator()]],
      description: ["", [Validators.required, Validators.maxLength(500)]],
      duration: ["", [Validators.required, numberFormatValidator()]],
      authors: [[], [multiselectRequiredValidator()]],
      topRated: false
    });

    if (this.courseId && this.courseId > 0) {
      this.courseSubscription = this.courseService
        .getCourse(this.courseId)
        .subscribe(
          course => {
            this.setValuesToTheForm(course);
            this.courseAuthors = course.authors;

            this.authorsService.getAuthors().subscribe(authors => {
              debugger;
              this.markCheckedAuthors(authors);
              this.courseForm.controls["authors"].setValue(authors);
            });
          },
          error => {
            if (error.status === 404) {
              this.navigateRouter.navigate(["notfound"]);
            }
          }
        );
    } else {
      this.store.select(store => store.mainStore.authors).subscribe(authors => {
        this.courseForm.controls["authors"].setValue(authors);
      });
      this.store.dispatch(new GetAuthors());
    }
  }

  onCancel() {
    this.baseModalRemoteService.close();
  }

  ngOnDestroy(): void {
    if (this.courseId && this.courseId > 0) {
      this.courseSubscription.unsubscribe();
    }
  }

  private setValuesToTheForm(course: Course) {
    this.courseForm.controls["title"].patchValue(course.title);
    this.courseForm.controls["date"].patchValue(
      this.datePipe.transform(course.creationDate, "dd/MM/yyyy")
    );
    this.courseForm.controls["description"].patchValue(course.description);
    this.courseForm.controls["duration"].patchValue(course.duration);
    this.courseForm.controls["topRated"].patchValue(course.topRated);
  }

  private markCheckedAuthors(authors: MultiselectModel[]) {
    for (const author of authors) {
      const isExist = this.courseAuthors.some(auth => auth.id === author.id);
      if (isExist) {
        author.isSelected = true;
      }
    }
    return authors;
  }

  onSubmit(courseForm: FormGroup): void {
    const courseDto = this.prepareSaveCourse(courseForm);
    if (this.courseId && this.courseId > 0) {
      courseDto.id = this.courseId;
      this.store.dispatch(new EditCourse(courseDto));
      this.baseModalRemoteService.close();
    } else {
      this.store.dispatch(new AddCourse(courseDto));
      this.baseModalRemoteService.close();
    }
  }
  prepareSaveCourse(courseForm: FormGroup): CourseDto {
    const formModel = courseForm.value;
    const course: CourseDto = new CourseDto();
    course.name = formModel.title;
    course.date = new Date(formModel.date);
    course.description = formModel.description;
    course.duration = formModel.duration;
    course.isTopRated = formModel.topRated;
    course.authors = [];

    for (const author of formModel.authors) {
      if (author.isSelected) {
        const authorDto = new AuthorDto(author.id);
        course.authors.push(authorDto);
      }
    }

    return course;
  }
}
