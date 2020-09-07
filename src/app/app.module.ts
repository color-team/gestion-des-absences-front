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
import { VisualisationAbsenceComponent, NgbdModalContentComponent } from './visualisation-absence/visualisation-absence.component';
import { NgbModule, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { MenuEmployeComponent } from './menu-employe/menu-employe.component';
import { MenuManagerComponent } from './menu-manager/menu-manager.component';
import { MenuAdministrateurComponent } from './menu-administrateur/menu-administrateur.component';
import { VueDepartementJourCollaborateurComponent } from './vue-departement-jour-collaborateur/vue-departement-jour-collaborateur.component';
import { PlanningDesAbsencesComponent } from './planning-des-absences/planning-des-absences.component';
import { VisualisationJferieComponent } from './visualisation-jferie/visualisation-jferie.component';

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
    VueDepartementJourCollaborateurComponent,
    PlanningDesAbsencesComponent,
    VisualisationJferieComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    FullCalendarModule
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
