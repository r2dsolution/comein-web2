import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { catchError, map, Observable, switchMap, throwError } from 'rxjs';
import { Auth } from 'aws-amplify';
import { AuthService } from '../auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class HttpInterceptorInterceptor implements HttpInterceptor {

  constructor(
    private auth: AuthService,
    private matSnackBar: MatSnackBar
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authRequest = request.clone({
      setHeaders:{
        'userToken': this.auth.userToken || '',
        'comein_auth': this.auth.userToken || ''
      }
    })
    return next.handle(authRequest).pipe(
      map((req: HttpEvent<any>) => {
        return req;
      }),
      catchError((error)=>{
        console.error(error);
        if(error){
          if(error.error.cause){
            this.matSnackBar.open(`${error.error.cause.message}`, 'close', { duration: 5000 });
          }else if(error.error){
            this.matSnackBar.open(`${error.error.message}`, 'close', { duration: 5000 });
          }else{
            this.matSnackBar.open(`${error.message}`, 'close', { duration: 5000 });
          }
        }else{
          this.matSnackBar.open(`Server error please try again later.`, 'close', { duration: 5000 });
        }
        return throwError(() => error);
      })
    );
  }
}
