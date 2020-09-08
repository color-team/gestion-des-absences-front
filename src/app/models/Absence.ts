import { NgbDate } from '@ng-bootstrap/ng-bootstrap';

export interface Absence {
  uuid?: string;
  dateDebut?: string;
  dateFin?: string;
  type?: string;
  status?: string;
  motif?: string;
}
