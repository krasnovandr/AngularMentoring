import { ValidatorFn, AbstractControl } from '@angular/forms';

export function numberFormatValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } => {
        const numbersRegExp = new RegExp('^[0-9]*$');
        const isNumberFromat = numbersRegExp.test(control.value);
        return isNumberFromat ? null : { 'Invalid Format Please Use numbers': { value: control.value } };
    };
}
