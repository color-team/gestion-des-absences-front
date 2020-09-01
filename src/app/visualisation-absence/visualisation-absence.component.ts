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
  collegueConnecte: Observable<Collegue>;

  constructor(private authSrv: AuthService, private dataServ: ServiceVisuService) { }

  ngOnInit(): void {
    this.listAbsences = [];
    this.collegueConnecte = this.authSrv.verifierAuthentification();

    this.dataServ.getListAbsences().subscribe(
      v => this.listAbsences = v,
      err => { },
      () => { }
    );
  }
}
