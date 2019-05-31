import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private isAuthenticated = false;
  private token: string;
  private tokenTimer: any;
  private userId: string;
  private authStatusListener = new Subject<boolean>();

  constructor(private http: HttpClient, private router: Router) { }

  getToken() {
    return this.token;
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  getUserId() {
    return this.userId;
  }

  getAuthStatusListener()
  {
    return this.authStatusListener.asObservable();
  }

  login(user: string, pass: string) {
    let username = user;
    let password = pass;
    console.log(username + ' ' + password);
    let loginArr = {username: username, password: password};
    console.log(loginArr);
    this.http.post<{ token: string, expiresIn: number, userId: string, message: string}>
    ('users/login', loginArr).subscribe((response) => {
      console.log(response.token);
      const token = response.token;
      this.token = token;
      if(token) {
        const expiresInDuration = response.expiresIn;
        this.setAuthTimer(expiresInDuration);
        this.isAuthenticated = true;
        this.userId = response.userId;
        this.authStatusListener.next(true);
        const now = new Date();
        const expirationDate = new Date(now.getTime() + expiresInDuration*1000);
        console.log(expirationDate);
        this.saveAuthData(token, expirationDate, this.userId);
        this.router.navigate(['/homepage']);
      }
      else
      {
        this.router.navigate(['/login']);
      }
    });
  }

  signup(first: string, last: string, user: string, pass: string, date: string) {
    let firstName = first;
    let lastName = last;
    let username = user;
    let password = pass;
    let currentDate = date;
    console.log(firstName + ' ' + lastName + ' ' + username + ' ' + password + ' ' + currentDate);
    let signupArr = {username: username, password: password, firstName: firstName, lastName: lastName, dateJoined: currentDate};
    console.log(signupArr);
    this.http.post<{post_id: string, message: string}>('users/signup', signupArr).subscribe((response) => {
      console.log(response);
      if (response.message === 'Error: User already exists!') {
        alert('This username is already in use!');
        if(confirm) {
          location.reload();
        }
      } else {
        console.log(response.message + ', ' + response.post_id);
        this.router.navigate(['/login']);
      }
    });
  }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    if(!authInformation)
    {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0)
    {
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.userId = authInformation.userId;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }
  }

  private setAuthTimer(duration: number) {
    console.log('Timer is set.  You have: ' + duration);
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  private saveAuthData(token: string, expirationDate: Date, userId: string) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
    localStorage.setItem('userId', userId);
    localStorage.setItem('isAuth', this.isAuthenticated.toString());
  }

  private clearAuthData() {
    localStorage.clear();
  }

  private getAuthData() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');
    const userId = localStorage.getItem('userId');
    if(!token || !expirationDate) {
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate),
      userId: userId
    };
  }

  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    this.userId = null;
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(['/login']);
  }

  // Admin
  setAdmin() {
    localStorage.setItem('isAdmin', true.toString());
  }

  adminLogin(user: string, pass: string) {
    let username = user;
    let password = pass;
    console.log(username + ' ' + password);
    let loginArr = {username: username, password: password};
    console.log(loginArr);
    this.http.post<{ token: string, expiresIn: number, userId: string, message: string}>
    ('admins/login', loginArr).subscribe((response) => {
      console.log(response.token);
      const token = response.token;
      this.token = token;
      if(token) {
        const expiresInDuration = response.expiresIn;
        this.setAuthTimer(expiresInDuration);
        this.isAuthenticated = true;
        this.userId = response.userId;
        this.authStatusListener.next(true);
        const now = new Date();
        const expirationDate = new Date(now.getTime() + expiresInDuration*1000);
        console.log(expirationDate);
        this.saveAuthData(token, expirationDate, this.userId);
        this.setAdmin();
        this.router.navigate(['/homepage']);
      }
      else
      {
        this.router.navigate(['/adminLogin']);
      }
    });
  }

  adminSignup(first: string, last: string, user: string, pass: string, date: string) {
    let firstName = first;
    let lastName = last;
    let username = user;
    let password = pass;
    let currentDate = date;
    console.log(firstName + ' ' + lastName + ' ' + username + ' ' + password + ' ' + currentDate);
    let signupArr = {username: username, password: password, firstName: firstName, lastName: lastName, dateJoined: currentDate};
    console.log(signupArr);
    this.http.post<{post_id: string, message: string}>('admins/signup', signupArr).subscribe((response) => {
      console.log(response);
      if (response.message === 'Error: User already exists!') {
        alert('This username is already in use!');
        if(confirm) {
          location.reload();
        }
      } else {
        console.log(response.message + ', ' + response.post_id);
        this.router.navigate(['/adminLogin']);
      }
    });
  }
}
