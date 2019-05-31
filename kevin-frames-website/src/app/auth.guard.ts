import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor( private auth: AuthenticationService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):
    Observable<boolean> | Promise<boolean> | boolean {
    //   const isAuth = this.auth.getIsAuth();
    //   console.log(isAuth);
    //   if(!isAuth)
    //   {
    //     this.router.navigate(['/login']);
    //   }
    // return isAuth;
    let isAuth = localStorage.getItem('isAuth');
    if (isAuth !== 'true') {
      this.router.navigate(['/login']);
    }
    return true;
  }
}
