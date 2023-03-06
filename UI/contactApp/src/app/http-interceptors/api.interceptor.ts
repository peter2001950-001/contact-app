import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AppConfigService } from '../services/app-config.service';

@Injectable({ providedIn: 'root' })
export class ApiInterceptor implements HttpInterceptor {
  constructor(
    private appConfigService: AppConfigService,
    private router: Router
  ) {}

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let url = req.url
    if (req.url.startsWith('https')) {
      return next.handle(req);
    }

    let apiReq = req;
    if (!req.url.includes('assets') && !req.url.includes('config')) {
      const apiUrl = this.appConfigService.config.backend.baseUrl;
      url = `${apiUrl}${req.url}`;
      if (req.url.includes('profile') || req.url.includes('auth') || req.url.includes('media')) {
        url = url.replace('admin', '');
      }
      url = url.replace(/([^:]\/)\/+/g, '$1'); //remove double slash
    }

    apiReq = req.clone({
      url: url
    });
    return next.handle(apiReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error) {
          switch (error.status) {
            case 400:
              //this.router.navigate(['/error']);
              break;
            case 401:
              console.log(error);
              break;
            case 403:
              console.log(error);
              break;
            case 404:
              // this.router.navigate(['/notfound']);
              console.log(error);
              break;
            case 500:
              console.log(error);
              break;
            default:
              console.log(error);
              break;
          }
        }

        return throwError(error);
      })
    );
  }
}
