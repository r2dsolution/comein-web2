import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { map, Observable } from 'rxjs';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class OtaService {

  constructor(
    private http: HttpClient
  ) {

  }

  getOtaDashboard(dateFrom, dateTo): Observable<any> {
    return this.http.post(`${environment.host}/dashboards`, {
      "dashboard_id": 1,
      "date_from": moment(new Date(dateFrom)).format('YYYY-MM-DD').toString(),
      "date_to":  moment(new Date(dateTo)).format('YYYY-MM-DD').toString()
    }).pipe(
      map((res)=>{
        return res[0];
      })
    )
  }

  getOtaFeed(page, size, startDate: string, endDate: string): Observable<any> {
    return this.http.get(`${environment.host}/ota-bookings`, {
      params: {
        page: page,
        size: size,
        startDate:  moment(new Date(startDate)).format('YYYY-MM-DD').toString() || '',
        endDate: moment(new Date(endDate)).format('YYYY-MM-DD').toString() || ''
      }
    }).pipe(
      map((res: any) => {
        res.datas.map(element => {
          // console.log(element.createdDate.join('/'));
          element.createdDate = moment(element.createdDate.join('/'), 'YYYY/MM/DD/hh/mm/ss').toDate();
        });
        return res;
      })
    )
  }

  getOtaDetail(otaId): Observable<any> {
    return this.http.get(`${environment.host}/ota-bookings/${otaId}`).pipe(
      map((res: any) => {
        res.createdDate = moment(res.createdDate.join('/'), 'YYYY/MM/DD/hh/mm/ss').toDate();
        return res;
      })
    );
  }

  reMatch(id: number, hotelId: any, otaObj): Observable<any> {
    return this.http.post(`${environment.host}/ota-bookings/manual`, {
      ...otaObj,
      id: id,
      hotelId: hotelId
    })
  }

  unMatch(id: number, hotelId: any, otaObj): Observable<any> {
    return this.http.post(`${environment.host}/ota-bookings/manual`, {
      ...otaObj,
      id: id,
      hotelId: hotelId
    })
  }

}
