import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PayableCompanyService {

  constructor(
    private http: HttpClient
  ) { }

  getPayableCompany(companyId: number): Observable<any> {
    // let params: any = {};
    // for (const [key, value] of Object.entries(filters)) {
    //   // console.log(`${key}: ${value}`);
    //   if (value) {
    //     params[key] = value;
    //   }
    // }
    return this.http.get(`${environment.host}/payable-companies/${companyId}`)
  }
  
  
  payToCompany(companyId, data): Observable<any>{
    return this.http.post(`${environment.host}/payable-companies/${companyId}`, data)
  }
}
