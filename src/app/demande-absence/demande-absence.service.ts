import { retry, catchError } from 'rxjs/operators';
import { Absence } from './../models/Absence';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, interval, Subject, BehaviorSubject } from 'rxjs';
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

  private messageBooleanAlert = new BehaviorSubject(false);
  currentBooleanAlert = this.messageBooleanAlert.asObservable();

  constructor(private http: HttpClient) { }


  getEnum(): Observable<string[]> {
    return this.http.get<string[]>(`${environment.baseUrl}${environment.apiTypeEnum}`);
  }

  postAbsence(newAbsence: Absence): Observable<Absence> {
    return this.http.post<Absence>(`${environment.baseUrl}${environment.apiAbsences}`, newAbsence, httpOptions);

  }

  updateAbsence(updateAbsValues: Absence): Observable<void> {
    return this.http.patch<void>(`${environment.baseUrl}${environment.apiAbsences}`, updateAbsValues, httpOptions);
  }

  changeBooleanAlert(b: boolean) {
    this.messageBooleanAlert.next(b);
  }
}
