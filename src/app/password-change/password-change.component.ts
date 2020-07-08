import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PasswordValidators } from './password.validators';

@Component({
  selector: 'password-change',
  templateUrl: './password-change.component.html',
  styleUrls: ['./password-change.component.css']
})
export class PasswordChangeComponent  {
  private _password='1234';
  form = new FormGroup({
    oldPass: new FormControl('',
      Validators.required,
      PasswordValidators.shouldBeValid
    ),
    newPass: new FormControl('',Validators.required),
    repeatNewPass: new FormControl('',Validators.required)
  },
    PasswordValidators.passwordsShouldMatch
  );

  constructor(){
    console.log(this.form);
  }

  get oldPass() {
    return this.form.get('oldPass');
  }

  get newPass() {
    return this.form.get('newPass');
  }

  get repeatNewPass() {
    let zwrot = this.form.get('repeatNewPass');
    return zwrot;
  }

  get password() {
    return this._password;
  }

  set password(newPass) {
    this._password = newPass;
  }

  showFormOnConsole() {
    console.log(this.form);
  }

  showOldPassword(){
    console.log(this.oldPass)
  }

  showNewPassword(){
    console.log(this.newPass)
  }

  // showRepeatNewPassword(){
  //   console.log(this.repeatNewPass)
  // }
}
