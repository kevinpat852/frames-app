import { FramesService } from './../frames.service';
import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-metal-frames',
  templateUrl: './metal-frames.component.html',
  styleUrls: ['./metal-frames.component.css']
})
export class MetalFramesComponent implements OnInit, AfterViewInit {

  public framesArr: any[];
  public isAdmin: any;

  constructor(public frames: FramesService) { }

  ngOnInit() {
    let admin = localStorage.getItem('isAdmin');
    if(admin === 'true') {
      this.isAdmin = true;
    }
  }

  ngAfterViewInit() {
    this.frames.getMetal().subscribe((data) => {
      console.log(data.input);
      this.framesArr = data.input;
      console.log(this.framesArr);
      this.checkAdmin();
    })
  }

  deleteMetal(id) {
    console.log(id);
    this.frames.deleteMetal(id);
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
