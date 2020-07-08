import { HttpClient } from '@angular/common/http';
import { DataService } from './data.service';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GithubProfileService extends DataService {
  constructor(http: HttpClient) {
    super ('https://api.github.com/users/',http)
  }

  getProfile(username: string) {
    return super.getResourse(username);
  }


}
