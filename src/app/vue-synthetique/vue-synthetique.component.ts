import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Collegue } from '../auth/auth.domains';

@Component({
  selector: 'app-vue-synthetique',
  templateUrl: './vue-synthetique.component.html',
  styleUrls: ['./vue-synthetique.component.scss']
})
export class VueSynthetiqueComponent implements OnInit {

  collegueConnecte: Collegue;


  constructor(private router: Router, private authSrv: AuthService) { }

  ngOnInit(): void {

    this.authSrv.verifierAuthentification().subscribe(
      v => this.collegueConnecte = v,
      err => { },
      () => { }
    );
  }

  redirectionVueDep() {
    this.router.navigate(['/absv']);
  }

  redirectionHisto() {
    this.router.navigate(['/absp']);
  }

}
