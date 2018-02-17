import { DatePipe } from '@angular/common';
import { Component, Inject, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
import { BaseModalService } from '../../shared-components/base-modal/base-modal.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit, OnDestroy {
  @Input() courseId?: number;
  public courseForm: FormGroup;
  private courseAuthors: AuthorDto[];

  private courseSubscription: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private authorsService: AuthorsService,
    private courseService: CoursesService,
    private datePipe: DatePipe,
    private navigateRouter: Router,
    private store: Store<MainState>,
    private baseModalService: BaseModalService
  ) { }

  ngOnInit() {
    this.courseForm = this.formBuilder.group({
      title: ['', [Validators.maxLength(50), Validators.required]],
      date: ['', [Validators.required, dateFormatValidator()]],
      description: ['', [Validators.required, Validators.maxLength(500)]],
      duration: ['', [Validators.required, numberFormatValidator()]],
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
              this.markCheckedAuthors(authors);
              this.courseForm.controls['authors'].setValue(authors);
            });
          },
          error => {
            if (error.status === 404) {
              this.navigateRouter.navigate(['notfound']);
            }
          }
        );
    } else {
      this.store.select(store => store.mainStore.authors).subscribe(authors => {
        this.courseForm.controls['authors'].setValue(authors);
      });
      this.store.dispatch(new GetAuthors());
    }
  }

  onCancel() {
    this.baseModalService.close();
  }

  ngOnDestroy(): void {
    if (this.courseId && this.courseId > 0) {
      this.courseSubscription.unsubscribe();
    }
  }

  private setValuesToTheForm(course: Course) {
    this.courseForm.controls['title'].patchValue(course.title);
    this.courseForm.controls['date'].patchValue(
      this.datePipe.transform(course.creationDate, 'dd/MM/yyyy')
    );
    this.courseForm.controls['description'].patchValue(course.description);
    this.courseForm.controls['duration'].patchValue(course.duration);
    this.courseForm.controls['topRated'].patchValue(course.topRated);
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
      this.baseModalService.close();
    } else {
      this.store.dispatch(new AddCourse(courseDto));
      this.baseModalService.close();
    }
  }

  private prepareSaveCourse(courseForm: FormGroup): CourseDto {
    const formModel = courseForm.value;
    const course: CourseDto = new CourseDto();
    course.name = formModel.title;
    // New Date don't support dd/mm/yyyy out of the box
    const dateParts = formModel.date.split('/');
    course.date = new Date(dateParts[2], dateParts[1] - 1, dateParts[0]);

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
