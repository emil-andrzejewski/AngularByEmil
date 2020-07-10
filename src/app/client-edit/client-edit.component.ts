import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-client-edit',
  templateUrl: './client-edit.component.html',
  styleUrls: ['./client-edit.component.css']
})
export class ClientEditComponent implements OnInit {
  clientEditForm = this.fb.group({
    companyName: [this.client.companyName,Validators.required],
    contactName: [this.client.contactName,Validators.required],
    contactTitle: [this.client.contactTitle],
    address: [this.client.address],
    city: [this.client.city],
    country: [this.client.country],
    phone: [this.client.phone],
  });

  constructor(
    private dialog: MatDialogRef<ClientEditComponent>,
    @Inject(MAT_DIALOG_DATA) public client: any,
    private fb: FormBuilder
  ) {
    console.log(client);
  }

  ngOnInit(): void { }

  onSubmit() {
    this.dialog.close({
      status: 'clientEditFormIsValid',
      clientEdited: this.clientEditForm.value
    });
    // console.log(this.clientEditForm);
  }

  clientEditFormIsValid() {
    return this.clientEditForm.valid;
  }
}
