import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {Aed, Country} from "../../../models/country";
import {CountryService} from "../../services/coutry-service/country.service";
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {delay} from "rxjs/operators";
import {ImageService} from "../../services/gallery-service/image.service";
import {Observable} from "rxjs";
import {loadCountries, loadFromStore, updateCountries} from "../../state/countries.actions";
import {Store} from "@ngrx/store";

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
  countryCopy: Country | undefined;
  borders: Country[] = [];
  formGroup: any;
  userType: string = "upload";

  //We're accessing the store from ngrx , and then selecting countries which is defined as a  property from app.module.ts
  // in StoreModule.forRoot({}). This calls the countries reducer and returns the countries state.

  // @ts-ignore
  public countries$: Observable<Country[]> = this.store.select('countries');

  constructor(
    private route: ActivatedRoute, private router: Router,
    private countryService: CountryService,
    private formBuilder: FormBuilder,
    private service: ImageService,
    private store: Store,
  ) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      //get the cca3 code of the country that we want to show its details
      let code = params.get('code');
      this.countryId = code;

      //trigger loadFromStore action
      this.store.dispatch(loadFromStore());

      //$countries is an observable so we subscribe to it and it returns the current state
      //which is countries array
      this.countries$.subscribe(data => this.countries = data);

      //find the designated country based on the cca3 code
      this.country = this.countries.find(c => c.cca3 === this.countryId);

      //find the border countries of the designated country  based on the cca3 code
      this.borders = this.countries.filter(c => this.country?.borders?.includes(c.cca3));

      //creating reactive form for the admin to be able to edit country information
      this.formGroup = this.formBuilder.group({
        capital: [this.country?.capital, [Validators.required]],
        currency: this.formBuilder.array([
          this.initCurrency(),
        ]),
        language: this.formBuilder.array([
          this.initLanguage(),
        ]),
        continent: [this.country?.continents, [Validators.required]],
        terms: false
      });
      //fill the inputs related with the currencies and languages related to the country
      this.fillCurrency();
      this.fillLanguage();
      this.service.getimageDetailList();


    });

  }


  initLanguage() {
    //initLanguage returns a group that contains the first language spoken in the country (assumin there is more)
    // @ts-ignore
    let keyArr: any[] = Object.keys(this.country?.languages),
      dataArr: string[] = [];
    keyArr.forEach((key: any) => {
      // @ts-ignore
      dataArr.push(this.country?.languages[key]);
    });
    return this.formBuilder.group({
      code: [keyArr[0], Validators.required],
      lang: [dataArr[0], Validators.required],

    });

  }

  fillLanguage() {
    //fillLanguage pushes to the array the rest of the languages spoken in that country without
    // the first one because it was added in initLanguage
    // @ts-ignore
    const control = <FormArray>this.formGroup.controls['language'];
    // @ts-ignore
    let keyArr: any[] = Object.keys(this.country?.languages),
      dataArr: string[] = [];
    keyArr.slice(1).forEach((key: any, index) => {
      // @ts-ignore
      dataArr.push(this.country?.languages[key]);

      control.push(this.formBuilder.group({
        code: [key, Validators.required],
        // @ts-ignore
        lang: [dataArr[index], Validators.required],
      }));
    });

  }


  initCurrency() {
  //initCurrency returns a group that contains the first language spoken in the country (assumin there is more)

    // @ts-ignore
    let keyArr: any[] = Object.keys(this.country?.currencies),
      dataArr: Aed[] = [];
    keyArr.forEach((key: any) => {
      // @ts-ignore
      dataArr.push(this.country!.currencies[key]);

    });
    return this.formBuilder.group({
      code: [keyArr[0], Validators.required],
      name: [dataArr[0].name, Validators.required],
    });

  }

  fillCurrency() {
    //fillCurrency pushes to the array the rest of the languages spoken in that country without
    // the first one because it was added in initLanguage
    // @ts-ignore
    const control = <FormArray>this.formGroup.controls['currency'];
    // @ts-ignore
    let keyArr: any[] = Object.keys(this.country?.currencies),
      dataArr: Aed[] = [];
    keyArr.slice(1).forEach((key: any, index) => {
      // @ts-ignore
      dataArr.push(this.country?.currencies[key]);

      control.push(this.formBuilder.group({
        code: [key.toString(), Validators.required],
        // @ts-ignore
        name: [dataArr[index].name, Validators.required],
      }));
    });

  }

  addCurrency() {
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

  addLanguage() {
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

  save(formData: any) {
    console.log(formData);
    console.log(this.country);
    var object = formData['language'].reduce(
      (obj: any, item: { code: string; lang: string; }) => Object.assign(obj, { [item.code]: item.lang }), {});

    console.log(object);

   // @ts-ignore
   this.countryCopy = {...this.country};

   // @ts-ignore
   this.countryCopy?.languages=object;
   this.store.dispatch(updateCountries({country: this.countryCopy}));
  }

  getLangLength() {
    // @ts-ignore
    return Object.keys(this.country!.languages).length
  }

  getCurrenciesLength() {
    // @ts-ignore
    return Object.keys(this.country!.currencies).length
  }

  onSelect(border: Country) {
    this.router.navigate(['/countries/details', border.cca3],);
  }


}


