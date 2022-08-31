import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InventoryService {

  constructor(
    private http: HttpClient
  ) { }

  getInventories(tourID: string, startDate, endDate): Observable<any>{
    return this.http.get(`${environment.host}/tour-inventorys/${tourID}`,{
      params:{
        startDate,
        endDate
      }
    });
  }
  
  createInventory(tourID,data): Observable<any>{
    return this.http.post(`${environment.host}/tour-inventorys/${tourID}`,data);
  }

  updateInventory(tourID,data): Observable<any>{
    return this.http.put(`${environment.host}/tour-inventorys/${tourID}`,data);
  }
}
