import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { Collegue } from '../auth/auth.domains';

export interface Absence {
  uuid?: string;
  dateDebut?: string;
  dateFin?: string;
  type?: string;
  status?: string;
  motif?: string;
  collegue?: Collegue;
}
