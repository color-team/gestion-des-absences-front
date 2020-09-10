import { EventJFerieRtt } from './../models/EventJFerieRtt';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { JFerieRtt } from './../models/JFerieRtt';
import { Evenement } from './../models/Evenement';
import { Injectable } from '@angular/core';
import { Absence } from '../models/Absence';

@Injectable({
  providedIn: 'root'
})
export class EvenementService {

evenements: Evenement[];
jourFerie: EventJFerieRtt[];

  constructor() { }


  getListAbsence(listAbsCoupleMoisAnnee: Absence[]
  ) {
    this.evenements = [];

    listAbsCoupleMoisAnnee.forEach(element => {
      let evenement: Evenement;
      const resDeb = element.dateDebut.split('-');
      const startDate: NgbDate = new NgbDate(parseInt(resDeb[0], 0), parseInt(resDeb[1], 0), parseInt(resDeb[2], 0));
      const resFin = element.dateFin.split('-');
      const endDate: NgbDate = new NgbDate(parseInt(resFin[0], 0), parseInt(resFin[1], 0), parseInt(resFin[2], 0));
      evenement = new Evenement(element.type, element.dateDebut, element.dateFin);
      this.evenements.push(evenement);
    });
    return this.evenements;
  }

getListJFerieRtt(listJFerieRtt: JFerieRtt[]){
  this.jourFerie = [];

  listJFerieRtt.forEach(element => {
    let evenement: EventJFerieRtt;
    // tslint:disable-next-line: max-line-length
    evenement = new EventJFerieRtt (element.type, new NgbDate(element.date.getFullYear(), element.date.getMonth(), element.date.getDay()), element.backgroundColor);

    this.jourFerie.push(evenement);
  });
  return this.jourFerie;
}

}
