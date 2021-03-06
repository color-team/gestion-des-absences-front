/**
 * Collègue utilisateur de l'application.
 */
export class Collegue {
  id: number;
  nom: string;
  prenom: string;
  email: string;
  motDePasse: string;
  roles: string[];
  nbRtt: number;
  nbCongesPayes: number;
  departement: string;

  constructor(params: any) {
    Object.assign(this, params);
  }

  estAnonyme(): boolean {
    return this.email === undefined;
  }

  estAdmin(): boolean {
    return this.roles[0] === `ROLE_ADMINISTRATEUR`;
  }

  estManager(): boolean {
    return this.roles[0] === `ROLE_MANAGER`;
  }

  estEmploye(): boolean {
    return this.roles[0] === `ROLE_EMPLOYE`;
  }
}
