import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class FramesService {

  constructor(private http: HttpClient, private router: Router) { }

  getWooden() {
    return this.http.get<{message: string, input: any}>('frames/getWooden');
  }

  getMetal() {
    return this.http.get<{message: string, input: any}>('frames/getMetal');
  }

  deleteWood(id: string) {
    let woodId = id;
    console.log(woodId);
    this.http.delete<{message: string}>("frames/deleteWooden/" + woodId).subscribe(response => {
      console.log(response.message);
      location.reload();
    })
  }

  deleteMetal(id: any) {
    let metalId = id;
    console.log(metalId);
    this.http.delete<{message: string}>("frames/deleteMetal/" + metalId).subscribe(response => {
      console.log(response.message);
      location.reload();
    })
  }
}
