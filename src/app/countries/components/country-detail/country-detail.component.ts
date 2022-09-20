import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {Aed, Country} from "../../../models/country";
import {CountryService} from "../../services/coutry-service/country.service";
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {delay} from "rxjs/operators";
import {ImageService} from "../../services/gallery-service/image.service";

@Component({
  selector: 'app-country-detail',
  templateUrl: './country-detail.component.html',
  styleUrls: ['./country-detail.component.scss']
})
export class CountryDetailComponent implements OnInit {

  public countryId: any;
  public countries: Country[] = [];
  public errorMsg: string = '';
  country: Country | undefined;
  borders: Country[] = [];
  formGroup: any;
  userType: string = "upload";


  constructor(
    private route: ActivatedRoute, private router: Router,
    private countryService: CountryService,
    private formBuilder: FormBuilder,
    private service : ImageService,
  ) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      let code = params.get('code');
      this.countryId = code;
      this.route.data.subscribe(response => {

       // console.log(response['country'][0]);
        this.countries = response['country'][0];
      //  console.log(this.countries);
        this.country = this.countries.find(c => c.cca3 === this.countryId);
        this.borders = response['country'][1];
        this.formGroup = this.formBuilder.group({
          capital: [this.country?.capital, [Validators.required]],
          currency: this.formBuilder.array([
            this.initCurrency(),
          ]),
          language:this.formBuilder.array([
            this.initLanguage(),
          ]),
          continent:[this.country?.continents,[Validators.required]],
          terms: false
        });
        this.fillCurrency();
        this.fillLanguage();
        this.service.getimageDetailList();

      });
      //  this.countryService.getBoundaries(this.country!.borders).subscribe(data => this.borders=data);
    });

  }

  uploadPage(){
    this.router.navigate(['upload'],{relativeTo: this.route});
  }
  ImageListPage(){
    this.router.navigate(['list'],{relativeTo:this.route});
  }
  initLanguage(){
    // @ts-ignore
    let keyArr: any[] = Object.keys(this.country?.languages),
      dataArr:string[] = [];
    keyArr.forEach((key: any) => {
      // @ts-ignore
      dataArr.push(this.country?.languages[key]);
    });
      return this.formBuilder.group({
      code: [keyArr[0], Validators.required],
      lang: [dataArr[0], Validators.required],

  });

  }

  fillLanguage(){
    // @ts-ignore
    const control = <FormArray>this.formGroup.controls['language'];
    // @ts-ignore
    let keyArr: any[] = Object.keys(this.country?.languages),
      dataArr:string[] = [];
    keyArr.slice(1).forEach((key: any,index) => {
      // @ts-ignore
      dataArr.push(this.country?.languages[key]);

      control.push(this.formBuilder.group({
        code: [key, Validators.required],
        // @ts-ignore
        lang: [dataArr[index], Validators.required],
      }));
    });

  }


  initCurrency(){
    // @ts-ignore
  //  const control = <FormArray>this.formGroup.controls['currency'];
    // @ts-ignore
    let keyArr: any[] = Object.keys(this.country?.currencies),
    dataArr:Aed[] = [];
    keyArr.forEach((key: any) => {
      // @ts-ignore
      dataArr.push(this.country!.currencies[key]);

      // control.push(this.formBuilder.group({
      //   code: [key.toString(), Validators.required],
      //   // @ts-ignore
      //   name: [this.country!.currencies[key], Validators.required],
      // }));
    });
    return this.formBuilder.group({
      code: [keyArr[0], Validators.required],
      name: [dataArr[0].name, Validators.required],
    });

  }

  fillCurrency(){
    // @ts-ignore
     const control = <FormArray>this.formGroup.controls['currency'];
    // @ts-ignore
    let keyArr: any[] = Object.keys(this.country?.currencies),
      dataArr:Aed[] = [];
    keyArr.slice(1).forEach((key: any,index) => {
      // @ts-ignore
      dataArr.push(this.country?.currencies[key]);

      control.push(this.formBuilder.group({
        code: [key.toString(), Validators.required],
        // @ts-ignore
        name: [dataArr[index].name, Validators.required],
      }));
    });

  }

  addCurrency(){
    // @ts-ignore
    const control = <FormArray>this.formGroup.controls['currency'];
    control.push(this.formBuilder.group({
      code: ['', Validators.required],
      name: ['', Validators.required],
    }));
  }

  removeCurrency(i: number) {
    // @ts-ignore
    const control = <FormArray>this.formGroup.controls['currency'];
    control.removeAt(i);
  }

  addLanguage(){
    // @ts-ignore
    const control = <FormArray>this.formGroup.controls['language'];
    control.push(this.formBuilder.group({
      code: ['', Validators.required],
      lang: ['', Validators.required],
    }));
  }

  removeLanguage(i: number) {
    // @ts-ignore
    const control = <FormArray>this.formGroup.controls['language'];
    control.removeAt(i);
  }

  save(formData:any) {
    console.log(formData.value)
  }

  getLangLength(){
    // @ts-ignore
    return Object.keys(this.country!.languages).length
  }
  getCurrenciesLength(){
    // @ts-ignore
    return Object.keys(this.country!.currencies).length
  }

  onSelect(border:Country) {
    this.router.navigate(['/countries/details', border.cca3], {queryParams: {borders: border.borders},});
  }


}


