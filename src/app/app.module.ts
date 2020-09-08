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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DemandeAbsenceComponent } from './demande-absence/demande-absence.component';
import { VisualisationAbsenceComponent, NgbdModalAbsComponent } from './visualisation-absence/visualisation-absence.component';
import { NgbModule, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { MenuEmployeComponent } from './menu-employe/menu-employe.component';
import { MenuManagerComponent } from './menu-manager/menu-manager.component';
import { MenuAdministrateurComponent } from './menu-administrateur/menu-administrateur.component';
import { PlanningDesAbsencesComponent } from './planning-des-absences/planning-des-absences.component';
import { VisualisationJferieComponent, NgbdModalJFerieRttComponent } from './visualisation-jferie/visualisation-jferie.component';
import { AjoutJourFerieRttComponent } from './ajout-jour-ferie-rtt/ajout-jour-ferie-rtt.component';
import { ValidationDemandeComponent } from './validation-demande/validation-demande.component';

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
    NgbdModalAbsComponent,
    NgbdModalJFerieRttComponent,
    MenuEmployeComponent,
    MenuManagerComponent,
    MenuAdministrateurComponent,
    PlanningDesAbsencesComponent,
    VisualisationJferieComponent,
    AjoutJourFerieRttComponent,
    ValidationDemandeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    FullCalendarModule,
    ReactiveFormsModule
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
