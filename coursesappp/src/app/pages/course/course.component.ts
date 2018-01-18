import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, FormControl, Validators, FormBuilder, ValidatorFn, AbstractControl } from '@angular/forms';
import { dateFormatValidator } from '../../validators/custom-validators';
@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})



export class CourseComponent implements OnInit {
  courseForm: FormGroup;

  constructor(private location: Location, private formBuilder: FormBuilder) { }


  ngOnInit() {
    this.courseForm = this.formBuilder.group({
      title: ['', [Validators.maxLength(50), Validators.required]],
      date: ['', [Validators.required, dateFormatValidator()]],
      description: ['', [Validators.required, Validators.maxLength(500)]],
      duration: ['', [Validators.required]],
    });
  }


  onCancel() {
    // this.location.back();
    this.courseForm.reset();
  }

  onSubmit(): void {
    console.log(this.courseForm.valid);  // {first: 'Nancy', last: 'Drew'}
  }
}
