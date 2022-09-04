import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Paging } from '../shared/common/PagingModel';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  constructor(
    private http: HttpClient
  ) { }

  getHotelBookings(filters): Observable<Paging> {
    let params: any = {};
    for (const [key, value] of Object.entries(filters)) {
      // console.log(`${key}: ${value}`);
      if (value) {
        params[key] = value;
      }
    }
    console.log(params);
    // let params = filter
    return this.http.get<Paging>(`${environment.host}/bookings`, { params: params });
  }

  getHotelBooking(id): Observable<any> {
    return this.http.get(`${environment.host}/bookings/${id}`)
  }

  createHotelBooking(formDate): Observable<any> {
    return this.http.post(`${environment.host}/bookings`, formDate);
  }

  setHotelBookingStatus(id: string, email: string): Observable<any> {
    /*
      action: 'enable', 'disable'
    */
    return this.http.post(`${environment.host}/bookings/${id}/invited`, {
      email
    });
  }

  getBookingVisitors(id): Observable<any> {
    return this.http.post(`${environment.host}/bookings/visitors`, {
      id
    });
  }

  bookingVisitorConfirm(id, consentId): Observable<any> {
    return this.http.put(`${environment.host}/bookings/visitors/confirm`, {
      id,
      consentId
    });
  }

  bookingComplete(id): Observable<any> {
    return this.http.put(`${environment.host}/bookings/complete`, {
      id,
    });
  }
}
