import { Collegue } from './../auth/auth.domains';
import { Absence } from './../models/Absence';
import { DemandeAbsenceService } from './demande-absence.service';
import { Component, OnInit } from '@angular/core';
import { NgbDate, NgbCalendar, NgbDateParserFormatter, NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../auth/auth.service';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-demande-absence',
  templateUrl: './demande-absence.component.html',
  styleUrls: ['./demande-absence.component.scss']
})
export class DemandeAbsenceComponent implements OnInit {

  form: FormGroup;
  submitted = false;

  listTypeEnum: string[];

  collegueConnecte: Collegue;
  newAbsence: Absence;

  motifMasquee = true;

  hoveredDate: NgbDate | null = null;

  fromDate: NgbDate | null;
  toDate: NgbDate | null;

  minDate = undefined;
  // tslint:disable-next-line: max-line-length
  constructor(private formBuilder: FormBuilder, private calendar: NgbCalendar, public formatter: NgbDateParserFormatter, private config: NgbDatepickerConfig, private dataServ: DemandeAbsenceService, private authSrv: AuthService) {
    this.fromDate = calendar.getNext(calendar.getToday());
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
    this.minDate = calendar.getNext(calendar.getToday());
  }

  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date && date.after(this.fromDate)) {
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
    this.newAbsence = {};

    this.authSrv.verifierAuthentification().subscribe(
      v =>  this.collegueConnecte = v,
      err => { },
      () => { }
    );

    this.dataServ.getEnum().subscribe(
      value => this.listTypeEnum = value,
      err => { },
      () => { }
    );

    this.form = this.formBuilder.group({
      motif: ['', []]
    });
  }

  // convenience getter for easy access to form fields
  get formControl() { return this.form.controls; }

  creerAbsence(dpFromDate: NgbDate, dpToDate: NgbDate, selectType: string, motif: string): void {

    this.validation();

    this.newAbsence.dateDebut = dpFromDate;
    this.newAbsence.dateFin = dpToDate;
    this.newAbsence.type = selectType;
    this.newAbsence.motif = motif;
    this.dataServ.postAbsence(this.newAbsence).subscribe(
      err => {},
      () => {}
    );
  }



// @param {string} selectType
// @returns void
// Fonction qui permet d'afficher l'input motif en fonction du type sélectionné

  motifDisplay(selectType) {

    if (selectType.value === `TYPE_CONGE_SANS_SOLDE`) {
      this.motifMasquee = false;
      this.form = this.formBuilder.group({
        motif: ['', [Validators.required, Validators.minLength(3)]]
      });
    }
    else {
      this.motifMasquee = true;
      this.form = this.formBuilder.group({
        motif: ['', []]
      });

    }
  }

  validation(): void {

    this.submitted = true;

      // stop here if form is invalid
    if (this.form.invalid) {
          return;
      }

  }

}
