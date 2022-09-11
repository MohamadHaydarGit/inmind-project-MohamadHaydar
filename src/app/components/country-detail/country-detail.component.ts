import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {Country} from "../../models/country";
import {CountryService} from "../../services/coutry-service/country.service";

@Component({
  selector: 'app-country-detail',
  templateUrl: './country-detail.component.html',
  styleUrls: ['./country-detail.component.scss']
})
export class CountryDetailComponent implements OnInit {

  public countryId:any;
  public countries : Country[] = [];
  public errorMsg:string ='';
  country:Country | undefined;
  borders:Country[] = [];


  constructor(private route: ActivatedRoute, private router: Router,private countryService:CountryService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap)=>{
       let code= params.get('code');
       this.countryId = code;
      this.route.data.subscribe(response => {

        console.log(response['country'][0]);
        this.countries = response['country'][0];
        console.log(this.countries);
        this.country= this.countries.find(c => c.cca3===this.countryId);
        this.borders=response['country'][1];

      });

    //  this.countryService.getBoundaries(this.country!.borders).subscribe(data => this.borders=data);
   });





  }

  onSelect(border:Country){
   this.router.navigate(['/countries', border.cca3],{queryParams:{borders:border.borders},});
  }

  // getCountry(id: number){
  //   this.countryService.getCountry(id).subscribe(country =>{this.country=country;console.log(country)} ,
  //                                                 error => this.errorMsg=error)
  // }


}
