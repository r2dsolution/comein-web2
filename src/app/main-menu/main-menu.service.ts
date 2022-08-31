import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthService } from '../core/auth/auth.service';
@Injectable({
  providedIn: 'root'
})
export class MainMenuService {

  constructor(
    private http: HttpClient,
    private auth: AuthService
  ) { }

  // getUserInfo(): Observable<any> {
  //   return this.http.post(`${environment.host}/users/info`, {
  //     userToken: this.auth.userToken
  //   });
  // }
}
