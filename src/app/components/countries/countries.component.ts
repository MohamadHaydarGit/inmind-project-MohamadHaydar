import { Component, OnInit } from '@angular/core';
import {Country} from "../../models/country";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.scss']
})
export class CountriesComponent implements OnInit {
  public countries : Country[] = [];
  public errorMsg : any;
  public selectedId : number= 0;
  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.data.subscribe((response: any) => {
      console.log('PRODUCT FETCHING', response);
      this.countries = response.countries;
      console.log('PRODUCT FETCHED');
    },
      error => this.errorMsg=error );
  }

  searchText: string = '';
  onSearchTextEntered(searchValue:string){
    this.searchText=searchValue;
    console.log(this.searchText);
  }

  selectedRegion:string = '';
  onSelectedRegion(region:string){
    this.selectedRegion=region;
  }


  onSelect(country: Country){
    this.router.navigate([country.cca3],{relativeTo: this.route,queryParams:{borders:country.borders},});
  }



}
