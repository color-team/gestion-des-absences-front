import { JFerieRtt } from './../models/JFerieRtt';
import { HttpClient } from '@angular/common/http';
import { Absence } from './../models/Absence';
import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular';
import frLocale from '@fullcalendar/core/locales/fr';
import { Observable, from } from 'rxjs';
import { Collegue } from './../auth/auth.domains';
import { AuthService } from '../auth/auth.service';
import { PlanningDesAbsencesService } from './planning-des-absences.service';

@Component({
  selector: 'app-planning-des-absences',
  templateUrl: './planning-des-absences.component.html',
  styleUrls: ['./planning-des-absences.component.scss']
})
export class PlanningDesAbsencesComponent implements OnInit {

  listAbsCoupleMoisAnnée: Absence[];
  listJFerieRtt: JFerieRtt[];
  collegueConnecte: Observable<Collegue>;

  constructor(private authSrv: AuthService, private dataServPlanAbs: PlanningDesAbsencesService) { }

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    locale: frLocale
  };
  calendarPlugins = [frLocale];

  ngOnInit(): void {
    this.listAbsCoupleMoisAnnée = [];
    this.listJFerieRtt = [];
    this.collegueConnecte = this.authSrv.verifierAuthentification();

    this.dataServPlanAbs.getAbsences().subscribe(
      vAbsP => this.listAbsCoupleMoisAnnée = vAbsP,
      err => { },
      () => { }
    );

    this.dataServPlanAbs.getJFerieRtt().subscribe(
      vRttP => this.listJFerieRtt = vRttP,
      err => { },
      () => { }
    );
  }

}
