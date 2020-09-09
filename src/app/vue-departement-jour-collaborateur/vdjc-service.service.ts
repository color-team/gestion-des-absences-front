import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Absence } from '../models/Absence';
import { JFerieRtt } from '../models/JFerieRtt';

@Injectable({
  providedIn: 'root'
})
export class VdjcServiceService {

  constructor(private http: HttpClient) { }

  getCurrentMonth(listeMois: any): any{
    let currentDate = new Date().getMonth();

    const moisTrouve = listeMois.find(element => element.Value == currentDate);

    return moisTrouve;
  }

  /*getYearsArray(): any {

    const YEARS = () => {
      const years = []
      const dateStart = moment()
      const dateEnd = moment().add(10, 'y')
      while (dateEnd.diff(dateStart, 'years') >= 0) {
        years.push(dateStart.format('YYYY'))
        dateStart.add(1, 'year')
      }
      return years
     }
  }*/

  getDepartements(): Observable<string[]>{
    return this.http.get<string[]>(`${environment.baseUrl}${environment.apiDepartement}`);
  }

  getAbs(mois: number, annee: number, departement: string): Observable<Absence[]>{

    return this.http.get<Absence[]>(`${environment.baseUrl}${environment.apiAbsences}/${environment.apiAbsValideeMoisAnneeDepartement}?mois=${mois}&annee=${annee}&departement=${departement}`);

    
  }

  getJFeriesRtts(mois: number, annee: number): Observable<JFerieRtt[]>{

    return this.http.get<JFerieRtt[]>(`${environment.baseUrl}${environment.apiJFerieRtt}?mois=${mois}&annee=${annee}`);
    
  }

  
}
