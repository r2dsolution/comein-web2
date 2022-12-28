import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TourBookingService {

  constructor(
    private http: HttpClient
  ) { }

  getTourBooking(filters): Observable<any> {
    let params: any = {};
    for (const [key, value] of Object.entries(filters)) {
      // console.log(`${key}: ${value}`);
      if (value) {
        params[key] = value;
      }
    }
    return this.http.get(`${environment.host}/tour-bookings`, {
      params: params
    })
  }

  getTourBookingDetail(bookingCode: string) {
    return this.http.get(`${environment.host}/tour-bookings/${bookingCode}`);
  }

  cancelTourBooking(bookingCode: string): Observable<any> {
    return this.http.put(`${environment.host}/tour-bookings/cancel`, {
      bookingCode: bookingCode
    });
  }

  changeTourBookingDate(bookingCode: string, date: string): Observable<any> {
    return this.http.put(`${environment.host}/tour-bookings/changedate`, {
      "bookingCode": bookingCode,
      "tourDate": date
    });
  }

  getTourBookingDashboard(dateForm, dateTo): Observable<any> {
    return this.http.post(`${environment.host}/dashboards`, {
      "dashboard_id": 4,
      "date_from": dateForm,
      "date_to": dateTo
    })
  }

  getTourbookingDashboardDetail(companyId, dateForm, dateTo): Observable<any> {
    return this.http.post(`${environment.host}/comein-dashboards/${companyId}`, {
      "date_from": dateForm,
      "date_to": dateTo
    })
  }
  getReceivable(companyId): Observable<any> {
    return this.http.get(`${environment.host}/payable-bookings`, {
      params: {
        companyId
      }
    })
  }
  getReceivableDetail(bookingCode): Observable<any> {
    return this.http.get(`${environment.host}/payable-bookings/${bookingCode}`)
  }

  onSavePayableNote(bookingCode, data) {
    return this.http.post(`${environment.host}/payable-bookings/${bookingCode}`, data)
  }

}


// export class RequestTourBooking {
//   // size: number;
//   // sort: string;
//   // page: number;
//   startDate: string; //2022-06-01
//   endDate: string;
//   bookingCode: string;
//   refName: string;

//   constructor(obj){
//     // this.size = obj.number;
//     // this.sort = obj.string;
//     // this.page = obj.number;
//     this.startDate = obj.string; //2022-06-01
//     this.endDate = obj.string;
//     this.bookingCode = obj.string;
//     this.refName = obj.string;
//   }
// }

// export class RequestPage {
//   // size: number;
//   // sort: string;
//   // page: number;
//   startDate: string; //2022-06-01
//   endDate: string;
//   bookingCode: string;
//   refName: string;

//   constructor(obj){
//     // this.size = obj.number;
//     // this.sort = obj.string;
//     // this.page = obj.number;
//     this.startDate = obj.string; //2022-06-01
//     this.endDate = obj.string;
//     this.bookingCode = obj.string;
//     this.refName = obj.string;
//   }
// }