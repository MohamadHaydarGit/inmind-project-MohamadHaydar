import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {Country} from "../country";
import {CountryService} from "../country.service";

@Component({
  selector: 'app-country-detail',
  templateUrl: './country-detail.component.html',
  styleUrls: ['./country-detail.component.scss']
})
export class CountryDetailComponent implements OnInit {

  public countryId:any;
  public countries : Country[] = [];
  public errorMsg:string ='';
  country:any;
  borders:Country[] = [];


  constructor(private route: ActivatedRoute, private router: Router,private countryService:CountryService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap)=>{
       let id= parseInt(<string>params.get('id'));
       this.countryId = id;
      this.route.data.subscribe(response =>this.countries=response.country);
      this.country= this.countries.find(c => c.id===this.countryId);
      this.countryService.getBoundaries(this.country.id).subscribe(data => this.borders=data);
    });





  }

  onSelect(border:Country){
    this.router.navigate(['/countries', border.id]);
  }

  // getCountry(id: number){
  //   this.countryService.getCountry(id).subscribe(country =>{this.country=country;console.log(country)} ,
  //                                                 error => this.errorMsg=error)
  // }


}
