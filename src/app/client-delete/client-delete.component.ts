import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-client-delete',
  templateUrl: './client-delete.component.html',
  styleUrls: ['./client-delete.component.css']
})
export class ClientDeleteComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public clientID:any) {
    console.log(clientID);
   }

  ngOnInit(): void {
  }

}
