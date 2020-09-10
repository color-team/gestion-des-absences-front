import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
export class EventJFerieRtt {

  title: string;
  start: NgbDate;
  backgroundColor: string;

  constructor(title: string, start: NgbDate, backgroundColor: string){

    this.title = title;
    this.start = start;
    this.backgroundColor = backgroundColor;
  }
}
