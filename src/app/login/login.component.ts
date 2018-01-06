import { Component, OnInit } from '@angular/core';
import {EmployeeModel} from '../shared/models/employee.model';
import {EmployeeService} from '../shared/services/employee.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  employee: EmployeeModel = new EmployeeModel();

  ngOnInit(): void {
  }
  constructor(private employeeService: EmployeeService) { }

  signin() {
    console.log(this.employee.email);
    this.employeeService.signin(this.employee, false);
  }
}
