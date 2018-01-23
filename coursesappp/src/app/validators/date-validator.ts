import { ValidatorFn, AbstractControl } from '@angular/forms';

export function dateFormatValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
        const dateRegExp = new RegExp('^[0-9]{2}[\/]{1}[0-9]{2}[\/]{1}[0-9]{4}$');
        const isDateFromat = dateRegExp.test(control.value);
        return isDateFromat ? null : { 'invalidFormat': { value: control.value } };
    };
}
