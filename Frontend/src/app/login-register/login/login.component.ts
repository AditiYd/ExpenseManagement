import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/app/shared/services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm !: FormGroup;
  
  constructor(private fb: FormBuilder, private api: DataService, private router: Router) {
    this.loginForm = this.fb.group({
      email: '',
      passwordHash: ''
    })
  }
  login(){
    this.api.loginUser(this.loginForm.value).subscribe((res: any) => {
      localStorage.setItem('user', JSON.stringify(res));
      localStorage.setItem('role', res.role);
      localStorage.setItem('userId', res.userId);
      localStorage.setItem('userBudget', res.budget);
      if (res.role === 'Employee') {
        this.router.navigate(['/dashboard']); 
      } else if (res.role === 'Manager') {
        this.router.navigate(['/manager-dashboard']);
      } else {
        //this.router.navigate(['/']); // Navigate to the home route if the user's role is not specified or not recognized
      }
    })
  }
}
