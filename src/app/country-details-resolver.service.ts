import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {CountryService} from "./country.service";

@Injectable({
  providedIn: 'root'
})
export class CountryDetailsResolverService implements Resolve<any>{

  constructor(private  countryService : CountryService ) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    return this.countryService.getCountry();
  }
}
