import { AppService } from './app.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Collegue } from './auth/auth.domains';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {

  collegueConnecte: Observable<Collegue>;

  constructor(private authSrv: AuthService, private router: Router, private dataServ: AppService) {

  }

  /**
   * Action déconnecter collègue.
   */
  seDeconnecter() {
    this.authSrv.seDeconnecter().subscribe(
      () => this.router.navigate(['/connexion'])
    );
  }

  /**
   * Action lancement du traitement de nuit.
   */
  traitementDeNuit(): void {

    this.dataServ.getTraitementDeNuit().subscribe(
      () => { },
      err => { },
      () => { }
    );

  }

  /**
   * A l'initialisation, le composant s'abonne au flux du collègue courant connecté.
   *
   * Celui lui permet de rester à jour en fonction des connexions et déconnexions.
   */
  ngOnInit(): void {
    this.collegueConnecte = this.authSrv.collegueConnecteObs;
  }


}
