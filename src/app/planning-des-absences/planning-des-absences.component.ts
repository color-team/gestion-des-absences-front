import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { JFerieRtt } from './../models/JFerieRtt';
import { Absence } from './../models/Absence';
import { Component, OnInit, ViewChild } from '@angular/core';
import frLocale from '@fullcalendar/core/locales/fr';
import { Collegue } from './../auth/auth.domains';
import { AuthService } from '../auth/auth.service';
import {PlanningDesAbsencesService} from './planning-des-absences.service';
import {EvenementService} from './evenement.service';
import {CalendarOptions } from '@fullcalendar/angular';

@Component({
  selector: 'app-planning-des-absences',
  templateUrl: './planning-des-absences.component.html',
  styleUrls: ['./planning-des-absences.component.scss']
})
export class PlanningDesAbsencesComponent implements OnInit {
  calendarOptions: CalendarOptions;

  // tslint:disable-next-line: max-line-length
  constructor( private authSrv: AuthService, private dataServPlanAbs: PlanningDesAbsencesService, private Evenementservice: EvenementService) {
  }

  listAbsCoupleMoisAnnee: Absence[];
  listJFerieRtt: JFerieRtt[];
  listeEvenements = [];
  listEventJFRtt = [];
  collegueConnecte: Collegue;

  ngOnInit(): void {
    this.listAbsCoupleMoisAnnee = [];
    this.listJFerieRtt = [];
    this.listeEvenements = [];
    this.listEventJFRtt = [];


    this.authSrv.verifierAuthentification().subscribe(
      v => this.collegueConnecte = v,
      err => { },
      () => { }
    );

    this.dataServPlanAbs.getAbsences().subscribe(
      vAbsP => {
        this.listAbsCoupleMoisAnnee = vAbsP;
        this.listeEvenements = this.Evenementservice.getListAbsence(this.listAbsCoupleMoisAnnee);
        console.log(this.listeEvenements);
        this.calendarOptions.events = this.listeEvenements;
      },
      err => { },
      () => { }
    );

    this.dataServPlanAbs.getJFerieRtt().subscribe(
      vRttP => {
        this.listJFerieRtt = vRttP;
        this.listEventJFRtt = this.Evenementservice.getListJFerieRtt(this.listJFerieRtt);
        console.log(this.listEventJFRtt);
        this.calendarOptions.events = this.listEventJFRtt;
    },
      err => { },
      () => { }
    );

    this.calendarOptions = {
      initialView: 'dayGridMonth',
      locale: frLocale,
      eventColor: 'green',

      events: [],

      headerToolbar: {
        left: 'prevYear,prev',
        center: 'title',
        right: 'next,nextYear'
      }
    };
  }
}
