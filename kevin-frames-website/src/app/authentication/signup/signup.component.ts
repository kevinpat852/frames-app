import { AuthenticationService } from './../authentication.service';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  constructor(public auth: AuthenticationService) { }

  ngOnInit() {
    this.createForm();
  }

  private createForm() {
    this.signupForm = new FormGroup({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }
  onSignup() {
    let date = Date();
    this.auth.signup(this.signupForm.value.firstName, this.signupForm.value.lastName,
      this.signupForm.value.username, this.signupForm.value.password, date.toString());
  }
}
