import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {EmployeeModel} from '../models/employee.model';

@Injectable()
export class AuthorizationService {
  private login: string = null;
  private password: string = null;
  private authenticator: EmployeeModel = null;

  public authorized$ = new Subject<boolean>();

  constructor() {
    this.restoreAuthorization();
  }

  public hasAuthorization(): boolean {
    return this.login !== null && this.password !== null;
  }

  public setAuthorization(email: string, password: string): void {
    this.login = email;
    this.password = password;
  }

  public storeAuthorization(authenticator: EmployeeModel, local: boolean) {
    this.authenticator = authenticator;

    const authorization = {
      login: this.login,
      password: this.password,
      authenticator: this.authenticator
    };

    const authorizationString = JSON.stringify(authorization);
    const storage = local ? localStorage : sessionStorage;

    storage.setItem('authorization', authorizationString);

    this.authorized$.next(true);
  }

  private restoreAuthorization(): void {
    let authorizationString = sessionStorage.getItem('authorization');

    if (authorizationString === null) {
      authorizationString = localStorage.getItem('authorization');
    }

    if (authorizationString !== null) {
      const authorization = JSON.parse(authorizationString);

      this.login = authorization['login'];
      this.password = authorization['password'];
      this.authenticator = authorization['authenticator'];

      this.authorized$.next(true);
    }
  }

  public deleteAuthorization(): void {
    this.login = null;
    this.password = null;
    this.authenticator = null;

    sessionStorage.removeItem('authorization');
    localStorage.removeItem('authorization');

    this.authorized$.next(false);
  }

  public createAuthorizationString(): string {
    return 'Basic ' + btoa(this.login + ':' + this.password);
  }

  public getAuthenticator(): Object {
    return this.authenticator;
  }

  public setAuthenticator(authenticator: EmployeeModel): void {
    this.authenticator = authenticator;
  }
}
