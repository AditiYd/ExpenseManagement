import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/shared/services/data.service';
import { expense } from 'src/app/shared/models/interfaces/Expense';
import { Observable, of } from 'rxjs';
import { Router, Route } from '@angular/router';

@Component({
  selector: 'app-rejected',
  templateUrl: './rejected.component.html',
  styleUrls: ['./rejected.component.css']
})
export class RejectedComponent implements OnInit {
  expenseData: expense[] = [];
  userId: number = 0;

  constructor(private dataService: DataService, private router: Router) { }

  ngOnInit(): void {
    this.userId = Number(localStorage.getItem('userId'));
    console.log(this.userId);
    this.getDataArray();
  }

  getDataArray(): void { 
    this.dataService.getData().subscribe(data => { 
      for (let i = 0; i < data.length; i++) { 
        if (data[i].userId === this.userId && data[i].status == 'rejected') { 
          this.expenseData.push(data[i]); 
        } 
      } 
      console.log(this.expenseData); 
    }); 
  }
}
