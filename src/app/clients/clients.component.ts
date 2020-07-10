import { ClientDeleteComponent } from './../client-delete/client-delete.component';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ClientsService } from './../services/clients.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ClientEditComponent } from '../client-edit/client-edit.component';
import { resourceUsage } from 'process';


@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit, OnDestroy{
  public klienci: Klient[];
  private subscription1: Subscription;
  private dialogSub: Subscription;
  
  constructor(
    private service: ClientsService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.subscription1 = this.service.getAll()
      .subscribe(result => {
        this.klienci = JSON.parse(JSON.stringify(result));
        console.log('Loaded '+ this.klienci.length + 'clients')
      }, error => console.error(error)); 
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
      }, error => console.log('AfterClosedError',error));
  }

  updateClient(clientEdited,i) {
    let clientRecovery = JSON.parse(JSON.stringify(this.klienci[i]));
    
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
    let clientRecovery = JSON.parse(JSON.stringify(this.klienci[i]));

    this.klienci.splice(i,1);  

    this.service.delete(id)
      .subscribe(
        //result => console.log(result),
        null,
        error => {
          console.log('errorDeleting', error);
          this.klienci[i] = clientRecovery;
        }
      );
  }

    //constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    //  http.get('https://localhost:5001/api/customers').subscribe(result => {
    //    this.klienci = result as Klient[];
    //  }, error => console.error(error));
    //}
}


interface Klient {
  customerID: string;
  companyName: string;
  contactName: string;
  contactTitle: string;
  address: string;
  city: string;
  region: string;
  postalCode: string;
  country: string;
  phone: string;
  fax: string;
}
