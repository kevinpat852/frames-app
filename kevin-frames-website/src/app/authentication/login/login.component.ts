import { AuthenticationService } from './../authentication.service';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, AfterViewInit {
  loginForm: FormGroup;
  constructor(public auth: AuthenticationService) { }

  ngOnInit() {
    this.createForm();
  }

  private createForm() {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  ngAfterViewInit() {
  }

  onLogin() {
    console.log(this.loginForm.value.username);
    this.auth.login(this.loginForm.value.username, this.loginForm.value.password);
  }
}
