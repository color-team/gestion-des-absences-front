import { JFerieRtt } from './../models/JFerieRtt';
import { Component, OnInit } from '@angular/core';
import { Collegue } from '../auth/auth.domains';
import { AuthService } from '../auth/auth.service';
import { VisualisationJferieService } from '../visualisation-jferie/visualisation-jferie.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Type } from '../models/Type';
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  template: `
    <div class="modal-header">
      <h4 class="modal-title">Modification d'un jour férié ou RTT</h4>
      <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <form [formGroup]="modifForm">
    <div class="modal-body">

      <div class="row justify-content-md-center">
        <div class="col col-lg-6">
          <p id="floatright">
            Date
          </p>
        </div>
        <div class="col col-lg-6">
          <div id="floatleft">
            <div class="form-group">
              <div class="input-group">
                <input class="form-control" id="dp" name="dp" [(minDate)]="minDate" [(ngModel)]="model" ngbDatepicker
                  #d="ngbDatepicker" readonly formControlName="date">
                <div class="input-group-append">
                  <button class="btn btn-outline-secondary calendar" (click)="d.toggle()" type="button">
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
        </div>
      </div>

      <div class="row justify-content-md-center">
        <div class="col col-lg-6">
          <div id="floatright">
            Type du jour
          </div>
        </div>
        <div class="col col-lg-6">
          <div id="floatleft">
            <select class="form-control" formControlName="typeJ" (change)="comRequis()">
              <option *ngFor="let type of listType" [ngValue]=type>{{type}}</option>
            </select>
          </div>
        </div>
      </div>

      <div class="row justify-content-md-center">
        <div class="col col-lg-6">
          <div id="floatright">
            Commentaires
          </div>
        </div>
        <div class="col col-lg-6">
          <div id="floatleft">
            <textarea id="commentaire" class="form-control" id="exampleFormControlTextarea1" rows="2"
              formControlName="commentaire"></textarea>
          </div>
        </div>
      </div>
    </div>
    <div class="modal-footer">
      <button type="submit" ngbAutofocus class="btn btn-sm btn-primary" (click)="updateJFerieRtt()">Modifier</button>
      <button type="button" class="btn btn-sm btn-danger" (click)="activeModal.dismiss('Annuler')">Annuler</button>
    </div>
    </form>
  `,
  styles: [`
  #floatright {
    float: right;
    font-weight: bold;
  },
  #floatleft {
    float: left;
  }`]
})
export class NgbdModalJFerieRttComponent implements OnInit {

  model: NgbDateStruct;
  listType: string[];
  minDate: NgbDateStruct;

  modifForm: FormGroup;

  collegueConnecte: Collegue;
  jFerieRtt: JFerieRtt;

  // tslint:disable-next-line: max-line-length
  constructor(private router: Router, public activeModal: NgbActiveModal, private authSrv: AuthService, private dataServ: VisualisationJferieService, private calendar: NgbCalendar) { }

  ngOnInit(): void {
    this.dataServ.currentMessage.subscribe(v => this.jFerieRtt = v);
    this.listType = Object.values(Type);

    this.modifForm = new FormGroup({
      date: new FormControl('', [Validators.required]),
      commentaire: new FormControl(''),
      typeJ: new FormControl('', [Validators.required])
    });
    this.comRequis();

    const d = new Date(this.jFerieRtt.date);
    // tslint:disable-next-line: max-line-length
    const ngbDateStruct = { day: d.getDate(), month: d.getMonth() + 1, year: d.getFullYear() };

    this.model = ngbDateStruct;
    this.typeJ.setValue(Type[this.jFerieRtt.type]);
    this.commentaire.setValue(this.jFerieRtt.commentaire);
  }
  get date() { return this.modifForm.get('date'); }
  get typeJ() { return this.modifForm.get('typeJ'); }
  get commentaire() { return this.modifForm.get('commentaire'); }

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

  updateJFerieRtt() {

    const jFerieRttTmp: JFerieRtt = {
      uuid: this.jFerieRtt.uuid,
      date: new Date(this.date.value.year, this.date.value.month - 1, this.date.value.day + 1),
      type: Object.keys(Type).find(v => Type[v] === this.typeJ.value),
      commentaire: this.commentaire.value
    };

    if (this.modifForm.valid) {
      this.dataServ.updateJFerieRtt(jFerieRttTmp).subscribe(
        () => { this.activeModal.dismiss(); this.router.navigate(['/jferiev']); },
        err => { },
        () => { }
      );
    }
  }
}

@Component({
  selector: 'app-visualisation-jferie',
  templateUrl: './visualisation-jferie.component.html',
  styleUrls: ['./visualisation-jferie.component.scss']
})
export class VisualisationJferieComponent implements OnInit {

  listAnnee: string[];
  listJFerieRtt: JFerieRtt[];
  collegueConnecte: Collegue;
  anneeSelectionne: string;

  // tslint:disable-next-line: max-line-length
  constructor(private router: Router, private authSrv: AuthService, private dataServ: VisualisationJferieService, private modalService: NgbModal) {
    this.router.events.subscribe((e: any) => {
      if (e instanceof NavigationEnd) {
        this.ngOnInit();
      }
    });
  }

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
      v => {
        this.listAnnee = v;
        if (v[0] !== undefined) {
          this.onChangeAnnee(v[0]);
        }
      },
      err => { },
      () => { }
    );
  }

  onChangeAnnee(annee: string): void {
    this.dataServ.getListJFerieRtt(annee).subscribe(
      v => { this.listJFerieRtt = v; this.anneeSelectionne = annee; },
      err => { },
      () => { }
    );
  }

  convert(type: string): string {
    return Type[type];
  }

  deleteJFerieRtt(uuid: string): void {
    this.dataServ.deleteJFerieRtt(uuid).subscribe(
      () => this.onChangeAnnee(this.anneeSelectionne),
      err => { },
      () => { }
    );
  }

  select(jFerieRtt: JFerieRtt): void {
    this.dataServ.changeMessage(jFerieRtt);

    const modalRef = this.modalService.open(NgbdModalJFerieRttComponent);
    modalRef.componentInstance.name = 'ModificationJourFerieRtt';
  }
}
