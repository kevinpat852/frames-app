import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication/authentication.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authSer: AuthenticationService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const authToken = this.authSer.getToken();
    const authRequest = req.clone({
      headers: req.headers.set('Authorization', 'Bearer' + authToken)
    });
    return next.handle(authRequest);
  }
}
