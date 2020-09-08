import { environment } from './../environments/environment.prod';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient) { }

  getTraitementDeNuit(): Observable<void> {
    return this.http.get<void>(`${environment.baseUrl}${environment.apiTraitementNuit}`, {withCredentials: true});
  }
}
