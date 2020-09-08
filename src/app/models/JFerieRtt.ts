import { NgbDate } from '@ng-bootstrap/ng-bootstrap';

export interface JFerieRtt {
  id?: number;
  date?: NgbDate;
  type?: string;
  jour?: string;
  commentaire?: string;
  couleur?: ColorSpaceConversion;
}
