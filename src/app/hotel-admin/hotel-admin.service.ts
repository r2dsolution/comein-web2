import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Paging } from '../shared/common/PagingModel';

@Injectable({
  providedIn: 'root'
})
export class HotelAdminService {

  constructor(
    private http: HttpClient
  ) { }

  getHotelAdmins(filters): Observable<Paging> {
    let params:any = {};
    for (const [key, value] of Object.entries(filters)) {
      // console.log(`${key}: ${value}`);
      if(value){
        params[key] = value;
      }
    }
    console.log(params);
    // let params = filter
    return this.http.get<Paging>(`${environment.host}/hotel-admins`,{params: params});
  }

  getHotelAdmin(id): Observable<any>{
    return this.http.get(`${environment.host}/hotel-admins/${id}`)
  }

  createHotelAdmin(formDate): Observable<any>{
    return this.http.post(`${environment.host}/hotel-admins`, formDate);
  }

  setHotelAdminStatus(id, action: string): Observable<any>{
    /*
      action: 'enable', 'disable'
    */
    return this.http.post(`${environment.host}/hotel-admins/${id}/${action}`,{});
  }
}
