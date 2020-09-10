import { HttpErrorResponse } from '@angular/common/http';
import { Collegue } from './../auth/auth.domains';
import { Absence } from './../models/Absence';
import { DemandeAbsenceService } from './demande-absence.service';
import { Component, OnInit } from '@angular/core';
import { NgbDate, NgbCalendar, NgbDateParserFormatter, NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../auth/auth.service';
import { FormBuilder, FormGroup, Validators, AbstractControl, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-demande-absence',
  templateUrl: './demande-absence.component.html',
  styleUrls: ['./demande-absence.component.scss']
})
export class DemandeAbsenceComponent implements OnInit {

  form: FormGroup;
  submitted = false;
  erreur: boolean;

  listTypeEnum: string[];

  collegueConnecte: Collegue;

  motifMasquee = true;

  hoveredDate: NgbDate | null = null;

  fromDate: NgbDate | null;
  toDate: NgbDate | null;

  minDate: NgbDate;
  // tslint:disable-next-line: max-line-length
  constructor(private router: Router, private calendar: NgbCalendar, public formatter: NgbDateParserFormatter, private config: NgbDatepickerConfig, private dataServ: DemandeAbsenceService, private authSrv: AuthService) {
    this.fromDate = calendar.getNext(calendar.getToday());
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
    this.minDate = calendar.getNext(calendar.getToday());
  }

  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
  }

  isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) {
    return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return date.equals(this.fromDate) || (this.toDate && date.equals(this.toDate)) || this.isInside(date) || this.isHovered(date);
  }

  validateInput(currentValue: NgbDate | null, input: string): NgbDate | null {
    const parsed = this.formatter.parse(input);
    return parsed && this.calendar.isValid(NgbDate.from(parsed)) ? NgbDate.from(parsed) : currentValue;
  }

  ngOnInit() {
    this.listTypeEnum = [];
    this.erreur = false;

    this.authSrv.verifierAuthentification().subscribe(
      v => this.collegueConnecte = v,
      err => { },
      () => { }
    );

    this.dataServ.getEnum().subscribe(
      value => this.listTypeEnum = value,
      err => { },
      () => { }
    );

    this.form = new FormGroup({
      selectType: new FormControl('', [Validators.required]),
      motif: new FormControl('', []),
    });
  }

  get selectType() { return this.form.get('selectType'); }
  get motif() { return this.form.get('motif'); }


  creerAbsence(dpFromDate: string, dpToDate: string): void {

    this.submitted = true;

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    const newAbsence: Absence = {
      dateDebut: dpFromDate,
      dateFin: dpToDate,
      type: this.selectType.value,
      motif: this.motif.value

    };

    this.dataServ.postAbsence(newAbsence).subscribe(
      () => { this.redirection(); },
      err => { this.erreur = true; },
      () => { }
    );
  }



  // @param {string} selectType
  // @returns void
  // Fonction qui permet d'afficher l'input motif en fonction du type sélectionné

  motifDisplay() {

    if (this.selectType.value === `TYPE_CONGE_SANS_SOLDE`) {
      this.motifMasquee = false;
      this.motif.setValidators([Validators.required, Validators.minLength(3)]);
      this.motif.updateValueAndValidity();
    }
    else {
      this.motifMasquee = true;
      this.motif.clearValidators();
      this.motif.updateValueAndValidity();
    }
  }

  redirection(): void {
    this.dataServ.changeBooleanAlert(true);
    this.router.navigate(['/absv']);
  }

  retour() {
    this.dataServ.changeBooleanAlert(false);
    this.router.navigate(['/absv']);
  }

}
