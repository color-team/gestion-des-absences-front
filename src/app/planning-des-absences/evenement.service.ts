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

  constructor() { }


  getListAbsence(listAbsCoupleMoisAnnee: Absence[]
  ) {
    this.evenements = [];

    listAbsCoupleMoisAnnee.forEach(element => {
      let evenement: Evenement;
      const resDeb = element.dateDebut.split('-');
      const startDate: NgbDate = new NgbDate(parseInt(resDeb[0], 0), parseInt(resDeb[1], 0), parseInt(resDeb[2], 0));
      const resFin = element.dateDebut.split('-');
      const endDate: NgbDate = new NgbDate(parseInt(resFin[0], 0), parseInt(resFin[1], 0), parseInt(resFin[2], 0));
      evenement = new Evenement(element.type, startDate, endDate);
      this.evenements.push(evenement);
    });
    return this.evenements;
  }

}
