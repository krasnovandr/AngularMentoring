import { Component, OnInit, forwardRef, ChangeDetectionStrategy } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, FormControl, Validators, FormBuilder, ValidatorFn, AbstractControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { dateFormatValidator } from '../../validators/custom-validators';
import { numberFormatValidator } from '../../validators/number-validator';
import { AuthorDto } from '../../models/author';
import { MultiselectModel } from '../../models/multiselect';
import { AuthorsService } from '../../services/authors.service';
import { customRequiredValidator } from '../../validators/customrequired-validator';
@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css'],
})

export class CourseComponent implements OnInit {
  courseForm: FormGroup;
  private initialAuthors: MultiselectModel[];

  constructor(private location: Location,
    private formBuilder: FormBuilder,
    private authorsService: AuthorsService) { }

  ngOnInit() {
    this.courseForm = this.formBuilder.group({
      title: ['', [Validators.maxLength(50), Validators.required]],
      date: ['', [Validators.required, dateFormatValidator()]],
      description: ['', [Validators.required, Validators.maxLength(500)]],
      duration: ['', [Validators.required, numberFormatValidator()]],
      authors: [[], [customRequiredValidator()]]
    });

    this.authorsService.getAuthors()
      .subscribe(authors => {
        this.initialAuthors = JSON.parse(JSON.stringify(authors));
        this.courseForm.controls['authors'].setValue(authors);
      });
  }

  onCancel() {
    this.courseForm.reset();
    this.courseForm.controls['authors'].patchValue(this.initialAuthors);
  }

  onSubmit(): void {
    console.log(this.courseForm.valid);
  }
}
