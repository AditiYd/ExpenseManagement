import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-employee',
  templateUrl: './view-employee.component.html',
  styleUrls: ['./view-employee.component.css']
})
export class ViewEmployeeComponent {
  constructor(private router: Router) { }
  saveEmployeeId() {
    const employeeId = (<HTMLInputElement>document.getElementById('employeeId')).value;
    localStorage.setItem('employeeId', employeeId);
    console.log(localStorage.getItem('employeeId'))
    this.router.navigate(['/employee-expense']);
  }
}
