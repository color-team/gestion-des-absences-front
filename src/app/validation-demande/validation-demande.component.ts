import { Component, OnInit } from '@angular/core';
import { Collegue } from '../auth/auth.domains';
import { AuthService } from '../auth/auth.service';
import { ValidationDemandeService } from './validation-demande.service';
import { Absence } from '../models/Absence';

@Component({
  templateUrl: './validation-demande.component.html',
  styleUrls: ['./validation-demande.component.scss']
})
export class ValidationDemandeComponent implements OnInit {

  listAbsence: Absence[];
  collegueConnecte: Collegue;

  constructor(private authSrv: AuthService, private dataServ: ValidationDemandeService) { }

  ngOnInit(): void {

    // probablement inutile de recup le col connecté
    this.authSrv.verifierAuthentification().subscribe(
      v => this.collegueConnecte = v,
      err => { },
      () => { }
    );

    this.getListAbsence();
  }

  getListAbsence(): void {
    this.dataServ.getListAbsence().subscribe(
      v => this.listAbsence = v,
      err => { },
      () => { }
    );
  }
}
