import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {AuthorizationService} from './authorization.service';
import {ApiService} from './api.service';
import {EmployeeModel} from '../models/employee.model';

@Injectable()
export class EmployeeService {

  constructor(private api: ApiService,
              private authService: AuthorizationService,
              private router: Router) {

  }

  public signin(user: EmployeeModel, remember: boolean): void {
    this.authService.setAuthorization(user.email, user.password);

    this.api.get('employee/login')
      .subscribe(auth => {
        this.authService.storeAuthorization(auth, remember);
        console.log('HOI!,');

        this.router.navigate(['']);
      }, () => 'Sign In failed');
  }
}
