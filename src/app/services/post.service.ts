import { DataService } from './data.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class PostService extends DataService {
  constructor(http: HttpClient) {
    super('http://jsonplaceholder.typicode.com/posts',http);
  }
}
