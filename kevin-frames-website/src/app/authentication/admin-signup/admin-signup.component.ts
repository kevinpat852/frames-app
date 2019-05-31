import { AuthenticationService } from './../authentication.service';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin-signup',
  templateUrl: './admin-signup.component.html',
  styleUrls: ['./admin-signup.component.css']
})
export class AdminSignupComponent implements OnInit {
  adminSignupForm: FormGroup;

  constructor(public auth: AuthenticationService) { }

  ngOnInit() {
    this.createForm();
  }

  private createForm() {
    this.adminSignupForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  onAdminSignup() {
    let date = Date();
    this.auth.adminSignup(this.adminSignupForm.value.firstName, this.adminSignupForm.value.lastName,
      this.adminSignupForm.value.username, this.adminSignupForm.value.password, date.toString());
  }
}
