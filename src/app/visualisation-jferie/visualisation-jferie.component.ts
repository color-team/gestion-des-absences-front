import { Component, OnInit } from '@angular/core';
import { Collegue } from '../auth/auth.domains';
import { JFerieRtt } from '../models/JFerieRtt';
import { AuthService } from '../auth/auth.service';
import { VisualisationJferieService } from '../visualisation-jferie/visualisation-jferie.service';

@Component({
  selector: 'app-visualisation-jferie',
  templateUrl: './visualisation-jferie.component.html',
  styleUrls: ['./visualisation-jferie.component.scss']
})
export class VisualisationJferieComponent implements OnInit {

  listAnnee: string[];
  listJFerieRtt: JFerieRtt[];
  collegueConnecte: Collegue;

  constructor(private authSrv: AuthService, private dataServ: VisualisationJferieService) { }

  ngOnInit(): void {
    this.listAnnee = [];

    this.authSrv.verifierAuthentification().subscribe(
      v => this.collegueConnecte = v,
      err => { },
      () => { }
    );
    this.getListAnnee();
  }

  getListAnnee(): void {
    this.dataServ.getListAnnee().subscribe(
      v => { this.listAnnee = v; this.onChangeAnnee(v[0]); },
      err => { },
      () => { }
    );
  }

  onChangeAnnee(annee: string): void {
    this.dataServ.getListJFerieRtt(annee).subscribe(
      v => this.listJFerieRtt = v,
      err => { },
      () => { }
    );
  }

}
