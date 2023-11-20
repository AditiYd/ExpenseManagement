import { Component } from '@angular/core';
import { DataService } from 'src/app/shared/services/data.service';

@Component({
  selector: 'app-budget',
  templateUrl: './budget.component.html',
  styleUrls: ['./budget.component.css']
})
export class BudgetComponent {
  dept: string = '';
  budget: number = 0;

  constructor(private dataService: DataService) { }

  onSubmit() {
    this.dataService.editBudget(this.dept, this.budget)
      .subscribe(res => {
        console.log("successful");
      });
  }
}
