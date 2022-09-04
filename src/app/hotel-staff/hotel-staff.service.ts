import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HotelStaffService {

  /*
  [POST] /hotel-staffs         --> สำหรับ Insert
  [GET] /hotel-staffs           --> สำหรับ list
  [GET] /hotel-staffs/{id}    --> สำหรับ view
  [PATCH] /hotel-staffs/{id}/{action}    --> สำหรับ enable/disable, ex. action ['enable'/'disable']
  */

  constructor(
    private http: HttpClient
  ) {

  }

  getHotelStaffs(filters): Observable<any> {
    let params: any = {};
    for (const [key, value] of Object.entries(filters)) {
      // console.log(`${key}: ${value}`);
      if (value) {
        params[key] = value;
      }
    }
    return this.http.get(`${environment.host}/hotel-staffs`, { params: params });
  }

  createHotelStaff(formData): Observable<any> {
    return this.http.post(`${environment.host}/hotel-staffs`, formData);
  }

  getHotelStaff(id): Observable<any> {
    return this.http.get(`${environment.host}/hotel-staffs/${id}`);
  }

  setHotelStaffStatus(id, action: string): Observable<any> {
    /*
      action: 'enable', 'disable'
    */
    return this.http.post(`${environment.host}/hotel-staffs/${id}/${action}`, {});
  }
}
