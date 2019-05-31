import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AccessoriesService {

  constructor(private http: HttpClient) { }

  getAccessories() {
    return this.http.get<{message: string, input: any}>('accessories/getAccessories');
  }

  deleteAccessory(id: any) {
    let accessId = id;
    console.log(accessId);
    this.http.delete<{message: string}>("accessories/deleteAccessory/" + accessId).subscribe(response => {
      console.log(response.message);
      location.reload();
    })
  }
}
