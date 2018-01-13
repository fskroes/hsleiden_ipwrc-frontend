import {Injectable} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthorizationService} from './authorization.service';
import {ApiService} from './api.service';
import {EmployeeModel} from '../models/employee.model';
import 'rxjs/add/operator/map';

@Injectable()
export class EmployeeService {

  constructor(private api: ApiService,
              private authService: AuthorizationService,
              private router: Router,
              private route: ActivatedRoute) {

  }

  public signin(model: EmployeeModel, remember: boolean) {
    this.authService.setAuthorization(model.email, model.password);

    this.api
      .get('employee/login')
      .subscribe(response => {
        this.authService.storeAuthorization(response, remember);

        let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl');
        this.router.navigate([returnUrl || '/']);
      });
  }

  public signout() {
    this.authService.deleteAuthorization();
  }
}
