import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Country} from "../../models/country";
import {Observable, of, throwError} from "rxjs";
import {catchError} from "rxjs/operators";
@Injectable({
  providedIn: 'root'
})
export class CountryService {
  private ROOT_URL : string = "https://restcountries.com/v3.1";
  country:Country | undefined;
  bordersString:string[]=[];
  counteries:Country[]=[];
  constructor(private http : HttpClient) { }

  getCountries(): Observable<Country[]>{
    return this.http.get<Country[]>(this.ROOT_URL+'/all').pipe(
      catchError(this.handleError)
    );
  }

  getCountry(code:string): Observable<Country>{

    return this.http.get<Country>(this.ROOT_URL+'/alpha/'+code).pipe(
      catchError(this.handleError)
    );
  }

  getBoundaries(codes: string[] | undefined): Observable<Country[]>{
   return  this.http.get<Country[]>(this.ROOT_URL+'/alpha?codes='+codes).pipe(
      catchError(this.handleError)
    );
 }


  private handleError<T>(error: HttpErrorResponse) {
    return throwError(error.message || "Server Error");
  }

}
