import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { Collegue } from '../auth/auth.domains';

export interface Absence {
  uuid?: string;
  dateDebut?: NgbDate;
  dateFin?: NgbDate;
  type?: string;
  status?: string;
  motif?: string;
  collegue?: Collegue;
}
