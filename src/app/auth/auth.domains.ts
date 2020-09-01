/**
 * Collègue utilisateur de l'application.
 */
export class Collegue {
  nom: string;
  prenom: string;
  email: string;
  motDePasse: string;
  roles: string[];
  nbRtt: number;
  nbCongesPayes: number;

  constructor(params: any) {
    Object.assign(this, params);
  }

  estAnonyme(): boolean {
    return this.email === undefined;
  }

  estAdmin(): boolean {
    return this.roles.includes(`ROLE_ADMINISTRATEUR`);
  }

  estManager(): boolean {
    return this.roles.includes(`ROLE_MANAGER`);
  }

  estEmploye(): boolean {
    return this.roles.includes(`ROLE_EMPLOYE`);
  }

}
