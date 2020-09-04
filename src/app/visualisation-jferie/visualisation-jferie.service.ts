import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';
import { JFerieRtt } from '../models/JFerieRtt';


@Injectable({
  providedIn: 'root'
})
export class VisualisationJferieService {

  constructor(private http: HttpClient) { }

  getListAnnee(): Observable<string[]> {
    return this.http.get<string[]>(`${environment.baseUrl}${environment.apiJferies}/annees`, { withCredentials: true });
  }

  getListJFerieRtt(annee: string): Observable<JFerieRtt[]> {
    return this.http.get<JFerieRtt[]>(`${environment.baseUrl}${environment.apiJferies}/${annee}`, { withCredentials: true });
  }
}
