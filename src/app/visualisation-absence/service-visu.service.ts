import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
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

  constructor(private http: HttpClient) { }

  getListAbsences(): Observable<Absence[]> {
    return this.http.get<Absence[]>(`${environment.baseUrl}${environment.apiAbsences}`, { withCredentials: true });
  }
}
