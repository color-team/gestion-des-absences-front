import { PlanningDesAbsencesComponent } from './planning-des-absences/planning-des-absences.component';
import { DemandeAbsenceComponent } from './demande-absence/demande-absence.component';
import { VisualisationAbsenceComponent } from './visualisation-absence/visualisation-absence.component';
import { VisualisationJferieComponent } from './visualisation-jferie/visualisation-jferie.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TechComponent } from './tech/tech.component';
import { StatutConnecteService } from './auth/statut-connecte.service';
import { AuthComponent } from './auth/auth.component';

const routes: Routes = [
  { path: 'tech', component: TechComponent, canActivate: [StatutConnecteService] },
  { path: 'connexion', component: AuthComponent },
  { path: 'accueil', component: TechComponent },
  { path: 'absv', component: VisualisationAbsenceComponent },
  { path: 'absd', component: DemandeAbsenceComponent },
  { path: 'absp', component: PlanningDesAbsencesComponent },
  { path: 'jferiev', component: VisualisationJferieComponent },
  { path: '', redirectTo: '/tech', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
