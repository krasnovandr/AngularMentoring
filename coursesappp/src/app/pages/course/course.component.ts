import { DatePipe, Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthorReadItemDto } from '../../models/author';
import { Course, CourseDto } from '../../models/courses';
import { MultiselectModel } from '../../models/multiselect';
import { AuthorsService } from '../../services/authors.service';
import { CoursesService } from '../../services/courses.service';
import { dateFormatValidator } from '../../validators/date-validator';
import { multiselectRequiredValidator } from '../../validators/multiselect-required-validator';
import { numberFormatValidator } from '../../validators/number-validator';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css'],
})

export class CourseComponent implements OnInit {
  private courseForm: FormGroup;
  private courseAuthors: AuthorReadItemDto[];
  private editMode = false;
  private courseId = false;

  constructor(private location: Location,
    private formBuilder: FormBuilder,
    private authorsService: AuthorsService,
    private router: ActivatedRoute,
    private courseService: CoursesService,
    private datePipe: DatePipe,
    private navigateRouter: Router,
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

    const id = +this.router.snapshot.paramMap.get('id');
    this.editMode = id && id > 0;
    if (this.editMode) {
      this.router.params.subscribe(data => {
        const resultId = +data['id'];
        this.courseService.getCourse(resultId).subscribe(course => {
          this.setValuesToTheForm(course);
          this.courseAuthors = course.authors;

          this.authorsService.getAuthors()
            .subscribe(authors => {
              this.markCheckedAuthors(authors);
              this.courseForm.controls['authors'].setValue(authors);
            });
        }, (error) => {
          if (error.status === 404) {
            this.navigateRouter.navigate(['notfound']);
          }
        }
        );
      });
    } else {
      this.authorsService.getAuthors()
        .subscribe(authors => this.courseForm.controls['authors'].setValue(authors));
    }
  }

  private setValuesToTheForm(course: Course) {
    this.courseForm.controls['title'].patchValue(course.title);
    this.courseForm.controls['date'].patchValue(this.datePipe.transform(course.creationDate, 'dd/MM/yyyy'));
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

  onCancel() {
    this.navigateRouter.navigate(['courses']);
  }

  onSubmit(): void {
    const courseDto = this.prepareSaveCourse();
    if (this.editMode) {
      courseDto.id = +this.router.snapshot.paramMap.get('id');
      this.courseService.updateCourse(courseDto).subscribe(
        (_) => { this.navigateRouter.navigate(['courses']); }
      );
    } else {
      this.courseService.createCourse(courseDto).subscribe(
        (_) => { this.navigateRouter.navigate(['courses']); }
      );
    }
  }
  prepareSaveCourse(): CourseDto {
    const formModel = this.courseForm.value;

    const course: CourseDto = new CourseDto();
    course.name = formModel.title;
    course.date = new Date(formModel.date);
    course.description = formModel.description;
    course.duration = formModel.duration;
    course.isTopRated = formModel.topRated;
    course.authors = [];

    for (const author of formModel.authors) {
      if (author.isSelected) {
        const authorDto = new AuthorReadItemDto(author.id);
        course.authors.push(authorDto);
      }
    }

    return course;
  }
}
