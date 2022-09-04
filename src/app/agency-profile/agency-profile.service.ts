import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AgencyProfileService {

  constructor(
    private http: HttpClient
  ) { }

  getTourCompany(id): Observable<any>{
    return this.http.get(`${environment.host}/tour-companies/${id}`)
  }
  updateTourCompany(id, data): Observable<any>{
    return this.http.put(`${environment.host}/tour-companies/${id}`,data)
  }
}
