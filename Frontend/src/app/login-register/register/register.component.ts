import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { DataService } from 'src/app/shared/services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  public user = {
    email: '',
    role: '',
    department: '',
    password: ''
  };

  constructor(private dataService: DataService, private router: Router) {}

  onSubmit() {
    this.dataService.registerUser(this.user).subscribe({
      next: () => {
        console.log('User registered successfully');
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}
