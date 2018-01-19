import { Component, OnInit, forwardRef } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, FormControl, Validators, FormBuilder, ValidatorFn, AbstractControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { dateFormatValidator } from '../../validators/custom-validators';
import { numberFormatValidator } from '../../validators/number-validator';
import { AuthorDto } from '../../models/author';
import { MultiselectModel } from '../../models/multiselect';
import { AuthorsService } from '../../services/authors.service';
@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css'],
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => CourseComponent),
    multi: true
  }]
})

export class CourseComponent implements OnInit {
  courseForm: FormGroup;
  private authors: MultiselectModel[];
  constructor(private location: Location,
    private formBuilder: FormBuilder,
    private authorsService: AuthorsService) { }

  ngOnInit() {
    this.courseForm = this.formBuilder.group({
      title: ['', [Validators.maxLength(50), Validators.required]],
      date: ['', [Validators.required, dateFormatValidator()]],
      description: ['', [Validators.required, Validators.maxLength(500)]],
      duration: ['', [Validators.required, numberFormatValidator()]],
      authors: [[Validators.required]]
    });

    this.authorsService.getAuthors()
      .subscribe(response => {
        this.authors = response.map(authorDto => this.mapFromDto(authorDto));
        this.courseForm.controls['authors'].patchValue(this.authors);
      });
  }

  onCancel() {
    // this.location.back();
    this.courseForm.reset();
    this.courseForm.controls['authors'].patchValue(this.authors);
  }

  onSubmit(): void {
    console.log(this.courseForm.valid);  // {first: 'Nancy', last: 'Drew'}
  }


  mapFromDto(author: AuthorDto): MultiselectModel {
    const result = new MultiselectModel();
    result.id = author.id;
    result.name = `${author.firstName} ${author.lastName}`;

    return result;
  }
}
