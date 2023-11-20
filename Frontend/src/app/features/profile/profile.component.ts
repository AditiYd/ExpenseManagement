import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/shared/services/data.service';
import { user } from 'src/app/shared/models/interfaces/User';
import { Observable, of } from 'rxjs';
import { Router, Route } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userData: user[] = [];
  userId: number = 0;

  constructor(private dataService: DataService, private router: Router) { }

  ngOnInit(): void {
    this.userId = Number(localStorage.getItem('userId'));
    console.log(this.userId);
    this.getDataArray();
  }

  getDataArray(): void { 
    this.dataService.getUserData().subscribe(data => { 
      for (let i = 0; i < data.length; i++) { 
        if (data[i].userId === this.userId) { 
          this.userData.push(data[i]); 
        } 
      } 
      console.log(this.userData); 
    }); 
  }
}
