import { JFerieRtt } from './../models/JFerieRtt';
import { Component, OnInit } from '@angular/core';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { AjoutJourFerieRttService } from './ajout-jour-ferie-rtt.service';

@Component({
  templateUrl: './ajout-jour-ferie-rtt.component.html',
  styleUrls: ['./ajout-jour-ferie-rtt.component.scss']
})
export class AjoutJourFerieRttComponent implements OnInit {

  model: NgbDateStruct;
  boolAlert: boolean;
  listType: string[];

  constructor(private router: Router, private dataServ: AjoutJourFerieRttService) { }

  ngOnInit(): void {
    this.boolAlert = false;
    this.listType = [];

    this.dataServ.getListType().subscribe(
      v => this.listType = v,
      err => { },
      () => { }
    );
  }

  retour(): void {
    this.router.navigate(['/jferiev']);
  }

  ajouterJFerieRtt(d: Date, t: string, c: string) {
    const jFerieRtt: JFerieRtt = {
      date: d,
      type: t,
      commentaire: c
    };

    this.dataServ.postJFerieRtt(jFerieRtt).subscribe(
      () => { this.retour(); },
      err => { this.boolAlert = true; },
      () => { }
    );
  }
}
