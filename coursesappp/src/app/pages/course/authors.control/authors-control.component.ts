import { Component, OnInit, Input } from '@angular/core';
import { AuthorsService } from '../../../services/authors.service';
import { AuthorDto } from '../../../models/author';
import { MultiselectModel } from '../../../models/multiselect';
import { ControlValueAccessor } from '@angular/forms/src/directives/control_value_accessor';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-authors-control',
  templateUrl: './authors-control.component.html',
  styleUrls: ['./authors-control.component.css']
})
export class AuthorsControlComponent implements OnInit, ControlValueAccessor {
  @Input() authors: MultiselectModel[] = [];
  // searchBar: FormControl = new FormControl('', []);
  onChange = (_) => { };
  onTouched = (_) => { };

  writeValue(obj: any): void {
    // alert(obj)
    if (obj) {
      let author = this.authors.find(m => m.id === obj);
      author.name = "asdsadasd";
      author.isSelected = true;
    }

    // throw new Error("Method not implemented.");
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    // throw new Error("Method not implemented.");
  }


  constructor() { }

  ngOnInit() {
    // this.authorsInitial = this.authors;
    // this.searchBar.valueChanges.subscribe(newValue => {
    //   this.authors = this.authorsInitial.filter(result => result.name.indexOf(newValue) >= 0);
    // });
  }
  update(value: any) {
    this.writeValue(value);
  }

}
// .map((response) => {
//   const result = new CourseListModel();
//   result.totalCount = response.totalCount;
//   result.data = response.data.map((backendCourse) => this.mapCourseEntity(backendCourse));
//   return result;
// });