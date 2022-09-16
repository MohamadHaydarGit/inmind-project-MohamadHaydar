import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {CountryService} from "../../countries/services/coutry-service/country.service";
import {Observable, throwError} from "rxjs";
import {catchError} from "rxjs/operators";
import {HttpErrorResponse, HttpResponse} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CountriesResolverService implements Resolve<any> {

  constructor(private  countryService : CountryService ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    console.log('Called Get Product in resolver...', route);
    return this.countryService.getCountries().pipe(
      catchError((error:HttpErrorResponse) => {
        return throwError(error.message || "Server Error");})
    );
  }
}
