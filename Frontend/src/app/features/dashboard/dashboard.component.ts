import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/shared/services/data.service';
import { expense } from 'src/app/shared/models/interfaces/Expense';
import { Observable, of } from 'rxjs';
import { Router, Route } from '@angular/router';
import { saveAs } from 'file-saver';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  expenseData: expense[] = [];
  userId: number = 0;
  imageUrl: SafeUrl | null = null;

  constructor(private dataService: DataService, private router: Router, private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.userId = Number(localStorage.getItem('userId'));
    console.log(this.userId);
    this.getDataArray();
  }

  getDataArray(): void { 
    this.dataService.getData().subscribe(data => { 
      for (let i = 0; i < data.length; i++) { 
        if (data[i].userId === this.userId && data[i].status !== 'rejected') { 
          this.expenseData.push(data[i]); 
        } 
      } 
      console.log(this.expenseData); 
    }); 
  }

  getTotal(): number {
    const total = this.expenseData.reduce((total, expense) => total + expense.amount, 0);
    localStorage.setItem('totalExpense', JSON.stringify(total));
    return total;
  }

  onDeleteExpense(expenseId: number) {
    this.dataService.deleteExpense(expenseId)
      .subscribe(
        response => {
          console.log(response);
          location.reload();
        },
        error => {
          console.log(error);
          // handle error if any
        }
      );
  }

  onDownload(expenseId: number | null) {
    if (expenseId !== null) {
      const filename = expenseId.toString(); // convert expenseId to a string and save it to filename variable
  
      this.dataService.downloadFile(filename).subscribe((response: Blob) => {
        saveAs(response, filename); // save the response (file) locally using the filename variable
      });
    }
  }
}