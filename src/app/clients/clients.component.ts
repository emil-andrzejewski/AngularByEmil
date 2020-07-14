import { ClientCreateComponent } from './../client-create/client-create.component';
import { ClientDeleteComponent } from './../client-delete/client-delete.component';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ClientsService } from './../services/clients.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ClientEditComponent } from '../client-edit/client-edit.component';
import { Client } from './client';


@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit, OnDestroy{
  public klienci: Client[];
  private subscription1: Subscription;
  private dialogSub: Subscription;
  private tempClient: Client;
  
  constructor(
    private service: ClientsService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.subscription1 = this.service.getAll()
      .subscribe(result => {
        this.klienci = JSON.parse(JSON.stringify(result));
        console.log('Loaded '+ this.klienci.length + ' clients');
      }, error => console.error(error)); 
      
    this.tempClient = new Client();
    // console.log(this.tempClient);
    // this.tempClient.emptyClient();
  }

  ngOnDestroy() {
    this.subscription1.unsubscribe();
  }

  getServiceUrl() {
    return this.service.url;
  }

  openEditDialog(client,i){
    this.dialogSub = this.dialog.open(ClientEditComponent,{data: client})
      .afterClosed()
      .subscribe(result => {
        if(result && result.status === 'clientEditFormIsValid') {
          this.updateClient(result.clientEdited,i);
        }
      });
  }

  updateClient(clientEdited,i) {
    let clientRecovery = this.deepCopy(this.klienci[i]);
    
    let client = this.klienci[i]; //kopia referencji
    client.companyName = clientEdited.companyName;
    client.contactName = clientEdited.contactName;
    client.contactTitle = clientEdited.contactTitle;
    client.address = clientEdited.address;
    client.city = clientEdited.city;
    client.country = clientEdited.country;
    client.phone = clientEdited.phone;
    
    this.service.update(client.customerID,client)
      .subscribe(null,
      error => {
        console.log('errorUpdating',error);
        this.klienci[i] = clientRecovery;
        alert('There was an error while updating client. Check console to get details');
      });
  }

  openDeleteDialog(id,i){
    this.dialog.open(ClientDeleteComponent,{data: id})
    .afterClosed()
    .subscribe(result => {
      if(result==='deleteConfirmed') this.deleteCustomer(id,i);
    });
  }

  deleteCustomer(id,i) {
    let clientRecovery = this.deepCopy(this.klienci[i]);

    this.klienci.splice(i,1);  

    this.service.delete(id)
      .subscribe(
        null,
        error => {
          console.log('errorDeleting', error);
          this.klienci[i] = clientRecovery;
          alert('There was an error while deleting client. Check console to get details');
        }
      );
  }

  deepCopy(ref: any) {
    return JSON.parse(JSON.stringify(ref));
  }

  openCreateDialog(){
    this.dialog.open(ClientCreateComponent,{data: this.tempClient}) //,{disableClose: true}
      .afterClosed()
      .subscribe(result => {
        if(result.status==='confirm') {
          this.createClient(this.deepCopy(result.client));
        }
        else {
          this.tempClient = result.client;
          // console.log('tempClient:',this.tempClient);
        }
        // dialogRef.unsubscribe();
      });
  }

  createClient(newClient) {
    this.klienci.splice(0,0,newClient);

    this.service.create(newClient)
      .subscribe(result =>{
        // console.log('creating client', result);
        this.tempClient.emptyClient();
        // console.log('tempClient:',this.tempClient);
      },error => {
        console.log('creating error',error);
        this.klienci.splice(0,1);
      });

  }


    //constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    //  http.get('https://localhost:5001/api/customers').subscribe(result => {
    //    this.klienci = result as Client[];
    //  }, error => console.error(error));
    //}
}