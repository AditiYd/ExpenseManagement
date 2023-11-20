import { Component } from '@angular/core';
import { DataService } from 'src/app/shared/services/data.service';
import { expense } from 'src/app/shared/models/interfaces/Expense';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-manager-dashboard',
  templateUrl: './manager-dashboard.component.html',
  styleUrls: ['./manager-dashboard.component.css']
})
export class ManagerDashboardComponent {
  data: expense[] = [];

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.onGetData();
  }

  onGetData() {
    this.dataService.getData()
      .subscribe(
        expenses => {
          console.log(expenses);
          this.data = expenses;
        },
        error => {
          console.log(error);
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
