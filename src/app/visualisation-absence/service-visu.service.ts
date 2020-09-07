import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Absence } from '../models/Absence';

// pour le post
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class ServiceVisuService {

  private messageSource = new BehaviorSubject(null);
  currentMessage = this.messageSource.asObservable();

  constructor(private http: HttpClient) { }

  getListAbsences(): Observable<Absence[]> {
    return this.http.get<Absence[]>(`${environment.baseUrl}${environment.apiAbsences}`, { withCredentials: true });
  }

  supprAbsence(uuid: string): Observable<void> {
    return this.http.delete<void>(`${environment.baseUrl}${environment.apiAbsences}/${uuid}`, { withCredentials: true });
  }

  changeMessage(abs: Absence): void {
    this.messageSource.next(abs);
  }
}
