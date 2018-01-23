import { Component, OnInit, Input, forwardRef, OnChanges, ChangeDetectorRef } from '@angular/core';
import { AuthorsService } from '../../../services/authors.service';
import { AuthorDto } from '../../../models/author';
import { MultiselectModel } from '../../../models/multiselect';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { ChangeDetectionStrategy } from '@angular/core';
import { multiselectRequiredValidator } from '../../../validators/multiselect-required-validator';

@Component({
  selector: 'app-authors-control',
  templateUrl: './authors-control.component.html',
  styleUrls: ['./authors-control.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => AuthorsControlComponent),
    multi: true
  }]
})
export class AuthorsControlComponent implements ControlValueAccessor {
  @Input() authors: MultiselectModel[] = [];

  propagateChange: any = () => { };
  validateFn: any = () => { };

  writeValue(authors: any): void {
    if (authors) {
      this.authors = authors;
      this.cd.markForCheck();
    }
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }
  registerOnTouched(fn: any): void { }
  setDisabledState?(isDisabled: boolean): void { }


  constructor(private cd: ChangeDetectorRef) {

  }

  update(value: MultiselectModel) {
    value.isSelected = !value.isSelected;
    this.propagateChange(this.authors);
    this.writeValue(this.authors);
  }
}
