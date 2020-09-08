import { JFerieRtt } from './../models/JFerieRtt';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class VisualisationJferieService {

  private messageSource = new BehaviorSubject(null);
  currentMessage = this.messageSource.asObservable();

  constructor(private http: HttpClient) { }

  getListAnnee(): Observable<string[]> {
    return this.http.get<string[]>(`${environment.baseUrl}${environment.apiJFerieRtt}/annees`, { withCredentials: true });
  }

  getListJFerieRtt(annee: string): Observable<JFerieRtt[]> {
    return this.http.get<JFerieRtt[]>(`${environment.baseUrl}${environment.apiJFerieRtt}/${annee}`, { withCredentials: true });
  }

  deleteJFerieRtt(uuid: string): Observable<void> {
    return this.http.delete<void>(`${environment.baseUrl}${environment.apiJFerieRtt}/${uuid}`, { withCredentials: true });
  }

  changeMessage(jFerieRtt: JFerieRtt): void {
    this.messageSource.next(jFerieRtt);
  }

  updateJFerieRtt(jFerieRtt: JFerieRtt): Observable<JFerieRtt> {
    return this.http.patch<JFerieRtt>(`${environment.baseUrl}${environment.apiJFerieRtt}`, jFerieRtt, { withCredentials: true });
  }
}
