import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { user } from '../models/interfaces/User';
import { expense } from '../models/interfaces/Expense';
import { UploadResponse } from '../models/interfaces/Receipt';
import { HttpHeaders } from '@angular/common/http';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getData(): Observable<expense[]>{
    return this.http.get<expense[]>(`https://localhost:7016/api/Expense`);
  }

  addExpense(expense: expense): Observable<expense> { 
    return this.http.post<expense>(`https://localhost:7016/api/Expense`, expense, httpOptions); 
  }

  getExpense(expenseId: number): Observable<expense> {
    return this.http.get<expense>(`https://localhost:7016/api/Expense/{$expenseId}`);
  }

  editExpense(expenseId: number, expense: expense): Observable<expense> {
    const url = `https://localhost:7016/api/Expense/${expenseId}`;
    return this.http.put<expense>(url, expense, httpOptions);
  }

  deleteExpense(expenseId: number): Observable<{}> { 
   const url = `https://localhost:7016/api/Expense/${expenseId}`; 
   return this.http.delete(url, httpOptions); 
  }

  registerUser(user: any): Observable<any> {
    return this.http.post<any>('https://localhost:7016/api/User/register', user);
  }

  loginUser(user: any): Observable<any> {
    return this.http.post<any>('https://localhost:7016/api/User/login', user);
  }

  getUserData(): Observable<user[]>{
    return this.http.get<user[]>(`https://localhost:7016/api/User`);
  }

  editBudget(dept: string, budget: number): Observable<expense> {
    const url = `https://localhost:7016/api/User/${dept}/${budget}`;
    return this.http.put<expense>(url, httpOptions);
  }

  uploadFile(file: File, filename: string) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('filename', filename);

    return this.http.post<string>(`https://localhost:7016/UploadFile?filename=${filename}`, formData);
  }

  downloadFile(filename: string): Observable<Blob> {
    const url = `https://localhost:7016/DownloadFile/${filename}`;

    return this.http.get(url, { responseType: 'blob' });
  }
  
  getFile(filename: string) {
    const url = `https://localhost:7016/GetFile/${filename}`;
    return this.http.get(url);
  }
}
