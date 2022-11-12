import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(
    private http: HttpClient
  ) { }

  updateTourProfiles(data): Observable<any> {
    return this.http.put(`${environment.host}/tour-companies/profiles`, data);
  }
}
