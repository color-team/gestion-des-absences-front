import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TechComponent} from './tech/tech.component';
import {StatutConnecteService} from './auth/statut-connecte.service';
import {AuthComponent} from './auth/auth.component';


const routes: Routes =  [
  { path: 'tech', component: TechComponent, canActivate: [StatutConnecteService]},
  { path: 'connexion', component: AuthComponent},
  { path: 'acceuil', component: AuthComponent},
  { path: 'absv', component: AuthComponent},
  { path: 'absd', component: AuthComponent},
  { path: '', redirectTo: '/tech', pathMatch: 'full'}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
