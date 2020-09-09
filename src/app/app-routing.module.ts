import { VueSynthetiqueComponent } from './vue-synthetique/vue-synthetique.component';

import { AjoutJourFerieRttComponent } from './ajout-jour-ferie-rtt/ajout-jour-ferie-rtt.component';
import { PlanningDesAbsencesComponent } from './planning-des-absences/planning-des-absences.component';
import { DemandeAbsenceComponent } from './demande-absence/demande-absence.component';
import { VisualisationAbsenceComponent } from './visualisation-absence/visualisation-absence.component';
import { VisualisationJferieComponent } from './visualisation-jferie/visualisation-jferie.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TechComponent } from './tech/tech.component';
import { StatutConnecteService } from './auth/statut-connecte.service';
import { AuthComponent } from './auth/auth.component';
import { ValidationDemandeComponent } from './validation-demande/validation-demande.component';
// tslint:disable-next-line: max-line-length
import { VueDepartementJourCollaborateurComponent } from './vue-departement-jour-collaborateur/vue-departement-jour-collaborateur.component';

const routes: Routes = [
  { path: 'tech', component: TechComponent, canActivate: [StatutConnecteService] },
  { path: 'connexion', component: AuthComponent },
  { path: 'accueil', component: TechComponent, canActivate: [StatutConnecteService] },
  { path: 'absv', component: VisualisationAbsenceComponent, canActivate: [StatutConnecteService], runGuardsAndResolvers: 'always' },
  { path: 'absd', component: DemandeAbsenceComponent, canActivate: [StatutConnecteService] },
  { path: 'absp', component: PlanningDesAbsencesComponent, canActivate: [StatutConnecteService] },
  { path: 'jferiev', component: VisualisationJferieComponent, canActivate: [StatutConnecteService], runGuardsAndResolvers: 'always' },
  { path: 'jferied', component: AjoutJourFerieRttComponent, canActivate: [StatutConnecteService] },
  { path: 'validation', component: ValidationDemandeComponent, canActivate: [StatutConnecteService] },
  { path: 'visuColDepMoisAnnee', component: VueDepartementJourCollaborateurComponent, canActivate: [StatutConnecteService] },
  { path: 'vuesynthetique', component: VueSynthetiqueComponent, canActivate: [StatutConnecteService] },
  { path: '', redirectTo: '/tech', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
