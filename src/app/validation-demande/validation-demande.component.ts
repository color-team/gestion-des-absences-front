import { Component, OnInit } from '@angular/core';
import { Collegue } from '../auth/auth.domains';
import { AuthService } from '../auth/auth.service';
import { ValidationDemandeService } from './validation-demande.service';
import { ValidationVM } from '../models/ValidationVM';
import { Status, TypeA } from '../models/Type';

@Component({
  templateUrl: './validation-demande.component.html',
  styleUrls: ['./validation-demande.component.scss']
})
export class ValidationDemandeComponent implements OnInit {

  listValidation: ValidationVM[];
  collegueConnecte: Collegue;

  constructor(private authSrv: AuthService, private dataServ: ValidationDemandeService) { }

  ngOnInit(): void {

    this.listValidation = [];

    this.authSrv.verifierAuthentification().subscribe(
      v => this.collegueConnecte = v,
      err => { },
      () => { }
    );

    this.getListValidation();
  }

  getListValidation(): void {
    this.dataServ.getListAbsence().subscribe(
      v => { this.listValidation = v; },
      err => { },
      () => { }
    );
  }

  modifierAbs(id: string, t: string, st: string) {

    const validation: ValidationVM = {
      uuid: id,
      type: t,
      status: Object.keys(Status).find(v => Status[v] === st)
    };

    this.dataServ.modifierAbs(validation).subscribe(
      () => { this.getListValidation(); },
      err => { },
      () => { }
    );
  }

  convertT(type: string): string {
    return TypeA[type];
  }

  accepter(uuid: string, type: string) {
    this.modifierAbs(uuid, type, Status.STATUS_VALIDEE);
  }

  refuser(uuid: string, type: string) {
    this.modifierAbs(uuid, type, Status.STATUS_REJETEE);
  }
}
