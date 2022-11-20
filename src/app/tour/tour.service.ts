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
    return this.http.post(`${environment.host}/tours`, data)
  }

  updateTour(data, id: number): Observable<any> {
    return this.http.put(`${environment.host}/tours/${id}`, data)
  }

  getTourBookingDashboard(tourCompanyId, dateForm, dateTo): Observable<any> {
    return this.http.post(`${environment.host}/dashboards`, {
      "dashboard_id": 2,
      "tour_company_id": tourCompanyId,
      "date_from": dateForm,
      "date_to": dateTo
    })
  }

  getTourPaymentDashboardPeriod(tourCompanyId): Observable<any> {
    return this.http.post(`${environment.host}/tour-dashboards/${tourCompanyId}/periods`,{})
  }

  getTourPaymentDashboard(tourCompanyId, periodId): Observable<any> {
    return this.http.post(`${environment.host}/tour-pay-dashboards/${periodId}`,{})
  }

  getTourPaymentDashboardDetail(tourId, periodId): Observable<any> {
    return this.http.post(`${environment.host}/tour-pay-dashboards/${periodId}/${tourId}`,{})
  }

  getTourBookingDashboardDetail(tourCompanyId, date){
    return this.http.post(`${environment.host}/tour-dashboards/${tourCompanyId}`,{
      tour_date: date
    })
  }

  getTourPaymentConditions(): Observable<any> {
    return this.http.get(`${environment.host}/payment-conditions`)
  }
  
  getTourPaymentCondition(companyId): Observable<any> {
    return this.http.get(`${environment.host}/payment-conditions/${companyId}`)
  }

  getTourTopupRates(): Observable<any> {
    return this.http.get(`${environment.host}/topuprates`)
  }

  getTourTopupRate(companyId): Observable<any> {
    return this.http.get(`${environment.host}/topuprates/${companyId}`)
  }

  updateTourPaymentConditions(data): Observable<any> {
    console.log(data);
    return this.http.post(`${environment.host}/payment-conditions`, data)
  }

  updateTourPaymentCondition(data): Observable<any> {
    console.log(data);
    return this.http.post(`${environment.host}/payment-conditions/${data.companyId}`, data)
  }

  updateTourTopupRates(data): Observable<any> {
    console.log(data);
    return this.http.post(`${environment.host}/topuprates`, data)
  }

  updateTourTopupRate(data, companyId): Observable<any> {
    console.log(data);
    return this.http.post(`${environment.host}/topuprates/${companyId}`, data)
  }

  // getTourInventory(id:number, startDart): Observable<any>{
  //   return this.http.get(`${environment.host}/tour-inventorys/${id}`)
  // }

  // getTourInventoryDetail(id:number): Observable<any>{
  //   return this.http.post(`${environment.host}/tour-inventorys/${id}`,{})
  // }
}