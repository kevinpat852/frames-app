import { AccessoriesService } from '../accessories.service';
import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-accessories',
  templateUrl: './accessories.component.html',
  styleUrls: ['./accessories.component.css']
})
export class AccessoriesComponent implements OnInit, AfterViewInit {

  public accessoryArr: any[];
  public isAdmin: any;

  constructor(public accessories: AccessoriesService) { }

  ngOnInit() {
    let admin = localStorage.getItem('isAdmin');
    if(admin === 'true') {
      this.isAdmin = true;
    }
  }

  ngAfterViewInit() {
    this.accessories.getAccessories().subscribe((data) => {
      console.log(data.input);
      this.accessoryArr = data.input;
      console.log(this.accessoryArr);
      this.checkAdmin();
    })
  }

  deleteAccessory(id) {
    console.log(id);
    this.accessories.deleteAccessory(id);
  }

  checkAdmin() {
    let admin = localStorage.getItem('isAdmin');
    console.log(admin);
    let button = document.getElementsByName('deleteBtn');
    console.log(button);
    if(admin === 'true') {
      console.log('Is an admin.');
      $('deleteBtn').toggleClass('hidden');
    }
    else {
      console.log('Not an admin.');
    }
  }

}
