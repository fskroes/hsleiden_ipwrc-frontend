import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {EmployeeModel} from '../models/employee.model';
import {CartModel} from '../models/cart.model';

@Injectable()
export class AuthorizationService {
  private login: string = null;
  private password: string = null;
  private authenticator: EmployeeModel = null;

  public authorized$ = new Subject<boolean>();
  public authorizedModel$ = new Subject<EmployeeModel>();

  constructor() {
    this.restoreAuthorization();
  }

  public hasAuthorization(): boolean {
    return this.login !== null && this.password !== null;
    // return this.authenticator !== null;
  }

  public setAuthorization(email: string, password: string): void {
    this.login = email;
    this.password = password;
    // this.authenticator.email = email;
    // this.authenticator.password = password;
  }

  public storeAuthorization(authenticator: EmployeeModel, local: boolean) {
    this.authenticator = authenticator;

    // const authorization = {
    //   login: this.login,
    //   password: this.password,
    //   authenticator: this.authenticator
    // };

    const authorizationString = JSON.stringify(this.authenticator);
    const storage = local ? localStorage : sessionStorage;

    storage.setItem('authorization', authorizationString);

    console.log('store auth ' + storage.getItem('authorization'));

    this.authorizedModel$.next(this.authenticator);
    this.authorized$.next(true);
  }

  private restoreAuthorization(): void {
    let authorizationString = sessionStorage.getItem('authorization');

    if (authorizationString === null) {
      authorizationString = localStorage.getItem('authorization');
    }

    if (authorizationString !== null) {
      const authorization = JSON.parse(authorizationString);
      const newAuthorization: EmployeeModel = JSON.parse(authorizationString);

      this.login = authorization['login'];
      this.password = authorization['password'];
      // this.authenticator = authorization['authenticator'];

      console.log('authorization from JSON parse ' + authorization);

      this.authenticator = newAuthorization;

      console.log('authorization from new object ' + this.authenticator);

      this.authorizedModel$.next(this.authenticator);
      this.authorized$.next(true);
    }
  }

  public deleteAuthorization(): void {
    // this.login = null;
    // this.password = null;
    this.authenticator = null;

    sessionStorage.removeItem('authorization');
    localStorage.removeItem('authorization');

    this.authorized$.next(false);
  }

  public createAuthorizationString(): string {
    return 'Basic ' + btoa(this.login + ':' + this.password);
  }

  public getAuthenticator(): EmployeeModel {
    this.restoreAuthorization();
    return this.authenticator;
  }

  public setAuthenticator(authenticator: EmployeeModel): void {
    this.authenticator = authenticator;
  }
}
