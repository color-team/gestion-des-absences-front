import { Absence } from './../models/Absence';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, from, interval, Subject } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};



@Injectable({
  providedIn: 'root'
})
export class DemandeAbsenceService {

  constructor(private http: HttpClient) { }


  getEnum(): Observable<string[]>{
    return this.http.get<string[]>(`${environment.baseUrl}${environment.apiTypeEnum}`);
  }

  postAbsence(newAbsence: Absence): Observable<Absence> {
    console.log("postabs");
    console.log(newAbsence);
    return this.http.post<Absence>(`${environment.baseUrl}${environment.apiAbsences}`, newAbsence, httpOptions);
  }
}
