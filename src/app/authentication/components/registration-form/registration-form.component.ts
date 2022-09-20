import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl,Validators} from "@angular/forms";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Router, ActivatedRoute, ParamMap} from "@angular/router";
import {AuthService} from "../../services/auth-service/auth.service";
@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss']
})
export class RegistrationFormComponent implements OnInit {

  title = 'Create an Account';
  subTitle = 'Sign up now to get started with an account';
  formGroup: any;

  constructor(
    private formBuilder: FormBuilder,
    private modalService: NgbModal,
    private router: Router,
    private authService: AuthService
  ) {}

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


  onSubmit(formData : any) {
    if(formData['role'] == 'user') {
      this.authService.signup(
        {
          Firstname: formData['firstName'],
          Lastname: formData['lastName'],
          Email: formData['email'],
          Password: formData['password'],
          RoleName: formData['role']
        }
      ).subscribe((success: boolean) => {
        if (success) {
          console.log('success');
          alert("account created");
          this.router.navigate(['/authentication/login']);
        } else {
          console.log("failed");
        }
      });
    }
    else{
      console.log("admin");
      this.authService.createAdmin(

        {
          Firstname: formData['firstName'],
          Lastname: formData['lastName'],
          Email: formData['email'],
          Password: formData['password'],
          RoleName: formData['role']
        }
      ).subscribe((success: boolean) => {
        if (success) {
          console.log('success');
          alert("account created");
          this.router.navigate(['/authentication/login']);
        } else {
          console.log("failed");
        }
      });
    }

  }

  change(){
    console.log(this.formGroup.value['role']);
  }
  toggleVisibility(PasswordInput : any){
    if(PasswordInput.type == "password"){
      PasswordInput.type="text";
    }else{
      PasswordInput.type="password";
    }

  }

  get firstName() { return this.formGroup.get('firstName'); }

  get lastName() { return this.formGroup.get('lastName'); }

  get email() { return this.formGroup.get('email'); }

  get password() { return this.formGroup.get('password'); }

  ngOnInit(): void {
    this.formGroup = this.formBuilder.group({
      firstName: ['',[Validators.required, Validators.minLength(3),Validators.maxLength(30)]],
      lastName: ['',[Validators.required, Validators.minLength(3),Validators.maxLength(30)]],
      email: ['',[Validators.required,Validators.pattern(/^\b[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b$/i)]],
      password: ['',[Validators.required, Validators.minLength(8)]],
      role: ['user',[Validators.required]],
      terms: false
    });
  }

}
