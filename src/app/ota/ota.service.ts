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

  getOtaFeed(page, size, startDate: string, endDate: string): Observable<any> {
    return this.http.get(`${environment.host}/ota-bookings`, {
      params: {
        page: page,
        size: size,
        startDate: startDate || '',
        endDate: endDate || ''
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
      id:id,
      hotelId: hotelId
    })
  }

  unMatch(id: number, hotelId: any, otaObj): Observable<any> {
    return this.http.post(`${environment.host}/ota-bookings/manual`, {
      ...otaObj,
      id:id,
      hotelId: hotelId
    })
  }

}
