import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Client } from '../clients/client';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import { AsyncClientIDValidator } from '../validators/async-clientID.validator';

@Component({
  selector: 'app-client-create',
  templateUrl: './client-create.component.html',
  styleUrls: ['./client-create.component.css']
})
export class ClientCreateComponent implements OnInit {
  clientCreateForm: FormGroup; 

  constructor(
    private fb: FormBuilder,
    private validator: AsyncClientIDValidator,
    private dialog: MatDialogRef<ClientCreateComponent>,
    @Inject(MAT_DIALOG_DATA) private data: Client
  ){ 
    this.clientCreateForm = this.fb.group({
      customerID: [this.data.customerID,[
        Validators.required,
        Validators.maxLength(5),
        Validators.minLength(5),
        Validators.pattern('^[a-zA-Z]*$')],
        this.validator.nonunique],
      companyName: [this.data.companyName,Validators.required],
      contactName: [this.data.contactName,Validators.required],
      contactTitle: [this.data.contactTitle],
      address: [this.data.address],
      city: [this.data.city],
      country: [this.data.country],
      phone: [this.data.phone]
    });
  }

  onSubmit() {
    this.dialog.close('confirm');
  }

  onCancel() {
    this.dialog.close('cancel');
  }

  ngOnInit(){
    this.dialog.beforeClosed()
      .subscribe(status => {
        // console.log('beforeClose',status);
        // console.log('beforeCloseData',this.data);
        this.dialog.close(this.returnClient(status));
      })
  }

  returnClient(status) {
    this.setClientFromClientCreateForm();
    return {
      status: status,
      client: this.data
    }
  }

  clientCreateFormIsValid() {
    return this.clientCreateForm.valid;
  }

  formControls() {
    return this.clientCreateForm.controls;
  }

  customerIDErrorInfo() {
    let errorInfo='';
    if(this.clientCreateForm.controls.customerID.errors.required) {
      errorInfo+='Client ID is required. '
    }
    if(this.clientCreateForm.controls.customerID.errors.minlength ||
      this.clientCreateForm.controls.customerID.errors.maxlength) {
      errorInfo+='Client ID must consist of 5 letters. '
    }   
    if(this.clientCreateForm.controls.customerID.errors.pattern) {
      errorInfo+='Only "a-z" and "A-Z" letters are allowed. '
    } 
    if(this.clientCreateForm.controls.customerID.errors.nonunique) {
      errorInfo+='Given Client ID already exists. Type other ID. '
    } 
    return errorInfo;
  }

  clearForm(){
    this.clientCreateForm.setValue({
      customerID: '',
      companyName: '',
      contactName: '',
      contactTitle: '',
      address: '',
      city: '',
      country: '',
      phone: ''
    });
    // console.log('formvalue',this.clientCreateForm.value)
  }

  setClientFromClientCreateForm() {
    this.data.customerID = (this.clientCreateForm.get('customerID').value as string).toUpperCase();
    this.data.companyName = this.clientCreateForm.get('companyName').value;
    this.data.contactName = this.clientCreateForm.get('contactName').value;
    this.data.contactTitle = this.clientCreateForm.get('contactTitle').value;
    this.data.address = this.clientCreateForm.get('address').value;
    this.data.city = this.clientCreateForm.get('city').value;
    this.data.country = this.clientCreateForm.get('country').value;
    this.data.phone = this.clientCreateForm.get('phone').value;
  }


}
