import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TourService {

  constructor(
    private http: HttpClient
  ) { }

  getTours(filters): Observable<any> {
    let params: any = {};
    for (const [key, value] of Object.entries(filters)) {
      // console.log(`${key}: ${value}`);
      if (value) {
        params[key] = value;
      }
    }
    return this.http.get(`${environment.host}/tours`, { params: params })
  }

  getTour(id: number): Observable<any> {
    return this.http.get(`${environment.host}/tours/${id}`)
  }
  
  createTour(data): Observable<any> {
    return this.http.post(`${environment.host}/tours`,data)
  }
  
  updateTour(data, id: number): Observable<any> {
    return this.http.put(`${environment.host}/tours/${id}`, data)
  }

  // getTourInventory(id:number, startDart): Observable<any>{
  //   return this.http.get(`${environment.host}/tour-inventorys/${id}`)
  // }

  // getTourInventoryDetail(id:number): Observable<any>{
  //   return this.http.post(`${environment.host}/tour-inventorys/${id}`,{})
  // }
}