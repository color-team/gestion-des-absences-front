import { JFerieRtt } from './../models/JFerieRtt';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
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
export class AjoutJourFerieRttService {

  constructor(private http: HttpClient) { }

  getListType(): Observable<string[]> {
    return this.http.get<string[]>(`${environment.baseUrl}${environment.apiJFerieRtt}/type`);
  }

  postJFerieRtt(newJFerieRtt: JFerieRtt): Observable<JFerieRtt> {
    return this.http.post<JFerieRtt>(`${environment.baseUrl}${environment.apiJFerieRtt}`, newJFerieRtt, httpOptions);
  }
}
