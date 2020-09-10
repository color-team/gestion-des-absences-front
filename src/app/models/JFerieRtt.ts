import { NgbDate } from '@ng-bootstrap/ng-bootstrap';

export interface JFerieRtt {
  uuid?: string;
  date: Date;
  type: string;
  valide?: boolean;
  jour?: string;
  commentaire?: string;
  backgroundColor?: string;
}

