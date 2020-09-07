import { Component, OnInit } from '@angular/core';
import { Collegue } from '../auth/auth.domains';
import { Absence } from '../models/Absence';
import { JourFerieRtt } from '../models/JourFerieRtt'
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-vue-departement-jour-collaborateur',
  templateUrl: './vue-departement-jour-collaborateur.component.html',
  styleUrls: ['./vue-departement-jour-collaborateur.component.scss']
})
export class VueDepartementJourCollaborateurComponent implements OnInit {

  listCollaborateursDepartement: Collegue[];
  listeJourFeriesRTTEmployeurMoisAnnee: JourFerieRtt[];
  listAbsencesAAfficher: Absence[];



  constructor() { }

  ngOnInit(): void {
  }

}
