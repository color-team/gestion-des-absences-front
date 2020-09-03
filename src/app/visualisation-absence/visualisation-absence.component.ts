import { Collegue } from './../auth/auth.domains';
import { ServiceVisuService } from './service-visu.service';
import { Component, OnInit } from '@angular/core';
import { Absence } from '../models/Absence';
import { AuthService } from '../auth/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-visualisation-absence',
  templateUrl: './visualisation-absence.component.html',
  styleUrls: ['./visualisation-absence.component.scss']
})
export class VisualisationAbsenceComponent implements OnInit {

  listAbsences: Absence[];
  collegueConnecte: Collegue;

  constructor(private authSrv: AuthService, private dataServ: ServiceVisuService) { }

  ngOnInit() {
    this.listAbsences = [];

    this.authSrv.verifierAuthentification().subscribe(
      v => this.collegueConnecte = v,
      err => { },
      () => { }
    );
    this.getListAbs();
  }

  supprAbs(uuid: string): void {
    this.dataServ.supprAbsence(uuid).subscribe(
      () => this.getListAbs(),
      err => { },
      () => { }
    );
  }

  getListAbs(): void {
    this.dataServ.getListAbsences().subscribe(
      v => this.listAbsences = v,
      err => { },
      () => { }
    );
  }
}
