import { Component, OnInit } from '@angular/core';
import {EmployeeService} from '../shared/services/employee.service';
import {EmployeeModel} from '../shared/models/employee.model';

@Component({
  selector: 'app-bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent {

  employee?: EmployeeModel = new EmployeeModel();

  constructor(private employeeService: EmployeeService) { }

  logout() {
    this.employeeService.signout();
  }
}
