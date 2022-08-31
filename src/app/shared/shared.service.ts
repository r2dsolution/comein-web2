import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthService } from '../core/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(
    private http: HttpClient,
    private auth: AuthService
  ) { }

  getCountries(): Observable<any>{
    return this.http.get(`${environment.host}/countries`)
  }

  getProvinces(countryCode): Observable<any>{
    return this.http.get(`${environment.host}/provinces/${countryCode}`);
  }

  getPersonalInfo(comeinId: string): Observable<any>{
    return this.http.post(`${environment.host}/personals/info`,{ ownerId: comeinId });
  }

  getUserInfo(): Observable<any> {
    return this.http.post(`${environment.host}/users/info`, {
      userToken: this.auth.userToken
    });
  }
  
  uploadFile(file: File, module: string): Observable<UploadResponse>{
    // console.log(file.name);
    // return of(file.name).pipe(delay(1000));
    const formData = new FormData();
    formData.append('file', file);
    formData.append('module', module);
    return this.http.post<UploadResponse>(`${environment.host}/files`, formData);
  }

  deleteFile(fileName: string, module: string): Observable<any>{
    return this.http.post(`${environment.host}/files`, {
      module,
      fileName
    });
  }
}


interface UploadResponse{
  fileName: string;
  message: string;
  module: string;
}