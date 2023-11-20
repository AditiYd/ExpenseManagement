import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // Set a default value for the shouldDisplaySidebar variable
  shouldDisplaySidebar = false;

  constructor(private router: Router) {
    // Subscribe to router events to get the current route
    this.router.events.subscribe((event) => {
      // Check if the current route is "/"
      if (event instanceof NavigationEnd && event.url === '/') {
        // If the current route is "/", set shouldDisplaySidebar to false
        this.shouldDisplaySidebar = false;
      } else {
        // Otherwise, set shouldDisplaySidebar to true
        this.shouldDisplaySidebar = true;
      }
    });
  }
}
