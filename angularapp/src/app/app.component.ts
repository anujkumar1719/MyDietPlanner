import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angularapp';

  isLoggedIn = false;
  role = '';
 
  constructor(private authService: AuthService) {}
 
  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
    this.role = this.authService.getRole();
 
    // Listen for role changes after login/logout
    this.authService.userRole$.subscribe(role => {
      this.role = role;
      this.isLoggedIn = this.authService.isLoggedIn();
    });
  }
}
