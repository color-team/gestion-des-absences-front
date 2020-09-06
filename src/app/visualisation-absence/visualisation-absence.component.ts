import { Collegue } from './../auth/auth.domains';
import { ServiceVisuService } from './service-visu.service';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Absence } from '../models/Absence';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-ngbd-modal-content',
  template: `
    <div class="modal-header">
      <h4 class="modal-title">Absences de : {{collegueConnecte.email}}</h4>
      <button type="button" class="close" aria-label="Close" (click)="activeModal.dismiss('Cross click')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
    <form>
      <!-- ul li à delete et à mettre le form pour la modification -->
      <ul>
        <li>{{absence.dateDebut}}</li>
        <li>{{absence.dateFin}}</li>
        <li>{{absence.type}}</li>
        <li>{{absence.status}}</li>
        <li>{{absence.motif}}</li>
      </ul>
    </form>
    </div>
    <div class="modal-footer">
      <button type="button" ngbAutofocus class="btn btn-sm btn-primary">Modifier</button>
      <button type="button" class="btn btn-sm btn-danger" (click)="activeModal.dismiss('Annuler')">Annuler</button>
    </div>
  `,
  styles: ['.alert-danger { margin-top: 6px; padding-top: 6px; padding-bottom: 6px; padding-left: 12px; padding-right:12px}']
})
export class NgbdModalAbsComponent implements OnInit {

  collegueConnecte: Collegue;
  absence: Absence;

  constructor(public activeModal: NgbActiveModal, private authSrv: AuthService, private dataServ: ServiceVisuService) { }

  ngOnInit(): void {
    this.authSrv.verifierAuthentification().subscribe(
      v => this.collegueConnecte = v,
      err => { },
      () => { }
    );
    this.dataServ.currentMessage.subscribe(v => this.absence = v);
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

  constructor(private authSrv: AuthService, private dataServ: ServiceVisuService, private modalService: NgbModal) { }

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

  select(abs: Absence): void {
    this.dataServ.changeMessage(abs);

    const modalRef = this.modalService.open(NgbdModalAbsComponent);
    modalRef.componentInstance.name = 'ModificationAbsence';
  }
}
