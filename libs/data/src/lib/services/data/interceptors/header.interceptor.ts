import { Injectable } from '@angular/core';
import {
  HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';

@Injectable()
export class DataServiceHeaderInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // Clone the request and set the new header in one step.
    // const dsReq = req.clone({ setHeaders: { 'Content-Type': `application/json` } });

    // send cloned request with header to the next handler.
    return next.handle(req);
  }
}