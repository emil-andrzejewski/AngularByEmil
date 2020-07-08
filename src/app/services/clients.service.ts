import { DataService } from './data.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClientsService extends DataService {
  constructor(http: HttpClient) {
    super('https://northwindservice4.azurewebsites.net/api/customers',http);
  }
}
