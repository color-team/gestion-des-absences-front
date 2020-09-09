import { Component, OnInit } from '@angular/core';
import { Collegue } from '../auth/auth.domains';
import { Absence } from '../models/Absence';
import { JFerieRtt } from '../models/JFerieRtt'
import { AuthService } from '../auth/auth.service';
import { VdjcServiceService } from './vdjc-service.service'
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-vue-departement-jour-collaborateur',
  templateUrl: './vue-departement-jour-collaborateur.component.html',
  styleUrls: ['./vue-departement-jour-collaborateur.component.scss'],
  encapsulation : ViewEncapsulation.None
})
export class VueDepartementJourCollaborateurComponent implements OnInit {

  listCollaborateursDepartement: Collegue[];
  listeJourFeriesRTTEmployeurMoisAnnee: JFerieRtt[];
  listAbsencesAAfficher: Absence[];
  departements: string[];
  defaultDepartement: string;
  listeMois = [
    { Value: 1, Text: 'Janvier' },
    { Value: 2, Text: 'Février' },
    { Value: 3, Text: 'Mars' },
    { Value: 4, Text: 'Avril' },
    { Value: 5, Text: 'Mai' },
    { Value: 6, Text: 'Juin' },
    { Value: 7, Text: 'Juillet' },
    { Value: 8, Text: 'Août' },
    { Value: 9, Text: 'Septembre' },
    { Value: 10, Text: 'Octobre' },
    { Value: 11, Text: 'Novembre' },
    { Value: 12, Text: 'Décembre' }
];

  annees = Array(2030 - (2030 - 20)).fill('').map((v, idx) => 2030 - idx) as Array<number>;

  visible: boolean = true;
  afficherFoot: boolean = false;

  data: Absence[];
  cols: any[];

  collegueConnecte: Collegue;
  form: FormGroup;

  constructor(private authSrv: AuthService, private dataServ: VdjcServiceService, private router: Router) { }

  ngOnInit(): void {

    this.form = new FormGroup({
      mois: new FormControl('', [Validators.required]),
      departement: new FormControl('', [Validators.required]),
      annee: new FormControl('', [Validators.required])
    });

    this.mois.setValue(this.dataServ.getCurrentMonth(this.listeMois));
    this.annee.setValue(new Date().getUTCFullYear());

    this.authSrv.verifierAuthentification().subscribe(
      v => this.collegueConnecte = v,
      err => { },
      () => { }
    );

    this.dataServ.getDepartements().subscribe(
      value => {this.departements = value;
        this.departement.setValue(this.departements[0]);
      },
      err => { },
      () => { }
    );

  }

  get mois() { return this.form.get('mois'); }
  get departement() { return this.form.get('departement'); }
  get annee() { return this.form.get('annee'); }

  updateVisibility(): void {
    this.visible = false;
    setTimeout(() => this.visible = true, 0);
  }

  afficher(): void{

    this.afficherFoot = true;

    let nombreJours: number;
    this.cols = ["Nom"];

    nombreJours = new Date(this.annee.value, this.mois.value.Value, 0).getDate();

    let listeJoursMois = Array(nombreJours).fill(1).map((x, y) => x + y);

    this.cols = this.cols.concat(listeJoursMois);

    //console.log(columns);

    this.dataServ.getJFeriesRtts(this.mois.value.Value, this.annee.value).subscribe(
      value => {
        this.listeJourFeriesRTTEmployeurMoisAnnee = value;

        console.log(this.listeJourFeriesRTTEmployeurMoisAnnee);
      },

      err => { },
      () => { }

    );

    this.dataServ.getAbs(this.mois.value.Value, this.annee.value, this.departement.value).subscribe(
      value => {this.data= value;

        console.log(this.data);

        this.updateVisibility();
      
      },
      err => { },
      () => { }
    );


  }

  DateInterval(jour: number, dateDebut: any, dateFin: any): boolean{

    let dateDebutSplit: string[] = dateDebut.split("-");
    let dateDebutNumbers: number[] = [];
    dateDebutSplit.forEach(e => dateDebutNumbers.push(parseInt(e)));

    let dateFinSplit: string[] = dateFin.split("-");
    let dateFinNumbers: number[] = [];
    dateFinSplit.forEach(e => dateFinNumbers.push(parseInt(e)));
    
    let DateFin = new NgbDate(dateFinNumbers[0], dateFinNumbers[1], dateFinNumbers[2]);

    let DateDebut = new NgbDate(dateDebutNumbers[0], dateDebutNumbers[1], dateDebutNumbers[2]);

    let dateAComparer = new NgbDate(this.annee.value, this.mois.value.Value, jour);

    if (dateAComparer.after(DateDebut) && dateAComparer.before(DateFin)){
      return true;
    }

    return false;

  }

  isNumber(val): boolean { return typeof val === 'number'; }

  isJferieRtt(object: any): boolean{

    return object.hasOwnProperty('date');
  }
  

  isSameJFRttDate(jour: number, date: string): boolean {

    let dateSplit: string[] = date.split("-");
    let dateNumbers: number[] = [];
    dateSplit.forEach(e => dateNumbers.push(parseInt(e)));

    let dateJFRtt = new NgbDate(dateNumbers[0], dateNumbers[1], dateNumbers[2]);

    let dateAComparer = new NgbDate(this.annee.value, this.mois.value.Value, jour);

    return dateAComparer.equals(dateJFRtt);

  }

  isWeekend(jour: number){

    let date = new Date(this.annee.value, this.mois.value.Value - 1, jour);

    if (date.getDay() == 0 || date.getDay() == 6){
      return true;
    }

    return false;
  }

  retour() {
    this.router.navigate(['/absv']);
  }

}
