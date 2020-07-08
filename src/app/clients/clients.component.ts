import { MatDialog } from '@angular/material/dialog';
import { ClientsService } from './../services/clients.service';
import { Component, OnInit, Inject } from '@angular/core';
import { ClientEditComponent } from '../client-edit/client-edit.component';


@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {
  public klienci: Klient[];
  public klientZero;
  
  constructor(
    private service: ClientsService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.service.getAll()
      .subscribe(result => {
        this.klienci = result as unknown as Klient[];
        // console.log(this.klienci);
        this.klientZero = this.klienci[0];
        // console.log(this.klientZero);
      }, error => console.error(error));
    
  }

  getServiceUrl() {
    return this.service.url;
  }

  openDialog(client){
    this.dialog.open(ClientEditComponent,
      {
        data: client
      })
      .afterClosed()
      .subscribe(result => console.log(result));
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
