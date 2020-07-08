import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-client-edit',
  templateUrl: './client-edit.component.html',
  styleUrls: ['./client-edit.component.css']
})
export class ClientEditComponent implements OnInit {
private client: any;

  constructor(
    private dialog: MatDialogRef<ClientEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
      this.client = data;
    }

  ngOnInit(): void {
  }

  onCancel(){
    this.dialog.close();
  }

}
