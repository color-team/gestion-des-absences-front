import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { JFerieRtt } from './../models/JFerieRtt';
import { Evenement } from './../models/Evenement';
import { Injectable } from '@angular/core';
import { PlanningDesAbsencesComponent } from './planning-des-absences.component';
import { Absence } from '../models/Absence';
import { EventSourceInput } from '@fullcalendar/angular';

@Injectable({
  providedIn: 'root'
})
export class EvenementService {

evenements: Evenement[];

constructor() { }


getListAbsence(listAbsCoupleMoisAnnee: Absence[]
  ){
    this.evenements = [];

    listAbsCoupleMoisAnnee.forEach(element => {
      let evenement: Evenement;
      var resDeb = element.dateDebut.split('-');
      var startDate: NgbDate = new NgbDate(parseInt(resDeb[0]), parseInt(resDeb[1]), parseInt(resDeb[2]));
      var resFin = element.dateDebut.split('-');
      var endDate: NgbDate = new NgbDate(parseInt(resFin[0]), parseInt(resFin[1]), parseInt(resFin[2]));
      evenement = new Evenement(element.type, startDate, endDate);
      this.evenements.push(evenement);
    });
    return this.evenements;
  }

}
