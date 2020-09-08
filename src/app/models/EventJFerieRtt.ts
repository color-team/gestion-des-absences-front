import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
export class EventJFerieRtt {

  title: string;
  start: NgbDate;

  constructor(title: string, start: NgbDate){

    this.title = title;
    this.start = start;
  }
}
