import { Injectable } from '@angular/core';
import { ClientsService } from '../services/clients.service';
import { AbstractControl, ValidationErrors, AsyncValidatorFn } from "@angular/forms";
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AsyncClientIDValidator {
    constructor(
        private service: ClientsService) {}

    nonunique = (control: AbstractControl ): Observable<ValidationErrors | null> => {
        return this.service.resourceExists(control.value)
            .pipe(map(result => result ? {nonunique: true} : null));
    }

}   