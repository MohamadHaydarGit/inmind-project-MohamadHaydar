import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl,Validators} from "@angular/forms";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  title = "Log in to your Account";
  subTitle = "Welcome back please enter your details";
  formGroup : any;

  constructor(
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      email: ['',[Validators.required,Validators.pattern(/^\b[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b$/i)]],
      password: ['',[Validators.required, Validators.minLength(8)]],
      check:'',
      terms: false
    });
  }
  checkIfEmpty (input : string) : boolean {
    // @ts-ignore
    return this.formGroup.get(input).errors && this.formGroup.get(input).hasError('required');
  }

  checkIfValid (input : string) : boolean {
    // @ts-ignore
    return this.formGroup.get(input).valid && (this.formGroup.get(input).dirty || this.formGroup.get(input).touched);
  }

  checkIfInvalid (input : string) : boolean {
    // @ts-ignore
    return this.formGroup.get(input).invalid && (this.formGroup.get(input).dirty || this.formGroup.get(input).touched);
  }

  toggleVisibility(PasswordInput : any){
    if(PasswordInput.type == "password"){
      PasswordInput.type="text";
    }else{
      PasswordInput.type="password";
    }

  }

  onSubmit(formData : any) {
    //TODO: Authentication

    var name = formData['email'];
    console.log(name);
    console.log(formData['check']);
    this.router.navigate(['/countries']);

  }

  get email() { return this.formGroup.get('email'); }

  get password() { return this.formGroup.get('password'); }

}
