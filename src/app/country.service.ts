import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Country} from "./country";
import {Observable, of, throwError} from "rxjs";
import {catchError} from "rxjs/operators";
@Injectable({
  providedIn: 'root'
})
export class CountryService {
  private _url : string = "../assets/data/countries.json";
  country:Country | undefined;
  bordersString:string[]=[];
  counteries:Country[]=[];
  constructor(private http : HttpClient) { }

  getCountries(): Observable<Country[]>{
    return this.http.get<Country[]>(this._url).pipe(
      catchError(this.handleError)
    );
  }

  getCountry(): Observable<Country[]>{

    return this.http.get<Country[]>(this._url).pipe(
      catchError(this.handleError)
    );
  }

  getBoundaries(id:number): Observable<Country[]>{
    let borders:Country[]=[];
    this.http.get<Country[]>(this._url).pipe(
      catchError(this.handleError)
    ).subscribe(data => {
      this.counteries=data;
      this.country=this.counteries.find(c => c.id === id);
      console.log(this.country);
      this.bordersString=this.country!.borders;
      console.log(this.bordersString);

      for(let i in this.bordersString){

        borders.push(<Country>this.counteries.find(c => c.name == this.bordersString[i]));
      }

    });


    return of(borders);
  }


  private handleError<T>(error: HttpErrorResponse) {
    return throwError(error.message || "Server Error");
  }

}
