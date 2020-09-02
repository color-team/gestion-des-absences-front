import { Component, OnInit } from '@angular/core';
import {CalendarOptions} from '@fullcalendar/angular';
import frLocale from '@fullcalendar/core/locales/fr';

@Component({
  selector: 'app-planning-des-absences',
  templateUrl: './planning-des-absences.component.html',
  styleUrls: ['./planning-des-absences.component.scss']
})
export class PlanningDesAbsencesComponent implements OnInit {

  constructor() { }

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    locale: frLocale
  };
  calendarPlugins = [frLocale];
  ngOnInit(): void {
  }

}
