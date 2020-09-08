import { Component, OnInit } from '@angular/core';
import { Collegue } from '../auth/auth.domains';
import { Absence } from '../models/Absence';
import { JourFerieRtt } from '../models/JourFerieRtt'
import { AuthService } from '../auth/auth.service';
import { VdjcServiceService } from './vdjc-service.service'
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-vue-departement-jour-collaborateur',
  templateUrl: './vue-departement-jour-collaborateur.component.html',
  styleUrls: ['./vue-departement-jour-collaborateur.component.scss']
})
export class VueDepartementJourCollaborateurComponent implements OnInit {

  listCollaborateursDepartement: Collegue[];
  listeJourFeriesRTTEmployeurMoisAnnee: JourFerieRtt[];
  listAbsencesAAfficher: Absence[];
  departements: string[];
  defaultDepartement: string;
  listeMois = [
    { Value: 1, Text: 'Janvier' },
    { Value: 2, Text: 'Février' },
    { Value: 3, Text: 'Mars' },
    { Value: 4, Text: 'Avril' },
    { Value: 5, Text: 'Mai' },
    { Value: 6, Text: 'Juin' },
    { Value: 7, Text: 'Juillet' },
    { Value: 8, Text: 'Août' },
    { Value: 9, Text: 'Septembre' },
    { Value: 10, Text: 'Octobre' },
    { Value: 11, Text: 'Novembre' },
    { Value: 12, Text: 'Décembre' }
];

  annees = Array(2030 - (2030 - 20)).fill('').map((v, idx) => 2030 - idx) as Array<number>;

  collegueConnecte: Collegue;
  form: FormGroup;

  constructor(private authSrv: AuthService, private dataServ: VdjcServiceService) { }

  ngOnInit(): void {

    this.form = new FormGroup({
      mois: new FormControl('', [Validators.required]),
      departement: new FormControl('', [Validators.required]),
      annee: new FormControl('', [Validators.required])
    });

    this.mois.setValue(this.dataServ.getCurrentMonth(this.listeMois));
    this.annee.setValue(new Date().getUTCFullYear());

    this.authSrv.verifierAuthentification().subscribe(
      v => this.collegueConnecte = v,
      err => { },
      () => { }
    );

    this.dataServ.getDepartements().subscribe(
      value => {this.departements = value;
        this.departement.setValue(this.departements[0]);
      },
      err => { },
      () => { }
    );

  }

  get mois() { return this.form.get('mois'); }
  get departement() { return this.form.get('departement'); }
  get annee() { return this.form.get('annee'); }

}
