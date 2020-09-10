import { Status, TypeA } from './../models/Type';
import { Collegue } from './../auth/auth.domains';
import { ServiceVisuService } from './service-visu.service';
import { NgbActiveModal, NgbModal, NgbDate, NgbCalendar, NgbDateParserFormatter, NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Absence } from '../models/Absence';
import { AuthService } from '../auth/auth.service';
import { DemandeAbsenceService } from '../demande-absence/demande-absence.service';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-ngbd-modal-content',
  template: `
    <div class="modal-header">
      <h4 class="modal-title">Absences de : {{collegueConnecte.nom}}</h4>
      <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <form [formGroup]="form" >
        <!-- ==================================DATE ===================================================-->
        <div class="row justify-content-start decal">
          <div class="form-group hidden">
            <div class="input-group">
              <input
                name="datepicker"
                class="form-control"
                ngbDatepicker
                #datepicker="ngbDatepicker"
                [autoClose]="'outside'"
                (dateSelect)="onDateSelection($event)"
                [displayMonths]="2"
                [dayTemplate]="t"
                outsideDays="hidden"
                [startDate]="fromDate!"
                [minDate]="minDate"
              />
              <ng-template #t let-date let-focused="focused">
                <span
                  class="custom-day"
                  [class.focused]="focused"
                  [class.range]="isRange(date)"
                  [class.faded]="isHovered(date) || isInside(date)"
                  (mouseenter)="hoveredDate = date"
                  (mouseleave)="hoveredDate = null"
                >
                  {{ date.day }}
                </span>
              </ng-template>
            </div>
    </div>
    <!-- ==================================DATE ===================================================-->

    <div class="form-group">
      <div class="input-group">
        <input
          #dpFromDate
          class="form-control"
          placeholder="dd-mm-yyyy"
          name="dpFromDate"
          [value]="formatter.format(fromDate)"
          (input)="fromDate = validateInput(fromDate, dpFromDate.value)"
          readonly
        />
        <div class="input-group-append">
          <button
            class="btn btn-outline-secondary calendar"
            (click)="datepicker.toggle()"
            type="button">
            <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-calendar-event" fill="currentColor"
              xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd"
                d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z" />
              <path d="M11 6.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
    <div class="form-group ml-2">
      <div class="input-group">
        <input
          #dpToDate
          class="form-control"
          placeholder="dd-mm-yyyy"
          name="dpToDate"
          [value]="formatter.format(toDate)"
          (input)="toDate = validateInput(toDate, dpToDate.value)"
          readonly
        />
        <div class="input-group-append">
          <button
            class="btn btn-outline-secondary calendar"
            (click)="datepicker.toggle()"
            type="button">
            <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-calendar-event" fill="currentColor"
              xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd"
                d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z" />
              <path d="M11 6.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5v-1z" />
            </svg>
            </button>
        </div>
      </div>
    </div>
  </div>

  <!-- ======================================TYPE===================================================-->

  <div class="row justify-content-start decal">
    <div class="form-group">
      <label for="exampleFormControlSelect1">Type de congé</label>
      <select formControlName="selectType" class="form-control" id="exampleFormControlSelect1"  (change)="motifDisplay()">
        <option *ngFor="let item of listTypeEnum" [ngValue]=item>{{item}}</option>
      </select>
    </div>
  </div>

  <br />

  <!-- ======================================MOTIF===================================================-->
  <div class="form-group row justify-content-start w-75 decal" [hidden]="motifMasquee">
    <label for="exampleFormControlTextarea1">Motif</label>
    <textarea
    formControlName="motif"
      class="form-control"
      id="exampleFormControlTextarea1"
      rows="3" [ngClass]="{ 'is-invalid': submitted && motif.errors }">
    </textarea>
    <div *ngIf="submitted && motif.errors" class="invalid-feedback">
      <div *ngIf="motif.errors.required">Le motif est requis</div>
      <div *ngIf="motif.errors.minlength">Le motif doit comporter au mois 3 caractères</div>
    </div>
  </div>
</form>

    </div>
    <div class="modal-footer">
      <button type="button" ngbAutofocus class="btn btn-sm btn-primary" (click)="modifierAbs(dpFromDate.value,dpToDate.value)">Modifier</button>
      <button type="button" class="btn btn-sm btn-danger" (click)="activeModal.dismiss('Annuler')">Annuler</button>
    </div>
  `,
  styles: [`
  .form-group.hidden {
    width: 0;
    margin: 0;
    border: none;
    padding: 0;
  }
  .custom-day {
    text-align: center;
    padding: 0.185rem 0.25rem;
    display: inline-block;
    height: 2rem;
    width: 2rem;
  }
  .custom-day.focused {
    background-color: #e6e6e6;
  }
  .custom-day.range, .custom-day:hover {
    background-color: rgb(2, 117, 216);
    color: white;
  }
  .custom-day.faded {
    background-color: rgba(2, 117, 216, 0.5);
  }

  .decal {
    margin-left: 15px;
  }
`]
})
export class NgbdModalAbsComponent implements OnInit {

  collegueConnecte: Collegue;
  absence: Absence;

  form: FormGroup;
  submitted = false;
  erreur: boolean;

  listTypeEnum: string[];

  newAbsence: Absence;

  motifMasquee = true;

  hoveredDate: NgbDate | null = null;

  fromDate: NgbDate | null;
  toDate: NgbDate | null;

  minDate: NgbDate;

  // tslint:disable-next-line: max-line-length
  constructor(private router: Router, private formBuilder: FormBuilder, private calendar: NgbCalendar, public formatter: NgbDateParserFormatter, private config: NgbDatepickerConfig, public activeModal: NgbActiveModal, private authSrv: AuthService, private dataServ: ServiceVisuService, private dataServ2: DemandeAbsenceService) {
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

  ngOnInit(): void {
    this.authSrv.verifierAuthentification().subscribe(
      v => this.collegueConnecte = v,
      err => { },
      () => { }
    );
    this.dataServ.currentMessage.subscribe(v => this.absence = v);

    this.listTypeEnum = [];
    this.newAbsence = {};
    this.erreur = false;

    this.authSrv.verifierAuthentification().subscribe(
      v => this.collegueConnecte = v,
      err => { },
      () => { }
    );

    this.dataServ2.getEnum().subscribe(
      value => this.listTypeEnum = value,
      err => { },
      () => { }
    );

    this.form = this.formBuilder.group({
      motif: ['', []],
      selectType: ['', [Validators.required]]
    });

    this.selectType.setValue(this.absence.type);
    this.motifDisplay();
    this.motif.setValue(this.absence.motif);


    /*console.log(this.absence.dateDebut);

    console.log(this.absence.dateDebut);
    console.log(this.absence.dateFin);
    console.log(typeof (this.absence.dateDebut));
    console.log(this.fromDate);*/


    const resDeb = this.absence.dateDebut.split('-');
    this.fromDate = new NgbDate(parseInt(resDeb[0], 0), parseInt(resDeb[1], 0), parseInt(resDeb[2], 0));
    const resFin = this.absence.dateFin.split('-');
    this.toDate = new NgbDate(parseInt(resFin[0], 0), parseInt(resFin[1], 0), parseInt(resFin[2], 0));
  }

  get selectType() { return this.form.get('selectType'); }
  get motif() { return this.form.get('motif'); }

  modifierAbs(dpFromDate: string, dpToDate: string): void {
    this.submitted = true;

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    const updateAbsence: Absence = {
      uuid: this.absence.uuid,
      dateDebut: dpFromDate,
      dateFin: dpToDate,
      type: this.selectType.value
    };

    if (updateAbsence.type !== 'TYPE_CONGE_SANS_SOLDE') {
      updateAbsence.motif = '';
    }
    else {
      updateAbsence.motif = this.motif.value;
    }

    this.dataServ2.updateAbsence(updateAbsence).subscribe(
      () => { this.activeModal.dismiss(); this.router.navigate(['/absv']); },
      err => { },
      () => { }
    );
  }

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
}




@Component({
  selector: 'app-visualisation-absence',
  templateUrl: './visualisation-absence.component.html',
  styleUrls: ['./visualisation-absence.component.scss']
})
export class VisualisationAbsenceComponent implements OnInit {

  listAbsences: Absence[];
  collegueConnecte: Collegue;
  success = false;

  // tslint:disable-next-line: max-line-length
  constructor(private router: Router, private authSrv: AuthService, private dataServ: ServiceVisuService, private dataServ2: DemandeAbsenceService, private modalService: NgbModal) {
    this.router.events.subscribe((e: any) => {
      if (e instanceof NavigationEnd) {
        this.ngOnInit();
      }
    });
  }

  ngOnInit() {
    this.listAbsences = [];

    this.authSrv.verifierAuthentification().subscribe(
      v => this.collegueConnecte = v,
      err => { },
      () => { }
    );
    this.getListAbs();
    this.dataServ2.currentBooleanAlert.subscribe(v => this.success = v);


    this.alertDisappear();
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

  select(abs: Absence): void {
    this.dataServ.changeMessage(abs);

    const modalRef = this.modalService.open(NgbdModalAbsComponent, { size: 'lg' });
    modalRef.componentInstance.name = 'ModificationAbsence';
  }

  alertDisappear(): void {
    setTimeout(() => this.success = false, 2500);
  }

  convertT(type: string): string {
    return TypeA[type];
  }

  convertS(status: string): string {
    return Status[status];
  }
}
