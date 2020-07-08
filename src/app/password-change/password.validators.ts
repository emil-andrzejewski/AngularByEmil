import { AbstractControl, ValidationErrors } from '@angular/forms';


export class PasswordValidators {
    static shouldBeValid(control: AbstractControl): Promise<ValidationErrors | null> {
        return new Promise((resolve,reject)=>{
            if(control.value !== '1234') resolve({shouldBeValid: true});
            else resolve(null);
        });
    };    

    static passwordsShouldMatch(control: AbstractControl) {
        let newPass = control.get('newPass');
        let repeatNewPass = control.get('repeatNewPass');

        if(newPass.value !== repeatNewPass.value ) 
            return { passwordsShouldMatch: true };
        else return null;
    }


}