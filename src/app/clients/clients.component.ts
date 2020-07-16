import { ClientCreateComponent } from '../client-create/client-create.component';
import { ClientDeleteComponent } from '../client-delete/client-delete.component';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ClientsService } from '../services/clients.service';
import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { ClientEditComponent } from '../client-edit/client-edit.component';
import { Client } from './client';
import { MatSort } from '@angular/material/sort'
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';


@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit, OnDestroy, AfterViewInit{
  // public klienci: Client[];
  public klienci: MatTableDataSource<Client>;
  private subscription1: Subscription;
  private tempClient: Client;
  public displayedColumns: string[] = ['customerID','companyName','contactName','city','country','edit','delete'];
  @ViewChild (MatSort,{static: true}) sort: MatSort;
  @ViewChild (MatPaginator) paginator: MatPaginator;
  
  constructor(
    private service: ClientsService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.subscription1 = this.service.getAll()
      .subscribe(result => {
        // this.klienci = JSON.parse(JSON.stringify(result));
        this.klienci = new MatTableDataSource(JSON.parse(JSON.stringify(result)))
        this.klienci.sort = this.sort;
        this.klienci.paginator = this.paginator;
        console.log('Loaded '+ this.klienci.data.length + ' clients');
      }, error => console.error(error)); 
      
    this.tempClient = new Client();
    // console.log(this.tempClient);
    // this.tempClient.emptyClient();
  }

  ngOnDestroy() {
    this.subscription1.unsubscribe();
  }

  ngAfterViewInit() {
    this.sort.sortChange.subscribe(
      () => this.paginator.pageIndex = 0
    );
  }

  getServiceUrl() {
    return this.service.url;
  }

  openEditDialog(client){
    this.dialog.open(ClientEditComponent,{data: client})
      .afterClosed()
      .subscribe(result => {
        if(result && result.status === 'clientEditFormIsValid') {
          this.updateClient(client,result.clientEdited);
        }
      });
  }

  updateClient(clientToEdit: Client, newClient: Client) {
    let index = this.klienci.data.indexOf(clientToEdit);
    //  console.log('updateID',clientToEdit.customerID);
    let clientRecovery = this.deepCopy(clientToEdit);
    
    let client: Client = this.klienci.data[index]; //kopia referencji
    client.companyName = newClient.companyName;
    client.contactName = newClient.contactName;
    client.contactTitle = newClient.contactTitle;
    client.address = newClient.address;
    client.city = newClient.city;
    client.country = newClient.country;
    client.phone = newClient.phone;

    this.klienci._updateChangeSubscription();
    
    this.service.update(client.customerID,client)
      .subscribe(
        null,
        error => {
          console.log('errorUpdating',error);
          this.klienci.data[index] = this.deepCopy(clientRecovery);
          this.klienci._updateChangeSubscription();
          alert('There was an error while updating client. Check console to get details');
        });
  }

  openDeleteDialog(client){
    // console.log('deleteID',client.customerID);
    this.dialog.open(ClientDeleteComponent,{data: client.customerID})
    .afterClosed()
    .subscribe(result => {
      if(result==='deleteConfirmed') this.deleteCustomer(client);
    });
  }

  deleteCustomer(client) {
    let index = this.klienci.data.indexOf(client);
    let clientRecovery = this.deepCopy(this.klienci.data[index]);
    this.klienci.data.splice(index,1);  
    this.klienci._updateChangeSubscription();

    this.service.delete(client.customerID)
      .subscribe(
        null,
        error => {
          console.log('errorDeleting', error);
          this.klienci.data.push(clientRecovery);
          this.klienci._updateChangeSubscription();
          alert('There was an error while deleting client. Check console to get details');
        }
      );
  }

  deepCopy(ref: any) {
    // console.log('deepCopy',ref);
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
    this.klienci.data.push(newClient);
    this.klienci._updateChangeSubscription();

    this.service.create(newClient)
      .subscribe(result =>{
        // console.log('creating client', result);
        this.tempClient.emptyClient();
        // console.log('tempClient:',this.tempClient);
      },error => {
        console.log('creating error',error);
        let index = this.klienci.data.indexOf(newClient);
        this.klienci.data.splice(index,1);
        this.klienci._updateChangeSubscription();
        alert('There was an error while creating client. Check console to get details');
      });

    
  }


    //constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    //  http.get('https://localhost:5001/api/customers').subscribe(result => {
    //    this.klienci = result as Client[];
    //  }, error => console.error(error));
    //}
}