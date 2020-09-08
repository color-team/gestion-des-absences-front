import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ValidationVM } from '../models/ValidationVM';
import { environment } from 'src/environments/environment';
import { Status } from '../models/Type';

@Injectable({
  providedIn: 'root'
})
export class ValidationDemandeService {

  constructor(private http: HttpClient) { }

  getListAbsence(): Observable<ValidationVM[]> {
    return this.http.get<ValidationVM[]>(`${environment.baseUrl}${environment.apiAbsences}/par-role`, { withCredentials: true });
  }

  modifierAbs(validation: ValidationVM): Observable<ValidationVM> {
    // tslint:disable-next-line: max-line-length
    return this.http.patch<ValidationVM>(`${environment.baseUrl}${environment.apiAbsences}/par-role`, validation, { withCredentials: true });
  }
}
