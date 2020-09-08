// import { NgbDateCustomParserFormatter } from './utils/NgbDateCustomParserFormatter';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { TechComponent } from './tech/tech.component';
import { RouterModule, Routes } from '@angular/router';
import { StatutConnecteService } from './auth/statut-connecte.service';
import { AuthInterceptorService } from './auth/auth-interceptor.service';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { DemandeAbsenceComponent } from './demande-absence/demande-absence.component';
import { VisualisationAbsenceComponent, NgbdModalContentComponent } from './visualisation-absence/visualisation-absence.component';
import { NgbModule, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { MenuEmployeComponent } from './menu-employe/menu-employe.component';
import { MenuManagerComponent } from './menu-manager/menu-manager.component';
import { MenuAdministrateurComponent } from './menu-administrateur/menu-administrateur.component';
import { PlanningDesAbsencesComponent } from './planning-des-absences/planning-des-absences.component';
import { VisualisationJferieComponent } from './visualisation-jferie/visualisation-jferie.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';

FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
]);


@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    TechComponent,
    DemandeAbsenceComponent,
    VisualisationAbsenceComponent,
    NgbdModalContentComponent,
    MenuEmployeComponent,
    MenuManagerComponent,
    MenuAdministrateurComponent,
    PlanningDesAbsencesComponent,
    VisualisationJferieComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    FullCalendarModule,
    BrowserAnimationsModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptorService,
    multi: true,
  },
 /* {
    provide: NgbDateParserFormatter,
    useClass: NgbDateCustomParserFormatter
  }*/],
  bootstrap: [AppComponent]
})
export class AppModule { }
