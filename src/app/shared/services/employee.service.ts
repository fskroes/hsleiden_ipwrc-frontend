import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {AuthorizationService} from './authorization.service';
import {ApiService} from './api.service';
import {EmployeeModel} from '../models/employee.model';
import 'rxjs/add/operator/map';

@Injectable()
export class EmployeeService {

  constructor(private api: ApiService,
              private authService: AuthorizationService,
              private router: Router) {

  }

  public signin(model: EmployeeModel, remember: boolean) {
    this.authService.setAuthorization(model.email, model.password);

    this.api
      .get('employee/login')
      .subscribe(response => {
        this.authService.storeAuthorization(response, remember);

        this.router.navigate(['']);
      });
  }

  public signout() {
    this.authService.deleteAuthorization();
  }
}
