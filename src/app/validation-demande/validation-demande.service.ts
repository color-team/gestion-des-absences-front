import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Absence } from '../models/Absence';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ValidationDemandeService {

  constructor(private http: HttpClient) { }

  getListAbsence(): Observable<Absence[]> {
    return this.http.get<Absence[]>(`${environment.baseUrl}${environment.apiAbsences}/par-pole`, { withCredentials: true });
  }
}
