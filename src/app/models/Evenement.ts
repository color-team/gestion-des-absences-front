import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
export class Evenement {

  title: string;
  start: string;
  end: string;

  constructor(title: string, start: string, end: string ){

    this.title = title;
    this.start = start;
    this.end = end;

  }
}
