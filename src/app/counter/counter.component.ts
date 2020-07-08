import { Component, Inject } from '@angular/core';
import { error } from 'protractor';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-counter-component',
  templateUrl: './counter.component.html'
})
export class CounterComponent {
  public currentCount = 0
  public klienci: Klient[];

    //constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    //  http.get('https://localhost:5001/api/customers').subscribe(result => {
    //    this.klienci = result as Klient[];
    //  }, error => console.error(error));
    //}
    constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
      http.get('https://northwindservice4.azurewebsites.net/api/customers').subscribe(result => {
        this.klienci = result as Klient[];
      }, error => console.error(error));
    }
  

  public incrementCounter() {
    this.currentCount++;
  }
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
