import { Collegue } from './../auth/auth.domains';
import { Absence } from './../models/Absence';
import { DemandeAbsenceService } from './demande-absence.service';
import { Component, OnInit } from '@angular/core';
import { NgbDate, NgbCalendar, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-demande-absence',
  templateUrl: './demande-absence.component.html',
  styleUrls: ['./demande-absence.component.scss']
})
export class DemandeAbsenceComponent implements OnInit {

  listTypeEnum: string[];

  collegueConnecte: Collegue;
  newAbsence: Absence;

  hoveredDate: NgbDate | null = null;

  fromDate: NgbDate | null;
  toDate: NgbDate | null;

  // tslint:disable-next-line: max-line-length
  constructor(private calendar: NgbCalendar, public formatter: NgbDateParserFormatter, private dataServ: DemandeAbsenceService, private authSrv: AuthService) {
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
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

  ngOnInit(): void {
    this.listTypeEnum = [];
    this.newAbsence = {};

    this.authSrv.verifierAuthentification().subscribe(
      v => { this.collegueConnecte = v; console.log(v); },
      err => { },
      () => { }
    );

    this.dataServ.getEnum().subscribe(
      value => this.listTypeEnum = value,
      err => { },
      () => { }
    );
  }

  creerAbsence(dpFromDate: NgbDate, dpToDate: NgbDate, selectType: string, motif: string): void {

    this.newAbsence.dateDebut = dpFromDate;
    this.newAbsence.dateFin = dpToDate;
    this.newAbsence.type = selectType;
    this.newAbsence.motif = motif;


    this.dataServ.postAbsence(this.newAbsence).subscribe(
      v => console.log(v),
      err => {},
      () => {}
    );
  }
}
