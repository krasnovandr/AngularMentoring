import { ValidatorFn, AbstractControl } from '@angular/forms';

export function numberFormatValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
        const numbersRegExp = new RegExp('^\\d*$');
        const isNumberFromat = numbersRegExp.test(control.value);
        return isNumberFromat ? null : { 'invalidFormat': { value: control.value } };
    };
}
