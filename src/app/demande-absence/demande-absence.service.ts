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

  private messageBooleanAlert = new BehaviorSubject(null);
  currentBooleanAlert = this.messageBooleanAlert.asObservable();

  constructor(private http: HttpClient) { }


  getEnum(): Observable<string[]>{
    return this.http.get<string[]>(`${environment.baseUrl}${environment.apiTypeEnum}`);
  }

  postAbsence(newAbsence: Absence): Observable<Absence> {
    return this.http.post<Absence>(`${environment.baseUrl}${environment.apiAbsences}`, newAbsence, httpOptions);
    /*.pipe(
      retry(1),
      catchError(this.handleError)
  );*/

  }

  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
        // client-side error
        errorMessage = `Error: ${error.error.message}`;
    } else {
        // server-side error
        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(error.message);
    return throwError(errorMessage);
  }

  changeBooleanAlert(b: boolean){
    this.messageBooleanAlert.next(b);
  }
}
