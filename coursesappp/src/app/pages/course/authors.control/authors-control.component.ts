import { ChangeDetectorRef, Component, forwardRef, Input } from '@angular/core';
import { ChangeDetectionStrategy } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { MultiselectModel } from '../../../models/multiselect';

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
