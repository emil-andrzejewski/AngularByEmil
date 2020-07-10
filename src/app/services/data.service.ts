import { ErrorHandler } from '@angular/core';
import { AppError } from './../common/app-error';
import { BadRequestError } from './../common/bad-request-error';
import { NotFoundError } from './../common/not-found-error';
import { HttpClient } from '@angular/common/http';
import { throwError, observable, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators'




export class DataService {
  constructor(public url: string, private http: HttpClient) {
  }

  getAll() {
    return this.http.get(this.url)
      .pipe(
        catchError(this.handleError)
        // map(response => response.valueOf())
      );
  }

  getResourse(id) {
    return this.http.get(this.url + '/' + id)
      .pipe(catchError(this.handleError));
  }

  create(resource) {
    return this.http.post(this.url,resource)
      .pipe(catchError(this.handleError));
  }

  update(id,resource) {
    return this.http.put(this.url + '/' + id, resource)
      .pipe(catchError(this.handleError));
  }

  delete(id) {
    return this.http.delete(this.url + '/' + id)
      .pipe (catchError(this.handleError));

    // simulation error response from http
    // return this.http.delete('lalal')
    //   .pipe (catchError(this.handleError));
  }

  private handleError(error: Response) {
    if(error.status === 400) 
      return throwError(new BadRequestError(error.json()));
    if(error.status === 404) 
      return throwError(new NotFoundError())
    return throwError(new AppError(error));
  }


}
