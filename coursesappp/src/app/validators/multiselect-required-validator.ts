import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { MultiselectModel } from '../models/multiselect';

export function multiselectRequiredValidator(): ValidatorFn {
    return (control: FormControl): ValidationErrors => {
        if (control.value && control.value.length > 0) {
            const authorsArray: MultiselectModel[] = control.value as MultiselectModel[];
            const isSelected = authorsArray.some(val => val.isSelected === true);

            return isSelected ? null : { 'customRequired': { value: control.value } };
        }

        return { 'customRequired': { value: control.value } };
    };
}
