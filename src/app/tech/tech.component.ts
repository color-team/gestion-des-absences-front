import { Collegue } from './../auth/auth.domains';
import { Component, OnInit } from '@angular/core';
import { TechService } from './tech.service';
import { BackendLink } from './tech.domains';
import { AuthService } from '../auth/auth.service';

/**
 * Composant d'affichage d'informations techniques (liens utiles pour connaître l'état du backend).
 *
 * Ce composant permet de valider la communication avec le backend.
 */
@Component({
  selector: 'app-tech',
  templateUrl: './tech.component.html',
  styles: []
})
export class TechComponent implements OnInit {

  links: BackendLink[] = [];
  collegueConnecte: Collegue;

  // tslint:disable-next-line: variable-name
  constructor(private _techSrv: TechService, private authSrv: AuthService) { }

  ngOnInit() {
    this._techSrv.listBackendLinks().subscribe(
      link => this.links.push(link)
    );

    this.authSrv.verifierAuthentification().subscribe(
      v => this.collegueConnecte = v,
      err => { },
      () => { }
    );
  }


}
