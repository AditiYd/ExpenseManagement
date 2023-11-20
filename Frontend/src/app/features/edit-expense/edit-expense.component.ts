import { Component, OnInit } from '@angular/core';
import { expense } from 'src/app/shared/models/interfaces/Expense';
import { DataService } from 'src/app/shared/services/data.service';
import { Route, ActivatedRoute, ParamMap } from '@angular/router';

import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Params } from '@angular/router';

@Component({
  selector: 'app-edit-expense',
  templateUrl: './edit-expense.component.html',
  styleUrls: ['./edit-expense.component.css']
})
export class EditExpenseComponent implements OnInit { // <-- implement OnInit
  expense: expense = {id: '', expenseId: 0, userId: 0, date: '', category: '', amount: 0, status: '', feedback: ''};
    id: string = 'string';
    expenseId: number = 0;
    userId: number = 0;
    date: string = 'string';
    category: string = 'string';
    amount: number = 0;
    status: string = 'string';
    feedback: string = 'string';

  constructor(private service: DataService, private route: ActivatedRoute) { // <-- inject ActivatedRoute
  }

  ngOnInit() {
    this.route.params.subscribe(params => { // <-- retrieve id parameter from URL
      this.expenseId = params['expenseId'];
      this.service.getExpense(this.expenseId)
        .subscribe((expense: expense) => {
          this.expense = expense;
          this.id = expense.id;
          this.expenseId = expense.expenseId;
          this.userId = expense.userId;
          this.date = expense.date;
          this.category = expense.category;
          this.amount = expense.amount;
          this.status = expense.status;
          this.feedback = expense.feedback;
        });
    });
  }

  onSubmit() {
    const updatedExpense: expense = {
      id: this.id,
      expenseId: this.expenseId,
      userId: this.userId,
      date: this.date,
      category: this.category,
      amount: this.amount,
      status: this.status,
      feedback: this.feedback
    };
    this.service.editExpense(this.expenseId, updatedExpense)
      .subscribe((expense: expense) => {
        this.expense = expense;
        this.id = expense.id;
        this.expenseId = expense.expenseId;
        this.userId = expense.userId;
        this.date = expense.date;
        this.category = expense.category;
        this.amount = expense.amount;
        this.status = expense.status;
        this.feedback = expense.feedback;
      });
    alert('Action was successful');  
  }
}  