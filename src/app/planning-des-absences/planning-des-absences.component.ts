import { element } from 'protractor';
import { JourFerieRtt } from './../models/JourFerieRtt';
import { Absence } from './../models/Absence';
import { Component, OnInit, ViewChild } from '@angular/core';
import {CalendarOptions} from '@fullcalendar/angular';
import frLocale from '@fullcalendar/core/locales/fr';
import { Collegue } from './../auth/auth.domains';
import { AuthService } from '../auth/auth.service';
import {PlanningDesAbsencesService} from './planning-des-absences.service';
import {EvenementService} from './evenement.service';
import { CalendarComponent } from 'ng-fullcalendar';
import * as $ from 'jquery';

@Component({
  selector: 'app-planning-des-absences',
  templateUrl: './planning-des-absences.component.html',
  styleUrls: ['./planning-des-absences.component.scss']
})
export class PlanningDesAbsencesComponent implements OnInit {
  calendarOptions: CalendarOptions;
  @ViewChild('fullcalendar') fullcalendar: CalendarComponent;

  constructor(private authSrv: AuthService, private dataServPlanAbs: PlanningDesAbsencesService, private Evenementservice: EvenementService) { }

  listAbsCoupleMoisAnnee: Absence[];
  listJFerieRtt: JourFerieRtt[];
  listeEvenements = [];
  collegueConnecte: Collegue;

  ngOnInit(): void {
    this.listAbsCoupleMoisAnnee = [];
    this.listJFerieRtt = [];
    this.listeEvenements = [];



    this.authSrv.verifierAuthentification().subscribe(
      v => this.collegueConnecte = v,
      err => {},
      () => {}
    );

    this.dataServPlanAbs.getAbsences().subscribe(
      vAbsP => {this.listAbsCoupleMoisAnnee = vAbsP;
        this.listeEvenements = this.Evenementservice.getListAbsence(this.listAbsCoupleMoisAnnee);
        console.log(this.listeEvenements);
      },
      err => { },
      () => { }
    );

    this.dataServPlanAbs.getJFerieRtt().subscribe(
      vRttP => this.listJFerieRtt = vRttP,
      err => { },
      () => { }
    );
    this.calendarOptions = {

      initialView: 'dayGridMonth',
      locale: frLocale,

      headerToolbar : {
        left : 'prevYear prev',
        center : 'title',
        right : 'next nextYear'
      }

    };


  }

}

/* 1) Créer un modèle Evenement.ts :

export interface Evenement {
  id: int;
  title: string;
  start: string;
  end: string;
}

2) Crerer un service

=> objectif générer la liste d'evenements []
initialiser une liste vide "evenements"
1- récuperer la liste  d'absences
2- boucle sur la liste d'absences:
  - créer un objet à partir du model evenement -> new Evenement(absence.getId(), absence.getType(), absence.getDateDebut, absence.getDateFin)
  - liste_evenment.add(objetModelisé);
*/
