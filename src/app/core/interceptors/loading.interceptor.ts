import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { BehaviorSubject, finalize, Observable, Subject } from 'rxjs';
import { LoadingService } from '../service/loading.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  serviceCount:number = 0;

  
  constructor(
    private loadingService: LoadingService
  ) {
    
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.serviceCount++;
    this.loadingService.loading.next(true);
    return next.handle(request).pipe(
      finalize(()=>{
        this.serviceCount--;
        if(this.serviceCount === 0){
          this.loadingService.loading.next(false);
        }
      })
    );
  }
}
