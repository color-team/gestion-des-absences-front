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
// tslint:disable-next-line: max-line-length
import { VueDepartementJourCollaborateurComponent } from './vue-departement-jour-collaborateur/vue-departement-jour-collaborateur.component';
import { PlanningDesAbsencesComponent } from './planning-des-absences/planning-des-absences.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { VisualisationJferieComponent, NgbdModalJFerieRttComponent} from './visualisation-jferie/visualisation-jferie.component';

import { VueSynthetiqueComponent } from './vue-synthetique/vue-synthetique.component';
import { AjoutJourFerieRttComponent } from './ajout-jour-ferie-rtt/ajout-jour-ferie-rtt.component';
import { ValidationDemandeComponent } from './validation-demande/validation-demande.component';
import { TableModule } from 'primeng/table';

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
    VueDepartementJourCollaborateurComponent,
    PlanningDesAbsencesComponent,
    VisualisationJferieComponent,
    VueSynthetiqueComponent,
    AjoutJourFerieRttComponent,
    ValidationDemandeComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    FullCalendarModule,
    ReactiveFormsModule,
    TableModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptorService,
    multi: true,
  },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
