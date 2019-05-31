import { AuthenticationService } from './../authentication.service';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {
  adminLoginForm: FormGroup;

  constructor(public auth: AuthenticationService) { }

  ngOnInit() {
    this.createForm();
  }

  private createForm() {
    this.adminLoginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  onAdminLogin() {
    this.auth.adminLogin(this.adminLoginForm.value.username, this.adminLoginForm.value.password);
  }
}
