import { FramesService } from '../frames.service';
import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-wood-frames',
  templateUrl: './wood-frames.component.html',
  styleUrls: ['./wood-frames.component.css']
})
export class WoodFramesComponent implements OnInit, AfterViewInit {

  public framesArr: any[];
  public uniqueArr: any[];
  public isAdmin: any;

  constructor(public frames: FramesService) { }

  ngOnInit() {
    let admin = localStorage.getItem('isAdmin');
    if(admin === 'true') {
      this.isAdmin = true;
    }
  }

  ngAfterViewInit() {
    this.frames.getWooden().subscribe((data) => {
      console.log(data.input);
      this.framesArr = data.input;
      console.log(this.framesArr);
      this.checkAdmin();
    })
  }

  deleteWood(id) {
    console.log(id);
    this.frames.deleteWood(id);
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
