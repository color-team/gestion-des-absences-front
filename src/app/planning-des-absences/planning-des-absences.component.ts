import { JFerieRtt } from './../models/JFerieRtt';
import { Absence } from './../models/Absence';
import { Component, OnInit, ViewChild } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular';
import frLocale from '@fullcalendar/core/locales/fr';
import { Collegue } from './../auth/auth.domains';
import { AuthService } from '../auth/auth.service';
import { PlanningDesAbsencesService } from './planning-des-absences.service';
import { EvenementService } from './evenement.service';
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

  // tslint:disable-next-line: max-line-length
  constructor(private authSrv: AuthService, private dataServPlanAbs: PlanningDesAbsencesService, private Evenementservice: EvenementService) { }

  listAbsCoupleMoisAnnee: Absence[];
  listJFerieRtt: JFerieRtt[];
  listeEvenements = [];
  collegueConnecte: Collegue;

  ngOnInit(): void {
    this.listAbsCoupleMoisAnnee = [];
    this.listJFerieRtt = [];
    this.listeEvenements = [];

    this.authSrv.verifierAuthentification().subscribe(
      v => this.collegueConnecte = v,
      err => { },
      () => { }
    );

    this.dataServPlanAbs.getAbsences().subscribe(
      vAbsP => {
        this.listAbsCoupleMoisAnnee = vAbsP;
        this.listeEvenements = this.Evenementservice.getListAbsence(this.listAbsCoupleMoisAnnee);
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

      headerToolbar: {
        left: 'prevYear prev',
        center: 'title',
        right: 'next nextYear'
      }
    };
  }
}
