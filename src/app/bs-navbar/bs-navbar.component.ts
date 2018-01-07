import { Component, OnInit } from '@angular/core';
import {EmployeeService} from '../shared/services/employee.service';
import {EmployeeModel} from '../shared/models/employee.model';
import {LoginComponent} from '../login/login.component';
import {AuthorizationService} from '../shared/services/authorization.service';
import {Subject} from 'rxjs/Subject';

@Component({
  selector: 'app-bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent {

  employee: Subject<boolean>;

  constructor(
    private employeeService: EmployeeService,
    private authService: AuthorizationService) {
    this.employee = this.authService.authorized$;
  }

  logout() {
    this.employeeService.signout();
  }
}
