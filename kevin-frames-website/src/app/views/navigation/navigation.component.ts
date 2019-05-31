import { AuthenticationService } from './../../authentication/authentication.service';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit, AfterViewInit {

  constructor(public auth: AuthenticationService) { }

  ngOnInit() {
    let token = localStorage.getItem('token');
    if(token) {
      $('#logoutBtn').toggleClass('hidden');
    }
  }

  ngAfterViewInit() {
  }

  onLogout() {
    localStorage.clear();
  }

}
