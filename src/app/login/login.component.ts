import { Component, OnInit } from '@angular/core';
import {EmployeeModel} from '../shared/models/employee.model';
import {EmployeeService} from '../shared/services/employee.service';
import {AuthorizationService} from '../shared/services/authorization.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  employee: EmployeeModel = new EmployeeModel();

  constructor(
    private employeeService: EmployeeService,
    private authService: AuthorizationService
  ) {
    if (this.authService.hasAuthorization()) {
      console.log('user is already sing in');
      console.log(this.authService.getAuthenticator());
    }
  }

  public signin() {
    console.log(this.employee.email);
    this.employeeService.signin(this.employee, false);
  }
}
