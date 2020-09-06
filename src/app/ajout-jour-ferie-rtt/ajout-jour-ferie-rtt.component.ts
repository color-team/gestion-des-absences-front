import { JFerieRtt } from './../models/JFerieRtt';
import { Component, OnInit } from '@angular/core';
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { AjoutJourFerieRttService } from './ajout-jour-ferie-rtt.service';
import { Type } from '../models/Type';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  templateUrl: './ajout-jour-ferie-rtt.component.html',
  styleUrls: ['./ajout-jour-ferie-rtt.component.scss']
})
export class AjoutJourFerieRttComponent implements OnInit {
  model: NgbDateStruct;
  listType: string[];
  minDate: NgbDateStruct;

  ajoutForm: FormGroup;

  afficherErreur: boolean;

  constructor(private router: Router, private dataServ: AjoutJourFerieRttService, private calendar: NgbCalendar) { }

  ngOnInit(): void {
    this.listType = Object.values(Type);
    this.minDate = this.calendar.getToday();
    this.afficherErreur = false;

    this.ajoutForm = new FormGroup({
      date: new FormControl('', [Validators.required]),
      commentaire: new FormControl(''),
      typeJ: new FormControl('', [Validators.required])
    });
  }
  get date() { return this.ajoutForm.get('date'); }
  get typeJ() { return this.ajoutForm.get('typeJ'); }
  get commentaire() { return this.ajoutForm.get('commentaire'); }

  comRequis() {
    if (this.typeJ.value === Type.TYPE_FERIE) {
      this.commentaire.setValidators([Validators.required]);
      this.commentaire.updateValueAndValidity();
    }
    else {
      this.commentaire.clearValidators();
      this.commentaire.updateValueAndValidity();
    }
  }

  retour(): void {
    this.router.navigate(['/jferiev']);
  }

  ajouterJFerieRtt() {

    const jFerieRtt: JFerieRtt = {
      date: this.date.value,
      type: Object.keys(Type).find(v => Type[v] === this.typeJ.value),
      commentaire: this.commentaire.value
    };

    console.log(this.date.value);
    console.log(this.typeJ.value);
    console.log(this.commentaire.value);
    console.log(this.ajoutForm.valid);

    if (this.ajoutForm.valid) {
      this.dataServ.postJFerieRtt(jFerieRtt).subscribe(
        () => { this.retour(); },
        err => { console.log(err); },
        () => { }
      );
      console.log('hop c\'est envoyé');
      this.retour();
    }
    else {
      this.afficherErreur = true;
    }
  }
}
