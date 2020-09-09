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
      evenement = new Evenement(element.type, element.dateDebut, element.dateFin);
      this.evenements.push(evenement);
    });
    return this.evenements;
  }

}
