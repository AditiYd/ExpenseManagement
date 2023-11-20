import { Component } from '@angular/core';
import { DataService } from 'src/app/shared/services/data.service';

@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.component.html',
  styleUrls: ['./add-expense.component.css']
})
export class AddExpenseComponent {
  userBudget: number = 0;
  newTotalExpense: number = 0;
  userId: number = 0;
  date: string = '';
  category: string = '';
  amount: number = 0;
  status: string = 'Yet to be approved';
  feedback: string = '';

  constructor(private dataService: DataService) {
    this.userId = Number(localStorage.getItem('userId'));
  }

  addExpense() {
    const newExpense = {
      id: "",
      expenseId: 0,
      userId: this.userId,
      date: this.date,
      category: this.category,
      amount: this.amount,
      status: this.status,
      feedback: this.feedback
    };

    const totalExpense = Number(localStorage.getItem('totalExpense'));
    const userBudget = Number(localStorage.getItem('userBudget'));
    const newTotalExpense = totalExpense + this.amount;

    if (newTotalExpense <= userBudget) {
      this.dataService.addExpense(newExpense).subscribe(
        expense => console.log(expense),
        error => console.log(error)
      );
      alert('Action was successful');
    } else {
      alert('Total expense exceeds your budget!');
    }
  }
}
