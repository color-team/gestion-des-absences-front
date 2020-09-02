import { NgbDate } from '@ng-bootstrap/ng-bootstrap';

export interface Absence {
  uuid?: string;
  dateDebut?: NgbDate;
  dateFin?: NgbDate;
  type?: string;
  status?: string;
  motif?: string;
}
