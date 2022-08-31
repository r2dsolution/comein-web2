import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Paging } from '../shared/common/PagingModel';

@Injectable({
  providedIn: 'root'
})
export class TourAdminService {

  constructor(
    private http: HttpClient
  ) { }

  getTourAdmins(filters): Observable<Paging>{
    let params:any = {};
    for (const [key, value] of Object.entries(filters)) {
      // console.log(`${key}: ${value}`);
      if(value){
        params[key] = value;
      }
    }
    return this.http.get<Paging>(`${environment.host}/tour-companies`,{params:params})
  }
  createTourAdmin(data): Observable<any>{
    return this.http.post(`${environment.host}/tour-companies`, data)
  }
  getTourAdmin(id): Observable<any>{
    return this.http.get(`${environment.host}/tour-companies/${id}`,)
  }
  updateTourAdmin(data, id): Observable<any>{
    return this.http.put(`${environment.host}/tour-companies/${id}`, data)
  }

  setTourAdminStatus(id, action: string): Observable<any>{
    /*
      action: 'enable', 'disable'
    */
    return this.http.post(`${environment.host}/tour-companies/${id}/${action}`,{});
  }
}
