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

  public signin(model: EmployeeModel, remember: boolean) {
    this.authService.setAuthorization(model.email, model.password);

    // this.api
    //   .get('product/products')
    //   .subscribe(r => console.log(r));


    this.api.get('employee/login')
      .subscribe(auth => {
        // this.authService.storeAuthorization(auth, remember);
        console.log(auth)
        console.log('HOI!,');




        this.router.navigate(['']);
      }, () => 'Sign In failed');
  }

  public signout() {
    this.authService.deleteAuthorization();
  }
}
