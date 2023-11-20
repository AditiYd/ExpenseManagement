import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/shared/services/data.service';
import { expense } from 'src/app/shared/models/interfaces/Expense';
import { user } from 'src/app/shared/models/interfaces/User';
import { Observable, of } from 'rxjs';
import { Router, Route } from '@angular/router';

@Component({
  selector: 'app-employee-expense',
  templateUrl: './employee-expense.component.html',
  styleUrls: ['./employee-expense.component.css']
})
export class EmployeeExpenseComponent implements OnInit{
  expenseData: expense[] = [];
  userData: user[] = [];
  userId: number = 0;

  constructor(private dataService: DataService, private router: Router) { }

  ngOnInit(): void {
    this.userId = Number(localStorage.getItem('employeeId'));
    console.log(this.userId);
    this.getUserDataArray();
    this.getDataArray();
  }

  getUserDataArray(): void { 
    this.dataService.getUserData().subscribe(data => { 
      for (let i = 0; i < data.length; i++) { 
        if (data[i].userId === this.userId) { 
          this.userData.push(data[i]); 
        } 
      } 
      console.log(this.userData); 
    }); 
  }

  getDataArray(): void { 
    this.dataService.getData() .subscribe(data => { 
       for (let i = 0; i < data.length; i++) 
        { if (data[i].userId === this.userId) 
          { this.expenseData.push(data[i]); } 
        } 
      console.log(this.expenseData);
    }); 
  }
}
