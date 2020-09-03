import { Component, OnInit } from '@angular/core';
import { Collegue } from '../auth/auth.domains';
import { Absence } from '../models/Absence';
import { JourFerieRtt } from '../models/JourFerieRtt'

@Component({
  selector: 'app-vue-departement-jour-collaborateur',
  templateUrl: './vue-departement-jour-collaborateur.component.html',
  styleUrls: ['./vue-departement-jour-collaborateur.component.scss']
})
export class VueDepartementJourCollaborateurComponent implements OnInit {

  listCollaborateurs: Collegue[];
  listeJourFeriesRTTEmployeur: JourFerieRtt[];
  listAbsencesAAfficher: Absence[];



  constructor() { }

  ngOnInit(): void {
  }

}
