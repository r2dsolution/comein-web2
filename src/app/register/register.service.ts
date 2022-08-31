import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(
    private http: HttpClient
  ) { }

  hotelAdminRegister(formData: HotelRegister): Observable<any> {
    return this.http.post(`${environment.host}/hotel-admins`, formData);
  }

  tourAdminRegister(formData: HotelRegister): Observable<any> {
    return this.http.post(`${environment.host}/tour-companies`, formData);
  }

  getUserByRef(refNo: string): Observable<any> {
    return this.http.post(`${environment.host}/users/ref`, {
      refNo: refNo
    });
  }

  signUp(refNo, email, userToken): Observable<any> {
    return this.http.post(`${environment.host}/users/signup`, {
      refNo:  refNo,
      email: email,
      userToken: userToken
    });
  }

  getPersonalConsent(token: string, secretCode: string): Observable<any>{
    return this.http.post(`${environment.host}/personals/consents`, {
      token: token,
      secretCode: secretCode
    })
  }
}

export interface HotelRegister {
  address: string,
  contactName: string,
  hotelName: string,
  mobileNo: string,
  username: string,
}