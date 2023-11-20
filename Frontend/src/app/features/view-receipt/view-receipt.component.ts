import { Component } from '@angular/core';
import { DataService } from 'src/app/shared/services/data.service';
import { expense } from 'src/app/shared/models/interfaces/Expense';
import { Observable, of } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { saveAs } from 'file-saver';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-view-receipt',
  templateUrl: './view-receipt.component.html',
  styleUrls: ['./view-receipt.component.css']
})
export class ViewReceiptComponent {
  fileData: string = '';
  showImage: boolean = false;
  expenseId: number = 0;

  constructor(private dataService: DataService, private route: ActivatedRoute, private sanitizer: DomSanitizer){
    this.route.params.subscribe(params => {
      this.expenseId = params['expenseId'];
    });
  }
  viewReceipt() {
    const filename = this.expenseId.toString();
    this.dataService.getFile(filename)
      .subscribe((response: any) => {
        if (response && typeof response === 'object' && response.data) {
          this.showImage = true;
          this.fileData = response.data;
        } else {
          console.error('Invalid response:', response);
        }
      }, error => {
        console.error('Failed to fetch file:', error);
      });
  }
  
}

