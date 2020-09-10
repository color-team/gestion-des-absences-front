import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
export class Evenement {

  title: string;
  start: NgbDate;
  end: NgbDate;

  constructor(title: string, start: NgbDate, end: NgbDate ){

    this.title = title;
    this.start = start;
    this.end = end;

  }
}
