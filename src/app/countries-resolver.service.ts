import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {CountryService} from "./country.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CountriesResolverService implements Resolve<any> {

  constructor(private  countryService : CountryService ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    console.log('Called Get Product in resolver...', route);
    return this.countryService.getCountries();
  }
}
