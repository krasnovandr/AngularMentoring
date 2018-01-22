import { Component, OnInit, forwardRef, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Location, DatePipe } from '@angular/common';
import { FormGroup, FormControl, Validators, FormBuilder, ValidatorFn, AbstractControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { dateFormatValidator } from '../../validators/custom-validators';
import { numberFormatValidator } from '../../validators/number-validator';
import { AuthorReadItemDto } from '../../models/author';
import { MultiselectModel } from '../../models/multiselect';
import { AuthorsService } from '../../services/authors.service';
import { customRequiredValidator } from '../../validators/customrequired-validator';
import { CoursesService } from '../../services/courses.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Course, CourseDto } from '../../models/courses';
@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css'],
})

export class CourseComponent implements OnInit {
  courseForm: FormGroup;
  private courseAuthors: AuthorReadItemDto[];

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
      authors: [[], [customRequiredValidator()]]
    });

    const id = +this.router.snapshot.paramMap.get('id');
    if (id && id > 0) {
      this.router.paramMap.subscribe(data => {
        const resultId = +data.get('id');
        this.courseService.getCourse(resultId).subscribe(course => {
          this.courseForm.controls['title'].patchValue(course.title);
          this.courseForm.controls['date'].patchValue(this.datePipe.transform(course.creationDate, 'dd/MM/yyyy'));
          this.courseForm.controls['description'].patchValue(course.description);
          this.courseForm.controls['duration'].patchValue(course.duration);
          this.courseAuthors = course.authors;

          this.authorsService.getAuthors()
            .subscribe(authors => {

              for (const author of authors) {
                const isExist = this.courseAuthors.some(auth => auth.id === author.id);
                if (isExist) {
                  author.isSelected = true;
                }
              }
              this.courseForm.controls['authors'].setValue(authors);
            });
        });
      });
    } else {
      this.authorsService.getAuthors()
        .subscribe(authors => this.courseForm.controls['authors'].setValue(authors));
    }
  }

  onCancel() {
    this.navigateRouter.navigate(['courses']);
  }

  onSubmit(): void {
    const courseDto = this.prepareSaveCourse();

    this.courseService.postCourse(courseDto).subscribe(
      test => { }, err => { }
    );
  }
  prepareSaveCourse(): CourseDto {
    const formModel = this.courseForm.value;

    const course: CourseDto = new CourseDto();
    course.name = formModel.title as string;
    debugger;
    course.date = new Date(formModel.date);
    course.description = formModel.description as string;
    course.duration = formModel.duration as number;
    course.isTopRated = false;
    course.authors = [];
    const formAuthors = formModel.authors as MultiselectModel[];

    for (const author of formAuthors) {
      if (author.isSelected) {
        const authorDto = new AuthorReadItemDto(author.id);
        course.authors.push(authorDto);
      }
    }

    return course;
  }
}
