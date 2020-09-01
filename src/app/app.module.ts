import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {AuthComponent} from './auth/auth.component';
import {TechComponent} from './tech/tech.component';
import {RouterModule, Routes} from '@angular/router';
import {StatutConnecteService} from './auth/statut-connecte.service';
import {AuthInterceptorService} from './auth/auth-interceptor.service';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import { DemandeAbsenceComponent } from './demande-absence/demande-absence.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { VisualisationAbsenceComponent } from './visualisation-absence/visualisation-absence.component';
import { MenuEmployeComponent } from './menu-employe/menu-employe.component';
import { MenuManagerComponent } from './menu-manager/menu-manager.component';
import { MenuAdministrateurComponent } from './menu-administrateur/menu-administrateur.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    TechComponent,
    DemandeAbsenceComponent,
    VisualisationAbsenceComponent,
    MenuEmployeComponent,
    MenuManagerComponent,
    MenuAdministrateurComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptorService,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
