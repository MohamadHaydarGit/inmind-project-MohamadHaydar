import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {CountryService} from "../../countries/services/coutry-service/country.service";
import {withLatestFrom} from "rxjs/operators";
import {forkJoin} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CountryDetailsResolverService implements Resolve<any>{

  constructor(private  countryService : CountryService ) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    // return forkJoin([
    //    this.countryService.getCountry(<string>route.paramMap.get('code')),
    //    this.countryService.getBoundaries(route.queryParams.borders),
    // ]);
    return 'd';
  }
}
