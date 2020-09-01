import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, from, interval, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DemandeAbsenceService {

  constructor(private http: HttpClient) { }


  getEnum(): Observable<string[]>{
    return this.http.get<string[]>(`${environment.baseUrl}${environment.apiTypeEnum}`);
  }
}
