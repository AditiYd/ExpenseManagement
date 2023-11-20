import { Component } from '@angular/core';
import { DataService } from 'src/app/shared/services/data.service';
import { UploadResponse } from 'src/app/shared/models/interfaces/Receipt';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.css']
})
export class ReceiptComponent {
  selectedFileName: string = '';
  selectedFile: File | undefined;
  expenseId: string | null = '';
  
  constructor(
    private service: DataService,
    private route: ActivatedRoute) 
    {
      this.expenseId = this.route.snapshot.paramMap.get('expenseId'); // get expenseId from URL
    }
  
    onFileSelected(event: any) {
      this.selectedFile = event.target.files[0];
      this.selectedFileName = `${this.expenseId}`; // use expenseId in the filename
    }  

    onSubmit() {
      if (this.selectedFile) {
        // pass the selected file and filename (with expenseId) to the service to upload
        this.service.uploadFile(this.selectedFile, this.selectedFileName).subscribe(
          (response: any) => {
            // handle success
          },
          (error: any) => {
            // handle error
          }
        );
      }
    }
  }
